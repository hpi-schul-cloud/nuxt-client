import {
	homeworks,
	openHomeworks,
	completedHomeworks,
	submittedHomeworks,
	gradedHomeworks,
	openHomeworksWithDueDate,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
	coursesStudent,
	coursesTeacher,
	coursesOpen,
	coursesCompleted,
	mathHomeworks,
	homeworksTeacher,
	overDueHomeworksTeacher,
	noDueDateHomeworksTeacher,
	dueDateHomeworksTeacher,
} from "@@/stories/mockData/Homeworks";
import storeModule from "./homeworks";
import AuthModule from "@/store/auth";

describe("store/homeworks", () => {
	describe("actions", () => {
		const spyCommit = jest.fn();
		const ctxMockTeacher = {
			commit: spyCommit,
			rootState: {
				auth: { user: { permissions: ["TASK_DASHBOARD_TEACHER_VIEW_V3"] } },
			},
		};

		const ctxMockStudent = {
			commit: spyCommit,
			rootState: {
				auth: { user: { permissions: ["TASK_DASHBOARD_VIEW_V3"] } },
			},
		};

		describe("getHomeworksDashboard", () => {
			it("should call the right endpoint for teachers", async () => {
				AuthModule.setUser(ctxMockTeacher.rootState.auth.user);

				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};

				await storeModule.actions.getHomeworksDashboard(ctxMockTeacher);
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[1][0]).toBe("set");
				expect(receivedRequests[0].url).toStrictEqual("/v3/tasks/open/");
			});

			it("should call both endpoint for students", async () => {
				AuthModule.setUser(ctxMockStudent.rootState.auth.user);

				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};

				spyCommit.mockClear();
				await storeModule.actions.getHomeworksDashboard(ctxMockStudent);

				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[1][0]).toBe("set");
				expect(receivedRequests[0].url).toStrictEqual("/v3/tasks/open/");
				expect(receivedRequests[1].url).toStrictEqual("/v3/tasks/completed/");
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
				await storeModule.actions.getHomeworksDashboard(ctxMockTeacher);

				const storeCalls = spyCommit.mock.calls;
				const firstCall = storeCalls[0];
				const secondCall = storeCalls[1];
				const thirdCall = storeCalls[2];

				expect(firstCall[0]).toBe("setStatus");
				expect(secondCall[0]).toBe("setBusinessError");
				expect(thirdCall[0]).toBe("setStatus");

				const firstCommit = firstCall[1];
				const secondCommit = secondCall[1];
				const thirdCommit = thirdCall[1];

				expect(firstCommit).toBe("pending");
				expect(secondCommit).toBe(mockAxiosError.response.data);
				expect(thirdCommit).toBe("error");
			});

			it("should set loading state when fetching homeworks", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};
				spyCommit.mockClear();
				await storeModule.actions.getHomeworksDashboard(ctxMockTeacher);

				const storeCalls = spyCommit.mock.calls;

				const firstCall = storeCalls[0];
				const thirdCall = storeCalls[2];
				expect(firstCall[0]).toBe("setStatus");
				expect(thirdCall[0]).toBe("setStatus");

				const firstCommit = firstCall[1];
				const secondCommit = thirdCall[1];
				expect(firstCommit).toBe("pending");
				expect(secondCommit).toBe("completed");
			});
		});
	});

	describe("mutations", () => {
		describe("setFilter", () => {
			it("Should set course filter in the state", () => {
				const { setFilter } = storeModule.mutations;
				const state = {
					courseFilter: [],
				};
				setFilter(state, coursesTeacher);
				expect(state.courseFilter).toStrictEqual(coursesTeacher);
			});
		});
	});

	describe("getters", () => {
		const state = {
			list: homeworks,
			status: "completed",
			courseFilter: [],
		};
		const stateWithFilter = {
			list: homeworksTeacher,
			status: "completed",
			courseFilter: ["Mathe"],
		};
		const { getters } = storeModule;

		describe("isListEmpty", () => {
			it("Should return true, if it's loaded and there are no homeworks", () => {
				expect(getters.isListEmpty(state)).toBe(false);
			});
		});

		describe("isListFilled", () => {
			it("Should return true, if it's loaded and there are homeworks", () => {
				expect(getters.isListFilled(state)).toBe(true);
			});
		});

		describe("getCourses", () => {
			it("Should return all relevant courses", () => {
				expect(getters.getCourses(state)).toStrictEqual(coursesStudent);
			});
		});

		describe("getCoursesOpen", () => {
			it("Should return all relevant open courses", () => {
				const mockGetter = {
					getOpenHomeworks: openHomeworks,
				};
				expect(getters.getCoursesOpen(state, mockGetter)).toStrictEqual(
					coursesOpen
				);
			});
		});

		describe("getCoursesCompleted", () => {
			it("Should return all relevant completed courses", () => {
				const mockGetter = {
					getCompletedHomeworks: completedHomeworks,
				};
				expect(getters.getCoursesCompleted(state, mockGetter)).toStrictEqual(
					coursesCompleted
				);
			});
		});

		describe("getOpenHomeworksWithDueDate", () => {
			it("Should return homeworks before due date", () => {
				const mockGetter = {
					getOpenHomeworks: openHomeworks,
				};
				expect(
					getters.getOpenHomeworksWithDueDate(state, mockGetter)
				).toHaveLength(openHomeworksWithDueDate.length);
			});
		});

		describe("getOpenHomeworksWithDueDateTeacher", () => {
			it("Should return homeworks before due date for teachers", () => {
				const mockGetter = {
					getHomeworks: homeworksTeacher,
				};
				expect(
					getters.getOpenHomeworksWithDueDateTeacher(state, mockGetter)
				).toHaveLength(dueDateHomeworksTeacher.length);
			});
		});

		describe("getOverDueHomeworks", () => {
			it("Should return homeworks after due date", () => {
				const mockGetter = {
					getOpenHomeworks: openHomeworks,
				};
				expect(getters.getOverDueHomeworks(state, mockGetter)).toHaveLength(
					overDueHomeworks.length
				);
			});
		});

		describe("getOverDueHomeworksTeacher", () => {
			it("Should return homeworks for teachers after due date", () => {
				const mockGetter = {
					getHomeworks: homeworksTeacher,
				};
				expect(
					getters.getOverDueHomeworksTeacher(state, mockGetter)
				).toHaveLength(overDueHomeworksTeacher.length);
			});
		});

		describe("getOpenHomeworksWithoutDueDate", () => {
			it("Should return open homeworks without due date", () => {
				const mockGetter = {
					getOpenHomeworks: openHomeworks,
				};
				expect(
					getters.getOpenHomeworksWithoutDueDate(state, mockGetter)
				).toHaveLength(openHomeworksWithoutDueDate.length);
			});
		});

		describe("getOpenHomeworksWithoutDueDateTeacher", () => {
			it("Should return open homeworks without due date for teachers", () => {
				const mockGetter = {
					getHomeworks: homeworksTeacher,
				};
				expect(
					getters.getOpenHomeworksWithoutDueDateTeacher(state, mockGetter)
				).toHaveLength(noDueDateHomeworksTeacher.length);
			});
		});

		describe("getHomeworks", () => {
			it("Should return filtered homeworks, if filter is applied", () => {
				const mockGetter = { getFilteredHomeworks: mathHomeworks };

				expect(getters.getHomeworks(stateWithFilter, mockGetter)).toStrictEqual(
					mathHomeworks
				);
			});

			it("Should return all homeworks, if no filter is applied", () => {
				const mockGetter = { getFilteredHomeworks: [] };
				expect(getters.getHomeworks(state, mockGetter)).toStrictEqual(
					homeworks
				);
			});
		});

		describe("getOpenHomeworks", () => {
			it("Should return all homeworks, that neither submitted nor graded", () => {
				const mockGetter = { getHomeworks: homeworks };
				expect(getters.getOpenHomeworks(state, mockGetter)).toStrictEqual(
					openHomeworks
				);
			});
		});

		describe("getCompletedHomeworks", () => {
			it("Should return all homeworks, that are either submitted or graded", () => {
				const mockGetter = { getHomeworks: homeworks };
				expect(getters.getCompletedHomeworks(state, mockGetter)).toStrictEqual(
					completedHomeworks
				);
			});
		});

		describe("getSubmittedHomeworks", () => {
			it("Should return all homeworks, that are submitted", () => {
				const mockGetter = { getHomeworks: homeworks };
				expect(getters.getSubmittedHomeworks(state, mockGetter)).toStrictEqual(
					submittedHomeworks
				);
			});
		});

		describe("getGradedHomeworks", () => {
			it("Should return all homeworks, that are graded", () => {
				const mockGetter = { getCompletedHomeworks: completedHomeworks };
				expect(getters.getGradedHomeworks(state, mockGetter)).toStrictEqual(
					gradedHomeworks
				);
			});
		});

		describe("getFilteredHomeworks", () => {
			it("Should return homeworks filtered by course", () => {
				expect(getters.getFilteredHomeworks(stateWithFilter)).toStrictEqual(
					mathHomeworks
				);
			});
		});

		describe("hasOpenHomeworks", () => {
			it("Should return true, if it's loaded and there are open (neither submitted nor graded) homeworks", () => {
				const mockGetter = { getOpenHomeworks: openHomeworks };
				expect(getters.hasOpenHomeworks(state, mockGetter)).toBe(true);
			});
		});

		describe("hasNoOpenHomeworks", () => {
			it("Should return true, if it's loaded and there are no open (neither submitted nor graded) homeworks", () => {
				const mockGetter = { getOpenHomeworks: [] };
				expect(getters.hasNoOpenHomeworks(state, mockGetter)).toBe(true);
			});
		});

		describe("hasCompletedHomeworks", () => {
			it("Should return true, if it's loaded and there are completed homeworks", () => {
				const mockGetter = { getCompletedHomeworks: completedHomeworks };
				expect(getters.hasCompletedHomeworks(state, mockGetter)).toBe(true);
			});
		});

		describe("hasNoCompletedHomeworks", () => {
			it("Should return true, if it's loaded and there are no completed homeworks", () => {
				const mockGetter = { getCompletedHomeworks: [] };
				expect(getters.hasNoCompletedHomeworks(state, mockGetter)).toBe(true);
			});
		});
	});
});
