import module from "./consent-versions";

const { actions, mutations, getters } = module;

describe("store/consent-versions", () => {
	describe("actions", () => {
		describe("fetchConsentVersions", () => {
			it("should call backend and sets state correctly without 'withFile' parameter", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
				};
				const params = {
					schoolId: "school_id",
					consentTypes: "privacy",
				};

				actions.$axios = {
					get: async (url) => {
						receivedRequests.push({ url });
						return {
							data: {
								total: 1,
								limit: 100,
								skip: 0,
								data: [
									{
										_id: "611a75856cfbb2aded54eae4",
										versionNumber: "testversion",
										consentText: "lorem ipsum",
										date: "2017-01-01T00:06:40.150Z",
									},
								],
							},
						};
					},
				};

				await actions.fetchConsentVersions(ctxMock, params);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual("/v1/consentVersions");

				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual(
					"setConsentVersions"
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});

			it("should call backend and sets state correctly with 'withFile' parameter", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
				};
				const params = {
					schoolId: "school_id",
					consentTypes: "privacy",
					withFile: true,
				};

				actions.$axios = {
					get: async (url) => {
						receivedRequests.push({ url });
						return {
							total: 1,
							limit: 100,
							skip: 0,
							data: [
								{
									_id: "611a75856cfbb2aded54eae4",
									versionNumber: "testversion",
									consentText: "lorem ipsum",
									date: "2017-01-01T00:06:40.150Z",
									consentDataId: "id_123",
								},
							],
						};
					},
				};

				await actions.fetchConsentVersions(ctxMock, params);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual("/v1/consentVersions");

				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual(
					"setConsentVersions"
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Array)
				);
				expect(Object.keys(ctxMock.commit.mock.calls[1][1][0])).toContain(
					"fileData"
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});

		describe("addConsentVersion", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
				};
				const params = {
					schoolId: "school_id",
					consentTypes: "privacy",
				};

				actions.$axios = {
					get: async (url) => {
						receivedRequests.push({ url });
						return {
							total: 1,
							limit: 100,
							skip: 0,
							data: [
								{
									_id: "611a75856cfbb2aded54eae4",
									versionNumber: "testversion",
									consentText: "lorem ipsum",
									date: "2017-01-01T00:06:40.150Z",
								},
							],
						};
					},
				};

				await actions.fetchConsentVersions(ctxMock, params);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual("/v1/consentVersions");

				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual(
					"setConsentVersions"
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});
	});

	describe("mutations", () => {
		describe("setConsentVersions", () => {
			it("should set the consent versions", () => {
				const consentVersions = ["1", "2"];
				const mockState = {
					consentVersions,
				};
				const expectedConsentVersions = ["3", "4"];
				mutations.setConsentVersions(mockState, expectedConsentVersions);
				expect(mockState.consentVersions).toStrictEqual(
					expectedConsentVersions
				);
			});
		});
		describe("setLoading", () => {
			it("should set the loading", () => {
				const loading = false;
				const mockState = {
					loading,
				};

				const expectedLoading = true;

				mutations.setLoading(mockState, expectedLoading);
				expect(mockState.loading).toStrictEqual(expectedLoading);
			});
		});
	});

	describe("getters", () => {
		describe("getConsentVersions", () => {
			it("should return the consent versions", () => {
				const consentVersions = [];
				const mockState = {
					consentVersions,
				};

				const expectedState = getters.getConsentVersions(mockState);

				expect(expectedState).toStrictEqual(expect.any(Array));
				expect(expectedState).toBe(consentVersions);
			});
		});
		describe("getLoading", () => {
			it("should return the loading", () => {
				const loading = false;
				const mockState = {
					loading,
				};

				const expectedState = getters.getLoading(mockState);

				expect(expectedState).toStrictEqual(expect.any(Boolean));
				expect(expectedState).toBe(loading);
			});
		});
	});
});
