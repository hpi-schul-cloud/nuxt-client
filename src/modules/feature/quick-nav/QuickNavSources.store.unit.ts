import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavKind } from "./types";
import {
	courseMetadataResponseFactory,
	createTestAppStoreWithUser,
	createTestEnvStore,
	createTestSchoolStore,
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
	RoomArchivedItemResponse,
	RoomArchivedListResponse,
	RoomColor,
	RoomItemResponse,
	RoomListResponse,
	TaskApiInterface,
	TaskListResponse,
	TaskResponse,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@util-logger");

const CURRENT_USER_ID = "me";
const OWN_SCHOOL_ID = "own-school";

const archivedRoom = (overrides: Partial<RoomArchivedItemResponse> = {}): RoomArchivedItemResponse => ({
	id: "archived-room",
	name: "Theater-AG 2023",
	totalMembers: 4,
	archivedAt: "2024-07-31T00:00:00.000Z",
	createdAt: "2023-08-01T00:00:00.000Z",
	updatedAt: "2024-07-31T00:00:00.000Z",
	schoolName: "Other school",
	...overrides,
});

describe("QuickNavSources Store", () => {
	let roomApiMock: Mocked<RoomApiInterface>;
	let courseApiMock: Mocked<CoursesApiInterface>;
	let taskApiMock: Mocked<TaskApiInterface>;

	const setup = (
		options: {
			rooms?: RoomItemResponse[];
			archivedRooms?: RoomArchivedItemResponse[];
			isArchiveEnabled?: boolean;
			/** false: the school details have not been loaded */
			hasSchool?: boolean;
		} = {}
	) => {
		const pinia = createTestingPinia({ stubActions: false });
		setActivePinia(pinia);
		createTestAppStoreWithUser(CURRENT_USER_ID, pinia);
		createTestEnvStore({ FEATURE_ROOM_ARCHIVE_ENABLED: options.isArchiveEnabled ?? false }, undefined, pinia);
		if (options.hasSchool !== false) createTestSchoolStore({ schoolDetails: { id: OWN_SCHOOL_ID }, pinia });

		roomApiMock = mockApi<RoomApiInterface>();
		courseApiMock = mockApi<CoursesApiInterface>();
		taskApiMock = mockApi<TaskApiInterface>();
		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		vi.spyOn(serverApi, "CoursesApiFactory").mockReturnValue(courseApiMock);
		vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(taskApiMock);

		roomApiMock.roomControllerGetRooms.mockResolvedValue(
			mockApiResponse<RoomListResponse>({ data: { data: options.rooms ?? [] } })
		);
		roomApiMock.roomControllerGetArchivedRooms.mockResolvedValue(
			mockApiResponse<RoomArchivedListResponse>({ data: { data: options.archivedRooms ?? [] } })
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

		describe("external rooms", () => {
			it("marks a room of another school as external, like the room overview", async () => {
				const store = setup({ rooms: [roomItemResponseFactory.build({ schoolId: "other-school" })] });

				await store.load();

				expect(store.rooms[0].isExternal).toBe(true);
			});

			it("does not mark a room of the user's own school", async () => {
				const store = setup({ rooms: [roomItemResponseFactory.build({ schoolId: OWN_SCHOOL_ID })] });

				await store.load();

				expect(store.rooms[0].isExternal).toBe(false);
			});

			it("marks no room as external while the user's school is not known", async () => {
				const store = setup({
					rooms: [roomItemResponseFactory.build({ schoolId: "other-school" })],
					hasSchool: false,
				});

				await store.load();

				expect(store.rooms[0].isExternal).toBe(false);
			});
		});

		describe("archived rooms", () => {
			it("marks a room of the room list that has been archived", async () => {
				const store = setup({
					rooms: [roomItemResponseFactory.build({ archivedAt: "2024-07-31T00:00:00.000Z" })],
				});

				await store.load();

				expect(store.rooms[0].isArchived).toBe(true);
			});

			it.each([
				["has no archive date", undefined],
				["was restored and has an empty archive date", null],
			])("does not mark a room that %s", async (_case, archivedAt) => {
				const store = setup({
					rooms: [roomItemResponseFactory.build({ archivedAt: archivedAt as string | undefined })],
				});

				await store.load();

				expect(store.rooms[0].isArchived).toBe(false);
			});

			describe("when the room archive is enabled", () => {
				const setupWithArchive = () =>
					setup({
						rooms: [roomItemResponseFactory.build({ name: "Theater-AG" })],
						archivedRooms: [archivedRoom()],
						isArchiveEnabled: true,
					});

				it("adds the archived rooms after the rooms in use, as the room list leaves them out", async () => {
					const store = setupWithArchive();

					await store.load();

					expect(store.rooms.map((room) => [room.title, room.isArchived])).toEqual([
						["Theater-AG", false],
						["Theater-AG 2023", true],
					]);
				});

				it("links an archived room to its room page, which shows it as archived", async () => {
					const store = setupWithArchive();

					await store.load();

					expect(store.rooms[1]).toEqual(
						expect.objectContaining({ id: "room:archived-room", kind: QuickNavKind.ROOM, to: "/rooms/archived-room" })
					);
				});

				it("shows an archived room with its members but with the icon, as the archive has no colour", async () => {
					const store = setupWithArchive();

					await store.load();

					expect(store.rooms[1].memberCount).toBe(4);
					expect(store.rooms[1].avatar).toBeUndefined();
				});

				it("does not call an archived room external, as the archive gives no school id to compare", async () => {
					const store = setupWithArchive();

					await store.load();

					expect(store.rooms[1].isExternal).toBeUndefined();
				});

				it("lists a room only once when it is in both lists, as the room in use", async () => {
					const room = roomItemResponseFactory.build({ id: "archived-room", color: RoomColor.BLUE });
					const store = setup({ rooms: [room], archivedRooms: [archivedRoom()], isArchiveEnabled: true });

					await store.load();

					expect(store.rooms).toHaveLength(1);
					expect(store.rooms[0].isArchived).toBe(false);
					expect(store.rooms[0].avatar).toBeDefined();
				});

				it("shows the rooms in use before the archived rooms have arrived", async () => {
					const store = setupWithArchive();
					let answerArchive: (response: ReturnType<typeof mockApiResponse<RoomArchivedListResponse>>) => void = () =>
						undefined;
					roomApiMock.roomControllerGetArchivedRooms.mockReturnValueOnce(
						new Promise((resolve) => {
							answerArchive = resolve;
						})
					);

					const loading = store.load();
					await flushPromises();

					expect(store.rooms.map((room) => room.title)).toEqual(["Theater-AG"]);
					expect(store.isLoading).toBe(false);

					answerArchive(mockApiResponse<RoomArchivedListResponse>({ data: { data: [archivedRoom()] } }));
					await loading;

					expect(store.rooms.map((room) => room.title)).toEqual(["Theater-AG", "Theater-AG 2023"]);
				});

				describe("when the rooms in use cannot be loaded but the archived rooms can", () => {
					const setupWithFailingRooms = async () => {
						const store = setupWithArchive();
						await store.load();
						roomApiMock.roomControllerGetRooms.mockRejectedValueOnce(new Error("offline"));

						await store.load();

						return store;
					};

					it("reports the rooms as missing", async () => {
						const store = await setupWithFailingRooms();

						expect(store.failedScopes).toContain("rooms");
					});

					it("keeps the rooms loaded before", async () => {
						const store = await setupWithFailingRooms();

						expect(store.rooms.map((room) => room.title)).toEqual(["Theater-AG", "Theater-AG 2023"]);
					});
				});

				it("keeps the archived rooms loaded before when they cannot be loaded again", async () => {
					const store = setupWithArchive();
					await store.load();
					roomApiMock.roomControllerGetArchivedRooms.mockRejectedValueOnce(new Error("offline"));

					await store.load();

					expect(store.rooms.map((room) => room.title)).toEqual(["Theater-AG", "Theater-AG 2023"]);
				});

				describe("when the archived rooms cannot be loaded", () => {
					const setupWithFailingArchive = async () => {
						const store = setupWithArchive();
						roomApiMock.roomControllerGetArchivedRooms.mockRejectedValueOnce(new Error("offline"));

						await store.load();

						return store;
					};

					it("still shows the rooms in use", async () => {
						const store = await setupWithFailingArchive();

						expect(store.rooms.map((room) => room.title)).toEqual(["Theater-AG"]);
					});

					it("does not report the rooms as missing", async () => {
						const store = await setupWithFailingArchive();

						expect(store.failedScopes).toEqual([]);
					});

					it("logs the error", async () => {
						await setupWithFailingArchive();

						expect(logger.error).toHaveBeenCalledWith(
							"Quick navigation could not load the archived rooms",
							expect.any(Error)
						);
					});
				});
			});

			it("does not ask for the archived rooms when the room archive is disabled", async () => {
				const store = setup({ isArchiveEnabled: false });

				await store.load();

				expect(roomApiMock.roomControllerGetArchivedRooms).not.toHaveBeenCalled();
			});
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
