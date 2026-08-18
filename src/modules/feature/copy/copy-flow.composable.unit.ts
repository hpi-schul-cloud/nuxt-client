import { useCopyFlow } from "./copy-flow.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { expectNotification, mockApi, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { CopyApiResponse, CopyElementType, CopyStatusEnum } from "@api-server";
import { useNotificationStore } from "@data-app";
import * as featureDialog from "@feature-dialog";
import { createTestingPinia } from "@pinia/testing";
import { createAxiosError } from "@util-error-handling";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@feature-dialog", () => ({ openDialog: vi.fn(), withGlobalLoadingState: vi.fn() }));

let courseRoomsApi: Mocked<serverApi.CourseRoomsApiInterface>;
let taskApi: Mocked<serverApi.TaskApiInterface>;
let boardApi: Mocked<serverApi.BoardApiInterface>;
let roomApi: Mocked<serverApi.RoomApiInterface>;

type CopyResult = { result?: CopyApiResponse; success: boolean; error: Error | undefined };

const mountCopyFlowComposable = (type: ContentItemTypeEnum = ContentItemTypeEnum.Room) => {
	const composable = mountComposable(() => useCopyFlow(), {
		global: {
			plugins: [createTestingI18n()],
		},
	});

	const executeCopyMethod = (): Promise<CopyResult> => {
		switch (type) {
			case ContentItemTypeEnum.Course:
				return composable.executeCopyCourse("course-id");
			case ContentItemTypeEnum.Task:
				return composable.executeCopyTask("task-id", "target-course-id");
			case ContentItemTypeEnum.Lesson:
				return composable.executeCopyLesson("lesson-id", "target-course-id");
			case ContentItemTypeEnum.ColumnBoard:
				return composable.executeCopyBoard("board-id");
			case ContentItemTypeEnum.Room:
				return composable.executeCopyRoom("room-id");
			default:
				return Promise.reject(new Error("Unknown type"));
		}
	};

	return { ...composable, executeCopyMethod };
};

const mockApiSuccess = (type: ContentItemTypeEnum) => {
	switch (type) {
		case ContentItemTypeEnum.Course: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-course-id",
					type: CopyElementType.COURSE,
					status: CopyStatusEnum.SUCCESS,
				},
			});
			courseRoomsApi.courseRoomsControllerCopyCourse.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.Task: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-task-id",
					type: CopyElementType.TASK,
					status: CopyStatusEnum.SUCCESS,
				},
			});
			taskApi.taskControllerCopyTask.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.Lesson: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-lesson-id",
					type: CopyElementType.LESSON,
					status: CopyStatusEnum.SUCCESS,
				},
			});
			courseRoomsApi.courseRoomsControllerCopyLesson.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.ColumnBoard: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-board-id",
					type: CopyElementType.BOARD,
					status: CopyStatusEnum.SUCCESS,
				},
			});
			boardApi.boardControllerCopyBoard.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.Room: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-room-id",
					type: CopyElementType.ROOM,
					status: CopyStatusEnum.SUCCESS,
				},
			});
			roomApi.roomControllerCopyRoom.mockResolvedValue(response);
			return response;
		}
		default:
			throw new Error("Unknown type");
	}
};

const mockApiFailure = (type: ContentItemTypeEnum, error: Error = new Error("API Error")) => {
	switch (type) {
		case ContentItemTypeEnum.Course:
			courseRoomsApi.courseRoomsControllerCopyCourse.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.Task:
			taskApi.taskControllerCopyTask.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.Lesson:
			courseRoomsApi.courseRoomsControllerCopyLesson.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.ColumnBoard:
			boardApi.boardControllerCopyBoard.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.Room:
			roomApi.roomControllerCopyRoom.mockRejectedValue(error);
			break;
		default:
			throw new Error("Unknown type");
	}
	return error;
};

