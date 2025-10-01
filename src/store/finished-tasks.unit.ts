import * as serverApi from "../serverApi/v3/api";
import FinishedTasksModule from "./finished-tasks";
import { taskFactory } from "./task.filter.unit";
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";

/**
 * Spy on a TaskFilter method and mock its return value.
 * The mock is valid vor all instances of the TaskFilter class.
 * So make sire that you call mockRestore() othe spy instance afterwards.
 * @param method the method
 * @param result the result of the task filter
 * @returns
 */
vi.mock("axios");
initializeAxios({} as AxiosInstance);

describe("finished task store", () => {
	beforeEach(() => {
		vi.stubGlobal("setTimeout", (fn: () => unknown) => fn());
	});

	describe("actions", () => {
		describe("fetchFinishedTasks", () => {
			it("should request an initial list of tasks", () =>
				new Promise<void>((done) => {
					const finishedTasksModule = new FinishedTasksModule({});
					const spy = vi.spyOn(serverApi, "TaskApiFactory");
					const taskApiMock = {
						taskControllerFindAllFinished: vi.fn(() => ({
							data: {
								data: [{ mockTask: "mock task value" }],
								total: 1,
								skip: 0,
								limit: 50,
							},
						})),
					};

					spy.mockReturnValue(taskApiMock as unknown as serverApi.TaskApiInterface);

					finishedTasksModule.fetchFinishedTasks().then(() => {
						expect(finishedTasksModule.getTasks).toStrictEqual([
							{
								mockTask: "mock task value",
							},
						]);
						expect(finishedTasksModule.getStatus).toBe("completed");
						expect(taskApiMock.taskControllerFindAllFinished).toHaveBeenCalledTimes(1);
						done();
					});
					expect(finishedTasksModule.getStatus).toBe("pending");
				}));

			it("should fetch the next page", () =>
				new Promise<void>((done) => {
					const mockApi = {
						taskControllerFindAllFinished: vi
							.fn()
							.mockResolvedValueOnce({
								data: {
									data: [{ mockTask: "mock task #1" }],
									total: 110,
									skip: 50,
									limit: 50,
								},
							})
							.mockResolvedValueOnce({
								data: {
									data: [{ mockTask: "mock task #2" }],
									total: 110,
									skip: 100,
									limit: 50,
								},
							}),
					};

					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					const finishedTasksModule = new FinishedTasksModule({});
					finishedTasksModule.pagination.skip = 50;
					finishedTasksModule.pagination.total = 110;

					finishedTasksModule.fetchFinishedTasks().then(() => {
						expect(finishedTasksModule.getTasks).toStrictEqual([{ mockTask: "mock task #1" }]);
						expect(finishedTasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(1);
						done();
					});
					expect(finishedTasksModule.getStatus).toBe("pending");
					spy.mockRestore();
				}));

			it("should not call api when total is reached", () =>
				new Promise<void>((done) => {
					const finishedTasksModule = new FinishedTasksModule({});
					finishedTasksModule.pagination.skip = 100;
					finishedTasksModule.pagination.total = 100;
					finishedTasksModule.isInitialized = true;

					const mockApi = {
						taskControllerFindAllFinished: vi.fn(),
					};

					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					finishedTasksModule.fetchFinishedTasks().then(() => {
						expect(finishedTasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(0);
						done();
					});
					spy.mockRestore();
				}));

			it("should not call api when skip value is higher than total", () =>
				new Promise<void>((done) => {
					const finishedTasksModule = new FinishedTasksModule({});
					finishedTasksModule.pagination.skip = 150;
					finishedTasksModule.pagination.total = 120;
					finishedTasksModule.isInitialized = true;

					const mockApi = {
						taskControllerFindAllFinished: vi.fn(),
					};

					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					finishedTasksModule.fetchFinishedTasks().then(() => {
						expect(finishedTasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(0);
						done();
					});
					spy.mockRestore();
				}));

			it("should handle an error", () =>
				new Promise<void>((done) => {
					const finishedTasksModule = new FinishedTasksModule({});
					finishedTasksModule.pagination.skip = 50;
					finishedTasksModule.pagination.total = 100;

					const error = { status: 418, statusText: "I'm a teapot" };
					const mockApi = {
						taskControllerFindAllFinished: vi.fn(() => Promise.reject({ ...error })),
					};
					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					finishedTasksModule.fetchFinishedTasks().then(() => {
						expect(finishedTasksModule.getTasks).toStrictEqual([]);
						expect(finishedTasksModule.getStatus).toBe("error");
						expect(finishedTasksModule.businessError).toStrictEqual(error);
						expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(1);
						done();
					});
					expect(finishedTasksModule.getStatus).toBe("pending");

					spy.mockRestore();
				}));
		});

		describe("refetchTasks", () => {
			it("should fetch all tasks up until current pagination", async () => {
				const mockApi = {
					taskControllerFindAllFinished: vi
						.fn()
						.mockReturnValueOnce({
							data: {
								data: [{ mockTask: "mock task #1" }],
								total: 26,
								skip: 0,
								limit: 10,
							},
						})
						.mockReturnValueOnce({
							data: {
								data: [{ mockTask: "mock task #2" }],
								total: 26,
								skip: 10,
								limit: 10,
							},
						})
						.mockReturnValueOnce({
							data: {
								data: [{ mockTask: "mock task #3" }],
								total: 26,
								skip: 20,
								limit: 10,
							},
						}),
				};

				const spy = vi
					.spyOn(serverApi, "TaskApiFactory")
					.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.pagination = {
					total: 26,
					skip: 10,
					limit: 10,
				};

				await finishedTasksModule.refetchTasks();

				expect(finishedTasksModule.getTasks).toStrictEqual([
					{ mockTask: "mock task #1" },
					{ mockTask: "mock task #2" },
				]);
				expect(finishedTasksModule.getStatus).toBe("completed");
				expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(2);

				spy.mockRestore();
			});

			it("should handle an error", () =>
				new Promise<void>((done) => {
					const finishedTasksModule = new FinishedTasksModule({});
					finishedTasksModule.pagination.skip = 50;
					finishedTasksModule.pagination.total = 100;

					const error = { status: 418, statusText: "I'm a teapot" };
					const mockApi = {
						taskControllerFindAllFinished: vi.fn(() => Promise.reject({ ...error })),
					};
					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					finishedTasksModule.refetchTasks().then(() => {
						expect(finishedTasksModule.getTasks).toStrictEqual([]);
						expect(finishedTasksModule.getStatus).toBe("error");
						expect(finishedTasksModule.businessError).toStrictEqual(error);
						expect(mockApi.taskControllerFindAllFinished).toHaveBeenCalledTimes(1);
						done();
					});
					expect(finishedTasksModule.getStatus).toBe("pending");

					spy.mockRestore();
				}));
		});

		// TODO - implement when we figured out how to correctly mock stores
		describe("restoreTask", () => {
			it.todo("should call restore task api and refetch all tasks");

			it("should handle an error", () =>
				new Promise<void>((done) => {
					const finishedTasksModule = new FinishedTasksModule({});
					const task = taskFactory.build();
					const error = { status: 418, statusText: "I'm a teapot" };
					const mockApi = {
						taskControllerRestore: vi.fn(() => Promise.reject({ ...error })),
					};

					vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					finishedTasksModule.restoreTask(task.id).then(() => {
						expect(finishedTasksModule.getStatus).toBe("error");
						expect(finishedTasksModule.businessError).toStrictEqual(error);
						done();
					});
					expect(finishedTasksModule.getStatus).toBe("pending");
					expect(mockApi.taskControllerRestore).toHaveBeenCalledTimes(1);
				}));
		});
	});

	describe("mutations", () => {
		describe("setTasks", () => {
			it("should set the tasks in state", () => {
				const tasksModule = new FinishedTasksModule({});
				const tasks = taskFactory.buildList(3);
				tasksModule.setTasks(tasks);

				expect(tasksModule.tasks).toStrictEqual(tasks);
			});
		});

		describe("setStatus", () => {
			it("should set the status in state", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.setStatus("completed");
				expect(finishedTasksModule.status).toBe("completed");
			});
		});

		describe("setBusinessError", () => {
			it("should set the business error in state", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				finishedTasksModule.setBusinessError(error);

				expect(finishedTasksModule.businessError).toEqual(error);
			});
		});

		describe("resetBusinessError", () => {
			it("should reset the business error in state", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				finishedTasksModule.setBusinessError(error);
				expect(finishedTasksModule.businessError).toEqual(error);

				finishedTasksModule.resetBusinessError();
				expect(finishedTasksModule.businessError).toEqual({
					statusCode: "",
					message: "",
				});
			});
		});
	});

	describe("getters", () => {
		describe("getTasks", () => {
			it("should return an empty list by default", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				const tasks = finishedTasksModule.getTasks;

				expect(tasks).toHaveLength(0);
			});

			it("should return the tasks", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.tasks = taskFactory.buildList(3);
				const tasks = finishedTasksModule.getTasks;

				expect(tasks).toHaveLength(3);
				expect(tasks).toEqual(finishedTasksModule.tasks);
			});
		});

		describe("getStatus", () => {
			it("should return the status", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.status = "error";
				const status = finishedTasksModule.getStatus;

				expect(status).toBe(finishedTasksModule.status);
			});
		});

		describe("getIsInitialized", () => {
			it("should return isInitialized value", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.isInitialized = true;
				const isInitialized = finishedTasksModule.getIsInitialized;

				expect(isInitialized).toBe(finishedTasksModule.isInitialized);
			});
		});

		describe("tasksIsEmpty", () => {
			it("should return false if there are any tasks", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.tasks = taskFactory.buildList(3);
				finishedTasksModule.status = "completed";
				const tasksIsEmpty = finishedTasksModule.tasksIsEmpty;

				expect(tasksIsEmpty).toBe(false);
			});

			it("should return true when tasks are empty", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.status = "completed";
				const tasksIsEmpty = finishedTasksModule.tasksIsEmpty;

				expect(tasksIsEmpty).toBe(true);
			});

			it("should return false when the store is not ready", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.tasks = taskFactory.buildList(3);
				finishedTasksModule.status = "pending";
				const tasksIsEmpty = finishedTasksModule.tasksIsEmpty;

				expect(tasksIsEmpty).toBe(false);
			});
		});

		describe("getBusinessError", () => {
			it("should return business error", () => {
				const finishedTasksModule = new FinishedTasksModule({});
				finishedTasksModule.businessError = {
					statusCode: "404",
					message: "not found",
				};
				const businessError = finishedTasksModule.getBusinessError;

				expect(businessError).toBe(finishedTasksModule.businessError);
			});
		});
	});
});
