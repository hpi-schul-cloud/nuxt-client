import TaskModule from "@store/task";
import * as serverApi from "../serverApi/v3/api";

const mockTaskData = {
	id: "123",
	cardElements: [],
	draggable: true,
	task: {
		id: "456",
		name: "",
		courseName: "",
		courseId: "",
		createdAt: "",
		updatedAt: "",
		lessonHidden: false,
		status: {
			submitted: 0,
			maxSubmissions: 0,
			graded: 0,
			isDraft: true,
			isSubstitutionTeacher: true,
			isFinished: false,
		},
	},
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
					taskCardControllerFindOne: jest.fn(async () => ({
						data: mockTaskData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskModule.findTask(mockTaskData.id);

				expect(taskApiMock.taskCardControllerFindOne).toHaveBeenCalledTimes(1);
				expect(taskApiMock.taskCardControllerFindOne).toHaveBeenCalledWith(
					mockTaskData.id
				);
				expect(setTaskDataMock).toHaveBeenCalledWith(mockTaskData);
			});

			it("should handle an error", async () => {
				const taskModule = new TaskModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskApiMock = {
					taskCardControllerFindOne: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskModule.findTask("123");

				expect(taskApiMock.taskCardControllerFindOne).toHaveBeenCalledTimes(1);
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
					taskCardControllerCreate: jest.fn(async () => ({
						data: mockTaskData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskModule.createTask({
					title: "abc",
					text: ["Lorem ipsum"],
				});

				expect(taskApiMock.taskCardControllerCreate).toHaveBeenCalledTimes(1);
				expect(setTaskDataMock).toHaveBeenCalledWith(mockTaskData);
			});

			it("should handle an error", async () => {
				const taskModule = new TaskModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskApiMock = {
					taskCardControllerCreate: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.CardsApiInterface
					);

				await taskModule.createTask({
					title: "abc",
					text: ["Lorem ipsum"],
				});

				expect(taskApiMock.taskCardControllerCreate).toHaveBeenCalledTimes(1);
				expect(taskModule.businessError).toStrictEqual(error);
			});
		});

		describe("updateTask", () => {
			it("should call backend with correct payload", async () => {
				const taskModule = new TaskModule({});
				const setTaskDataMock = jest.spyOn(taskModule, "setTaskData");

				const taskApiMock = {
					taskCardControllerUpdate: jest.fn(async () => ({
						data: mockTaskData,
					})),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.CardsApiInterface
					);

				taskModule.setTaskData(mockTaskData);
				await taskModule.updateTask({ cardElements: [] });

				expect(taskApiMock.taskCardControllerUpdate).toHaveBeenCalledTimes(1);
				expect(taskApiMock.taskCardControllerUpdate).toHaveBeenCalledWith(
					mockTaskData.id,
					{
						cardElements: [],
					}
				);
				expect(setTaskDataMock).toHaveBeenCalledWith(mockTaskData);
			});

			it("should handle an error", async () => {
				const taskModule = new TaskModule({});
				const error = { statusCode: 418, message: "I'm a teapot", error: {} };

				const taskApiMock = {
					taskCardControllerUpdate: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "CardsApiFactory")
					.mockReturnValue(
						taskApiMock as unknown as serverApi.CardsApiInterface
					);

				taskModule.setTaskData(mockTaskData);
				await taskModule.updateTask({ cardElements: [] });

				expect(taskApiMock.taskCardControllerUpdate).toHaveBeenCalledTimes(1);
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
