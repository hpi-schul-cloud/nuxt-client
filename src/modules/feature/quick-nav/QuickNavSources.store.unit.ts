import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavKind } from "./types";
import {
	courseMetadataResponseFactory,
	createTestAppStoreWithUser,
	mockApi,
	mockApiResponse,
	roomItemResponseFactory,
	taskResponseFactory,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import {
	CourseMetadataListResponse,
	CoursesApiInterface,
	RoomApiInterface,
	RoomItemResponse,
	RoomListResponse,
	RoomMemberListResponse,
	RoomMemberResponse,
	TaskApiInterface,
	TaskListResponse,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@util-logger");

const CURRENT_USER_ID = "me";

const member = (userId: string, firstName: string, lastName: string) =>
	({ userId, firstName, lastName }) as RoomMemberResponse;

const roomWithMembersVisible = (name: string, getRoomMembers = true): RoomItemResponse =>
	roomItemResponseFactory.build({
		name,
		allowedOperations: { getRoomMembers } as RoomItemResponse["allowedOperations"],
	});

describe("QuickNavSources Store", () => {
	let roomApiMock: Mocked<RoomApiInterface>;
	let courseApiMock: Mocked<CoursesApiInterface>;
	let taskApiMock: Mocked<TaskApiInterface>;

	const setup = (options: { rooms?: RoomItemResponse[] } = {}) => {
		const pinia = createTestingPinia({ stubActions: false });
		setActivePinia(pinia);
		createTestAppStoreWithUser(CURRENT_USER_ID, pinia);

		roomApiMock = mockApi<RoomApiInterface>();
		courseApiMock = mockApi<CoursesApiInterface>();
		taskApiMock = mockApi<TaskApiInterface>();
		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		vi.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(courseApiMock);
		vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(taskApiMock);

		roomApiMock.roomControllerGetRooms.mockResolvedValue(
			mockApiResponse<RoomListResponse>({ data: { data: options.rooms ?? [] } })
		);
		courseApiMock.courseControllerFindForUser.mockResolvedValue(
			mockApiResponse<CourseMetadataListResponse>({ data: { data: [], total: 0, skip: 0, limit: 99 } })
		);
		taskApiMock.taskControllerFindAll.mockResolvedValue(
			mockApiResponse<TaskListResponse>({ data: { data: [], total: 0, skip: 0, limit: 99 } })
		);

		return useQuickNavSourcesStore();
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("load", () => {
		it("turns rooms into entries that link to the room", async () => {
			const room = roomWithMembersVisible("Theater-AG", false);
			const store = setup({ rooms: [room] });

			await store.load();

			expect(store.rooms).toEqual([expect.objectContaining({ title: "Theater-AG", to: `/rooms/${room.id}` })]);
		});

		it("leaves out courses that have already ended", async () => {
			const store = setup();
			const running = courseMetadataResponseFactory.build({ title: "Biologie" });
			const ended = courseMetadataResponseFactory.build({ title: "Alt", untilDate: "2000-01-01T00:00:00.000Z" });
			courseApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({ data: { data: [running, ended], total: 2, skip: 0, limit: 99 } })
			);

			await store.load();

			expect(store.courses.map((entry) => entry.title)).toEqual(["Biologie"]);
		});

		it("loads every page of tasks", async () => {
			const store = setup();
			const firstPage = taskResponseFactory.buildList(99);
			const secondPage = taskResponseFactory.buildList(1);
			taskApiMock.taskControllerFindAll
				.mockResolvedValueOnce(
					mockApiResponse<TaskListResponse>({ data: { data: firstPage, total: 100, skip: 0, limit: 99 } })
				)
				.mockResolvedValueOnce(
					mockApiResponse<TaskListResponse>({ data: { data: secondPage, total: 100, skip: 99, limit: 99 } })
				);

			await store.load();

			expect(taskApiMock.taskControllerFindAll).toHaveBeenNthCalledWith(2, 99, 99);
			expect(store.tasks).toHaveLength(100);
			expect(store.tasks[0]).toEqual(
				expect.objectContaining({ kind: QuickNavKind.TASK, href: `/homework/${firstPage[0].id}` })
			);
		});

		it("finds people through the member lists of rooms, without the user themselves", async () => {
			const room = roomWithMembersVisible("Theater-AG");
			const store = setup({ rooms: [room] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(
				mockApiResponse<RoomMemberListResponse>({
					data: { data: [member(CURRENT_USER_ID, "Ich", "Selbst"), member("anna", "Anna", "Müller")] },
				})
			);

			await store.load();

			expect(store.people).toEqual([
				expect.objectContaining({ title: "Anna Müller", subtitle: "Theater-AG", to: `/rooms/${room.id}/members` }),
			]);
		});

		it("lists a person shared through several rooms only once", async () => {
			const store = setup({ rooms: [roomWithMembersVisible("A"), roomWithMembersVisible("B")] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(
				mockApiResponse<RoomMemberListResponse>({ data: { data: [member("anna", "Anna", "Müller")] } })
			);

			await store.load();

			expect(store.people).toHaveLength(1);
		});

		it("does not ask for members of rooms whose member list the user may not see", async () => {
			const store = setup({ rooms: [roomWithMembersVisible("Geheim", false)] });

			await store.load();

			expect(roomApiMock.roomControllerGetMembers).not.toHaveBeenCalled();
		});

		it("keeps the other results when one source fails", async () => {
			const store = setup({ rooms: [roomWithMembersVisible("Theater-AG", false)] });
			taskApiMock.taskControllerFindAll.mockRejectedValue(new Error("network"));

			await store.load();

			expect(store.hasFailed).toBe(true);
			expect(store.rooms).toHaveLength(1);
			expect(store.isLoading).toBe(false);
		});

		it("shares one request between calls that overlap", async () => {
			const store = setup();

			await Promise.all([store.load(), store.load()]);

			expect(roomApiMock.roomControllerGetRooms).toHaveBeenCalledTimes(1);
		});
	});

	describe("when loading again", () => {
		const roomsResponse = (rooms: RoomItemResponse[]) => mockApiResponse<RoomListResponse>({ data: { data: rooms } });

		const membersResponse = mockApiResponse<RoomMemberListResponse>({
			data: { data: [member("anna", "Anna", "Müller")] },
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("loads rooms, courses and tasks again every time", async () => {
			const store = setup();

			await store.load();
			await store.load();

			expect(roomApiMock.roomControllerGetRooms).toHaveBeenCalledTimes(2);
			expect(courseApiMock.courseControllerFindForUser).toHaveBeenCalledTimes(2);
			expect(taskApiMock.taskControllerFindAll).toHaveBeenCalledTimes(2);
		});

		it("does not ask for members again when no room changed its member count", async () => {
			const store = setup({ rooms: [roomWithMembersVisible("A"), roomWithMembersVisible("B")] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(membersResponse);

			await store.load();
			await store.load();

			expect(roomApiMock.roomControllerGetMembers).toHaveBeenCalledTimes(2);
			expect(store.people).toHaveLength(1);
		});

		it("asks only for the members of a room whose member count changed", async () => {
			const roomA = roomWithMembersVisible("A");
			const roomB = roomWithMembersVisible("B");
			const store = setup({ rooms: [roomA, roomB] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(membersResponse);
			await store.load();
			roomApiMock.roomControllerGetMembers.mockClear();

			roomApiMock.roomControllerGetRooms.mockResolvedValue(
				roomsResponse([roomA, { ...roomB, totalMembers: roomB.totalMembers + 1 }])
			);
			await store.load();

			expect(roomApiMock.roomControllerGetMembers).toHaveBeenCalledTimes(1);
			expect(roomApiMock.roomControllerGetMembers).toHaveBeenCalledWith(roomB.id);
		});

		it("asks for the members of a room that is new", async () => {
			const roomA = roomWithMembersVisible("A");
			const store = setup({ rooms: [roomA] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(membersResponse);
			await store.load();
			roomApiMock.roomControllerGetMembers.mockClear();

			const newRoom = roomWithMembersVisible("Chemie AG");
			roomApiMock.roomControllerGetRooms.mockResolvedValue(roomsResponse([roomA, newRoom]));
			await store.load();

			expect(roomApiMock.roomControllerGetMembers).toHaveBeenCalledTimes(1);
			expect(roomApiMock.roomControllerGetMembers).toHaveBeenCalledWith(newRoom.id);
			expect(store.rooms.map((entry) => entry.title)).toContain("Chemie AG");
		});

		it("asks for all members again once 30 minutes have passed", async () => {
			vi.useFakeTimers({ toFake: ["Date"] });
			vi.setSystemTime(new Date("2026-10-14T09:00:00Z"));
			const store = setup({ rooms: [roomWithMembersVisible("A"), roomWithMembersVisible("B")] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(membersResponse);
			await store.load();
			roomApiMock.roomControllerGetMembers.mockClear();

			vi.setSystemTime(new Date("2026-10-14T09:30:00Z"));
			await store.load();

			expect(roomApiMock.roomControllerGetMembers).toHaveBeenCalledTimes(2);
		});

		it("forgets the people of a room the user can no longer see", async () => {
			const store = setup({ rooms: [roomWithMembersVisible("A")] });
			roomApiMock.roomControllerGetMembers.mockResolvedValue(membersResponse);
			await store.load();

			roomApiMock.roomControllerGetRooms.mockResolvedValue(roomsResponse([]));
			await store.load();

			expect(store.people).toEqual([]);
		});
	});
});
