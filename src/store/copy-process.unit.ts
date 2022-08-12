import CopyModule, { CopyParams } from "./copy-process";
import * as serverApi from "../serverApi/v3/api";
import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "../serverApi/v3/api";

const StatusEnum = serverApi.CopyApiResponseStatusEnum;
const TypeEnum = serverApi.CopyApiResponseTypeEnum;

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
	title: "Aufgabe",
	type: CopyApiResponseTypeEnum.Task,
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
					courseId: "testCourseId",
					type: "task",
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
					type: "course",
					id: "courseId-value",
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
					type: "course",
					id: "courseId-value",
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
					courseId: "testCourseId",
					type: "lesson",
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
					courseId: "testCourseId",
					type: "lesson",
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
				expect(copyModule.getBusinessError!.statusCode).toStrictEqual("");
				expect(copyModule.getBusinessError!.message).toStrictEqual("");
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
				expect(copyModule.getCopyResult).toStrictEqual([]);
				expect(copyModule.getCopyResultFailedItems).toStrictEqual([]);
			});
		});

		describe("setFilteredResult", () => {
			it("should set filteredResult", () => {
				const expectedData = {
					title: "Aufgabe",
					type: TypeEnum.Task,
					status: StatusEnum.Success,
					id: "123",
					elements: [
						{
							type: TypeEnum.File,
							status: StatusEnum.NotImplemented,
						},
					],
				};

				const copyModule = new CopyModule({});
				copyModule.reset();
				copyModule.setCopyResultFailedItems({
					payload: serverDataPartial,
					courseId: "testCourseId",
				});

				expect(copyModule.getFilteredResult).toStrictEqual(expectedData);
				expect(copyModule.getIsSuccess).toBe(false);
			});

			it("should set the state with all-success data", () => {
				const expectedData = {
					title: "Aufgabe",
					type: TypeEnum.Task,
					status: StatusEnum.Success,
					id: "123",
					elements: [
						{
							type: TypeEnum.SubmissionGroup,
							status: StatusEnum.Success,
						},
						{
							type: TypeEnum.FileGroup,
							status: StatusEnum.Success,
						},
					],
				};

				const copyModule = new CopyModule({});
				copyModule.setFilteredResult(serverDataSuccess);

				expect(copyModule.getFilteredResult).toStrictEqual(expectedData);
				expect(copyModule.getIsSuccess).toBe(true);
			});

			it("should set the state with filtering 'not-doing' elements", () => {
				const payload = {
					title: "test course",
					type: "COURSE",
					status: "partial",
					id: "12345",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},

						{ type: "USER_GROUP", status: "not-doing" },
						{ type: "FILE_GROUP", status: "not-implemented" },
					],
				};
				const expectedData = {
					title: "test course",
					type: TypeEnum.Course,
					status: StatusEnum.Partial,
					id: "12345",
					elements: [
						{
							type: TypeEnum.Metadata,
							status: StatusEnum.Success,
						},
						{
							type: TypeEnum.FileGroup,
							status: StatusEnum.NotImplemented,
						},
					],
				};

				const copyModule = new CopyModule({});
				copyModule.setCopyResultFailedItems(payload);

				expect(copyModule.getFilteredResult).toStrictEqual(expectedData);
			});

			it("should set the state and change the statusses 'success'", () => {
				const payload = {
					title: "test course",
					type: "COURSE",
					status: "partial",
					id: "12345",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},

						{
							title: "board",
							type: "BOARD",
							status: "partial",
							id: "345",
							elements: [
								{
									title: "Task 1",
									type: "TASK",
									status: "partial",
									id: "567",
									elements: [
										{
											type: "METADATA",
											status: "success",
										},
										{
											type: "SUBMISSION_GROUP",
											status: "not-doing",
										},
									],
								},
							],
						},
					],
				};
				const expectedData = {
					title: "test course",
					type: TypeEnum.Course,
					status: StatusEnum.Success,
					id: "12345",
					elements: [
						{
							type: TypeEnum.Metadata,
							status: StatusEnum.Success,
						},
						{
							title: "board",
							type: TypeEnum.Board,
							status: StatusEnum.Success,
							id: "345",
							elements: [
								{
									title: "Task 1",
									type: TypeEnum.Task,
									status: StatusEnum.Success,
									id: "567",
									elements: [
										{
											type: TypeEnum.Metadata,
											status: StatusEnum.Success,
										},
									],
								},
							],
						},
					],
				};

				const copyModule = new CopyModule({});
				expect(copyModule.getIsSuccess).toBe(false);

				copyModule.setFilteredResult(payload);

				expect(copyModule.getFilteredResult).toStrictEqual(expectedData);
				expect(copyModule.getIsSuccess).toBe(true);
			});
		});
	});

	describe("getters", () => {
		it("should have correct getters results", () => {
			const copyModule = new CopyModule({});

			copyModule.setCopyResult(serverDataPartial);
			expect(copyModule.getIsSuccess).toBe(false);
			expect(copyModule.getId).toBe("123");
			expect(copyModule.getTitle).toBe("Aufgabe");
		});
	});
});
