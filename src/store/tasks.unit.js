import mocks from "@@/stories/mockData/Tasks";
import storeModule from "./tasks";

// please carful by importing / exporting before i changed to default export, wrong values are tested
const {
	tasks,
	submittedTasks,
	gradedTasks,
	openTasks,
	tasksTeacher,
	drafts,
	allTasksTeacher,
	tasksCountTeacher,
	tasksCountStudent,
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

		describe("changeFilters", () => {
			const { changeFilters } = storeModule.mutations;

			it("should change value of existing filter", () => {
				const state = storeModule.state();

				const filterBefore = state.filters.find(
					(f) => f.id === "$filter:PrimaryTeacher"
				);
				// invert existing value
				const value = !filterBefore.value;

				changeFilters(state, { id: "$filter:PrimaryTeacher", value });

				const filterAfter = state.filters.find(
					(f) => f.id === "$filter:PrimaryTeacher"
				);

				expect(filterAfter.value).toBe(false);
			});

			// maybe it is a part of the store key check
			describe("when a PrimaryTeacher filter is in store", () => {
				it("should exist", () => {
					const state = storeModule.state();

					const exist = state.filters.some(
						(f) => f.id === "$filter:PrimaryTeacher"
					);

					expect(exist).toBe(true);
				});

				it("should set to be true by default", () => {
					const state = storeModule.state();

					const filter = state.filters.find(
						(f) => f.id === "$filter:PrimaryTeacher"
					);

					expect(filter.value).toBe(true);
				});
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

		describe("getTasks", () => {
			const { getTasks } = storeModule.getters;

			it("Should return all tasks", () => {
				const result = getTasks(studentState);

				expect(result).toStrictEqual(tasks);
			});
		});

		describe("getStatus", () => {
			const { getStatus } = storeModule.getters;

			it("Should return status", () => {
				const result = getStatus(studentState);

				expect(result).toStrictEqual("completed");
			});
		});

		describe("hasNoTasks", () => {
			const { hasNoTasks } = storeModule.getters;

			it("Should return true, if it's loaded and there are no open tasks for the student", () => {
				const result = hasNoTasks(studentState);

				expect(result).toBe(false);
			});
		});

		describe("hasNoCompletedTasks", () => {
			const { hasNoCompletedTasks } = storeModule.getters;

			it("Should return true, if it's loaded and there are no completed tasks", () => {
				const studentStateWithoutCompleted = Object.assign(
					storeModule.state(),
					{
						tasks: openTasks,
						status: "completed",
						courseFilter: [],
					}
				);

				const result = hasNoCompletedTasks(studentStateWithoutCompleted);

				expect(result).toBe(true);
			});
		});

		describe("hasNoOpenTasksTeacher", () => {
			const { hasNoOpenTasksTeacher } = storeModule.getters;

			it("Should return true, if it's loaded and there are no open tasks for the teacher", () => {
				const result = hasNoOpenTasksTeacher(teacherState);

				expect(result).toBe(false);
			});
		});

		describe("hasNoDrafts", () => {
			const { hasNoDrafts } = storeModule.getters;

			it("Should return true, if it's loaded and there are no drafts", () => {
				const result = hasNoDrafts(teacherState);

				expect(result).toBe(true);
			});
		});

		describe("hasFilterSelected", () => {
			const { hasFilterSelected } = storeModule.getters;

			it("Should return true, if it's loaded and there are no drafts", () => {
				const result = hasFilterSelected(teacherStateWithFilter);

				expect(result).toBe(true);
			});

			it("should return false, if no draft exist", () => {
				// TODO: prepare right test data
				const result = hasFilterSelected(teacherState);

				expect(result).toBe(false);
			});

			it.todo("should return false if loading state is not equal loading.");
		});

		describe("getOpenTasksForStudent", () => {
			const { getOpenTasksForStudent } = storeModule.getters;

			it("Should have properties for sub sets", () => {
				const result = getOpenTasksForStudent(studentState);

				const test = Object.keys(result).sort();
				expect(test).toStrictEqual(
					["overdue", "noDueDate", "withDueDate"].sort()
				);
			});

			it("Should filter tasks correctly", () => {
				const result = getOpenTasksForStudent(studentState);

				expect(result.overdue).toHaveLength(4);
				expect(result.noDueDate).toHaveLength(1);
				expect(result.withDueDate).toHaveLength(6);
			});
		});

		describe("getCompletedTasksForStudent", () => {
			const { getCompletedTasksForStudent } = storeModule.getters;

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
			const { getOpenTasksForTeacher } = storeModule.getters;

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
			const { getDraftTasksForTeacher } = storeModule.getters;

			it("Should have all tasks, that are drafts", () => {
				const result = getDraftTasksForTeacher(teacherStateWithDrafts);

				expect(result).toStrictEqual(drafts);
			});
		});

		describe("getTasksCountPerCourseStudent", () => {
			const { getTasksCountPerCourseStudent } = storeModule.getters;

			it("Should have correct amount of tasks per course", () => {
				const result = getTasksCountPerCourseStudent(studentState);

				expect(result.open).toStrictEqual(tasksCountStudent.open);
				expect(result.completed).toStrictEqual(tasksCountStudent.completed);
			});
		});

		describe("getTasksCountPerCourseTeacher", () => {
			const { getTasksCountPerCourseTeacher } = storeModule.getters;

			it("Should have correct amount of tasks per course", () => {
				const result = getTasksCountPerCourseTeacher(teacherStateWithDrafts);

				expect(result.open).toStrictEqual(tasksCountTeacher.open);
				expect(result.drafts).toStrictEqual(tasksCountTeacher.drafts);
			});
		});
	});
});
