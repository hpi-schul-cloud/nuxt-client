import {
	homeworks,
	openHomeworks,
	openHomeworksWithDueDate,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
	coursesStudent,
	coursesTeacher,
	mathHomeworks,
	homeworksTeacher,
} from "@@/stories/mockData/Homeworks";
import storeModule from "./homeworks";

describe("store/homeworks", () => {
	describe("actions", () => {
		const spyCommit = jest.fn();
		const ctxMock = { commit: spyCommit };

		describe("getHomeworksDashboard", () => {
			it("should call the right endpoint", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};

				await storeModule.actions.getHomeworksDashboard(ctxMock);
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[1][0]).toBe("set");
				expect(receivedRequests[0].url).toStrictEqual("/v3/task/dashboard/");
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
				await storeModule.actions.getHomeworksDashboard(ctxMock);

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
					},
				};
				spyCommit.mockClear();
				await storeModule.actions.getHomeworksDashboard(ctxMock);

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
			loading: false,
			courseFilter: [],
		};
		const stateWithFilter = {
			list: homeworksTeacher,
			loading: false,
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

		describe("getOpenHomeworksWithDueDate", () => {
			it("Should return homeworks before due date", () => {
				const mockGetter = {
					getHomeworks: homeworks,
				};
				expect(
					getters.getOpenHomeworksWithDueDate(state, mockGetter)
				).toHaveLength(openHomeworksWithDueDate.length);
			});
		});

		describe("getOverDueHomeworks", () => {
			it("Should return homeworks after due date", () => {
				const mockGetter = {
					getHomeworks: homeworks,
				};
				expect(getters.getOverDueHomeworks(state, mockGetter)).toHaveLength(
					overDueHomeworks.length
				);
			});
		});

		describe("getOpenHomeworksWithoutDueDate", () => {
			it("Should return open homeworks without due date", () => {
				const mockGetter = {
					getHomeworks: homeworks,
				};
				expect(
					getters.getOpenHomeworksWithoutDueDate(state, mockGetter)
				).toHaveLength(openHomeworksWithoutDueDate.length);
			});
		});

		describe("getOpenHomeworks", () => {
			it("Should return open homeworks in the right order", () => {
				const mockGetter = {
					getOpenHomeworksWithDueDate: openHomeworksWithDueDate,
					getOpenHomeworksWithoutDueDate: openHomeworksWithoutDueDate,
				};
				const getterOpenHomeworks = getters.getOpenHomeworks(state, mockGetter);
				expect(getterOpenHomeworks).toHaveLength(openHomeworks.length);
				expect(getterOpenHomeworks).toStrictEqual(openHomeworks);
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

		describe("getFilteredHomeworks", () => {
			it("Should return homeworks filtered by course", () => {
				expect(getters.getFilteredHomeworks(stateWithFilter)).toStrictEqual(
					mathHomeworks
				);
			});
		});
	});
});
