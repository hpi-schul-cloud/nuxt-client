import { useCourseRoomDetailsStore } from "./course-room-details.store";
import * as apiUtils from "@/utils/api";
import { apiResponseErrorFactory, mockApi, mockApiResponse } from "@@/tests/test-utils";
import {
	BoardApiFactory,
	BoardElementResponseType,
	CourseRoomsApiFactory,
	CreateBoardBodyParams,
	LessonApiFactory,
	PatchOrderParams,
	SingleColumnBoardResponse,
	TaskApiFactory,
} from "@api-server";
import { logger } from "@util-logger";
import { createPinia, setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@api-server");

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();

	return {
		...actual,
		useI18n: () => ({
			t: (key: string) => key,
		}),
	};
});

vi.mock("@/utils/api", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/utils/api")>();

	return {
		...actual,
		$axios: {
			get: vi.fn(),
		},
	};
});

const mockedAxiosGet = vi.mocked(apiUtils.$axios.get);
let mapAxiosErrorToResponseErrorSpy: ReturnType<typeof vi.spyOn>;

const buildRoomData = (overrides: Partial<SingleColumnBoardResponse> = {}): SingleColumnBoardResponse => ({
	roomId: "room-1",
	title: "Test Room",
	displayColor: "#ffffff",
	elements: [],
	isArchived: false,
	isSynchronized: false,
	...overrides,
});

