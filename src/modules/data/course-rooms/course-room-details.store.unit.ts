import { useCourseRoomDetailsStore } from "./course-room-details.store";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
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

vi.mock("@/utils/api", () => ({
	$axios: {
		get: vi.fn(),
	},
	mapAxiosErrorToResponseError: vi.fn(),
	initializeAxios: vi.fn(),
}));

const mockedAxiosGet = vi.mocked($axios.get);
const mockedMapAxiosErrorToResponseError = vi.mocked(mapAxiosErrorToResponseError);

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
			expect(store.error).toBeNull();
			expect(store.businessError.statusCode).toBe("");
			expect(store.businessError.message).toBe("");
			expect(store.courseShareToken).toBe("");
		});
	});

	describe("computed properties", () => {
		describe("finishedLoading", () => {
			it("should return true when loading is false", () => {
				const { store } = setup();

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
			it("should set isLocked to true and update title", async () => {
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockRejectedValue(
					new Error("LOCKED_COURSE: access denied")
				);

				const { store } = setup();
				await store.fetchContent("room-1");

				expect(store.isLocked).toBe(true);
				expect(store.roomData.title).toBe("LOCKED_COURSE: access denied");
			});
		});

		describe("when the fetch fails with a non-locked error", () => {
			it("should set the error state", async () => {
				const error = new Error("Unexpected error");
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockRejectedValue(error);

				const { store } = setup();
				await store.fetchContent("room-1");

				expect(store.error).toBe(error);
				expect(store.isLocked).toBe(false);
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
		});

		it("should call fetchContent after successful sort", async () => {
			const roomData = buildRoomData({ roomId: "room-1" });
			courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
				mockApiResponse<SingleColumnBoardResponse>({ data: roomData })
			);

			const { store } = setup();
			store.roomData.roomId = "room-1";
			await store.sortElements(params);

			expect(courseRoomsApiMock.courseRoomsControllerGetRoomBoard).toHaveBeenCalledWith("room-1");
		});

		describe("when the sort fails", () => {
			it("should set businessError", async () => {
				const apiError = apiResponseErrorFactory.build({ code: 500, message: "Sort failed" });
				mockedMapAxiosErrorToResponseError.mockReturnValue(apiError);
				courseRoomsApiMock.courseRoomsControllerPatchOrderingOfElements.mockRejectedValue(new Error("Sort failed"));

				const { store } = setup();
				await store.sortElements(params);

				expect(store.businessError.message).toBe("Sort failed");
				expect(store.businessError.statusCode).toBe(500);
			});

			it("should reset businessError before calling the API", async () => {
				const { store } = setup();
				store.businessError.message = "previous error";

				courseRoomsApiMock.courseRoomsControllerPatchOrderingOfElements.mockResolvedValue(
					mockApiResponse<void>({ data: undefined })
				);
				courseRoomsApiMock.courseRoomsControllerGetRoomBoard.mockResolvedValue(
					mockApiResponse<SingleColumnBoardResponse>({ data: buildRoomData() })
				);

				await store.sortElements(params);

				expect(store.businessError.message).toBe("");
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
			it("should set businessError", async () => {
				const apiError = apiResponseErrorFactory.build({ code: 404, message: "Lesson not found" });
				mockedMapAxiosErrorToResponseError.mockReturnValue(apiError);
				lessonApiMock.lessonControllerDelete.mockRejectedValue(new Error("Not found"));

				const { store } = setup();
				await store.deleteLesson("lesson-1");

				expect(store.businessError.message).toBe("Lesson not found");
				expect(store.businessError.statusCode).toBe(404);
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
			it("should set businessError", async () => {
				const apiError = apiResponseErrorFactory.build({ code: 404, message: "Task not found" });
				mockedMapAxiosErrorToResponseError.mockReturnValue(apiError);
				taskApiMock.taskControllerDelete.mockRejectedValue(new Error("Not found"));

				const { store } = setup();
				await store.deleteTask("task-1");

				expect(store.businessError.message).toBe("Task not found");
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
			it("should set businessError", async () => {
				const apiError = apiResponseErrorFactory.build({ code: 404, message: "Board not found" });
				mockedMapAxiosErrorToResponseError.mockReturnValue(apiError);
				boardApiMock.boardControllerDeleteBoard.mockRejectedValue(new Error("Not found"));

				const { store } = setup();
				await store.deleteBoard("board-1");

				expect(store.businessError.message).toBe("Board not found");
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
			it("should set businessError and return undefined", async () => {
				const apiError = apiResponseErrorFactory.build({ code: 500, message: "Creation failed" });
				mockedMapAxiosErrorToResponseError.mockReturnValue(apiError);
				boardApiMock.boardControllerCreateBoard.mockRejectedValue(new Error("Creation failed"));

				const { store } = setup();
				const result = await store.createBoard(params);

				expect(result).toBeUndefined();
				expect(store.businessError.message).toBe("Creation failed");
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
			it("should set businessError", async () => {
				const apiError = apiResponseErrorFactory.build({ code: 500, message: "Finish failed" });
				mockedMapAxiosErrorToResponseError.mockReturnValue(apiError);
				taskApiMock.taskControllerFinish.mockRejectedValue(new Error("Finish failed"));

				const { store } = setup();
				await store.finishTask("task-1", "finish");

				expect(store.businessError.message).toBe("Finish failed");
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
