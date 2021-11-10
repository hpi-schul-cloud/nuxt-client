import { TaskModule } from "./tasks";
import * as serverApi from "../serverApi/v3/api";
import { taskFactory } from "./task.filter.unit";

describe("task store", async () => {
	describe("actions", () => {
		describe("getAllTasks", () => {
			it("should request a list of tasks", (done) => {
				const mockApi = {
					taskControllerFindAll: jest.fn(() => ({
						data: {
							data: [{ mockTask: "mock task value" }],
							total: 3,
							skip: 0,
							limit: 10,
						},
					})),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
				const taskModule = new TaskModule({});

				taskModule.getAllTasks().then(() => {
					expect(taskModule.getTasks).toStrictEqual([
						{
							mockTask: "mock task value",
						},
					]);
					expect(taskModule.getStatus).toBe("completed");
					done();
				});
				expect(taskModule.getStatus).toBe("pending");
				expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
			});
			it("should handle an error", (done) => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					taskControllerFindAll: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
				const taskModule = new TaskModule({});

				taskModule.getAllTasks().then(() => {
					expect(taskModule.getTasks).toStrictEqual([]);
					expect(taskModule.getStatus).toBe("error");
					expect(taskModule.businessError).toStrictEqual(error);
					done();
				});
				expect(taskModule.getStatus).toBe("pending");
				expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("mutations", () => {
		describe("setTasks", () => {
			it("should set the tasks in state", () => {
				const tasksModule = new TaskModule({});
				const tasks = taskFactory.buildList(3);
				tasksModule.setTasks(tasks);

				expect(tasksModule.tasks).toStrictEqual(tasks);
			});
		});

		describe("setCourseFilters", () => {
			it("should set course names as filter in state", () => {
				const courseNames = ["a", "b", "c"];
				const taskModule = new TaskModule({});
				taskModule.setCourseFilters(courseNames);

				expect(taskModule.courseFilter).toStrictEqual(courseNames);
			});
		});

		describe("setSubstituteFilter", () => {
			it("should set substitution filter in state", () => {
				const taskModule = new TaskModule({});
				taskModule.setSubstituteFilter(true);

				expect(taskModule.isSubstituteFilterEnabled).toBe(true);
			});

			it("should be true by default", () => {
				const taskModule = new TaskModule({});
				expect(taskModule.isSubstituteFilterEnabled).toBe(true);
			});
		});

		describe("setStatus", () => {
			it("should set the status in state", () => {
				const taskModule = new TaskModule({});
				taskModule.setStatus("completed");

				expect(taskModule.status).toBe("completed");
			});
		});

		describe("setBusinessError", () => {
			it("should set the business error in state", () => {
				const taskModule = new TaskModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				taskModule.setBusinessError(error);

				expect(taskModule.businessError).toEqual(error);
			});
		});

		describe("resetBusinessError", () => {
			it("should reset the business error in state", () => {
				const taskModule = new TaskModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				taskModule.setBusinessError(error);
				expect(taskModule.businessError).toEqual(error);

				taskModule.resetBusinessError();
				expect(taskModule.businessError).toEqual({
					statusCode: "",
					message: "",
				});
			});
		});
	});

	describe("getters", () => {
		describe("hasOpenTasksStudent", () => {
			it("should return true with course filter", () => {
				const task = taskFactory.build({ courseName: "Mathe", isDraft: false });
				const taskModule = new TaskModule({});
				Object.assign(taskModule, {
					status: "completed",
					tasks: [task],
					courseFilter: [task.courseName],
				});

				const result = taskModule.hasOpenTasksStudent;
				expect(result).toBe(true);
			});

			it("should return true without course filter", () => {
				const task = taskFactory.build({ courseName: "Mathe", isDraft: false });
				const taskModule = new TaskModule({});
				Object.assign(taskModule, {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = taskModule.hasOpenTasksStudent;
				expect(result).toBe(true);
			});

			it("should return false if loading state is not completed", () => {
				const task = taskFactory.build({ courseName: "Mathe", isDraft: false });
				const taskModule = new TaskModule({});
				Object.assign(taskModule, {
					status: "pending",
					tasks: [task],
					courseFilter: [],
				});

				const result = taskModule.hasOpenTasksStudent;
				expect(result).toBe(false);
			});
		});
	});
});
