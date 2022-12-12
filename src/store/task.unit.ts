import TaskModule from "@store/task";
import * as serverApi from "../serverApi/v3/api";

const mockTaskData = {
	id: "123",
	name: "abc",
	description: "Lorem ipsum",
};

describe("task store", () => {
	describe("actions", () => {
		describe("findTask", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call backend with correct payload", async () => {
				const taskModule = new TaskModule({});
				const setTaskDataMock = jest.spyOn(taskModule, "setTaskData");

				const taskApiMock = {
					taskControllerFindTask: jest.fn(async () => ({
						data: mockTaskData,
					})),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.TaskApiInterface
					);

				await taskModule.findTask(mockTaskData.id);

				expect(taskApiMock.taskControllerFindTask).toHaveBeenCalledTimes(1);
				expect(taskApiMock.taskControllerFindTask).toHaveBeenCalledWith(
					mockTaskData.id
				);
				expect(setTaskDataMock).toHaveBeenCalledWith(mockTaskData);
			});

			it("should handle an error", async () => {
				const taskModule = new TaskModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskApiMock = {
					taskControllerFindTask: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.TaskApiInterface
					);

				await taskModule.findTask("123");

				expect(taskApiMock.taskControllerFindTask).toHaveBeenCalledTimes(1);
				expect(taskModule.businessError).toStrictEqual(error);
			});
		});

		describe("createTask", () => {
			afterEach(() => {
				jest.clearAllMocks();
			});

			it("should call backend", async () => {
				const taskModule = new TaskModule({});
				const setTaskDataMock = jest.spyOn(taskModule, "setTaskData");

				const taskApiMock = {
					taskControllerCreate: jest.fn(async () => ({
						data: mockTaskData,
					})),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.TaskApiInterface
					);

				await taskModule.createTask({
					name: "abc",
					description: "Lorem ipsum",
				});

				expect(taskApiMock.taskControllerCreate).toHaveBeenCalledTimes(1);
				expect(setTaskDataMock).toHaveBeenCalledWith(mockTaskData);
			});

			it("should handle an error", async () => {
				const taskModule = new TaskModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskApiMock = {
					taskControllerCreate: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.TaskApiInterface
					);

				await taskModule.createTask({
					name: "abc",
					description: "Lorem ipsum",
				});

				expect(taskApiMock.taskControllerCreate).toHaveBeenCalledTimes(1);
				expect(taskModule.businessError).toStrictEqual(error);
			});
		});

		describe("updateTask", () => {
			it("should call backend with correct payload", async () => {
				const taskModule = new TaskModule({});
				const setTaskDataMock = jest.spyOn(taskModule, "setTaskData");

				const taskApiMock = {
					taskControllerUpdate: jest.fn(async () => ({
						data: {
							id: "123",
							name: "def",
							description: "Lorem ipsum",
						},
					})),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.TaskApiInterface
					);

				taskModule.setTaskData(mockTaskData);
				await taskModule.updateTask({ name: "def" });

				expect(taskApiMock.taskControllerUpdate).toHaveBeenCalledTimes(1);
				expect(taskApiMock.taskControllerUpdate).toHaveBeenCalledWith(
					mockTaskData.id,
					{
						name: "def",
					}
				);
				expect(setTaskDataMock).toHaveBeenCalledWith({
					id: "123",
					name: "def",
					description: "Lorem ipsum",
				});
			});

			it("should handle an error", async () => {
				const taskModule = new TaskModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskApiMock = {
					taskControllerUpdate: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.TaskApiInterface
					);

				taskModule.setTaskData(mockTaskData);
				await taskModule.updateTask({ name: "def" });

				expect(taskApiMock.taskControllerUpdate).toHaveBeenCalledTimes(1);
				expect(taskModule.businessError).toStrictEqual(error);
			});
		});
	});

	describe("getters", () => {
		describe("getLoading", () => {
			it("should return loading state", () => {
				const taskModule = new TaskModule({});

				expect(taskModule.getLoading).toStrictEqual(false);
				taskModule.setLoading(true);
				expect(taskModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getBusinessError", () => {
			it("should return business error", () => {
				const taskModule = new TaskModule({});
				taskModule.businessError = {
					statusCode: "404",
					message: "not found",
				};

				expect(taskModule.getBusinessError).toBe(taskModule.businessError);
			});

			describe("getTaskData", () => {
				it("should return task data", () => {
					const taskModule = new TaskModule({});
					taskModule.taskData = mockTaskData;

					expect(taskModule.getTaskData).toStrictEqual(mockTaskData);
				});
			});
		});
	});
});