const mockApiTimeout = (type: ContentItemTypeEnum) => {
	const timeoutError = createAxiosError({
		statusCode: 504,
		statusText: "Gateway Timeout",
		message: "Gateway Timeout",
		data: {
			code: 504,
			type: "Gateway Timeout",
			title: "Gateway Timeout",
			message: "Gateway Timeout",
		},
	});

	switch (type) {
		case ContentItemTypeEnum.Course:
			courseRoomsApi.courseRoomsControllerCopyCourse.mockRejectedValue(timeoutError);
			break;
		case ContentItemTypeEnum.Task:
			taskApi.taskControllerCopyTask.mockRejectedValue(timeoutError);
			break;
		case ContentItemTypeEnum.Lesson:
			courseRoomsApi.courseRoomsControllerCopyLesson.mockRejectedValue(timeoutError);
			break;
		case ContentItemTypeEnum.ColumnBoard:
			boardApi.boardControllerCopyBoard.mockRejectedValue(timeoutError);
			break;
		case ContentItemTypeEnum.Room:
			roomApi.roomControllerCopyRoom.mockRejectedValue(timeoutError);
			break;
		default:
			throw new Error("Unknown type");
	}

	return timeoutError;
};

const mockApiErrorWithStatus = (type: ContentItemTypeEnum, statusCode: number, statusText: string) => {
	const error = createAxiosError({
		statusCode,
		statusText,
		message: statusText,
		data: {
			code: statusCode,
			type: statusText,
			title: statusText,
			message: statusText,
		},
	});

	switch (type) {
		case ContentItemTypeEnum.Course:
			courseRoomsApi.courseRoomsControllerCopyCourse.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.Task:
			taskApi.taskControllerCopyTask.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.Lesson:
			courseRoomsApi.courseRoomsControllerCopyLesson.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.ColumnBoard:
			boardApi.boardControllerCopyBoard.mockRejectedValue(error);
			break;
		case ContentItemTypeEnum.Room:
			roomApi.roomControllerCopyRoom.mockRejectedValue(error);
			break;
		default:
			throw new Error("Unknown type");
	}

	return error;
};

