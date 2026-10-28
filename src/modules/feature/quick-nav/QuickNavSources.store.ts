import { QuickNavEntry, QuickNavKind, QuickNavScope } from "./types";
import { $axios } from "@/utils/api";
import {
	CourseMetadataResponse,
	CoursesApiFactory,
	RoomApiFactory,
	RoomColor,
	RoomItemResponse,
	RoomMemberResponse,
	TaskApiFactory,
	TaskResponse,
} from "@api-server";
import { useAppStore } from "@data-app";
import {
	mdiAccountOutline,
	mdiAccountSupervisorCircleOutline,
	mdiFormatListChecks,
	mdiSchoolOutline,
} from "@icons/material";
import { logger } from "@util-logger";
import { defineStore } from "pinia";
import { ref } from "vue";

// a member count can stay equal while people swap, so every member list is reloaded now and then
const FULL_MEMBER_REFRESH_MS = 30 * 60 * 1000;
const PAGE_SIZE = 99; // the server's maximum page size
const MAX_ITEMS_PER_KIND = 500;
const MEMBER_REQUESTS_AT_ONCE = 5;

type Page<T> = { data: { data: T[]; total: number } };

const fetchAllPages = async <T>(fetchPage: (skip: number, limit: number) => Promise<Page<T>>): Promise<T[]> => {
	const items: T[] = [];
	let total = Infinity;

	while (items.length < Math.min(total, MAX_ITEMS_PER_KIND)) {
		const { data } = await fetchPage(items.length, PAGE_SIZE);
		if (data.data.length === 0) break;

		items.push(...data.data);
		total = data.total;
	}

	return items.slice(0, MAX_ITEMS_PER_KIND);
};

const isExpired = (course: CourseMetadataResponse): boolean =>
	course.untilDate !== undefined && new Date(course.untilDate) < new Date();

/** CSS hex colours, the only form course colours come in; anything else gets no tile */
const parseHex = (value: string): [number, number, number] | undefined => {
	const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(value.trim())?.[1];
	if (!hex) return undefined;

	const full = hex.length === 3 ? [...hex].map((digit) => digit + digit).join("") : hex;
	return [0, 2, 4].map((at) => parseInt(full.slice(at, at + 2), 16)) as [number, number, number];
};

/** whether dark text reads better than white on this colour; course colours include some very light ones */
const isLightColor = ([red, green, blue]: [number, number, number]): boolean => {
	const [r, g, b] = [red, green, blue].map((channel) => {
		const value = channel / 255;
		return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
	});
	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	// contrast against white and against black, as WCAG measures it
	return (luminance + 0.05) / 0.05 > 1.05 / (luminance + 0.05);
};

const segmenter = typeof Intl.Segmenter === "function" ? new Intl.Segmenter() : undefined;

/**
 * The first two characters as a reader counts them, so a flag or a family emoji stays whole, and
 * without a trailing space when the second one is a space ("A Kurs" → "A").
 */
const initialsOf = (value: string): string => {
	const text = value.trim();
	const characters = segmenter ? [...segmenter.segment(text)].map((part) => part.segment) : [...text];

	return characters.slice(0, 2).join("").trimEnd();
};

const ROOM_COLORS: string[] = Object.values(RoomColor);

/**
 * White letters like the tiles in the room overview, except on yellow, where white cannot be read
 * at all. The letters only repeat the title beside them, which carries the name for everyone.
 */
const LIGHT_ROOM_COLORS: string[] = [RoomColor.YELLOW];

const toRoomEntry = (room: RoomItemResponse): QuickNavEntry => {
	const initials = initialsOf(room.name);
	// a colour this client has no class for would leave white letters on nothing
	const hasTile = initials.length > 0 && ROOM_COLORS.includes(room.color);

	return {
		id: `room:${room.id}`,
		kind: QuickNavKind.ROOM,
		title: room.name,
		memberCount: room.totalMembers,
		icon: mdiAccountSupervisorCircleOutline,
		// the same letters and colour as on the room's tile in the room overview
		avatar: hasTile
			? { initials, colorClass: `room-color--${room.color}`, isLight: LIGHT_ROOM_COLORS.includes(room.color) }
			: undefined,
		to: `/rooms/${room.id}`,
	};
};

// course rooms share the /rooms/:id route; the client's RoomDetailsSwitch page picks the course view
const toCourseEntry = (course: CourseMetadataResponse): QuickNavEntry => {
	const rgb = parseHex(course.displayColor ?? "");
	const initials = initialsOf(course.shortTitle || course.title);

	return {
		id: `course:${course.id}`,
		kind: QuickNavKind.COURSE,
		title: course.title,
		icon: mdiSchoolOutline,
		avatar:
			rgb && initials.length > 0
				? { initials, color: course.displayColor.trim(), isLight: isLightColor(rgb) }
				: undefined,
		to: `/rooms/${course.id}`,
	};
};

