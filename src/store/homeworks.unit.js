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

			it("should set loading state when fetching homeworks", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};

				await storeModule.actions.getHomeworksDashboard(ctxMock);

				const storeCalls = spyCommit.mock.calls;

				const firstCall = storeCalls[0];
				const thirdCall = storeCalls[2];
				expect(firstCall[0]).toBe("setLoading");
				expect(thirdCall[0]).toBe("setLoading");

				const firstStatus = firstCall[1].homeworks;
				const secondStatus = thirdCall[1].homeworks;
				expect(firstStatus).toBe(true);
				expect(secondStatus).toBe(false);
			});
		});
	});
});
