import { QuickNavEntry, QuickNavKind, QuickNavScope } from "./types";
import { $axios } from "@/utils/api";
import {
	CourseMetadataResponse,
	CoursesApiFactory,
	RoomApiFactory,
	RoomArchivedItemResponse,
	RoomColor,
	RoomItemResponse,
	TaskApiFactory,
	TaskResponse,
} from "@api-server";
import { useSchoolStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { mdiAccountSupervisorCircleOutline, mdiFormatListChecks, mdiSchoolOutline } from "@icons/material";
import { logger } from "@util-logger";
import { defineStore } from "pinia";
import { ref } from "vue";

const PAGE_SIZE = 99; // the server's maximum page size
const MAX_ITEMS_PER_KIND = 500;

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

/**
 * `ownSchoolId` is the user's school. A room from the archive list carries no school id, only the
 * school's name, and names are not unique, so such a room is never called external.
 */
const toRoomEntry = (room: RoomItemResponse, ownSchoolId: string | undefined): QuickNavEntry => {
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
		// without the archive feature, archived rooms stay in the room list and only carry the date;
		// a restored room can come back with `null` there, so like the server only a date counts
		isArchived: !!room.archivedAt,
		// the same rule as the "extern" chip on the room's tile, but only when both schools are known
		isExternal: ownSchoolId !== undefined && room.schoolId !== ownSchoolId,
		to: `/rooms/${room.id}`,
	};
};

/**
 * The archive list has no colour, so the line shows the room icon instead of a tile. The room page
 * itself opens archived rooms too and says there that they are archived.
 *
 * Known limitation: the archive list has no school id either, only the school's name, which is not
 * unique. So an archived room of another school is not labelled external; `isExternal` stays unset
 * until the server sends the school id.
 */
const toArchivedRoomEntry = (room: RoomArchivedItemResponse): QuickNavEntry => ({
	id: `room:${room.id}`,
	kind: QuickNavKind.ROOM,
	title: room.name,
	memberCount: room.totalMembers,
	icon: mdiAccountSupervisorCircleOutline,
	isArchived: true,
	to: `/rooms/${room.id}`,
});

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
	const isLoading = ref(false);
	/** which categories could not be loaded, so the palette can say what is missing */
	const failedScopes = ref<QuickNavScope[]>([]);

	let pendingLoad: Promise<void> | undefined;

	/** the two room lists as last loaded; each is kept when its request fails */
	let activeRooms: QuickNavEntry[] = [];
	let archivedRooms: QuickNavEntry[] = [];

	const combineRooms = (): void => {
		// a room archived or restored between the two requests would otherwise be listed twice
		const activeIds = new Set(activeRooms.map((room) => room.id));
		rooms.value = [...activeRooms, ...archivedRooms.filter((room) => !activeIds.has(room.id))];
	};

	// the member count comes with the room list, so no member list has to be asked for
	const loadRooms = async (): Promise<void> => {
		const ownSchoolId = useSchoolStore().schoolDetails?.id;
		const { data } = await roomApi.roomControllerGetRooms();

		activeRooms = data.data.map((room) => toRoomEntry(room, ownSchoolId));
		combineRooms();
	};

	/**
	 * With the archive feature on, the room list leaves archived rooms out and they come from a list of
	 * their own. They are extras: they are added when they arrive, without holding up the rooms people
	 * work in, and when that list fails the archived rooms from before stay and the rooms are not
	 * reported as missing. Never rejects.
	 */
	const loadArchivedRooms = async (): Promise<void> => {
		if (!useEnvConfig().value.FEATURE_ROOM_ARCHIVE_ENABLED) {
			archivedRooms = [];
			return;
		}

		try {
			const { data } = await roomApi.roomControllerGetArchivedRooms();
			archivedRooms = data.data.map(toArchivedRoomEntry);
			combineRooms();
		} catch (error) {
			logger.error("Quick navigation could not load the archived rooms", error);
		}
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

		const archived = loadArchivedRooms();
		const sources: QuickNavScope[] = ["rooms", "courses", "tasks"];
		const results = await Promise.allSettled([loadRooms(), loadCourses(), loadTasks()]);

		failedScopes.value = sources.filter((_source, index) => results[index].status === "rejected");
		results.forEach((result) => {
			if (result.status === "rejected") logger.error("Quick navigation could not load its entries", result.reason);
		});
		// the spinner is for what people came for; archived rooms that are still on their way just appear
		isLoading.value = false;

		// still part of this load, so a load that overlaps it cannot write older archived rooms over newer ones
		await archived;
	};

	// runs on every open; the previous entries stay visible until the new ones arrive
	const load = (): Promise<void> => {
		pendingLoad ??= fetchAll().finally(() => {
			pendingLoad = undefined;
		});

		return pendingLoad;
	};

	return { rooms, courses, tasks, isLoading, failedScopes, load };
});
