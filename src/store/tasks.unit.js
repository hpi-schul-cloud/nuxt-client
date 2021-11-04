import mocks from "@@/stories/mockData/Tasks";
import storeModule from "./tasks";

// please carful by importing / exporting before i changed to default export, wrong values are tested
const {
	tasks,
	submittedTasks,
	gradedTasks,
	tasksTeacher,
	drafts,
	allTasksTeacher,
	tasksCountTeacher,
	tasksCountStudent,
	generateTask,
} = mocks;

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
			const { setTasks } = storeModule.mutations;

			it("Should set tasks in state", () => {
				const state = storeModule.state();

				setTasks(state, tasks);

				expect(state.tasks).toStrictEqual(tasks);
			});
		});

		describe("setCourseFilters", () => {
			const { setCourseFilters } = storeModule.mutations;

			it("Should set course names as filter in state", () => {
				const courseNames = ["a", "b", "c"];
				const state = storeModule.state();

				setCourseFilters(state, courseNames);

				expect(state.courseFilter).toStrictEqual(courseNames);
			});
		});

		describe("setSubstituteFilter", () => {
			const { setSubstituteFilter } = storeModule.mutations;

			it("should set false by default", () => {
				const state = storeModule.state();

				expect(state.substituteFilter).toBe(false);
			});

			it("should set value", () => {
				const state = storeModule.state();

				setSubstituteFilter(state, true);

				expect(state.substituteFilter).toBe(true);
			});
		});

		describe("setStatus", () => {
			const { setStatus } = storeModule.mutations;

			it("Should set status in state", () => {
				const state = storeModule.state();

				setStatus(state, "pending");

				expect(state.status).toStrictEqual("pending");
			});

			it.todo("enum check");
		});

		describe("setBusinessError", () => {
			it("Should set business error in state", () => {
				const { setBusinessError } = storeModule.mutations;
				const state = Object.assign(storeModule.state(), {
					businessError: {},
				});
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
		const {
			hasTasks,
			hasOpenTasksStudent,
			hasOpenTasksTeacher,
			hasCompletedTasks,
			hasDrafts,
			hasFilterSelected,
			getTasks,
			getStatus,
			getCourseFilters,
			isSubstituteFilterEnabled,
			getOpenTasksForStudent,
			getCompletedTasksForStudent,
			getOpenTasksForTeacher,
			getDraftTasksForTeacher,
			getTasksCountPerCourseStudent,
			getTasksCountPerCourseTeacher,
		} = storeModule.getters;

		// TODO: replace with real store modification and put it directly to the test
		const studentState = Object.assign(storeModule.state(), {
			tasks,
			status: "completed",
			courseFilter: [],
		});

		const teacherState = Object.assign(storeModule.state(), {
			tasks: tasksTeacher,
			status: "completed",
			courseFilter: [],
		});

		const teacherStateWithFilter = Object.assign(storeModule.state(), {
			tasks: tasksTeacher,
			status: "completed",
			courseFilter: ["Mathe"],
		});

		const teacherStateWithDrafts = Object.assign(storeModule.state(), {
			tasks: allTasksTeacher,
			status: "completed",
			courseFilter: [],
		});

		describe("getCourseFilters", () => {
			it("should work for empty tasks", () => {
				const state = Object.assign(storeModule.state(), {
					tasks: [],
				});

				const result = getCourseFilters(state);

				expect(result).toStrictEqual([]);
			});

			describe("where user is a student or a primary teacher of the courses", () => {
				it("should return formated filter", () => {
					const task = generateTask();
					const state = Object.assign(storeModule.state(), {
						tasks: [task],
						substituteFilter: false,
					});

					const result = getCourseFilters(state);

					expect(result).toStrictEqual([
						{
							value: task.courseName,
							text: task.courseName,
							isSubstitution: false,
						},
					]);
				});

				it("should return a unique list of filters based on the course name", () => {
					const task1 = generateTask();
					const task2 = generateTask(undefined, {
						courseName: task1.courseName,
					});

					const state = Object.assign(storeModule.state(), {
						tasks: [task1, task2],
						substituteFilter: false,
					});

					const result = getCourseFilters(state);

					expect(result).toStrictEqual([
						{
							value: task1.courseName,
							text: task1.courseName,
							isSubstitution: false,
						},
					]);
				});

				it("should not return filter of task with substitution flag", () => {
					const task = generateTask({ isSubstitutionTeacher: true });
					const state = Object.assign(storeModule.state(), {
						tasks: [task],
						substituteFilter: false,
					});

					const result = getCourseFilters(state);

					expect(result).toStrictEqual([]);
				});
			});

			describe("where user is substiution teacher in the courses", () => {
				it("should return formated filter of task with substitution flag", () => {
					const task = generateTask({ isSubstitutionTeacher: true });
					const state = Object.assign(storeModule.state(), {
						tasks: [task],
						substituteFilter: true,
					});

					const result = getCourseFilters(state);

					expect(result).toStrictEqual([
						{
							value: task.courseName,
							text: task.courseName,
							isSubstitution: true,
						},
					]);
				});

				it("should return filter of task without substitution flag", () => {
					const task = generateTask();
					const state = Object.assign(storeModule.state(), {
						tasks: [task],
						substituteFilter: true,
					});

					const result = getCourseFilters(state);

					expect(result).toStrictEqual([
						{
							value: task.courseName,
							text: task.courseName,
							isSubstitution: false,
						},
					]);
				});
			});
		});

		describe("isSubstituteFilterEnabled", () => {
			it("should return the stored value", () => {
				const state = Object.assign(storeModule.state());

				const result = isSubstituteFilterEnabled(state);

				expect(result).toStrictEqual(state.substituteFilter);
			});
		});

		describe("hasOpenTasksStudent", () => {
			it("should true if tasks is selected by course filter", () => {
				const task = generateTask();
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [task.courseName],
				});

				const result = hasOpenTasksStudent(state);

				expect(result).toBe(true);
			});

			it("should return true if open tasks exist and state is completed", () => {
				const task = generateTask();
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksStudent(state);

				expect(result).toBe(true);
			});

			it("should false if loading state is not completed", () => {
				const task = generateTask();
				const state = Object.assign(storeModule.state(), {
					status: "pending",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksStudent(state);

				expect(result).toBe(false);
			});

			it("should false if no task exist", () => {
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [],
					courseFilter: [],
				});

				const result = hasOpenTasksStudent(state);

				expect(result).toBe(false);
			});

			it("should return false if tasks already finished (graded+submitted)", () => {
				const task = generateTask({ graded: 1, submitted: 1 });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksStudent(state);

				expect(result).toBe(false);
			});

			it("should return false if tasks are drafts", () => {
				const task = generateTask({ isDraft: true });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksStudent(state);

				expect(result).toBe(false);
			});
		});

		describe("hasOpenTasksTeacher", () => {
			it.todo("should call executeFilters");

			it("should true if tasks is selected by course filter", () => {
				const task = generateTask();
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [task.courseName],
				});

				const result = hasOpenTasksTeacher(state);

				expect(result).toBe(true);
			});

			it("should return true by finished (graded+submitted) tasks", () => {
				const task = generateTask({ graded: 1, submitted: 1 });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksTeacher(state);

				expect(result).toBe(true);
			});

			it("should false if loading state is not completed", () => {
				const task = generateTask();
				const state = Object.assign(storeModule.state(), {
					status: "pending",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksTeacher(state);

				expect(result).toBe(false);
			});

			it("should false if no task exist", () => {
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [],
					courseFilter: [],
				});

				const result = hasOpenTasksTeacher(state);

				expect(result).toBe(false);
			});

			it("should return false if tasks are drafts", () => {
				const task = generateTask({ isDraft: true });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasOpenTasksTeacher(state);

				expect(result).toBe(false);
			});
		});

		describe("getTasks", () => {
			it("Should return all tasks", () => {
				const result = getTasks(studentState);

				expect(result).toStrictEqual(tasks);
			});
		});

		describe("getStatus", () => {
			it("Should return status", () => {
				const result = getStatus(studentState);

				expect(result).toStrictEqual("completed");
			});
		});

		describe("hasTasks", () => {
			it("Should return true, if it's loaded and there are  open tasks for the student", () => {
				const task = generateTask();
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});
				const result = hasTasks(state);

				expect(result).toBe(true);
			});

			it("Should return false, if no task exist", () => {
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [],
					courseFilter: [],
				});
				const result = hasTasks(state);

				expect(result).toBe(false);
			});

			it("Should return false, if status is not completed", () => {
				const state = Object.assign(storeModule.state(), {
					status: "pending",
					tasks: [],
					courseFilter: [],
				});
				const result = hasTasks(state);

				expect(result).toBe(false);
			});
		});

		describe("hasCompletedTasks", () => {
			it("should false if loading state is not completed", () => {
				const task = generateTask({ submitted: 1 });
				const state = Object.assign(storeModule.state(), {
					status: "pending",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasCompletedTasks(state);

				expect(result).toBe(false);
			});

			it("should false if no task exist", () => {
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [],
					courseFilter: [],
				});

				const result = hasCompletedTasks(state);

				expect(result).toBe(false);
			});

			describe("where the user is a student", () => {
				it("should return true if tasks has more then one status.submitted", () => {
					const task = generateTask({ submitted: 1 });
					const state = Object.assign(storeModule.state(), {
						status: "completed",
						tasks: [task],
						courseFilter: [],
					});

					const result = hasCompletedTasks(state);

					expect(result).toBe(true);
				});

				it("should return true if tasks has more then one status.graded", () => {
					const task = generateTask({ graded: 1 });
					const state = Object.assign(storeModule.state(), {
						status: "completed",
						tasks: [task],
						courseFilter: [],
					});

					const result = hasCompletedTasks(state);

					expect(result).toBe(true);
				});

				it("should true if tasks is selected by course filter", () => {
					const task = generateTask({ submitted: 1 });
					const state = Object.assign(storeModule.state(), {
						status: "completed",
						tasks: [task],
						courseFilter: [task.courseName],
					});

					const result = hasCompletedTasks(state);

					expect(result).toBe(true);
				});
			});
		});

		describe("hasDrafts", () => {
			it.todo("should call executeFilters");

			it("should return true by draft tasks", () => {
				const task = generateTask({ isDraft: true });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasDrafts(state);

				expect(result).toBe(true);
			});

			it("should return false if it is not a draft tasks", () => {
				const task = generateTask({ isDraft: false });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasDrafts(state);

				expect(result).toBe(false);
			});

			it("should true if tasks is selected by course filter", () => {
				const task = generateTask({ isDraft: true });
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [task],
					courseFilter: [task.courseName],
				});

				const result = hasDrafts(state);

				expect(result).toBe(true);
			});

			it("should false if loading state is not completed", () => {
				const task = generateTask({ isDraft: true });
				const state = Object.assign(storeModule.state(), {
					status: "pending",
					tasks: [task],
					courseFilter: [],
				});

				const result = hasDrafts(state);

				expect(result).toBe(false);
			});

			it("should false if no task exist", () => {
				const state = Object.assign(storeModule.state(), {
					status: "completed",
					tasks: [],
					courseFilter: [],
				});

				const result = hasDrafts(state);

				expect(result).toBe(false);
			});
		});

		describe("hasFilterSelected", () => {
			it("Should return true, if it's loaded and there are drafts", () => {
				const state = Object.assign(storeModule.state(), {
					courseFilter: ["abc"],
				});

				const result = hasFilterSelected(state);

				expect(result).toBe(true);
			});

			it("should return false, if draft exist", () => {
				const state = Object.assign(storeModule.state(), {
					courseFilter: [],
				});

				const result = hasFilterSelected(state);

				expect(result).toBe(false);
			});

			it.todo("should return false if loading state is not equal loading.");
		});

		describe("getOpenTasksForStudent", () => {
			it("Should have properties for sub sets", () => {
				const result = getOpenTasksForStudent(studentState);

				const test = Object.keys(result).sort();
				expect(test).toStrictEqual(
					["overdue", "noDueDate", "withDueDate"].sort()
				);
			});

			it("Should filter tasks correctly", () => {
				const result = getOpenTasksForStudent(studentState);

				expect(result.overdue).toHaveLength(3);
				expect(result.noDueDate).toHaveLength(1);
				expect(result.withDueDate).toHaveLength(4);
			});
		});

		describe("getCompletedTasksForStudent", () => {
			it("Should have properties for sub sets", () => {
				const result = getCompletedTasksForStudent(studentState);

				const test = Object.keys(result).sort();
				expect(test).toStrictEqual(["submitted", "graded"].sort());
			});

			it("Should have all tasks, that are submitted", () => {
				const result = getCompletedTasksForStudent(studentState);

				expect(result.submitted).toStrictEqual(submittedTasks);
			});

			it("Should have all tasks, that are graded", () => {
				const result = getCompletedTasksForStudent(studentState);

				expect(result.graded).toStrictEqual(gradedTasks);
			});
		});

		describe("getOpenTasksForTeacher", () => {
			it("Should have properties for sub sets", () => {
				const result = getOpenTasksForTeacher(teacherState);

				const test = Object.keys(result).sort();
				expect(test).toStrictEqual(
					["overdue", "noDueDate", "withDueDate"].sort()
				);
			});

			it("Should filter tasks correctly", () => {
				const result = getOpenTasksForTeacher(teacherState);

				expect(result.withDueDate).toHaveLength(4);
				expect(result.noDueDate).toHaveLength(1);
				expect(result.overdue).toHaveLength(3);
			});

			it("Should correctly filter tasks", () => {
				const filteredTasks = getOpenTasksForTeacher(teacherStateWithFilter);

				// TODO: test data preparation
				expect(
					filteredTasks.overdue
						.concat(filteredTasks.noDueDate)
						.concat(filteredTasks.withDueDate)
				).toHaveLength(5);
			});
		});

		describe("getDraftTasksForTeacher", () => {
			it("Should have all tasks, that are drafts", () => {
				const result = getDraftTasksForTeacher(teacherStateWithDrafts);

				expect(result).toStrictEqual(drafts);
			});
		});

		describe("getTasksCountPerCourseStudent", () => {
			it("Should have correct amount of tasks per course", () => {
				const result = getTasksCountPerCourseStudent(studentState);

				expect(result.open).toStrictEqual(tasksCountStudent.open);
				expect(result.completed).toStrictEqual(tasksCountStudent.completed);
			});
		});

		describe("getTasksCountPerCourseTeacher", () => {
			it("Should have correct amount of tasks per course", () => {
				const result = getTasksCountPerCourseTeacher(teacherStateWithDrafts);

				expect(result.open).toStrictEqual(tasksCountTeacher.open);
				expect(result.drafts).toStrictEqual(tasksCountTeacher.drafts);
			});
		});
	});
});
