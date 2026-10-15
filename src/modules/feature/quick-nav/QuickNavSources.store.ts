import { QuickNavEntry, QuickNavKind } from "./types";
import { $axios } from "@/utils/api";
import {
	CourseMetadataResponse,
	CoursesApiFactory,
	RoomApiFactory,
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

const toRoomEntry = (room: RoomItemResponse): QuickNavEntry => ({
	id: `room:${room.id}`,
	kind: QuickNavKind.ROOM,
	title: room.name,
	icon: mdiAccountSupervisorCircleOutline,
	to: `/rooms/${room.id}`,
});

// course rooms share the /rooms/:id route; the client's RoomDetailsSwitch page picks the course view
const toCourseEntry = (course: CourseMetadataResponse): QuickNavEntry => ({
	id: `course:${course.id}`,
	kind: QuickNavKind.COURSE,
	title: course.title,
	icon: mdiSchoolOutline,
	to: `/rooms/${course.id}`,
});

// task details still live in the legacy client, so this is a full page load
const toTaskEntry = (task: TaskResponse): QuickNavEntry => ({
	id: `task:${task.id}`,
	kind: QuickNavKind.TASK,
	title: task.name,
	subtitle: task.courseName,
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
	const hasFailed = ref(false);

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

		const results = await Promise.allSettled([loadRoomsAndPeople(), loadCourses(), loadTasks()]);
		const failures = results.filter((result) => result.status === "rejected");

		hasFailed.value = failures.length > 0;
		failures.forEach((failure) => logger.error("Quick navigation could not load its entries", failure.reason));
		isLoading.value = false;
	};

	// runs on every open; the previous entries stay visible until the new ones arrive
	const load = (): Promise<void> => {
		pendingLoad ??= fetchAll().finally(() => {
			pendingLoad = undefined;
		});

		return pendingLoad;
	};

	return { rooms, courses, tasks, people, isLoading, hasFailed, load };
});