describe("useCourseRoomDetailsStore", () => {
	let courseRoomsApiMock: Mocked<ReturnType<typeof CourseRoomsApiFactory>>;
	let lessonApiMock: Mocked<ReturnType<typeof LessonApiFactory>>;
	let taskApiMock: Mocked<ReturnType<typeof TaskApiFactory>>;
	let boardApiMock: Mocked<ReturnType<typeof BoardApiFactory>>;

	beforeEach(() => {
		setActivePinia(createPinia());
		vi.spyOn(logger, "error").mockImplementation(vi.fn());

		courseRoomsApiMock = mockApi<ReturnType<typeof CourseRoomsApiFactory>>();
		lessonApiMock = mockApi<ReturnType<typeof LessonApiFactory>>();
		taskApiMock = mockApi<ReturnType<typeof TaskApiFactory>>();
		boardApiMock = mockApi<ReturnType<typeof BoardApiFactory>>();

		vi.mocked(CourseRoomsApiFactory).mockReturnValue(courseRoomsApiMock);
		vi.mocked(LessonApiFactory).mockReturnValue(lessonApiMock);
		vi.mocked(TaskApiFactory).mockReturnValue(taskApiMock);
		vi.mocked(BoardApiFactory).mockReturnValue(boardApiMock);
		mapAxiosErrorToResponseErrorSpy = vi.spyOn(apiUtils, "mapAxiosErrorToResponseError");
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = () => {
		const store = useCourseRoomDetailsStore();
		return { store };
	};

	describe("initial state", () => {
		it("should have correct default values", () => {
			const { store } = setup();

			expect(store.roomData.roomId).toBe("");
			expect(store.roomData.elements).toEqual([]);
			expect(store.isLocked).toBe(false);
			expect(store.scopePermissions).toEqual([]);
			expect(store.loading).toBe(false);
			expect(store.courseShareToken).toBe("");
		});
	});

	describe("computed properties", () => {
		describe("finishedLoading", () => {
			it("should return true when loading is false", () => {
				const { store } = setup();

				expect(store.finishedLoading).toBe(true);
			});

			it("should return false when loading is true", async () => {
				let resolvePromise: (value: unknown) => void;
				const pendingPromise = new Promise((resolve) => {
					resolvePromise = resolve;
				});
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockReturnValue(pendingPromise as never);

				const { store } = setup();
				const fetchPromise = store.fetchContent("room-1");

				expect(store.loading).toBe(true);
				expect(store.finishedLoading).toBe(false);

				resolvePromise!(mockApiResponse<SingleColumnBoardResponse>({ data: buildRoomData() }));
				await fetchPromise;

				expect(store.finishedLoading).toBe(true);
			});
		});

		describe("roomIsEmpty", () => {
			it("should return true when loading is finished and elements are empty", () => {
				const { store } = setup();

				expect(store.roomIsEmpty).toBe(true);
			});

			it("should return false when elements are present", async () => {
				const roomData = buildRoomData({ elements: [{ type: BoardElementResponseType.TASK, content: {} as never }] });
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
					mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
				);

				const { store } = setup();
				await store.fetchContent("room-1");

				expect(store.roomIsEmpty).toBe(false);
			});
		});

		describe("roomId", () => {
			it("should return roomId from roomData", async () => {
				const roomData = buildRoomData({ roomId: "test-room-id" });
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
					mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
				);

				const { store } = setup();
				await store.fetchContent("test-room-id");

				expect(store.roomId).toBe("test-room-id");
			});
		});
	});

	describe("fetchCourse", () => {
		it("should return course data on success", async () => {
			const courseData = { id: "course-1", name: "Test Course" };
			mockedAxiosGet.mockResolvedValue(mockApiResponse({ data: courseData }));

			const { store } = setup();
			const result = await store.fetchCourse("course-1");

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/courses/course-1");
			expect(result).toEqual(courseData);
		});

		it("should return null when the request fails", async () => {
			mockedAxiosGet.mockRejectedValue(new Error("Network error"));

			const { store } = setup();
			const result = await store.fetchCourse("course-1");

			expect(result).toBeNull();
		});
	});

	describe("fetchContent", () => {
		it("should set loading to true during fetch and false after", async () => {
			const roomData = buildRoomData();
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			const fetchPromise = store.fetchContent("room-1");
			expect(store.loading).toBe(true);

			await fetchPromise;
			expect(store.loading).toBe(false);
		});

		it("should update roomData on successful fetch", async () => {
			const roomData = buildRoomData({ roomId: "room-1", title: "My Course" });
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			await store.fetchContent("room-1");

			expect(store.roomData.title).toBe("My Course");
			expect(store.roomData.roomId).toBe("room-1");
		});

		it("should reset isLocked to false on fetch start", async () => {
			const roomData = buildRoomData();
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			await store.fetchContent("room-1");

			expect(store.isLocked).toBe(false);
		});

		describe("when the course is locked", () => {
			it("should set isLocked to true when API error type is LOCKED_COURSE", async () => {
				const error = Object.assign(new Error("access denied"), {
					isAxiosError: true,
					response: {
						data: apiResponseErrorFactory.build({
							type: "LOCKED_COURSE",
						}),
					},
				});
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockRejectedValue(error);

				const { store } = setup();
				await store.fetchContent("room-1");

				expect(store.isLocked).toBe(true);
				expect(store.roomData.title).toBe("");
			});
		});

		describe("when the fetch fails with a non-locked error", () => {
			it("should leave the room unlocked when API error type is not LOCKED_COURSE", async () => {
				const error = Object.assign(new Error("fetch failed"), {
					isAxiosError: true,
					response: {
						data: apiResponseErrorFactory.build({
							type: "UNKNOWN_ERROR",
						}),
					},
				});
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockRejectedValue(error);

				const { store } = setup();
				await store.fetchContent("room-1");

				expect(store.isLocked).toBe(false);
				expect(store.roomData.title).toBe("");
			});

			it("should leave the room unlocked when error has no message property", async () => {
				const error = { code: 500 };
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockRejectedValue(error);

				const { store } = setup();
				await store.fetchContent("room-1");

				expect(store.isLocked).toBe(false);
				expect(store.roomData.title).toBe("");
			});

			it("should not modify roomData elements when fetch fails", async () => {
				const existingElements = [{ type: BoardElementResponseType.TASK, content: {} as never }];
				const initialRoomData = buildRoomData({ elements: existingElements });
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard
					.mockResolvedValueOnce(mockApiResponse<SingleColumnBoardResponse>({ data: initialRoomData }))
					.mockRejectedValueOnce(new Error("Network error"));

				const { store } = setup();
				await store.fetchContent("room-1");
				expect(store.roomData.elements).toHaveLength(1);

				await store.fetchContent("room-1");
				expect(store.roomData.elements).toHaveLength(1);
			});
		});
	});

	describe("publishCard", () => {
		it("should call patchElementVisibility with correct parameters", async () => {
			const { store } = setup();
			store.roomData.roomId = "room-1";

			await store.publishCard("element-1", true);

			expect(courseRoomsApiMock.courseRoomsControllerPatchElementVisibility).toHaveBeenCalledWith(
				"room-1",
				"element-1",
				{ visibility: true }
			);
		});

		it("should call fetchContent after successful patch", async () => {
			const roomData = buildRoomData({ roomId: "room-1" });
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			store.roomData.roomId = "room-1";
			await store.publishCard("element-1", true);

			expect(courseRoomsApiMock.courseRoomsControllerGetRoomBoard).toHaveBeenCalledWith("room-1");
		});

		it("should not call fetchContent when the patch fails", async () => {
			courseRoomsApiMock.courseRoomsControllerPatchElementVisibility.mockRejectedValue(new Error("Patch failed"));

			const { store } = setup();
			store.roomData.roomId = "room-1";
			await store.publishCard("element-1", false);

			expect(courseRoomsApiMock.courseRoomsControllerGetRoomBoard).not.toHaveBeenCalled();
		});

		it("should set loading to false after completion", async () => {
			const { store } = setup();
			await store.publishCard("element-1", true);

			expect(store.loading).toBe(false);
		});
	});

	describe("sortElements", () => {
		const params: PatchOrderParams = { elements: ["element-1"] };

		it("should call patchOrderingOfElements with correct parameters", async () => {
			const roomData = buildRoomData({ roomId: "room-1" });
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			store.roomData.roomId = "room-1";
			await store.sortElements(params);

			expect(courseRoomsApiMock.courseRoomsControllerPatchOrderingOfElements).toHaveBeenCalledWith("room-1", params);
			expect(courseRoomsApiMock.courseRoomsControllerGetRoomBoard).toHaveBeenCalled();
		});

		describe("when the sort fails", () => {
			it("should map the axios error", async () => {
				courseRoomsApiMock.courseRoomsControllerPatchOrderingOfElements.mockRejectedValue(new Error("Sort failed"));

				const { store } = setup();
				await store.sortElements(params);

				expect(mapAxiosErrorToResponseErrorSpy).toHaveBeenCalled();
			});
		});
	});

	describe("deleteLesson", () => {
		it("should call lessonControllerDelete with correct lessonId", async () => {
			const { store } = setup();
			await store.deleteLesson("lesson-1");

			expect(lessonApiMock.lessonControllerDelete).toHaveBeenCalledWith("lesson-1");
		});

		describe("when the deletion fails", () => {
			it("should map the axios error", async () => {
				lessonApiMock.lessonControllerDelete.mockRejectedValue(new Error("Not found"));

				const { store } = setup();
				await store.deleteLesson("lesson-1");

				expect(mapAxiosErrorToResponseErrorSpy).toHaveBeenCalled();
			});
		});
	});

	describe("deleteTask", () => {
		it("should call taskControllerDelete with correct taskId", async () => {
			const { store } = setup();
			await store.deleteTask("task-1");

			expect(taskApiMock.taskControllerDelete).toHaveBeenCalledWith("task-1");
		});

		describe("when the deletion fails", () => {
			it("should map the axios error", async () => {
				taskApiMock.taskControllerDelete.mockRejectedValue(new Error("Not found"));

				const { store } = setup();
				await store.deleteTask("task-1");

				expect(mapAxiosErrorToResponseErrorSpy).toHaveBeenCalled();
			});
		});
	});

	describe("deleteBoard", () => {
		it("should call boardControllerDeleteBoard with correct boardId", async () => {
			const { store } = setup();
			await store.deleteBoard("board-1");

			expect(boardApiMock.boardControllerDeleteBoard).toHaveBeenCalledWith("board-1");
		});

		describe("when the deletion fails", () => {
			it("should map the axios error", async () => {
				boardApiMock.boardControllerDeleteBoard.mockRejectedValue(new Error("Not found"));

				const { store } = setup();
				await store.deleteBoard("board-1");

				expect(mapAxiosErrorToResponseErrorSpy).toHaveBeenCalled();
			});
		});
	});

	describe("createBoard", () => {
		const params: CreateBoardBodyParams = {
			title: "New Board",
			parentId: "room-1",
			parentType: "course" as never,
			layout: "columns" as never,
		};

		it("should call boardControllerCreateBoard with correct params", async () => {
			const { store } = setup();
			await store.createBoard(params);

			expect(boardApiMock.boardControllerCreateBoard).toHaveBeenCalledWith(params);
		});

		it("should return the created board data on success", async () => {
			const boardResponse = { id: "new-board-1" };
			boardApiMock.boardControllerCreateBoard.mockResolvedValue(mockApiResponse({ data: boardResponse }));

			const { store } = setup();
			const result = await store.createBoard(params);

			expect(result).toEqual(boardResponse);
		});

		describe("when creation fails", () => {
			it("should return undefined and map the axios error", async () => {
				boardApiMock.boardControllerCreateBoard.mockRejectedValue(new Error("Creation failed"));

				const { store } = setup();
				const result = await store.createBoard(params);

				expect(result).toBeUndefined();
				expect(mapAxiosErrorToResponseErrorSpy).toHaveBeenCalled();
			});
		});
	});

	describe("finishTask", () => {
		it("should call taskControllerFinish when action is 'finish'", async () => {
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: buildRoomData() })
			);

			const { store } = setup();
			await store.finishTask("task-1", "finish");

			expect(taskApiMock.taskControllerFinish).toHaveBeenCalledWith("task-1");
			expect(taskApiMock.taskControllerRestore).not.toHaveBeenCalled();
		});

		it("should call taskControllerRestore when action is 'restore'", async () => {
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: buildRoomData() })
			);

			const { store } = setup();
			await store.finishTask("task-1", "restore");

			expect(taskApiMock.taskControllerRestore).toHaveBeenCalledWith("task-1");
			expect(taskApiMock.taskControllerFinish).not.toHaveBeenCalled();
		});

		it("should call fetchContent after a successful action", async () => {
			const roomData = buildRoomData({ roomId: "room-1" });
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			store.roomData.roomId = "room-1";
			await store.finishTask("task-1", "finish");

			expect(courseRoomsApiMock.courseRoomsControllerGetRoomBoard).toHaveBeenCalledWith("room-1");
		});

		describe("when the action fails", () => {
			it("should map the axios error", async () => {
				taskApiMock.taskControllerFinish.mockRejectedValue(new Error("Finish failed"));

				const { store } = setup();
				await store.finishTask("task-1", "finish");

				expect(mapAxiosErrorToResponseErrorSpy).toHaveBeenCalled();
			});
		});
	});

	describe("fetchScopePermission", () => {
		it("should set scopePermissions for the given userId", async () => {
			const permissions = ["COURSE_VIEW", "COURSE_EDIT"];
			mockedAxiosGet.mockResolvedValue(mockApiResponse({ data: { "user-1": permissions } }));

			const { store } = setup();
			await store.fetchScopePermission("course-1", "user-1");

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v3/courses/course-1/user-permissions");
			expect(store.scopePermissions).toEqual(permissions);
		});

		it("should not update scopePermissions when userId is not found in response", async () => {
			mockedAxiosGet.mockResolvedValue(mockApiResponse({ data: { "other-user": ["COURSE_VIEW"] } }));

			const { store } = setup();
			await store.fetchScopePermission("course-1", "user-1");

			expect(store.scopePermissions).toEqual([]);
		});

		it("should not update scopePermissions when the request fails", async () => {
			mockedAxiosGet.mockRejectedValue(new Error("Forbidden"));

			const { store } = setup();
			await store.fetchScopePermission("course-1", "user-1");

			expect(store.scopePermissions).toEqual([]);
		});
	});
});
