import {
	homeworks,
	openHomeworks,
	openHomeworksWithDueDate,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
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

				expect(firstCall[0]).toBe("setLoading");
				expect(secondCall[0]).toBe("setBusinessError");
				expect(thirdCall[0]).toBe("setLoading");

				const firstCommit = firstCall[1];
				const secondCommit = secondCall[1];
				const thirdCommit = thirdCall[1];

				expect(firstCommit).toBe(true);
				expect(secondCommit).toBe(mockAxiosError.response.data);
				expect(thirdCommit).toBe(false);
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
				expect(firstCall[0]).toBe("setLoading");
				expect(thirdCall[0]).toBe("setLoading");

				const firstCommit = firstCall[1];
				const secondCommit = thirdCall[1];
				expect(firstCommit).toBe(true);
				expect(secondCommit).toBe(false);
			});
		});
	});

	describe("getters", () => {
		const state = {
			list: homeworks,
			loading: false,
		};
		const { getters } = storeModule;

		it("'isListEmpty' returns true, if it's loaded and there are no homeworks", () => {
			expect(getters.isListEmpty(state)).toBe(false);
		});

		it("'isListFilled' returns true, if it's loaded and there are homeworks", () => {
			expect(getters.isListFilled(state)).toBe(true);
		});

		it("'getOpenHomeworksWithDueDate' returns homeworks before due date", () => {
			expect(getters.getOpenHomeworksWithDueDate(state)).toHaveLength(
				openHomeworksWithDueDate.length
			);
		});

		it("'getOverDueHomeworks' returns homeworks after due date", () => {
			expect(getters.getOverDueHomeworks(state)).toHaveLength(
				overDueHomeworks.length
			);
		});

		it("'getOpenHomeworksWithoutDueDate' returns open homeworks without due date", () => {
			expect(getters.getOpenHomeworksWithoutDueDate(state)).toHaveLength(
				openHomeworksWithoutDueDate.length
			);
		});

		it("'getOpenHomeworks' returns open homeworks in the right order", () => {
			const mockGetter = {
				getOpenHomeworksWithDueDate: openHomeworksWithDueDate,
				getOpenHomeworksWithoutDueDate: openHomeworksWithoutDueDate,
			};
			const getterOpenHomeworks = getters.getOpenHomeworks(state, mockGetter);
			expect(getterOpenHomeworks).toHaveLength(openHomeworks.length);
			getterOpenHomeworks.forEach((homework, i) => {
				expect(homework.duedate).toBe(openHomeworks[i].duedate);
			});
		});
	});
});
