import * as serverApi from "../serverApi/v3/api";
import FinishedTasksModule from "./finished-tasks";
import { TaskFilter } from "./task.filter";
import { taskFactory } from "./task.filter.unit";
import TasksModule from "./tasks";
import { Task } from "./types/tasks";
import { initializeAxios } from "@/utils/api";
import setupStores from "@@/tests/test-utils/setupStores";
import { AxiosInstance } from "axios";

type FunctionPropertyNames<T> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
	string;

/**
 * Spy on a TaskFilter method and mock its return value.
 * The mock is valid for all instances of the TaskFilter class.
 * So make sure that you call mockRestore() on the spy instance afterwards.
 * @param method the method
 * @param result the result of the task filter
 * @returns
 */
function mockTaskFilter(method: FunctionPropertyNames<Required<TaskFilter>>, result: Task[]) {
	return vi.spyOn(TaskFilter.prototype, method).mockReturnValue(new TaskFilter(result));
}

initializeAxios({} as AxiosInstance);

describe("task store", () => {
	describe("actions", () => {
		describe("fetchAllTasks", () => {
			it("should request a list of tasks", () =>
				new Promise<void>((done) => {
					const mockApi = {
						taskControllerFindAll: vi.fn(() => ({
							data: {
								data: [{ mockTask: "mock task value" }],
								total: 3,
								skip: 0,
								limit: 10,
							},
						})),
					};
					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
					const tasksModule = new TasksModule({});

					tasksModule.fetchAllTasks().then(() => {
						expect(tasksModule.getTasks).toStrictEqual([
							{
								mockTask: "mock task value",
							},
						]);
						expect(tasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
						done();
					});
					expect(tasksModule.getStatus).toBe("pending");

					spy.mockRestore();
				}));

			it("should fetch all pages", () =>
				new Promise<void>((done) => {
					const mockApi = {
						taskControllerFindAll: vi
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

					vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
					const tasksModule = new TasksModule({});

					tasksModule.fetchAllTasks().then(() => {
						expect(tasksModule.getTasks).toStrictEqual([
							{ mockTask: "mock task #1" },
							{ mockTask: "mock task #2" },
							{ mockTask: "mock task #3" },
						]);
						expect(tasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(3);
						done();
					});
					expect(tasksModule.getStatus).toBe("pending");
				}));

			it("should handle an error", () =>
				new Promise<void>((done) => {
					const error = { status: 418, statusText: "I'm a teapot" };
					const mockApi = {
						taskControllerFindAll: vi.fn(() => Promise.reject({ ...error })),
					};
					vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
					const tasksModule = new TasksModule({});

					tasksModule.fetchAllTasks().then(() => {
						expect(tasksModule.getTasks).toStrictEqual([]);
						expect(tasksModule.getStatus).toBe("error");
						expect(tasksModule.businessError).toStrictEqual(error);
						done();
					});
					expect(tasksModule.getStatus).toBe("pending");
					expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
				}));
		});

		describe("revertPublishedTask", () => {
			beforeEach(() => {
				setupStores({
					finishedTasksModule: FinishedTasksModule,
				});
			});

			it("should call api to revert a published task", () =>
				new Promise<void>((done) => {
					const mockApi = {
						taskControllerRevertPublished: vi.fn(),
					};
					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					const tasksModule = new TasksModule({});
					const tasks = taskFactory.buildList(3);
					tasksModule.setTasks(tasks);
					const fetchAllTasksSpy = vi.spyOn(tasksModule, "fetchAllTasks");

					tasksModule.revertPublishedTask(tasks[0].id).then(() => {
						expect(tasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerRevertPublished).toHaveBeenCalledTimes(1);
						expect(fetchAllTasksSpy).toHaveBeenCalledTimes(1);
						done();
					});
					expect(tasksModule.getStatus).toBe("pending");

					spy.mockRestore();
				}));
		});

		// TODO - implement when we figured out how to correctly mock stores
		describe("finishTask", () => {
			it.todo("should call finish task api and refetch all tasks");

			it("should handle an error", () =>
				new Promise<void>((done) => {
					const task = taskFactory.build();
					const error = { status: 418, statusText: "I'm a teapot" };
					const mockApi = {
						taskControllerFinish: vi.fn(() => Promise.reject({ ...error })),
					};

					vi.spyOn(serverApi, "TaskApiFactory").mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
					const tasksModule = new TasksModule({});

					tasksModule.finishTask(task.id).then(() => {
						expect(tasksModule.getStatus).toBe("error");
						expect(tasksModule.businessError).toStrictEqual(error);
						done();
					});
					expect(tasksModule.getStatus).toBe("pending");
					expect(mockApi.taskControllerFinish).toHaveBeenCalledTimes(1);
				}));
		});

		describe("deleteTask", () => {
			beforeEach(() => {
				setupStores({
					finishedTasksModule: FinishedTasksModule,
				});
			});

			it("should call api to delete a task", () =>
				new Promise<void>((done) => {
					const mockApi = {
						taskControllerDelete: vi.fn(),
					};
					const spy = vi
						.spyOn(serverApi, "TaskApiFactory")
						.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);

					const tasksModule = new TasksModule({});
					const tasks = taskFactory.buildList(3);
					tasksModule.setTasks(tasks);
					const fetchAllTasksSpy = vi.spyOn(tasksModule, "fetchAllTasks");

					tasksModule.deleteTask(tasks[0].id).then(() => {
						expect(tasksModule.getStatus).toBe("completed");
						expect(mockApi.taskControllerDelete).toHaveBeenCalledTimes(1);
						expect(fetchAllTasksSpy).toHaveBeenCalledTimes(1);
						done();
					});
					expect(tasksModule.getStatus).toBe("pending");

					spy.mockRestore();
				}));
		});
	});

	describe("mutations", () => {
		describe("setTasks", () => {
			it("should set the tasks in state", () => {
				const tasksModule = new TasksModule({});
				const tasks = taskFactory.buildList(3);
				tasksModule.setTasks(tasks);

				expect(tasksModule.tasks).toStrictEqual(tasks);
			});
		});

		describe("setCourseFilters", () => {
			it("should set course names as filter in state", () => {
				const courseNames = ["a", "b", "c"];
				const tasksModule = new TasksModule({});
				tasksModule.setCourseFilters(courseNames);

				expect(tasksModule.courseFilter).toStrictEqual(courseNames);
			});
		});

		describe("setSubstituteFilter", () => {
			it("should set substitution filter in state", () => {
				const tasksModule = new TasksModule({});
				tasksModule.setSubstituteFilter(true);

				expect(tasksModule.isSubstituteFilterEnabled).toBe(true);
			});

			it("should be false by default", () => {
				const tasksModule = new TasksModule({});
				expect(tasksModule.isSubstituteFilterEnabled).toBe(false);
			});

			it.todo("should remove substitute course(s) from course filter when disabled");
		});

		describe("setStatus", () => {
			it("should set the status in state", () => {
				const tasksModule = new TasksModule({});
				tasksModule.setStatus("completed");

				expect(tasksModule.status).toBe("completed");
			});
		});

		describe("setActiveTab", () => {
			it("should set the active tab in state", () => {
				const tasksModule = new TasksModule({});
				tasksModule.setActiveTab("drafts");

				expect(tasksModule.tab).toBe("drafts");
			});
		});

		describe("setBusinessError", () => {
			it("should set the business error in state", () => {
				const tasksModule = new TasksModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				tasksModule.setBusinessError(error);

				expect(tasksModule.businessError).toEqual(error);
			});
		});

		describe("resetBusinessError", () => {
			it("should reset the business error in state", () => {
				const tasksModule = new TasksModule({});
				const error = {
					statusCode: "404",
					message: "not found",
				};
				tasksModule.setBusinessError(error);
				expect(tasksModule.businessError).toEqual(error);

				tasksModule.resetBusinessError();
				expect(tasksModule.businessError).toEqual({
					statusCode: "",
					message: "",
				});
			});
		});
	});

	describe("getters", () => {
		describe("getTasks", () => {
			it("should return an empty list by default", () => {
				const tasksModule = new TasksModule({});
				const tasks = tasksModule.getTasks;

				expect(tasks).toHaveLength(0);
			});

			it("should return the tasks", () => {
				const tasksModule = new TasksModule({});
				tasksModule.tasks = taskFactory.buildList(3);
				const tasks = tasksModule.getTasks;

				expect(tasks).toHaveLength(3);
				expect(tasks).toEqual(tasksModule.tasks);
			});
		});

		describe("getStatus", () => {
			it("should return the status", () => {
				const tasksModule = new TasksModule({});
				tasksModule.status = "error";
				const status = tasksModule.getStatus;

				expect(status).toBe(tasksModule.status);
			});
		});

		describe("getActiveTab", () => {
			it("should return the active tab", () => {
				const tasksModule = new TasksModule({});
				tasksModule.tab = "drafts";
				const activeTab = tasksModule.getActiveTab;

				expect(activeTab).toBe(tasksModule.tab);
			});
		});

		describe("getCourseFilters", () => {
			it("should return the appropiate properties", () => {
				const task = taskFactory.build();
				const tasksModule = new TasksModule({});
				tasksModule.tasks = [task];
				const result = tasksModule.getCourseFilters;

				expect(result).toStrictEqual([
					{
						value: task.courseName,
						text: task.courseName,
						isSubstitution: false,
					},
				]);
			});

			it("should pass the substitution flag", () => {
				const task = taskFactory.build({
					status: { isSubstitutionTeacher: true },
				});
				const tasksModule = new TasksModule({});
				tasksModule.tasks = [task];
				tasksModule.substituteFilter = true;
				const result = tasksModule.getCourseFilters;

				expect(result).toStrictEqual([
					{
						value: task.courseName,
						text: task.courseName,
						isSubstitution: true,
					},
				]);
			});

			it("should work for empty tasks", () => {
				const tasksModule = new TasksModule({});
				tasksModule.tasks = [];
				const result = tasksModule.getCourseFilters;

				expect(result).toStrictEqual([]);
			});
		});

		describe("getBusinessError", () => {
			it("should return business error", () => {
				const tasksModule = new TasksModule({});
				tasksModule.businessError = {
					statusCode: "404",
					message: "not found",
				};
				const businessError = tasksModule.getBusinessError;

				expect(businessError).toBe(tasksModule.businessError);
			});
		});

		describe("isSubstituteFilterEnabled", () => {
			it("should return false by default", () => {
				const tasksModule = new TasksModule({});
				expect(tasksModule.isSubstituteFilterEnabled).toBe(false);
			});

			it("should return true if enabled", () => {
				const tasksModule = new TasksModule({});
				tasksModule.substituteFilter = true;
				expect(tasksModule.isSubstituteFilterEnabled).toBe(true);
			});
		});

		describe("hasFilterSelected", () => {
			it("should return false by default", () => {
				const tasksModule = new TasksModule({});
				expect(tasksModule.hasFilterSelected).toBe(false);
			});

			it("should return true if enabled", () => {
				const tasksModule = new TasksModule({});
				tasksModule.courseFilter = ["Mathe"];
				expect(tasksModule.hasFilterSelected).toBe(true);
			});
		});

		describe("hasTasks", () => {
			it("should return true if there are any tasks", () => {
				const tasksModule = new TasksModule({});
				tasksModule.tasks = taskFactory.buildList(3);
				tasksModule.status = "completed";
				const hasTasks = tasksModule.hasTasks;

				expect(hasTasks).toBe(true);
			});

			it("should return false when tasks are empty", () => {
				const tasksModule = new TasksModule({});
				tasksModule.status = "completed";
				const hasTasks = tasksModule.hasTasks;

				expect(hasTasks).toBe(false);
			});

			it("should return false when the store is not ready", () => {
				const tasksModule = new TasksModule({});
				tasksModule.tasks = taskFactory.buildList(3);
				tasksModule.status = "pending";
				const hasTasks = tasksModule.hasTasks;

				expect(hasTasks).toBe(false);
			});
		});

		describe("openTasksForStudentIsEmpty", () => {
			it("should filter by course names", () => {
				const tasksModule = new TasksModule({});
				tasksModule.courseFilter = ["Mathe"];
				const spy = mockTaskFilter("byCourseNames", []);

				const result = tasksModule.openTasksForStudentIsEmpty;

				expect(result).toBe(false);
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
				spy.mockRestore();
			});

			it("should filter tasks that are open for students", () => {
				const tasksModule = new TasksModule({});
				const spy = mockTaskFilter("byOpenForStudent", []);

				const result = tasksModule.openTasksForStudentIsEmpty;

				expect(result).toBe(false);
				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it("should return false if the filters yield any results", () => {
				const tasksModule = new TasksModule({});
				tasksModule.status = "completed";
				const tasks = taskFactory.buildList(1);
				const spy1 = mockTaskFilter("byCourseNames", tasks);
				const spy2 = mockTaskFilter("byOpenForStudent", tasks);

				const result = tasksModule.openTasksForStudentIsEmpty;

				expect(result).toBe(false);
				spy1.mockRestore();
				spy2.mockRestore();
			});

			it("should return true if the filters yield no results", () => {
				const tasksModule = new TasksModule({});
				tasksModule.status = "completed";
				const spy1 = mockTaskFilter("byCourseNames", []);
				const spy2 = mockTaskFilter("byOpenForStudent", []);

				const result = tasksModule.openTasksForStudentIsEmpty;

				expect(result).toBe(true);
				spy1.mockRestore();
				spy2.mockRestore();
			});

			it("should return false if the store is not ready", () => {
				const tasksModule = new TasksModule({});
				const tasks = taskFactory.buildList(1);
				tasksModule.status = "pending";
				const spy1 = mockTaskFilter("byCourseNames", tasks);
				const spy2 = mockTaskFilter("byOpenForStudent", tasks);

				const result = tasksModule.openTasksForStudentIsEmpty;

				expect(result).toBe(false);
				spy1.mockRestore();
				spy2.mockRestore();
			});
		});
	});

	describe("openTasksForTeacherIsEmpty", () => {
		it("should filter by substitution teacher", () => {
			const tasksModule = new TasksModule({});
			tasksModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstituteForTeacher", []);

			const result = tasksModule.openTasksForTeacherIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.openTasksForTeacherIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for students", () => {
			const tasksModule = new TasksModule({});
			const spy = mockTaskFilter("byOpenForTeacher", []);

			const result = tasksModule.openTasksForTeacherIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return false if the filters yield any results", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "completed";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byOpenForTeacher", tasks);

			const result = tasksModule.openTasksForTeacherIsEmpty;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return true if the filters yield no results", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "completed";
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", []);
			const spy2 = mockTaskFilter("byCourseNames", []);
			const spy3 = mockTaskFilter("byOpenForTeacher", []);

			const result = tasksModule.openTasksForTeacherIsEmpty;

			expect(result).toBe(true);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return false if the store is not ready", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "pending";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byOpenForTeacher", tasks);

			const result = tasksModule.openTasksForTeacherIsEmpty;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("completedTasksForStudentIsEmpty", () => {
		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.completedTasksForStudentIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are completed", () => {
			const tasksModule = new TasksModule({});
			const spy = mockTaskFilter("byCompletedForStudent", []);

			const result = tasksModule.completedTasksForStudentIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return false if the filters yield any results", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "completed";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("byCourseNames", tasks);
			const spy2 = mockTaskFilter("byCompletedForStudent", tasks);

			const result = tasksModule.completedTasksForStudentIsEmpty;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
		});

		it("should return true if the filters yield no results", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "completed";
			const spy1 = mockTaskFilter("byCourseNames", []);
			const spy2 = mockTaskFilter("byCompletedForStudent", []);

			const result = tasksModule.completedTasksForStudentIsEmpty;

			expect(result).toBe(true);
			spy1.mockRestore();
			spy2.mockRestore();
		});

		it("should return false if the store is not ready", () => {
			const tasksModule = new TasksModule({});
			const tasks = taskFactory.buildList(1);
			tasksModule.status = "pending";
			const spy1 = mockTaskFilter("byCourseNames", tasks);
			const spy2 = mockTaskFilter("byCompletedForStudent", tasks);

			const result = tasksModule.completedTasksForStudentIsEmpty;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});

	describe("draftsForTeacherIsEmpty", () => {
		it("should filter by substitute teacher", () => {
			const tasksModule = new TasksModule({});
			tasksModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstituteForTeacher", []);

			const result = tasksModule.draftsForTeacherIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.draftsForTeacherIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are drafts", () => {
			const tasksModule = new TasksModule({});
			const spy = mockTaskFilter("byDraftForTeacher", []);

			const result = tasksModule.draftsForTeacherIsEmpty;

			expect(result).toBe(false);
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return false if the filters yield any results", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "completed";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraftForTeacher", tasks);

			const result = tasksModule.draftsForTeacherIsEmpty;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return true if the filters yield no results", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "completed";
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", []);
			const spy2 = mockTaskFilter("byCourseNames", []);
			const spy3 = mockTaskFilter("byDraftForTeacher", []);

			const result = tasksModule.draftsForTeacherIsEmpty;

			expect(result).toBe(true);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return false if the store is not ready", () => {
			const tasksModule = new TasksModule({});
			tasksModule.status = "pending";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraftForTeacher", tasks);

			const result = tasksModule.draftsForTeacherIsEmpty;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("getOpenTasksForStudent", () => {
		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.getOpenTasksForStudent;

			expect(result).toEqual({
				overdue: [],
				noDueDate: [],
				withDueDate: [],
			});
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for students", () => {
			const tasksModule = new TasksModule({});
			const spy = mockTaskFilter("byOpenForStudent", []);

			const result = tasksModule.getOpenTasksForStudent;

			expect(result).toEqual({
				overdue: [],
				noDueDate: [],
				withDueDate: [],
			});
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should group the tasks by filters", () => {
			const tasksModule = new TasksModule({});
			const overdueTasks = taskFactory.buildList(1);
			const noDueDateTasks = taskFactory.buildList(1);
			const withDueDateTasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("byOverdue", overdueTasks);
			const spy2 = mockTaskFilter("withoutDueDate", noDueDateTasks);
			const spy3 = mockTaskFilter("withDueDate", withDueDateTasks);

			const result = tasksModule.getOpenTasksForStudent;

			expect(result).toEqual({
				overdue: overdueTasks,
				noDueDate: noDueDateTasks,
				withDueDate: withDueDateTasks,
			});
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("getCompletedTasksForStudent", () => {
		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.getCompletedTasksForStudent;

			expect(result).toEqual({
				submitted: [],
				graded: [],
			});

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should group the tasks by filters", () => {
			const tasksModule = new TasksModule({});
			const submittedTasks = taskFactory.buildList(1);
			const gradedTasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("bySubmittedForStudent", submittedTasks);
			const spy2 = mockTaskFilter("byGradedForStudent", gradedTasks);

			const result = tasksModule.getCompletedTasksForStudent;

			expect(result).toEqual({
				submitted: submittedTasks,
				graded: gradedTasks,
			});
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});

	describe("getOpenTasksForTeacher", () => {
		it("should filter by substitution teacher", () => {
			const tasksModule = new TasksModule({});
			tasksModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstituteForTeacher", []);

			const result = tasksModule.getOpenTasksForTeacher;

			expect(result).toEqual({
				overdue: [],
				noDueDate: [],
				withDueDate: [],
			});
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.getOpenTasksForTeacher;

			expect(result).toEqual({
				overdue: [],
				noDueDate: [],
				withDueDate: [],
			});
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for teachers", () => {
			const tasksModule = new TasksModule({});
			const spy = mockTaskFilter("byOpenForTeacher", []);

			const result = tasksModule.getOpenTasksForTeacher;

			expect(result).toEqual({
				overdue: [],
				noDueDate: [],
				withDueDate: [],
			});
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should group the tasks by filters", () => {
			const tasksModule = new TasksModule({});
			const overdueTasks = taskFactory.buildList(1);
			const noDueDateTasks = taskFactory.buildList(1);
			const withDueDateTasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("byOverdue", overdueTasks);
			const spy2 = mockTaskFilter("withoutDueDate", noDueDateTasks);
			const spy3 = mockTaskFilter("withDueDate", withDueDateTasks);

			const result = tasksModule.getOpenTasksForTeacher;

			expect(result).toEqual({
				overdue: overdueTasks,
				noDueDate: noDueDateTasks,
				withDueDate: withDueDateTasks,
			});
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("getDraftTasksForTeacher", () => {
		it("should filter by substitution teacher", () => {
			const tasksModule = new TasksModule({});
			tasksModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstituteForTeacher", []);

			const result = tasksModule.getDraftTasksForTeacher;

			expect(result).toEqual([]);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const tasksModule = new TasksModule({});
			tasksModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			const result = tasksModule.getDraftTasksForTeacher;

			expect(result).toEqual([]);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(tasksModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for teachers", () => {
			const tasksModule = new TasksModule({});
			const spy = mockTaskFilter("byDraftForTeacher", []);

			const result = tasksModule.getDraftTasksForTeacher;

			expect(result).toEqual([]);
			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return the result of the filters", () => {
			const tasksModule = new TasksModule({});
			const tasks = (tasksModule.tasks = taskFactory.buildList(2));
			const spy1 = mockTaskFilter("filterSubstituteForTeacher", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraftForTeacher", tasks);

			const result = tasksModule.getDraftTasksForTeacher;

			expect(result).toEqual(tasks);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should sort newly created on top", () => {
			const tasksModule = new TasksModule({});
			const tasks = (tasksModule.tasks = taskFactory.buildList(2));

			const newDate = new Date();
			newDate.setDate(newDate.getDate() - 1);
			tasks[0].createdAt = newDate.toISOString();

			const spy1 = mockTaskFilter("filterSubstituteForTeacher", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraftForTeacher", tasks);

			const result = tasksModule.getDraftTasksForTeacher;

			expect(new Date(result[0].createdAt).getTime() > new Date(result[1].createdAt).getTime()).toEqual(true);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("getTasksCountPerCourseStudent", () => {
		it("should count open and completed tasks by course name", () => {
			const opentTasks = taskFactory.buildList(2, { courseName: "Mathe" });
			const spy1 = mockTaskFilter("byOpenForStudent", opentTasks);
			const completedTasks = taskFactory.buildList(3, {
				courseName: "Deutsch",
			});
			const spy2 = mockTaskFilter("byCompletedForStudent", completedTasks);

			const tasksModule = new TasksModule({});
			tasksModule.tasks = [...opentTasks, ...completedTasks];

			const result = tasksModule.getTasksCountPerCourseStudent;

			expect(spy1).toHaveBeenCalledTimes(1);
			expect(spy2).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				open: { Mathe: 2, Deutsch: 0 },
				completed: { Mathe: 0, Deutsch: 3 },
			});
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});

	describe("getTasksCountPerCourseForTeacher", () => {
		it("should count open and draft tasks by course name", () => {
			const opentTasks = taskFactory.buildList(4, { courseName: "Mathe" });
			const spy1 = mockTaskFilter("byOpenForTeacher", opentTasks);

			const draftTasks = [
				...taskFactory.buildList(2, {
					courseName: "Deutsch",
				}),
				...taskFactory.buildList(3, {
					courseName: "",
				}),
			];
			const spy2 = mockTaskFilter("byDraftForTeacher", draftTasks);

			const tasksModule = new TasksModule({});
			tasksModule.tasks = [...opentTasks, ...draftTasks];

			const result = tasksModule.getTasksCountPerCourseForTeacher;

			expect(spy1).toHaveBeenCalledTimes(1);
			expect(spy2).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				open: { Mathe: 4, Deutsch: 0, "": 0 },
				drafts: { Mathe: 0, Deutsch: 2, "": 3 },
			});
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});
});
