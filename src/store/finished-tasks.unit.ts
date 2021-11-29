import { FinishedTaskModule } from "./finished-tasks";
import * as serverApi from "../serverApi/v3/api";
import { taskFactory } from "./task.filter.unit";
import { TaskFilter } from "./task.filter";
import { Task } from "./types/tasks";
/* 
type FunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
	string; */

/**
 * Spy on a TaskFilter method and mock its return value.
 * The mock is valid vor all instances of the TaskFilter class.
 * So make sire that you call mockRestore() othe spy instance afterwards.
 * @param method the method
 * @param result the result of the task filter
 * @returns
 */
/* function mockTaskFilter(
	method: FunctionPropertyNames<Required<TaskFilter>>,
	result: Task[]
) {
	return jest
		.spyOn(TaskFilter.prototype, method)
		.mockReturnValue(new TaskFilter(result));
} */

describe("finished task store", () => {
	describe("actions", () => {
		describe("fetchInitialTasks", () => {
			it("should request an initial list of tasks", (done) => {
				const mockApi = {
					taskControllerFindAllFinished: jest.fn(() => ({
						data: {
							data: [{ mockTask: "mock task value" }],
							total: 210,
							skip: 0,
							limit: 50,
						},
					})),
				};
				const spy = jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
				const finishedTaskModule = new FinishedTaskModule({});

				finishedTaskModule.fetchInitialTasks().then(() => {
					expect(finishedTaskModule.getTasks).toStrictEqual([
						{
							mockTask: "mock task value",
						},
					]);
					expect(finishedTaskModule.getStatus).toBe("completed");
					expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(1);
					done();
				});
				expect(finishedTaskModule.getStatus).toBe("pending");

				spy.mockRestore();
			});

			it("should fetch all pages", (done) => {
				const mockApi = {
					taskControllerFindAllFinished: jest
						.fn()
						.mockReturnValueOnce({
							data: {
								data: [{ mockTask: "mock task #1" }],
								total: 210,
								skip: 0,
								limit: 50,
							},
						})
						.mockReturnValueOnce({
							data: {
								data: [{ mockTask: "mock task #2" }],
								total: 12,
								skip: 50,
								limit: 50,
							},
						}),
				};

				const spy = jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
				const finishedTaskModule = new FinishedTaskModule({});

				finishedTaskModule.fetchMoreTasks().then(() => {
					expect(finishedTaskModule.getTasks).toStrictEqual([
						{ mockTask: "mock task #1" },
						{ mockTask: "mock task #2" },
					]);
					expect(finishedTaskModule.getStatus).toBe("completed");
					expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(2);
					done();
				});
				expect(finishedTaskModule.getStatus).toBe("pending");
			});

			it("should handle an error", (done) => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					taskControllerFindAll: jest.fn(() => Promise.reject({ ...error })),
				};
				jest
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
				const finishedTaskModule = new FinishedTaskModule({});

				finishedTaskModule.fetchInitialTasks().then(() => {
					expect(finishedTaskModule.getTasks).toStrictEqual([]);
					expect(finishedTaskModule.getStatus).toBe("error");
					expect(finishedTaskModule.businessError).toStrictEqual(error);
					done();
				});
				expect(finishedTaskModule.getStatus).toBe("pending");
				expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("mutations", () => {
		describe("setTasks", () => {
			it("should set the tasks in state", () => {
				const tasksModule = new FinishedTaskModule({});
				const tasks = taskFactory.buildList(3);
				tasksModule.setTasks(tasks);

				expect(tasksModule.tasks).toStrictEqual(tasks);
			});
		});

		describe("setStatus", () => {
			it("should set the status in state", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				finishedTaskModule.setStatus("completed");

				expect(finishedTaskModule.status).toBe("completed");
			});
		});

		describe("setBusinessError", () => {
			it("should set the business error in state", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				finishedTaskModule.setBusinessError(error);

				expect(finishedTaskModule.businessError).toEqual(error);
			});
		});

		describe("resetBusinessError", () => {
			it("should reset the business error in state", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				finishedTaskModule.setBusinessError(error);
				expect(finishedTaskModule.businessError).toEqual(error);

				finishedTaskModule.resetBusinessError();
				expect(finishedTaskModule.businessError).toEqual({
					statusCode: "",
					message: "",
				});
			});
		});
	});

	describe("getters", () => {
		describe("getTasks", () => {
			it("should return an empty list by default", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				const tasks = finishedTaskModule.getTasks;

				expect(tasks).toHaveLength(0);
			});

			it("should return the tasks", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				finishedTaskModule.tasks = taskFactory.buildList(3);
				const tasks = finishedTaskModule.getTasks;

				expect(tasks).toHaveLength(3);
				expect(tasks).toEqual(finishedTaskModule.tasks);
			});
		});

		describe("getStatus", () => {
			it("should return the status", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				finishedTaskModule.status = "error";
				const status = finishedTaskModule.getStatus;

				expect(status).toBe(finishedTaskModule.status);
			});
		});

		describe("hasNoTasks", () => {
			it("should return false if there are any tasks", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				finishedTaskModule.tasks = taskFactory.buildList(3);
				finishedTaskModule.status = "completed";
				const hasNoTasks = finishedTaskModule.hasNoTasks;

				expect(hasNoTasks).toBe(false);
			});

			it("should return true when tasks are empty", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				finishedTaskModule.status = "completed";
				const hasNoTasks = finishedTaskModule.hasNoTasks;

				expect(hasNoTasks).toBe(true);
			});

			it("should return false when the store is not ready", () => {
				const finishedTaskModule = new FinishedTaskModule({});
				finishedTaskModule.tasks = taskFactory.buildList(3);
				finishedTaskModule.status = "pending";
				const hasNoTasks = finishedTaskModule.hasNoTasks;

				expect(hasNoTasks).toBe(false);
			});
		});

		// TODO - add test for initialized; also for get businesserror and such?
	});
});
