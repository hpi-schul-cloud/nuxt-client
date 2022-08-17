import * as serverApi from "../serverApi/v3/api";
import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "../serverApi/v3/api";
import CopyModule, { CopyParams } from "./copy";

const serverDataPartial: CopyApiResponse = {
	title: "Aufgabe",
	type: CopyApiResponseTypeEnum.Task,
	status: CopyApiResponseStatusEnum.Partial,
	id: "123",
	elements: [
		{
			type: CopyApiResponseTypeEnum.SubmissionGroup,
			status: CopyApiResponseStatusEnum.NotDoing,
		},
		{
			type: CopyApiResponseTypeEnum.File,
			status: CopyApiResponseStatusEnum.NotImplemented,
		},
		{
			type: CopyApiResponseTypeEnum.LessonContentEtherpad,
			status: CopyApiResponseStatusEnum.Failure,
		},
	],
};

const serverDataSuccess: CopyApiResponse = {
	title: "Thema X",
	type: CopyApiResponseTypeEnum.Lesson,
	status: CopyApiResponseStatusEnum.Success,
	id: "123",
	elements: [
		{
			type: CopyApiResponseTypeEnum.SubmissionGroup,
			status: CopyApiResponseStatusEnum.NotDoing,
		},
		{
			type: CopyApiResponseTypeEnum.File,
			status: CopyApiResponseStatusEnum.NotImplemented,
		},
		{
			type: CopyApiResponseTypeEnum.LessonContentEtherpad,
			status: CopyApiResponseStatusEnum.Success,
		},
	],
};

