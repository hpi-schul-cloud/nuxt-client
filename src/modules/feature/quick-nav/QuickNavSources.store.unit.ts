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
	CourseMetadataResponse,
	CoursesApiInterface,
	RoomApiInterface,
	RoomColor,
	RoomItemResponse,
	RoomListResponse,
	TaskApiInterface,
	TaskListResponse,
	TaskResponse,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@util-logger");

const CURRENT_USER_ID = "me";

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
			const room = roomItemResponseFactory.build({ name: "Theater-AG" });
			const store = setup({ rooms: [room] });

			await store.load();

			expect(store.rooms).toEqual([expect.objectContaining({ title: "Theater-AG", to: `/rooms/${room.id}` })]);
		});

		it("takes the number of members from the room list", async () => {
			const store = setup({ rooms: [roomItemResponseFactory.build({ totalMembers: 12 })] });

			await store.load();

			expect(store.rooms[0].memberCount).toBe(12);
		});

		it("does not ask for the member list of any room, as people are not searched", async () => {
			const store = setup({
				rooms: [roomItemResponseFactory.build({ allowedOperations: { getRoomMembers: true } })],
			});

			await store.load();

			expect(roomApiMock.roomControllerGetMembers).not.toHaveBeenCalled();
			expect(store).not.toHaveProperty("people");
		});

		it("shows a room with the letters and colour of its tile in the room overview", async () => {
			const room = roomItemResponseFactory.build({ name: "Theater-AG", color: RoomColor.BLUE });
			const store = setup({ rooms: [room] });

			await store.load();

			expect(store.rooms[0].avatar).toEqual({ initials: "Th", colorClass: "room-color--blue", isLight: false });
		});

		it.each([
			[RoomColor.YELLOW, true],
			[RoomColor.GREEN, false],
			[RoomColor.PINK, false],
		])(
			"writes the letters of a %s room in dark letters: %s, like the room overview except on yellow",
			async (color, isLight) => {
				const store = setup({ rooms: [roomItemResponseFactory.build({ color })] });

				await store.load();

				expect(store.rooms[0].avatar?.isLight).toBe(isLight);
			}
		);

		it.each([
			["#FFEE58", true],
			["#546E7A", false],
			["#fe5", true],
		])("shows a course in its colour %s, with dark letters: %s", async (displayColor, isLight) => {
			const store = setup();
			const course = courseMetadataResponseFactory.build({ shortTitle: "Bi", displayColor });
			courseApiMock.courseControllerFindForUser.mockResolvedValue(
				mockApiResponse<CourseMetadataListResponse>({ data: { data: [course], total: 1, skip: 0, limit: 99 } })
			);

			await store.load();

			expect(store.courses[0].avatar).toEqual({ initials: "Bi", color: displayColor, isLight });
		});

		describe("when a tile could not be read", () => {
			const loadCourse = async (overrides: Partial<CourseMetadataResponse>) => {
				const store = setup();
				const course = courseMetadataResponseFactory.build({ displayColor: "#546E7A", ...overrides });
				courseApiMock.courseControllerFindForUser.mockResolvedValue(
					mockApiResponse<CourseMetadataListResponse>({ data: { data: [course], total: 1, skip: 0, limit: 99 } })
				);
				await store.load();

				return store.courses[0];
			};

			it.each(["", "red", "rgb(0, 0, 0)", "#12345"])(
				"falls back to the icon for a course colour like %j",
				async (displayColor) => {
					expect((await loadCourse({ displayColor })).avatar).toBeUndefined();
				}
			);

			it("takes the letters from the title when the course has no short title", async () => {
				expect((await loadCourse({ shortTitle: "", title: "Chemie" })).avatar?.initials).toBe("Ch");
			});

			it("keeps at most two letters of a long short title", async () => {
				expect((await loadCourse({ shortTitle: "Bio-LK" })).avatar?.initials).toBe("Bi");
			});

			it("falls back to the icon for a room colour this client does not know", async () => {
				const store = setup({
					rooms: [roomItemResponseFactory.build({ color: "ultraviolet" as RoomColor })],
				});

				await store.load();

				expect(store.rooms[0].avatar).toBeUndefined();
			});

			it("falls back to the icon for a room without a name", async () => {
				const store = setup({ rooms: [roomItemResponseFactory.build({ name: "   " })] });

				await store.load();

				expect(store.rooms[0].avatar).toBeUndefined();
			});
		});

		it.each([
			["👩‍🔬 Labor", "👩‍🔬"],
			["🇩🇪 Deutsch", "🇩🇪"],
			["  Theater", "Th"],
		])("keeps the letters of %j whole", async (name, initials) => {
			const store = setup({ rooms: [roomItemResponseFactory.build({ name })] });

			await store.load();

			expect(store.rooms[0].avatar?.initials).toBe(initials);
		});

		describe("overdue tasks", () => {
			const loadTask = async (overrides: Partial<TaskResponse>) => {
				const store = setup();
				taskApiMock.taskControllerFindAll.mockResolvedValue(
					mockApiResponse<TaskListResponse>({
						data: { data: [taskResponseFactory.build(overrides)], total: 1, skip: 0, limit: 99 },
					})
				);
				await store.load();
				return store.tasks[0];
			};
			const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
			const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

			it("marks a task whose due date has passed", async () => {
				expect((await loadTask({ dueDate: yesterday })).isOverdue).toBe(true);
			});

			it("does not mark a task that is due later", async () => {
				expect((await loadTask({ dueDate: tomorrow })).isOverdue).toBe(false);
			});

			it("does not mark a task without a due date", async () => {
				expect((await loadTask({ dueDate: undefined })).isOverdue).toBe(false);
			});

			it("does not mark a finished task", async () => {
				const status = { ...taskResponseFactory.build().status, isFinished: true };
				expect((await loadTask({ dueDate: yesterday, status })).isOverdue).toBe(false);
			});
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

		describe("when the tasks span more than one page", () => {
			const setupWithTwoPages = async () => {
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

				return { store, firstPage };
			};

			it("asks for the next page", async () => {
				await setupWithTwoPages();

				expect(taskApiMock.taskControllerFindAll).toHaveBeenNthCalledWith(2, 99, 99);
			});

			it("keeps the tasks of every page", async () => {
				const { store } = await setupWithTwoPages();

				expect(store.tasks).toHaveLength(100);
			});

			it("links each task to its legacy page", async () => {
				const { store, firstPage } = await setupWithTwoPages();

				expect(store.tasks[0]).toEqual(
					expect.objectContaining({ kind: QuickNavKind.TASK, href: `/homework/${firstPage[0].id}` })
				);
			});
		});

		describe("when one source fails", () => {
			const setupWithFailingTasks = async () => {
				const store = setup({ rooms: [roomItemResponseFactory.build({ name: "Theater-AG" })] });
				taskApiMock.taskControllerFindAll.mockRejectedValue(new Error("network"));

				await store.load();

				return store;
			};

			it("reports which category is missing", async () => {
				const store = await setupWithFailingTasks();

				expect(store.failedScopes).toEqual(["tasks"]);
			});

			it("keeps the results of the other sources", async () => {
				const store = await setupWithFailingTasks();

				expect(store.rooms).toHaveLength(1);
			});

			it("stops loading", async () => {
				const store = await setupWithFailingTasks();

				expect(store.isLoading).toBe(false);
			});
		});

		it("reports the rooms as missing when they cannot be loaded", async () => {
			const store = setup();
			roomApiMock.roomControllerGetRooms.mockRejectedValueOnce(new Error("offline"));

			await store.load();

			expect(store.failedScopes).toEqual(["rooms"]);
		});

		it("shares one request between calls that overlap", async () => {
			const store = setup();

			await Promise.all([store.load(), store.load()]);

			expect(roomApiMock.roomControllerGetRooms).toHaveBeenCalledTimes(1);
		});
	});

	describe("when loading again", () => {
		it("loads rooms, courses and tasks again every time", async () => {
			const store = setup();

			await store.load();
			await store.load();

			expect(roomApiMock.roomControllerGetRooms).toHaveBeenCalledTimes(2);
			expect(courseApiMock.courseControllerFindForUser).toHaveBeenCalledTimes(2);
			expect(taskApiMock.taskControllerFindAll).toHaveBeenCalledTimes(2);
		});
	});
});
