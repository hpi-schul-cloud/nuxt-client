import {
	tasks,
	submittedTasks,
	gradedTasks,
	openTasksWithDueDate,
	openTasksWithoutDueDate,
	openTasks,
	overDueTasks,
	coursesStudent,
	coursesTeacher,
	mathTasks,
	tasksTeacher,
	overDueTasksTeacher,
	noDueDateTasksTeacher,
	dueDateTasksTeacher,
	drafts,
	allTasksTeacher,
	tasksCountTeacher,
	tasksCountStudent,
} from "@@/stories/mockData/Tasks";
import storeModule from "./tasks";

describe("store/tasks", () => {
	describe("actions", () => {
		const spyCommit = jest.fn();
		const ctxMock = {
			commit: spyCommit,
		};

		describe("getAllTasks", () => {
			it("should call the right endpoint", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};

				await storeModule.actions.getAllTasks(ctxMock);
				expect(spyCommit.mock.calls).toHaveLength(4);
				expect(spyCommit.mock.calls[2][0]).toBe("setTasks");
				expect(receivedRequests[0].url).toStrictEqual("/v3/tasks/");
			});

			it("should set business error and reset loading on fail", async () => {
				const mockAxiosError = new Error();
				mockAxiosError.response = {
					data: {
						error: "error",
						message: "error message",
						statusCode: 404,
					},
				};

				storeModule.actions.$axios = {
					$get: async () => {
						throw mockAxiosError;
					},
				};

				spyCommit.mockClear();
				await storeModule.actions.getAllTasks(ctxMock);

				const storeCalls = spyCommit.mock.calls;
				const firstCall = storeCalls[0];
				const secondCall = storeCalls[1];
				const thirdCall = storeCalls[2];
				const fourthCall = storeCalls[3];

				expect(firstCall[0]).toBe("resetBusinessError");
				expect(secondCall[0]).toBe("setStatus");
				expect(thirdCall[0]).toBe("setBusinessError");
				expect(fourthCall[0]).toBe("setStatus");

				const secondCommit = secondCall[1];
				const thirdCommit = thirdCall[1];
				const fourthCommit = fourthCall[1];

				expect(secondCommit).toBe("pending");
				expect(thirdCommit).toBe(mockAxiosError.response.data);
				expect(fourthCommit).toBe("error");
			});

			it("should set loading state when fetching tasks", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};
				spyCommit.mockClear();
				await storeModule.actions.getAllTasks(ctxMock);

				const storeCalls = spyCommit.mock.calls;

				const secondCall = storeCalls[1];
				const fourthCall = storeCalls[3];
				expect(secondCall[0]).toBe("setStatus");
				expect(fourthCall[0]).toBe("setStatus");

				const secondCommit = secondCall[1];
				const fourthCommit = fourthCall[1];
				expect(secondCommit).toBe("pending");
				expect(fourthCommit).toBe("completed");
			});
		});
	});

	describe("mutations", () => {
		describe("setTasks", () => {
			it("Should set tasks in state", () => {
				const { setTasks } = storeModule.mutations;
				const state = {
					tasks: [],
				};
				setTasks(state, tasks);
				expect(state.tasks).toStrictEqual(tasks);
			});
		});

		describe("setFilter", () => {
			it("Should set course filter in state", () => {
				const { setFilter } = storeModule.mutations;
				const state = {
					courseFilter: [],
				};
				setFilter(state, coursesTeacher);
				expect(state.courseFilter).toStrictEqual(coursesTeacher);
			});
		});

		describe("setStatus", () => {
			it("Should set status in state", () => {
				const { setStatus } = storeModule.mutations;
				const state = {
					status: "",
				};
				setStatus(state, "pending");
				expect(state.status).toStrictEqual("pending");
			});
		});

		describe("setBusinessError", () => {
			it("Should set business error in state", () => {
				const { setBusinessError } = storeModule.mutations;
				const state = {
					businessError: {},
				};
				setBusinessError(state, {
					statusCode: "404",
					message: "404 - Can't find page",
				});
				expect(state.businessError).toStrictEqual({
					statusCode: "404",
					message: "404 - Can't find page",
				});
			});
		});

		describe("resetBusinessError", () => {
			it("Should reset business error in state", () => {
				const { resetBusinessError } = storeModule.mutations;
				const state = {
					businessError: {},
				};
				resetBusinessError(state);
				expect(state.businessError).toStrictEqual({
					statusCode: "",
					message: "",
				});
			});
		});
	});

	describe("getters", () => {
		const studentState = {
			tasks,
			status: "completed",
			courseFilter: [],
		};
		const studentStateWithoutCompleted = {
			tasks: openTasks,
			status: "completed",
			courseFilter: [],
		};
		const teacherState = {
			tasks: tasksTeacher,
			status: "completed",
			courseFilter: [],
		};
		const teacherStateWithFilter = {
			tasks: tasksTeacher,
			status: "completed",
			courseFilter: ["Mathe"],
		};
		const teacherStateWithDrafts = {
			tasks: allTasksTeacher,
			status: "completed",
			courseFilter: [],
		};
		const { getters } = storeModule;

		describe("getTasks", () => {
			it("Should return all tasks", () => {
				expect(getters.getTasks(studentState)).toStrictEqual(tasks);
			});
		});

		describe("getStatus", () => {
			it("Should return status", () => {
				expect(getters.getStatus(studentState)).toStrictEqual("completed");
			});
		});

		describe("getCourses", () => {
			it("Should return all relevant courses", () => {
				expect(getters.getCourses(studentState)).toStrictEqual(coursesStudent);
			});
		});

		describe("hasNoOpenTasksStudent", () => {
			it("Should return true, if it's loaded and there are no open tasks for the student", () => {
				expect(getters.hasNoTasks(studentState)).toBe(false);
			});
		});

		describe("hasNoCompletedTasks", () => {
			it("Should return true, if it's loaded and there are no completed tasks", () => {
				expect(getters.hasNoCompletedTasks(studentStateWithoutCompleted)).toBe(
					true
				);
			});
		});

		describe("hasNoOpenTasksTeacher", () => {
			it("Should return true, if it's loaded and there are no open tasks for the teacher", () => {
				expect(getters.hasNoOpenTasksTeacher(teacherState)).toBe(false);
			});
		});

		describe("hasNoDrafts", () => {
			it("Should return true, if it's loaded and there are no drafts", () => {
				expect(getters.hasNoDrafts(teacherState)).toBe(true);
			});
		});

		describe("getOpenTasksForStudent", () => {
			it("Should have properties for sub sets", () => {
				expect(getters.getOpenTasksForStudent(studentState)).toHaveProperty(
					"overdue"
				);
				expect(getters.getOpenTasksForStudent(studentState)).toHaveProperty(
					"noDueDate"
				);
				expect(getters.getOpenTasksForStudent(studentState)).toHaveProperty(
					"withDueDate"
				);
			});

			it("Should have tasks with due date", () => {
				expect(
					getters.getOpenTasksForStudent(studentState).withDueDate
				).toHaveLength(openTasksWithDueDate.length);
			});

			it("Should have tasks with no due date", () => {
				expect(
					getters.getOpenTasksForStudent(studentState).noDueDate
				).toHaveLength(openTasksWithoutDueDate.length);
			});

			it("Should have overdue tasks", () => {
				expect(
					getters.getOpenTasksForStudent(studentState).overdue
				).toHaveLength(overDueTasks.length);
			});
		});

		describe("getCompletedTasksForStudent", () => {
			it("Should have properties for sub sets", () => {
				expect(
					getters.getCompletedTasksForStudent(studentState)
				).toHaveProperty("submitted");
				expect(
					getters.getCompletedTasksForStudent(studentState)
				).toHaveProperty("graded");
			});

			it("Should have all tasks, that are submitted", () => {
				expect(
					getters.getCompletedTasksForStudent(studentState).submitted
				).toStrictEqual(submittedTasks);
			});

			it("Should have all tasks, that are graded", () => {
				expect(
					getters.getCompletedTasksForStudent(studentState).graded
				).toStrictEqual(gradedTasks);
			});
		});

		describe("getOpenTasksForTeacher", () => {
			it("Should have properties for sub sets", () => {
				expect(getters.getOpenTasksForTeacher(teacherState)).toHaveProperty(
					"overdue"
				);
				expect(getters.getOpenTasksForTeacher(teacherState)).toHaveProperty(
					"noDueDate"
				);
				expect(getters.getOpenTasksForTeacher(teacherState)).toHaveProperty(
					"withDueDate"
				);
			});

			it("Should have tasks with due date", () => {
				expect(
					getters.getOpenTasksForTeacher(teacherState).withDueDate
				).toHaveLength(dueDateTasksTeacher.length);
			});

			it("Should have tasks with no due date", () => {
				expect(
					getters.getOpenTasksForTeacher(teacherState).noDueDate
				).toHaveLength(noDueDateTasksTeacher.length);
			});

			it("Should have overdue tasks", () => {
				expect(
					getters.getOpenTasksForTeacher(teacherState).overdue
				).toHaveLength(overDueTasksTeacher.length);
			});

			it("Should correctly filter tasks", () => {
				const filteredTasks = getters.getOpenTasksForTeacher(
					teacherStateWithFilter
				);

				expect(
					filteredTasks.overdue
						.concat(filteredTasks.noDueDate)
						.concat(filteredTasks.withDueDate)
				).toHaveLength(mathTasks.length);
			});
		});

		describe("getDraftTasksForTeacher", () => {
			it("Should have all tasks, that are drafts", () => {
				expect(
					getters.getDraftTasksForTeacher(teacherStateWithDrafts)
				).toStrictEqual(drafts);
			});
		});

		describe("getTasksCountPerCourseStudent", () => {
			it("Should have correct amount of tasks per course", () => {
				const mockGetter = {
					getCourses: coursesStudent,
				};

				expect(
					getters.getTasksCountPerCourseStudent(studentState, mockGetter).open
				).toStrictEqual(tasksCountStudent.open);

				expect(
					getters.getTasksCountPerCourseStudent(studentState, mockGetter).completed
				).toStrictEqual(tasksCountStudent.completed);
			});
		});

		describe("getTasksCountPerCourseTeacher", () => {
			it("Should have correct amount of tasks per course", () => {
				const mockGetter = {
					getCourses: coursesTeacher,
				};

				expect(
					getters.getTasksCountPerCourseTeacher(teacherStateWithDrafts, mockGetter).open
				).toStrictEqual(tasksCountTeacher.open);

				expect(
					getters.getTasksCountPerCourseTeacher(teacherStateWithDrafts, mockGetter).drafts
				).toStrictEqual(tasksCountTeacher.drafts);
			});
		});
	});
});