describe("copy module", () => {
	describe("actions", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		const mockApi = {
			roomsControllerGetRoomBoard: jest.fn(),
			roomsControllerPatchElementVisibility: jest.fn(),
			roomsControllerPatchOrderingOfElements: jest.fn(),
		};

		describe("copy a task", () => {
			it("should make a 'POST' request to the backend", async () => {
				const taskMockApi = {
					taskControllerCopyTask: jest.fn(),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskMockApi as unknown as serverApi.TaskApiInterface
					);
				const copyModule = new CopyModule({});

				await copyModule.copy({
					id: "taskId",
					type: "task",
					courseId: "testCourseId",
				} as CopyParams);

				expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalled();
				expect(
					taskMockApi.taskControllerCopyTask.mock.calls[0][0]
				).toStrictEqual("taskId");
				expect(
					taskMockApi.taskControllerCopyTask.mock.calls[0][1]
				).toStrictEqual({
					courseId: "testCourseId",
				});
			});

			it("handle error", async () => {
				const error = {
					response: { status: 418, statusText: "This is an error" },
				};
				const taskMockApi = {
					taskControllerCopyTask: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskMockApi as unknown as serverApi.TaskApiInterface
					);
				const copyModule = new CopyModule({});
				await copyModule.copy({
					id: "taskId",
					type: "task",
					courseId: "testCourseId",
				});
				expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalled();
				expect(copyModule.getBusinessError!.message).toStrictEqual(
					error.response.statusText
				);
				expect(copyModule.getBusinessError!.statusCode).toStrictEqual(
					error.response.status
				);
			});
		});

		describe("copy a course", () => {
			it("should make a 'POST' request to the backend", async () => {
				const roomCopyMockApi = {
					roomsControllerCopyCourse: jest.fn(),
				};
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(
						roomCopyMockApi as unknown as serverApi.RoomsApiInterface
					);
				const copyModule = new CopyModule({});
				await copyModule.copy({
					id: "courseId-value",
					type: "course",
					courseId: "courseId-value",
				});
				expect(roomCopyMockApi.roomsControllerCopyCourse).toHaveBeenCalled();
				expect(
					roomCopyMockApi.roomsControllerCopyCourse.mock.calls[0][0]
				).toStrictEqual("courseId-value");
			});

			it("handle error", async () => {
				const error = {
					response: { status: 418, statusText: "This is an error" },
				};
				const roomCopyMockApi = {
					roomsControllerCopyCourse: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(
						roomCopyMockApi as unknown as serverApi.RoomsApiInterface
					);
				const copyModule = new CopyModule({});
				await copyModule.copy({
					id: "courseId-value",
					type: "course",
					courseId: "courseId-value",
				});
				expect(roomCopyMockApi.roomsControllerCopyCourse).toHaveBeenCalled();
				expect(copyModule.getBusinessError!.message).toStrictEqual(
					error.response.statusText
				);
				expect(copyModule.getBusinessError!.statusCode).toStrictEqual(
					error.response.status
				);
			});
		});

		describe("copy a lesson", () => {
			it("should make a 'POST' request to the backend", async () => {
				const roomCopyMockApi = {
					roomsControllerCopyLesson: jest.fn(),
				};
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(
						roomCopyMockApi as unknown as serverApi.RoomsApiInterface
					);
				const copyModule = new CopyModule({});
				await copyModule.copy({
					id: "testLessonId",
					type: "lesson",
					courseId: "testCourseId",
				});
				expect(roomCopyMockApi.roomsControllerCopyLesson).toHaveBeenCalled();
				expect(
					roomCopyMockApi.roomsControllerCopyLesson.mock.calls[0][0]
				).toStrictEqual("testLessonId");
				expect(
					roomCopyMockApi.roomsControllerCopyLesson.mock.calls[0][1]
				).toStrictEqual({
					courseId: "testCourseId",
				});
			});

			it("handle error", async () => {
				const error = {
					response: { status: 418, statusText: "This is an error" },
				};
				const roomCopyMockApi = {
					roomsControllerCopyLesson: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				jest
					.spyOn(serverApi, "RoomsApiFactory")
					.mockReturnValue(
						roomCopyMockApi as unknown as serverApi.RoomsApiInterface
					);
				const copyModule = new CopyModule({});
				await copyModule.copy({
					id: "testLessonId",
					type: "lesson",
					courseId: "testCourseId",
				});
				expect(roomCopyMockApi.roomsControllerCopyLesson).toHaveBeenCalled();
				expect(copyModule.getBusinessError!.message).toStrictEqual(
					error.response.statusText
				);
				expect(copyModule.getBusinessError!.statusCode).toStrictEqual(
					error.response.status
				);
			});
		});
	});

	describe("mutations", () => {
		describe("setLoading", () => {
			it("should set loading", () => {
				const copyModule = new CopyModule({});
				const loadingValue = true;
				expect(copyModule.getLoading).not.toBe(loadingValue);
				copyModule.setLoading(loadingValue);
				expect(copyModule.getLoading).toBe(loadingValue);
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const copyModule = new CopyModule({});
				const businessErrorData = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};
				expect(copyModule.getBusinessError).not.toBe(businessErrorData);
				copyModule.setBusinessError(businessErrorData);
				expect(copyModule.getBusinessError).toBe(businessErrorData);
			});

			it("should reset businessError", () => {
				const copyModule = new CopyModule({});
				copyModule.setBusinessError({
					statusCode: "400",
					message: "error",
					error: {},
				});
				copyModule.resetBusinessError();
				expect(copyModule.getBusinessError).toBeUndefined();
			});
		});

		describe("setCopyResult", () => {
			it("should set copyResult", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResult(serverDataPartial);
				expect(copyModule.getCopyResult).toStrictEqual(serverDataPartial);
			});

			it("should reset copyResult and filteredResult", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResult(serverDataPartial);
				expect(copyModule.getCopyResult).toStrictEqual(serverDataPartial);
				copyModule.reset();
				expect(copyModule.getCopyResult).toBeUndefined();
				expect(copyModule.getCopyResultFailedItems).toStrictEqual([]);
			});
		});

		describe("setCopyResultFailedItems", () => {
			it("should set filteredResult for failed task copy", () => {
				const serverData = {
					title: "Aufgabe",
					type: CopyApiResponseTypeEnum.Task,
					status: CopyApiResponseStatusEnum.Failure,
					id: "123",
					elements: [
						{
							type: CopyApiResponseTypeEnum.File,
							status: CopyApiResponseStatusEnum.Failure,
						},
					],
				};
				const expectedData = [
					{
						title: "Aufgabe",
						type: CopyApiResponseTypeEnum.Task,
						elementId: "123",
						url: "/homework/123/edit?returnUrl=rooms/testCourseId",
						elements: [
							{
								type: CopyApiResponseTypeEnum.File,
								title: "",
							},
						],
					},
				];
				const copyModule = new CopyModule({});
				copyModule.reset();
				copyModule.setCopyResultFailedItems({
					payload: serverData,
					courseId: "testCourseId",
				});
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			it("should set filteredResult for failed lesson copy", () => {
				const serverData = {
					title: "Thema",
					type: CopyApiResponseTypeEnum.Lesson,
					status: CopyApiResponseStatusEnum.Failure,
					id: "456",
					elements: [
						{
							type: CopyApiResponseTypeEnum.LessonContentText,
							status: CopyApiResponseStatusEnum.Failure,
						},
					],
				};
				const expectedData = [
					{
						title: "Thema",
						type: CopyApiResponseTypeEnum.Lesson,
						elementId: "456",
						url: "/courses/testCourseIdX/topics/456/edit?returnUrl=rooms/testCourseIdX",
						elements: [
							{
								title: "",
								type: CopyApiResponseTypeEnum.LessonContentText,
							},
						],
					},
				];
				const copyModule = new CopyModule({});
				copyModule.reset();
				copyModule.setCopyResultFailedItems({
					payload: serverData,
					courseId: "testCourseIdX",
				});
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			it("should set the state with all-success data", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems({
					payload: serverDataSuccess,
					courseId: "aCourseId",
				});
				expect(copyModule.getCopyResultFailedItems).toStrictEqual([]);
			});

			it("should set the state with filtering 'not-doing' elements", () => {
				const payload = {
					payload: {
						title: "test course",
						type: CopyApiResponseTypeEnum.Course,
						status: CopyApiResponseStatusEnum.Partial,
						id: "12345",
						elements: [
							{
								type: CopyApiResponseTypeEnum.Metadata,
								status: CopyApiResponseStatusEnum.Success,
							},
							{
								type: CopyApiResponseTypeEnum.UserGroup,
								status: CopyApiResponseStatusEnum.NotDoing,
							},
							{
								type: CopyApiResponseTypeEnum.FileGroup,
								status: CopyApiResponseStatusEnum.NotImplemented,
							},
						],
					},
					courseId: "aCourseId",
				};
				const expectedData = [
					{
						title: "test course",
						type: CopyApiResponseTypeEnum.Course,
						elementId: "12345",
						elements: [],
						url: "/courses/12345/edit",
					},
				];
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems(payload);
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});

			it("should set the state and change the statusses 'success'", () => {
				const payload = {
					payload: {
						title: "test course",
						type: CopyApiResponseTypeEnum.Course,
						status: CopyApiResponseStatusEnum.Partial,
						id: "12345",
						elements: [
							{
								type: CopyApiResponseTypeEnum.Metadata,
								status: CopyApiResponseStatusEnum.Success,
							},
							{
								type: CopyApiResponseTypeEnum.Board,
								status: CopyApiResponseStatusEnum.Partial,
								id: "345",
								elements: [
									{
										title: "Task 1",
										type: CopyApiResponseTypeEnum.Task,
										status: CopyApiResponseStatusEnum.Partial,
										id: "567",
										elements: [
											{
												type: CopyApiResponseTypeEnum.Metadata,
												status: CopyApiResponseStatusEnum.Success,
											},
											{
												type: CopyApiResponseTypeEnum.SubmissionGroup,
												status: CopyApiResponseStatusEnum.NotDoing,
											},
										],
									},
								],
							},
						],
					},
					courseId: "aCourseId",
				};
				const expectedData = [
					{
						title: "test course",
						type: CopyApiResponseTypeEnum.Course,
						elementId: "12345",
						elements: [],
						url: "/courses/12345/edit",
					},
					{
						elementId: "567",
						elements: [],
						title: "Task 1",
						type: CopyApiResponseTypeEnum.Task,
						url: "/homework/567/edit?returnUrl=rooms/aCourseId",
					},
				];
				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems(payload);
				expect(copyModule.getCopyResultFailedItems).toStrictEqual(expectedData);
			});
		});
	});

	describe("getters", () => {
		it("should have correct getters results", () => {
			const copyModule = new CopyModule({});
			copyModule.setCopyResult(serverDataPartial);
			expect(copyModule.getId).toBe("123");
			expect(copyModule.getTitle).toBe("Aufgabe");
		});
	});
});
