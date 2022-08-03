import CopyModule, { CopyParams } from "./copy-process";
import * as serverApi from "../serverApi/v3/api";

const StatusEnum = serverApi.CopyApiResponseStatusEnum;
const TypeEnum = serverApi.CopyApiResponseTypeEnum;

const serverData = {
	title: "Aufgabe",
	type: "TASK",
	status: "success",
	id: "123",
	elements: [
		{
			type: "SUBMISSION_GROUP",
			status: "not-doing",
		},
		{
			type: "FILE",
			status: "not-implemented",
		},
	],
};

const serverSuccessData = {
	title: "Aufgabe",
	type: "TASK",
	status: "success",
	id: "123",
	elements: [
		{
			type: "SUBMISSION_GROUP",
			status: "success",
		},
		{
			type: "FILE_GROUP",
			status: "success",
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

		describe("copyTask", () => {
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

				await copyModule.copyTask({
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

				await copyModule.copyTask({
					id: "taskId",
					courseId: "testCourseId",
				} as CopyParams);

				expect(taskMockApi.taskControllerCopyTask).toHaveBeenCalled();
				expect(copyModule.getError).toStrictEqual({ ...error });
				expect(copyModule.getBusinessError.message).toStrictEqual(
					error.response.statusText
				);
				expect(copyModule.getBusinessError.statusCode).toStrictEqual(
					error.response.status
				);
			});
		});

		describe("copyRoom", () => {
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

				await copyModule.copyRoom("54321");

				expect(roomCopyMockApi.roomsControllerCopyCourse).toHaveBeenCalled();
				expect(
					roomCopyMockApi.roomsControllerCopyCourse.mock.calls[0][0]
				).toStrictEqual("54321");
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

				await copyModule.copyRoom("54321");

				expect(roomCopyMockApi.roomsControllerCopyCourse).toHaveBeenCalled();
				expect(copyModule.getError).toStrictEqual({ ...error });
				expect(copyModule.getBusinessError.message).toStrictEqual(
					error.response.statusText
				);
				expect(copyModule.getBusinessError.statusCode).toStrictEqual(
					error.response.status
				);
			});
		});

		describe("copyLesson", () => {
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

				await copyModule.copyLesson({
					id: "lessonId",
					courseId: "testCourseId",
				} as CopyParams);

				expect(roomCopyMockApi.roomsControllerCopyLesson).toHaveBeenCalled();
				expect(
					roomCopyMockApi.roomsControllerCopyLesson.mock.calls[0][0]
				).toStrictEqual("lessonId");
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

				await copyModule.copyLesson({
					id: "lessonId",
					courseId: "testCourseId",
				} as CopyParams);

				expect(roomCopyMockApi.roomsControllerCopyLesson).toHaveBeenCalled();
				expect(copyModule.getError).toStrictEqual({ ...error });
				expect(copyModule.getBusinessError.message).toStrictEqual(
					error.response.statusText
				);
				expect(copyModule.getBusinessError.statusCode).toStrictEqual(
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

		describe("setError", () => {
			it("should set error", () => {
				const copyModule = new CopyModule({});
				const errorData = { message: "some error" };
				expect(copyModule.getError).not.toBe(errorData);
				copyModule.setError(errorData);
				expect(copyModule.getError).toBe(errorData);
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
				expect(copyModule.getBusinessError.statusCode).toStrictEqual("");
				expect(copyModule.getBusinessError.message).toStrictEqual("");
			});
		});

		describe("setCopyResult", () => {
			it("should set copyResult", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResult(serverData);

				expect(copyModule.getCopyResult).toStrictEqual(serverData);
			});

			it("should reset copyResult and filteredResult", () => {
				const copyModule = new CopyModule({});
				copyModule.setCopyResult(serverData);

				expect(copyModule.getCopyResult).toStrictEqual(serverData);

				const emptyData = {
					id: "",
					title: "",
					type: TypeEnum.BOARD,
					status: StatusEnum.Success,
				};

				copyModule.resetCopyResult();
				expect(copyModule.getCopyResult).toStrictEqual(emptyData);
				expect(copyModule.getFilteredResult).toStrictEqual(emptyData);
			});
		});

		describe("setFilteredResult", () => {
			it("should set filteredResult", () => {
				const expectedData = {
					title: "Aufgabe",
					type: TypeEnum.TASK,
					status: StatusEnum.Success,
					id: "123",
					elements: [
						{
							type: TypeEnum.FILE,
							status: StatusEnum.NotImplemented,
						},
					],
				};

				const copyModule = new CopyModule({});
				copyModule.resetCopyResult();
				copyModule.setFilteredResult(serverData);

				expect(copyModule.getFilteredResult).toStrictEqual(expectedData);
				expect(copyModule.getIsSuccess).toBe(false);
			});

			it("should set the state with all-success data", () => {
				const expectedData = {
					title: "Aufgabe",
					type: TypeEnum.TASK,
					status: StatusEnum.Success,
					id: "123",
					elements: [
						{
							type: TypeEnum.SUBMISSION_GROUP,
							status: StatusEnum.Success,
						},
						{
							type: TypeEnum.FILE_GROUP,
							status: StatusEnum.Success,
						},
					],
				};

				const copyModule = new CopyModule({});
				copyModule.setFilteredResult(serverSuccessData);

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
					type: TypeEnum.COURSE,
					status: StatusEnum.Partial,
					id: "12345",
					elements: [
						{
							type: TypeEnum.METADATA,
							status: StatusEnum.Success,
						},
						{
							type: TypeEnum.FILE_GROUP,
							status: StatusEnum.NotImplemented,
						},
					],
				};

				const copyModule = new CopyModule({});
				copyModule.setFilteredResult(payload);

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
					type: TypeEnum.COURSE,
					status: StatusEnum.Success,
					id: "12345",
					elements: [
						{
							type: TypeEnum.METADATA,
							status: StatusEnum.Success,
						},
						{
							title: "board",
							type: TypeEnum.BOARD,
							status: StatusEnum.Success,
							id: "345",
							elements: [
								{
									title: "Task 1",
									type: TypeEnum.TASK,
									status: StatusEnum.Success,
									id: "567",
									elements: [
										{
											type: TypeEnum.METADATA,
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

			copyModule.setCopyResult(serverData);
			expect(copyModule.getIsSuccess).toBe(false);
			expect(copyModule.getId).toBe("123");
			expect(copyModule.getTitle).toBe("Aufgabe");
		});
	});
});
