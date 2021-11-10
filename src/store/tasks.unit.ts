import { TaskModule } from "./tasks";
import * as serverApi from "../serverApi/v3/api";
import { taskFactory } from "./task.filter.unit";
import { TaskFilter } from "./task.filter";

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
		describe("getTasks", () => {
			it("should return an empty list by default", () => {
				const taskModule = new TaskModule({});
				const tasks = taskModule.getTasks;

				expect(tasks).toHaveLength(0);
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

		describe("hasOpenTasksStudent", () => {
			it("should filter by course names", () => {
				const taskModule = new TaskModule({});
				taskModule.courseFilter = ["Mathe"];
				const spy = (TaskFilter.prototype.byCourseNames = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([])));

				taskModule.hasOpenTasksStudent;

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
			});

			it("should filter tasks that are open for students", () => {
				const taskModule = new TaskModule({});
				const spy = (TaskFilter.prototype.byOpenForStudent = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([])));

				taskModule.hasOpenTasksStudent;

				expect(spy).toHaveBeenCalledTimes(1);
			});

			it("should return true if the filters yield any results", () => {
				const taskModule = new TaskModule({});
				taskModule.status = "completed";
				const task = taskFactory.build();
				TaskFilter.prototype.byCourseNames = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([task]));

				TaskFilter.prototype.byOpenForStudent = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([task]));

				const result = taskModule.hasOpenTasksStudent;

				expect(result).toBe(true);
			});

			it("should return false if the filters yield no results", () => {
				const taskModule = new TaskModule({});
				taskModule.status = "completed";
				TaskFilter.prototype.byCourseNames = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([]));

				TaskFilter.prototype.byOpenForStudent = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([]));

				const result = taskModule.hasOpenTasksStudent;

				expect(result).toBe(false);
			});

			it("should return false if the store is not ready", () => {
				const taskModule = new TaskModule({});
				const task = taskFactory.build();
				taskModule.status = "pending";
				TaskFilter.prototype.byCourseNames = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([task]));

				TaskFilter.prototype.byOpenForStudent = jest
					.fn()
					.mockImplementationOnce(() => new TaskFilter([task]));

				const result = taskModule.hasOpenTasksStudent;

				expect(result).toBe(false);
			});
		});
	});

	describe("hasOpenTasksTeacher", () => {
		it("should filter by substitution teacher", () => {
			const taskModule = new TaskModule({});
			taskModule.substituteFilter = true;
			const spy = (TaskFilter.prototype.filterSubstitute = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([])));

			taskModule.hasOpenTasksTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.substituteFilter);
		});

		it("should filter by course names", () => {
			const taskModule = new TaskModule({});
			taskModule.courseFilter = ["Mathe"];
			const spy = (TaskFilter.prototype.byCourseNames = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([])));

			taskModule.hasOpenTasksTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(taskModule.courseFilter);
		});

		it("should filter tasks that are open for students", () => {
			const taskModule = new TaskModule({});
			const spy = (TaskFilter.prototype.byOpenForTeacher = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([])));

			taskModule.hasOpenTasksTeacher;

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it("should return true if the filters yield any results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			const task = taskFactory.build();
			TaskFilter.prototype.byCourseNames = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([task]));

			TaskFilter.prototype.byOpenForStudent = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([task]));

			const result = taskModule.hasOpenTasksTeacher;

			expect(result).toBe(true);
		});

		it("should return false if the filters yield no results", () => {
			const taskModule = new TaskModule({});
			taskModule.status = "completed";
			TaskFilter.prototype.byCourseNames = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([]));

			TaskFilter.prototype.byOpenForStudent = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([]));

			const result = taskModule.hasOpenTasksTeacher;

			expect(result).toBe(false);
		});

		it("should return false if the store is not ready", () => {
			const taskModule = new TaskModule({});
			const task = taskFactory.build();
			taskModule.status = "pending";
			TaskFilter.prototype.byCourseNames = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([task]));

			TaskFilter.prototype.byOpenForStudent = jest
				.fn()
				.mockImplementationOnce(() => new TaskFilter([task]));

			const result = taskModule.hasOpenTasksTeacher;

			expect(result).toBe(false);
		});
	});
});