// task details still live in the legacy client, so this is a full page load
const toTaskEntry = (task: TaskResponse): QuickNavEntry => ({
	id: `task:${task.id}`,
	kind: QuickNavKind.TASK,
	title: task.name,
	subtitle: task.courseName,
	dueDate: task.dueDate,
	// the same rule the task overview marks as "Abgelaufen"
	isOverdue: task.dueDate !== undefined && new Date(task.dueDate) < new Date() && !task.status.isFinished,
	icon: mdiFormatListChecks,
	href: `/homework/${task.id}`,
});

export const useQuickNavSourcesStore = defineStore("quickNavSources", () => {
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const courseApi = CoursesApiFactory(undefined, "/v3", $axios);
	const taskApi = TaskApiFactory(undefined, "/v3", $axios);

	const rooms = ref<QuickNavEntry[]>([]);
	const courses = ref<QuickNavEntry[]>([]);
	const tasks = ref<QuickNavEntry[]>([]);
	const people = ref<QuickNavEntry[]>([]);
	const isLoading = ref(false);
	/** which categories could not be loaded, so the palette can say what is missing */
	const failedScopes = ref<QuickNavScope[]>([]);

	const membersByRoom = new Map<string, { totalMembers: number; members: RoomMemberResponse[] }>();
	let membersRefreshedAt: number | undefined;
	let pendingLoad: Promise<void> | undefined;

	// people are found through the member lists of shared rooms, so the palette is not a school directory
	const toPeopleEntries = (roomItems: RoomItemResponse[]): QuickNavEntry[] => {
		const currentUserId = useAppStore().user?.id;
		const found = new Map<string, QuickNavEntry>();

		for (const room of roomItems) {
			for (const member of membersByRoom.get(room.id)?.members ?? []) {
				if (member.userId === currentUserId || found.has(member.userId)) continue;

				found.set(member.userId, {
					id: `person:${member.userId}`,
					kind: QuickNavKind.PERSON,
					title: `${member.firstName} ${member.lastName}`.trim(),
					subtitle: room.name,
					icon: mdiAccountOutline,
					to: `/rooms/${room.id}/members`,
				});
			}
		}

		return [...found.values()];
	};

	const loadPeople = async (roomItems: RoomItemResponse[]): Promise<void> => {
		const roomsWithVisibleMembers = roomItems.filter((room) => room.allowedOperations?.getRoomMembers);
		const visibleRoomIds = new Set(roomsWithVisibleMembers.map((room) => room.id));
		[...membersByRoom.keys()].filter((roomId) => !visibleRoomIds.has(roomId)).forEach((id) => membersByRoom.delete(id));

		const isFullRefresh = membersRefreshedAt === undefined || Date.now() - membersRefreshedAt >= FULL_MEMBER_REFRESH_MS;
		const outdatedRooms = roomsWithVisibleMembers.filter(
			(room) => isFullRefresh || membersByRoom.get(room.id)?.totalMembers !== room.totalMembers
		);

		people.value = toPeopleEntries(roomsWithVisibleMembers);

		for (let start = 0; start < outdatedRooms.length; start += MEMBER_REQUESTS_AT_ONCE) {
			const batch = outdatedRooms.slice(start, start + MEMBER_REQUESTS_AT_ONCE);
			const responses = await Promise.allSettled(batch.map((room) => roomApi.roomControllerGetMembers(room.id)));

			responses.forEach((response, index) => {
				const room = batch[index];
				if (response.status === "rejected") {
					membersByRoom.delete(room.id);
					return;
				}
				membersByRoom.set(room.id, { totalMembers: room.totalMembers, members: response.value.data.data });
			});

			people.value = toPeopleEntries(roomsWithVisibleMembers);
		}

		if (isFullRefresh) membersRefreshedAt = Date.now();
	};

	const loadRoomsAndPeople = async (): Promise<void> => {
		const { data } = await roomApi.roomControllerGetRooms();
		rooms.value = data.data.map(toRoomEntry);

		await loadPeople(data.data);
	};

	const loadCourses = async (): Promise<void> => {
		const items = await fetchAllPages((skip, limit) => courseApi.courseControllerFindForUser(skip, limit));
		courses.value = items.filter((course) => !isExpired(course)).map(toCourseEntry);
	};

	const loadTasks = async (): Promise<void> => {
		const items = await fetchAllPages((skip, limit) => taskApi.taskControllerFindAll(skip, limit));
		tasks.value = items.map(toTaskEntry);
	};

	const fetchAll = async (): Promise<void> => {
		isLoading.value = true;

		// people are found through the rooms, so they fail together
		const sources: QuickNavScope[][] = [["rooms", "people"], ["courses"], ["tasks"]];
		const results = await Promise.allSettled([loadRoomsAndPeople(), loadCourses(), loadTasks()]);

		failedScopes.value = results.flatMap((result, index) => (result.status === "rejected" ? sources[index] : []));
		results.forEach((result) => {
			if (result.status === "rejected") logger.error("Quick navigation could not load its entries", result.reason);
		});
		isLoading.value = false;
	};

	// runs on every open; the previous entries stay visible until the new ones arrive
	const load = (): Promise<void> => {
		pendingLoad ??= fetchAll().finally(() => {
			pendingLoad = undefined;
		});

		return pendingLoad;
	};

	return { rooms, courses, tasks, people, isLoading, failedScopes, load };
});
