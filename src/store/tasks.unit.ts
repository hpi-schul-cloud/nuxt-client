import { Task, TaskModule } from "./tasks";
import * as serverApi from "../serverApi/v3/api";
import { taskFactory } from "./task.filter.unit";
import { TaskFilter } from "./task.filter";

type FunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
	string;

/**
 * Spy on a TaskFilter method and mock its return value.
 * The mock is valid vor all instances of the TaskFilter class.
 * So make sire that you call mockRestore() othe spy instance afterwards.
 * @param method the method
 * @param result the result of the task filter
 * @returns
 */
function mockTaskFilter(
	method: FunctionPropertyNames<Required<TaskFilter>>,
	result: Task[]
) {
	return jest
		.spyOn(TaskFilter.prototype, method)
		.mockReturnValue(new TaskFilter(result));
}

describe("task store", () => {
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

			it("should be false by default", () => {
				const taskModule = new TaskModule({});
				expect(taskModule.isSubstituteFilterEnabled).toBe(false);
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
		describe("getTasks", () => {
			it("should return an empty list by default", () => {
				const taskModule = new TaskModule({});
				const tasks = taskModule.getTasks;

				expect(tasks).toHaveLength(0);
			});

			it("should return the tasks", () => {
				const taskModule = new TaskModule({});
				taskModule.tasks = taskFactory.buildList(3);
				const tasks = taskModule.getTasks;

				expect(tasks).toHaveLength(3);
				expect(tasks).toEqual(taskModule.tasks);
			});
		});

		describe("getStatus", () => {
			it("should return the status", () => {
				const taskModule = new TaskModule({});
				taskModule.status = "error";
				const status = taskModule.getStatus;

				expect(status).toBe(taskModule.status);
			});
		});

		describe("getCourseFilters", () => {
			it("should return the appropiate properties", () => {
				const task = taskFactory.build();
				const taskModule = new TaskModule({});
				taskModule.tasks = [task];
				const result = taskModule.getCourseFilters;

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
				const taskModule = new TaskModule({});
				taskModule.tasks = [task];
				taskModule.substituteFilter = true;
				const result = taskModule.getCourseFilters;

				expect(result).toStrictEqual([
					{
						value: task.courseName,
						text: task.courseName,
						isSubstitution: true,
					},
				]);
			});

			it("should work for empty tasks", () => {
				const taskModule = new TaskModule({});
				taskModule.tasks = [];
				const result = taskModule.getCourseFilters;

				expect(result).toStrictEqual([]);
			});
		});

		describe("isSubstituteFilterEnabled", () => {
			it("should return false by default", () => {
				const taskModule = new TaskModule({});
				expect(taskModule.isSubstituteFilterEnabled).toBe(false);
			});

			it("should return true if enabled", () => {
				const taskModule = new TaskModule({});
				taskModule.substituteFilter = true;
				expect(taskModule.isSubstituteFilterEnabled).toBe(true);
			});
		});

		describe("hasTasks", () => {
			it("should return true if there are any tasks", () => {
				const taskModule = new TaskModule({});
				taskModule.tasks = taskFactory.buildList(3);
				taskModule.status = "completed";
				const hasTasks = taskModule.hasTasks;

				expect(hasTasks).toBe(true);
			});

			it("should return false when tasks are emty", () => {
				const taskModule = new TaskModule({});
				taskModule.status = "completed";
				const hasTasks = taskModule.hasTasks;

				expect(hasTasks).toBe(false);
			});

			it("should return false when the store is not ready", () => {
				const taskModule = new TaskModule({});
				taskModule.tasks = taskFactory.buildList(3);
				taskModule.status = "pending";
				const hasTasks = taskModule.hasTasks;

				expect(hasTasks).toBe(false);
			});
		});

		describe("hasOpenTasksStudent", () => {
			it("should filter by course names", () => {
				const taskModule = new TaskModule({});
				taskModule.courseFilter = ["Mathe"];
				const spy = mockTaskFilter("byCourseNames", []);

				taskModule.hasOpenTasksStudent;

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
				spy.mockRestore();
			});

			it("should filter tasks that are open for students", () => {
				const taskModule = new TaskModule({});
				const spy = mockTaskFilter("byOpenForStudent", []);

				taskModule.hasOpenTasksStudent;

				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it("should return true if the filters yield any results", () => {
				const taskModule = new TaskModule({});
				taskModule.status = "completed";
				const tasks = taskFactory.buildList(1);
				const spy1 = mockTaskFilter("byCourseNames", tasks);
				const spy2 = mockTaskFilter("byOpenForStudent", tasks);

				const result = taskModule.hasOpenTasksStudent;

				expect(result).toBe(true);
				spy1.mockRestore();
				spy2.mockRestore();
			});

			it("should return false if the filters yield no results", () => {
				const taskModule = new TaskModule({});
				taskModule.status = "completed";
				const spy1 = mockTaskFilter("byCourseNames", []);
				const spy2 = mockTaskFilter("byOpenForStudent", []);

				const result = taskModule.hasOpenTasksStudent;

				expect(result).toBe(false);
				spy1.mockRestore();
				spy2.mockRestore();
			});

			it("should return false if the store is not ready", () => {
				const taskModule = new TaskModule({});
				const tasks = taskFactory.buildList(1);
				taskModule.status = "pending";
				const spy1 = mockTaskFilter("byCourseNames", tasks);
				const spy2 = mockTaskFilter("byOpenForStudent", tasks);

				const result = taskModule.hasOpenTasksStudent;

				expect(result).toBe(false);
				spy1.mockRestore();
				spy2.mockRestore();
			});
		});
	});

	describe("hasOpenTasksTeacher", () => {
		it("should filter by substitution teacher", () => {
			const taskModule = new TaskModule({});
			taskModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstitute", []);

			taskModule.hasOpenTasksTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.hasOpenTasksTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for students", () => {
			const taskModule = new TaskModule({});
			const spy = mockTaskFilter("byOpenForTeacher", []);

			taskModule.hasOpenTasksTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return true if the filters yield any results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstitute", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byOpenForTeacher", tasks);

			const result = taskModule.hasOpenTasksTeacher;

			expect(result).toBe(true);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return false if the filters yield no results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const spy1 = mockTaskFilter("filterSubstitute", []);
			const spy2 = mockTaskFilter("byCourseNames", []);
			const spy3 = mockTaskFilter("byOpenForTeacher", []);

			const result = taskModule.hasOpenTasksTeacher;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return false if the store is not ready", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "pending";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstitute", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byOpenForTeacher", tasks);

			const result = taskModule.hasOpenTasksTeacher;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("hasCompletedTasks", () => {
		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.hasCompletedTasks;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are completed", () => {
			const taskModule = new TaskModule({});
			const spy = mockTaskFilter("byCompleted", []);

			taskModule.hasCompletedTasks;

			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return true if the filters yield any results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("byCourseNames", tasks);
			const spy2 = mockTaskFilter("byCompleted", tasks);

			const result = taskModule.hasCompletedTasks;

			expect(result).toBe(true);
			spy1.mockRestore();
			spy2.mockRestore();
		});

		it("should return false if the filters yield no results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const spy1 = mockTaskFilter("byCourseNames", []);
			const spy2 = mockTaskFilter("byCompleted", []);

			const result = taskModule.hasCompletedTasks;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
		});

		it("should return false if the store is not ready", () => {
			const taskModule = new TaskModule({});
			const tasks = taskFactory.buildList(1);
			taskModule.status = "pending";
			const spy1 = mockTaskFilter("byCourseNames", tasks);
			const spy2 = mockTaskFilter("byCompleted", tasks);

			const result = taskModule.hasCompletedTasks;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});

	describe("hasDrafts", () => {
		it("should filter by substitution teacher", () => {
			const taskModule = new TaskModule({});
			taskModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstitute", []);

			taskModule.hasDrafts;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.hasDrafts;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are drafts", () => {
			const taskModule = new TaskModule({});
			const spy = mockTaskFilter("byDraft", []);

			taskModule.hasDrafts;

			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return true if the filters yield any results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstitute", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraft", tasks);

			const result = taskModule.hasDrafts;

			expect(result).toBe(true);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return false if the filters yield no results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const spy1 = mockTaskFilter("filterSubstitute", []);
			const spy2 = mockTaskFilter("byCourseNames", []);
			const spy3 = mockTaskFilter("byDraft", []);

			const result = taskModule.hasDrafts;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});

		it("should return false if the store is not ready", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "pending";
			const tasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("filterSubstitute", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraft", tasks);

			const result = taskModule.hasDrafts;

			expect(result).toBe(false);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("getOpenTasksForStudent", () => {
		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.getOpenTasksForStudent;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for students", () => {
			const taskModule = new TaskModule({});
			const spy = mockTaskFilter("byOpenForStudent", []);

			taskModule.getOpenTasksForStudent;

			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should group the tasks by filters", () => {
			const taskModule = new TaskModule({});
			const overdueTasks = taskFactory.buildList(1);
			const noDueDateTasks = taskFactory.buildList(1);
			const withDueDateTasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("byOverdue", overdueTasks);
			const spy2 = mockTaskFilter("withoutDueDate", noDueDateTasks);
			const spy3 = mockTaskFilter("withDueDate", withDueDateTasks);

			const result = taskModule.getOpenTasksForStudent;

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
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.getCompletedTasksForStudent;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should group the tasks by filters", () => {
			const taskModule = new TaskModule({});
			const submittedTasks = taskFactory.buildList(1);
			const gradedTasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("bySubmitted", submittedTasks);
			const spy2 = mockTaskFilter("byGraded", gradedTasks);

			const result = taskModule.getCompletedTasksForStudent;

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
			const taskModule = new TaskModule({});
			taskModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstitute", []);

			taskModule.getOpenTasksForTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.getOpenTasksForTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for teachers", () => {
			const taskModule = new TaskModule({});
			const spy = mockTaskFilter("byOpenForTeacher", []);

			taskModule.getOpenTasksForTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should group the tasks by filters", () => {
			const taskModule = new TaskModule({});
			const overdueTasks = taskFactory.buildList(1);
			const noDueDateTasks = taskFactory.buildList(1);
			const withDueDateTasks = taskFactory.buildList(1);
			const spy1 = mockTaskFilter("byOverdue", overdueTasks);
			const spy2 = mockTaskFilter("withoutDueDate", noDueDateTasks);
			const spy3 = mockTaskFilter("withDueDate", withDueDateTasks);

			const result = taskModule.getOpenTasksForTeacher;

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
			const taskModule = new TaskModule({});
			taskModule.substituteFilter = true;
			const spy = mockTaskFilter("filterSubstitute", []);

			taskModule.getDraftTasksForTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.substituteFilter);
			spy.mockRestore();
		});

		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = mockTaskFilter("byCourseNames", []);

			taskModule.getDraftTasksForTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			spy.mockRestore();
		});

		it("should filter tasks that are open for teachers", () => {
			const taskModule = new TaskModule({});
			const spy = mockTaskFilter("byDraft", []);

			taskModule.getDraftTasksForTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			spy.mockRestore();
		});

		it("should return the result of the filters", () => {
			const taskModule = new TaskModule({});
			const tasks = (taskModule.tasks = taskFactory.buildList(2));
			const spy1 = mockTaskFilter("filterSubstitute", tasks);
			const spy2 = mockTaskFilter("byCourseNames", tasks);
			const spy3 = mockTaskFilter("byDraft", tasks);

			const result = taskModule.getDraftTasksForTeacher;

			expect(result).toEqual(tasks);
			spy1.mockRestore();
			spy2.mockRestore();
			spy3.mockRestore();
		});
	});

	describe("getTasksCountPerCourseStudent", () => {
		it("should count open and completed tasks by course name", () => {
			const taskModule = new TaskModule({});
			const opentTasks = taskFactory.buildList(2, { courseName: "Mathe" });
			const spy1 = mockTaskFilter("byOpenForStudent", opentTasks);
			const completedTasks = taskFactory.buildList(3, {
				courseName: "Deutsch",
			});
			const spy2 = mockTaskFilter("byCompleted", completedTasks);

			const result = taskModule.getTasksCountPerCourseStudent;

			expect(spy1).toHaveBeenCalledTimes(1);
			expect(spy2).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				open: { Mathe: 2 },
				completed: { Deutsch: 3 },
			});
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});

	describe("getTasksCountPerCourseTeacher", () => {
		it("should count open and draft tasks by course name", () => {
			const taskModule = new TaskModule({});
			const opentTasks = taskFactory.buildList(4, { courseName: "Mathe" });
			const spy1 = mockTaskFilter("byOpenForTeacher", opentTasks);
			const draftTasks = taskFactory.buildList(2, {
				courseName: "Deutsch",
			});
			const spy2 = mockTaskFilter("byDraft", draftTasks);

			const result = taskModule.getTasksCountPerCourseTeacher;

			expect(spy1).toHaveBeenCalledTimes(1);
			expect(spy2).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				open: { Mathe: 4 },
				drafts: { Deutsch: 2 },
			});
			spy1.mockRestore();
			spy2.mockRestore();
		});

		it("should count open and draft tasks when course name is empty", () => {
			const taskModule = new TaskModule({});
			const opentTasks = taskFactory.buildList(4, { courseName: "" });
			const spy1 = mockTaskFilter("byOpenForTeacher", opentTasks);
			const draftTasks = taskFactory.buildList(2, { courseName: "" });
			const spy2 = mockTaskFilter("byDraft", draftTasks);

			const result = taskModule.getTasksCountPerCourseTeacher;

			expect(spy1).toHaveBeenCalledTimes(1);
			expect(spy2).toHaveBeenCalledTimes(1);
			expect(result).toEqual({
				open: { "": 4 },
				drafts: { "": 2 },
			});
			spy1.mockRestore();
			spy2.mockRestore();
		});
	});
});
