import { useCopyFlow } from "./copy-flow.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import {
	expectNotification,
	mockApi,
	mockApiResponse,
	mockedPiniaStoreTyping,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { CopyApiResponseStatus, CopyApiResponseType } from "@api-server";
import { useLoadingStore, useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

let courseRoomsApi: Mocked<serverApi.CourseRoomsApiInterface>;
let taskApi: Mocked<serverApi.TaskApiInterface>;
let boardApi: Mocked<serverApi.BoardApiInterface>;
let roomApi: Mocked<serverApi.RoomApiInterface>;

let mockWithLoadingState: ReturnType<typeof vi.fn>;

const mountCopyFlowComposable = () =>
	mountComposable(() => useCopyFlow(), {
		global: {
			plugins: [createTestingI18n()],
		},
	});

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

		const loadingStore = mockedPiniaStoreTyping(useLoadingStore);
		mockWithLoadingState = vi.fn().mockImplementation(async (fn) => fn());
		vi.spyOn(loadingStore, "withLoadingState").mockImplementation(mockWithLoadingState);
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

	describe("executeCopyCourse", () => {
		describe("when the method is called", () => {
			const setup = () => mountCopyFlowComposable();

			it("should set the dialog to open", async () => {
				const { isDialogOpen, executeCopyCourse } = setup();
				executeCopyCourse("course-id");
				expect(isDialogOpen.value).toBe(true);
			});

			it("should set copyItemType based on the executed method", () => {
				const { copyItemType, executeCopyCourse } = setup();
				executeCopyCourse("course-id");
				expect(copyItemType.value).toBe(ContentItemTypeEnum.Course);
			});
		});

		describe("when copy is cancelled", () => {
			const setup = () => {
				const composable = mountCopyFlowComposable();
				const resultPromise = composable.executeCopyCourse("course-id");
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
					const response = mockApiResponse({
						data: {
							id: "new-course-id",
							type: CopyApiResponseType.COURSE,
							status: CopyApiResponseStatus.SUCCESS,
						},
					});
					courseRoomsApi.courseRoomsControllerCopyCourse.mockResolvedValue(response);
					const composable = mountCopyFlowComposable();
					const resultPromise = composable.executeCopyCourse("course-id");
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
					expect(mockWithLoadingState).toHaveBeenCalledOnce();
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
					const error = new Error("API Error");
					courseRoomsApi.courseRoomsControllerCopyCourse.mockRejectedValue(error);
					const composable = mountCopyFlowComposable();
					const resultPromise = composable.executeCopyCourse("course-id");
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
					expect(mockWithLoadingState).toHaveBeenCalledOnce();
				});

				it("should return the error", async () => {
					const { resultPromise, error } = setup();
					const { success, error: returnedError } = await resultPromise;
					expect(success).toBe(false);
					expect(returnedError).toBe(error);
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

	// describe("executeCopyTask", () => {
	// 	// Similar test structure as executeCopyCourse, but for tasks
	// });

	// describe("executeCopyLesson", () => {
	// 	// Similar test structure as executeCopyCourse, but for lessons
	// });

	// describe("executeCopyBoard", () => {
	// 	// Similar test structure as executeCopyCourse, but for boards
	// });

	// describe("executeCopyRoom", () => {
	// 	// Similar test structure as executeCopyCourse, but for rooms
	// });
});