describe("useCopyFlow", () => {
	beforeEach(async () => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		courseRoomsApi = mockApi<serverApi.CourseRoomsApiInterface>();
		taskApi = mockApi<serverApi.TaskApiInterface>();
		boardApi = mockApi<serverApi.BoardApiInterface>();
		roomApi = mockApi<serverApi.RoomApiInterface>();

		vi.spyOn(serverApi, "CourseRoomsApiFactory").mockReturnValue(courseRoomsApi);
		vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(taskApi);
		vi.spyOn(serverApi, "BoardApiFactory").mockReturnValue(boardApi);
		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApi);

		vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: false, data: undefined });
		vi.mocked(featureDialog.withGlobalLoadingState).mockImplementation(async (fn: () => Promise<unknown>) => fn());
		vi.spyOn(logger, "error").mockImplementation(vi.fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe.for([
		{ name: "executeCopyCourse", type: ContentItemTypeEnum.Course },
		{ name: "executeCopyTask", type: ContentItemTypeEnum.Task },
		{ name: "executeCopyLesson", type: ContentItemTypeEnum.Lesson },
		{ name: "executeCopyBoard", type: ContentItemTypeEnum.ColumnBoard },
		{ name: "executeCopyRoom", type: ContentItemTypeEnum.Room },
	])("$name", ({ type }) => {
		describe("when the method is called", () => {
			it("should call openDialog with the correct copyItemType", () => {
				vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => undefined));
				const { executeCopyMethod } = mountCopyFlowComposable(type);
				executeCopyMethod();
				expect(featureDialog.openDialog).toHaveBeenCalledWith("copy", { copyItemType: type });
			});
		});

		describe("when copy is cancelled", () => {
			const setup = () => {
				const composable = mountCopyFlowComposable(type);
				const resultPromise = composable.executeCopyMethod();
				return { ...composable, resultPromise };
			};

			it("should return error", async () => {
				const { resultPromise } = setup();
				const outcome = await resultPromise;
				expect(outcome).toEqual({ success: false, error: new Error("Copy cancelled") });
			});
		});

		describe("when copy is confirmed", () => {
			describe("and the api call is successfull", () => {
				const setup = () => {
					const response = mockApiSuccess(type);
					vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: true, data: true });
					const composable = mountCopyFlowComposable(type);
					const resultPromise = composable.executeCopyMethod();
					return { ...composable, resultPromise, response };
				};

				it("should activate loading state during execution", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expect(featureDialog.withGlobalLoadingState).toHaveBeenCalledOnce();
				});

				it("should return the result", async () => {
					const { resultPromise, response } = setup();
					const { result, success } = await resultPromise;
					expect(success).toBe(true);
					expect(result).toEqual(response.data);
				});

				it("should show a success notification", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expectNotification("success");
				});
			});

			describe("and the api call fails", () => {
				const setup = () => {
					const error = mockApiFailure(type);
					vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: true, data: true });
					const composable = mountCopyFlowComposable(type);
					const resultPromise = composable.executeCopyMethod();
					return { ...composable, resultPromise, error };
				};

				it("should activate loading state during execution", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expect(featureDialog.withGlobalLoadingState).toHaveBeenCalledOnce();
				});

				it("should return the error", async () => {
					const { resultPromise, error } = setup();
					const { success, error: returnedError } = await resultPromise;
					expect(success).toBe(false);
					expect(returnedError).toBe(error);
				});

				it("should log the error", async () => {
					const { resultPromise, error } = setup();
					await resultPromise;
					expect(logger.error).toHaveBeenCalledWith(error);
				});

				it("should show an error notification", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expectNotification("error");
					expect(useNotificationStore().notify).not.toHaveBeenCalledWith(
						expect.objectContaining({ status: "success" })
					);
				});
			});

			describe("and the api call times out", () => {
				const setup = () => {
					const timeoutError = mockApiTimeout(type);
					vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: true, data: true });
					const composable = mountCopyFlowComposable(type);
					const resultPromise = composable.executeCopyMethod();
					return { ...composable, resultPromise, timeoutError };
				};

				it("should activate loading state during execution", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expect(featureDialog.withGlobalLoadingState).toHaveBeenCalledOnce();
				});

				it("should return a failed in-progress result", async () => {
					const { resultPromise } = setup();
					const { success, result, error } = await resultPromise;
					expect(success).toBe(false);
					expect(result).toBeUndefined();
					expect(error).toEqual(new Error("Copy is still in progress"));
				});

				it("should log the timeout error", async () => {
					const { resultPromise, timeoutError } = setup();
					await resultPromise;
					expect(logger.error).toHaveBeenCalledWith(timeoutError);
				});

				it("should show warning notification and no error notification", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expectNotification("warning");
					expect(useNotificationStore().notify).not.toHaveBeenCalledWith(expect.objectContaining({ status: "error" }));
					expect(useNotificationStore().notify).not.toHaveBeenCalledWith(
						expect.objectContaining({ status: "success" })
					);
				});
			});

			describe("and the api call fails with a non-timeout axios error", () => {
				const setup = () => {
					const apiError = mockApiErrorWithStatus(type, 500, "Internal Server Error");
					vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: true, data: true });
					const composable = mountCopyFlowComposable(type);
					const resultPromise = composable.executeCopyMethod();
					return { ...composable, resultPromise, apiError };
				};

				it("should return the original error", async () => {
					const { resultPromise, apiError } = setup();
					const { success, result, error } = await resultPromise;
					expect(success).toBe(false);
					expect(result).toBeUndefined();
					expect(error).toBe(apiError);
				});

				it("should log the error", async () => {
					const { resultPromise, apiError } = setup();
					await resultPromise;
					expect(logger.error).toHaveBeenCalledWith(apiError);
				});

				it("should show a generic error notification and no warning", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expectNotification("error");
					expect(useNotificationStore().notify).not.toHaveBeenCalledWith(
						expect.objectContaining({ status: "warninggg" })
					);
					expect(useNotificationStore().notify).not.toHaveBeenCalledWith(
						expect.objectContaining({ status: "success" })
					);
				});
			});
		});
	});
});
