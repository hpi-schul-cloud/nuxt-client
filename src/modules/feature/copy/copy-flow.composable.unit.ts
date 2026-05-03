import { useCopyFlow } from "./copy-flow.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { expectNotification, mockApi, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { CopyApiResponse, CopyApiResponseStatus, CopyApiResponseType } from "@api-server";
import { useLoadingStore, useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

let courseRoomsApi: Mocked<serverApi.CourseRoomsApiInterface>;
let taskApi: Mocked<serverApi.TaskApiInterface>;
let boardApi: Mocked<serverApi.BoardApiInterface>;
let roomApi: Mocked<serverApi.RoomApiInterface>;

let withLoadingStateSpy: ReturnType<typeof vi.spyOn>;

type CopyResult =
	| { success: boolean; error: Error; result?: undefined }
	| { result: CopyApiResponse | undefined; success: boolean; error: Error | undefined };

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
					type: CopyApiResponseType.COURSE,
					status: CopyApiResponseStatus.SUCCESS,
				},
			});
			courseRoomsApi.courseRoomsControllerCopyCourse.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.Task: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-task-id",
					type: CopyApiResponseType.TASK,
					status: CopyApiResponseStatus.SUCCESS,
				},
			});
			taskApi.taskControllerCopyTask.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.Lesson: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-lesson-id",
					type: CopyApiResponseType.LESSON,
					status: CopyApiResponseStatus.SUCCESS,
				},
			});
			courseRoomsApi.courseRoomsControllerCopyLesson.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.ColumnBoard: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-board-id",
					type: CopyApiResponseType.BOARD,
					status: CopyApiResponseStatus.SUCCESS,
				},
			});
			boardApi.boardControllerCopyBoard.mockResolvedValue(response);
			return response;
		}
		case ContentItemTypeEnum.Room: {
			const response = mockApiResponse<CopyApiResponse>({
				data: {
					id: "new-room-id",
					type: CopyApiResponseType.ROOM,
					status: CopyApiResponseStatus.SUCCESS,
				},
			});
			roomApi.roomControllerCopyRoom.mockResolvedValue(response);
			return response;
		}
		default:
			throw new Error("Unknown type");
	}
};

function mockApiFailure(type: ContentItemTypeEnum, error: Error = new Error("API Error")) {
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
}

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

		withLoadingStateSpy = vi.spyOn(useLoadingStore(), "withLoadingState").mockImplementation(async (fn) => fn());
		vi.spyOn(logger, "error").mockImplementation(vi.fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("initial state", () => {
		const setup = () => mountCopyFlowComposable();

		it("should have the dialog closed", () => {
			const { isDialogOpen } = setup();
			expect(isDialogOpen.value).toBe(false);
		});

		it("should have the default copy item type set to course", () => {
			const { copyItemType } = setup();
			expect(copyItemType.value).toBe(ContentItemTypeEnum.Course);
		});
	});

	describe.for([
		{ name: "executeCopyCourse", type: ContentItemTypeEnum.Course },
		{ name: "executeCopyTask", type: ContentItemTypeEnum.Task },
		{ name: "executeCopyLesson", type: ContentItemTypeEnum.Lesson },
		{ name: "executeCopyBoard", type: ContentItemTypeEnum.ColumnBoard },
		{ name: "executeCopyRoom", type: ContentItemTypeEnum.Room },
	])("$name", ({ type }) => {
		describe("when the method is called", () => {
			const setup = () => mountCopyFlowComposable(type);

			it("should set the dialog to open", async () => {
				const { isDialogOpen, executeCopyMethod } = setup();
				executeCopyMethod();
				expect(isDialogOpen.value).toBe(true);
			});

			it("should set copyItemType based on the executed method", () => {
				const { copyItemType, executeCopyMethod } = setup();
				executeCopyMethod();
				expect(copyItemType.value).toBe(type);
			});
		});

		describe("when copy is cancelled", () => {
			const setup = () => {
				const composable = mountCopyFlowComposable(type);
				const resultPromise = composable.executeCopyMethod();
				composable.onCancel();
				return { ...composable, resultPromise };
			};

			it("should set the dialog to closed", async () => {
				const { isDialogOpen, resultPromise } = setup();
				await resultPromise;
				expect(isDialogOpen.value).toBe(false);
			});

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
					const composable = mountCopyFlowComposable(type);
					const resultPromise = composable.executeCopyMethod();
					composable.onConfirm(true);
					return { ...composable, resultPromise, response };
				};

				it("should set the dialog to closed", async () => {
					const { isDialogOpen, resultPromise } = setup();
					await resultPromise;
					expect(isDialogOpen.value).toBe(false);
				});

				it("should activate loading state during execution", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expect(withLoadingStateSpy).toHaveBeenCalledOnce();
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
					const composable = mountCopyFlowComposable(type);
					const resultPromise = composable.executeCopyMethod();
					composable.onConfirm(true);
					return { ...composable, resultPromise, error };
				};

				it("should set the dialog to closed", async () => {
					const { isDialogOpen, resultPromise } = setup();
					await resultPromise;
					expect(isDialogOpen.value).toBe(false);
				});

				it("should activate loading state during execution", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expect(withLoadingStateSpy).toHaveBeenCalledOnce();
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
		});
	});
});
