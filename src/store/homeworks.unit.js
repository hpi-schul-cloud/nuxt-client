import storeModule from "./homeworks";

describe("store/homeworks", () => {
	describe("actions", () => {
		describe("getHomeworksDashboard", () => {
			it("should call the right endpoint", async () => {
				const receivedRequests = [];
				const spyCommit = jest.fn();
				const ctxMock = { commit: spyCommit };

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};

				await storeModule.actions.getHomeworksDashboard(ctxMock);
				expect(spyCommit.mock.calls).toHaveLength(1);
				expect(spyCommit.mock.calls[0][0]).toBe("set");
				expect(receivedRequests[0].url).toStrictEqual("/v3/task/dashboard/");
			});
		});
	});
});
