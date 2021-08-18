import module from "./schools";

const { actions, mutations, getters } = module;

describe("store/schools", () => {
	describe("actions", () => {
		describe("fetchSchool", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					dispatch: jest.fn(),
					rootState: {
						auth: {
							user: {
								schoolId: "sampleSchoolId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return {
							id: "id_123",
							features: ["rocketChat", "messengerSchoolRoom"],
						};
					},
				};

				await actions.fetchSchool(ctxMock);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual(
					"/schools/sampleSchoolId"
				);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setSchool");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual({
					id: "id_123",
					features: {
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
						rocketChat: true,
						studentVisibility: false,
						videoconference: false,
					},
				});
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);

				expect(ctxMock.dispatch).toHaveBeenCalledWith(
					"schools/fetchCurrentYear",
					{},
					expect.any(Object)
				);
				expect(ctxMock.dispatch).toHaveBeenCalledWith(
					"schools/fetchFederalState",
					{},
					expect.any(Object)
				);
				expect(ctxMock.dispatch).toHaveBeenCalledWith(
					"schools/fetchSystems",
					{},
					expect.any(Object)
				);
			});

			it("should trigger error and goes into the catch block", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						auth: {
							user: {
								schoolId: "sampleSchoolId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return {
							features: ["rocketChat"],
						};
					},
				};

				await actions.fetchSchool(ctxMock);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual(
					"/schools/sampleSchoolId"
				);
				expect(ctxMock.commit.mock.calls).toHaveLength(4);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setError");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[3][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[3][1]).toStrictEqual(false);
			});
		});

		describe("fetchFederalState", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						schools: {
							school: {
								federalState: "federalStateId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchFederalState(ctxMock);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual(
					"/federalStates/federalStateId"
				);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual(
					"setFederalState"
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual({
					data: "dummy response",
				});
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						// fails here
						schools_failed: {
							school: {
								federalState: "fail string",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchFederalState(ctxMock);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setError");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});

		describe("fetchCurrentYear", () => {
			it("should trigger call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						schools: {
							school: {
								currentYear: "yearId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchCurrentYear(ctxMock);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual("/years/yearId");
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setCurrentYear");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual({
					data: "dummy response",
				});
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						// fails here
						schools_failed: {
							school: {
								currentYear: "yearId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchCurrentYear(ctxMock);
				expect(receivedRequests).toHaveLength(0);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setError");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});

		describe("fetchSystems", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						schools: {
							school: {
								currentYear: "yearId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchCurrentYear(ctxMock);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual("/years/yearId");
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setCurrentYear");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual({
					data: "dummy response",
				});
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
					rootState: {
						// fails here
						schools_failed: {
							school: {
								currentYear: "yearId",
							},
						},
					},
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchCurrentYear(ctxMock);
				expect(receivedRequests).toHaveLength(0);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setError");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});

		describe("fetchFileStorageTotal", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
				};
				actions.$axios = {
					$get: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchFileStorageTotal(ctxMock);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toStrictEqual("/fileStorage/total");
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual(
					"setFileStorageTotal"
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual({
					data: "dummy response",
				});
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: jest.fn(),
				};
				actions.$axios = {
					// fails here $post
					$post: async (url) => {
						receivedRequests.push({ url });
						return { data: "dummy response" };
					},
				};

				await actions.fetchFileStorageTotal(ctxMock);
				expect(receivedRequests).toHaveLength(0);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setError");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});

		describe("update", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const uploadData = {
					id: "id_123",
					data: "some data to be updated",
					features: {
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
						rocketChat: true,
						studentVisibility: false,
						videoconference: false,
					},
				};
				const ctxMock = {
					commit: jest.fn(),
				};
				actions.$axios = {
					$patch: async (url) => {
						receivedRequests.push({ url });
						return {
							id: "id_123",
							data: "some data to be updated",
							features: ["rocketChat", "messengerSchoolRoom"],
						};
					},
				};

				await actions.update(ctxMock, uploadData);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toBe("/schools/id_123");
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setSchool");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(uploadData);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				const receivedRequests = [];
				const uploadData = {
					id: "id_123",
					data: "some data to be updated",
					features: {
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
						rocketChat: true,
						studentVisibility: false,
						videoconference: false,
					},
				};
				const ctxMock = {
					commit: jest.fn(),
				};
				actions.$axios = {
					// fails here $get
					$get: async (url) => {
						receivedRequests.push({ url });
						return {
							id: "id_123",
							data: "some data to be updated",
							features: ["rocketChat", "messengerSchoolRoom"],
						};
					},
				};

				await actions.update(ctxMock, uploadData);
				expect(receivedRequests).toHaveLength(0);
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setError");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Object)
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
			});
		});

		describe("deleteSystem", () => {
			it("should call backend and sets state correctly", async () => {
				const receivedRequests = [];
				const systemId = "id_1";
				const ctxMock = {
					commit: jest.fn(),
					dispatch: jest.fn(),
					rootState: {
						schools: {
							systems: [{ _id: "id_1" }, { _id: "id_2" }, { _id: "id_3" }],
							school: {
								id: "schoolId",
							},
						},
					},
				};
				const expectedSystemIds = [{ _id: "id_2" }, { _id: "id_3" }];

				actions.$axios = {
					$delete: async (url) => {
						receivedRequests.push({ url });
						return { data: "some data" };
					},
				};

				await actions.deleteSystem(ctxMock, systemId);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].url).toBe("systems/id_1");
				expect(ctxMock.commit.mock.calls).toHaveLength(3);
				expect(ctxMock.commit.mock.calls[0][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[0][1]).toStrictEqual(true);
				expect(ctxMock.commit.mock.calls[1][0]).toStrictEqual("setSystems");
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expect.any(Array)
				);
				expect(ctxMock.commit.mock.calls[1][1]).toStrictEqual(
					expectedSystemIds
				);
				expect(ctxMock.commit.mock.calls[2][0]).toStrictEqual("setLoading");
				expect(ctxMock.commit.mock.calls[2][1]).toStrictEqual(false);
				expect(ctxMock.dispatch).toHaveBeenCalledWith(
					"schools/update",
					{
						id: "schoolId",
						systems: expectedSystemIds.map((el) => el._id),
					},
					expect.any(Object)
				);
			});
		});
	});

	describe("mutations", () => {
		describe("setSchool", () => {
			it("should set the school data", () => {
				const mockState = {
					school: {
						_id: "123",
						name: "Paul-Gerhardt-Gymnasium",
						systems: ["0000d186816abba584714c91"],
						updatedAt: "2021-08-16T15:08:06.672Z",
						createdAt: "2017-01-01T00:06:37.148Z",
						currentYear: "5ebd6dc14a431f75ec9a3e77",
						features: ["rocketChat", "messenger"],
						enableStudentTeamCreation: false,
					},
				};

				const schoolDataToBeChanged = {
					_id: "456",
					name: "Updated Gymnasium",
				};

				mutations.setSchool(mockState, schoolDataToBeChanged);
				expect(mockState.school).toStrictEqual(schoolDataToBeChanged);
			});
		});
	});

	describe("getters", () => {
		describe("getSchool", () => {
			it("should return the school state", () => {
				const school = {
					_id: "123",
					name: "Paul-Gerhardt-Gymnasium",
					systems: ["0000d186816abba584714c91"],
					updatedAt: "2021-08-16T15:08:06.672Z",
					createdAt: "2017-01-01T00:06:37.148Z",
					currentYear: "5ebd6dc14a431f75ec9a3e77",
					features: ["rocketChat", "messenger"],
					enableStudentTeamCreation: false,
				};
				const mockState = {
					school,
				};

				const expectedState = getters.getSchool(mockState);

				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(school);
			});
		});

		describe("getFileStorageTotal", () => {
			it("should return the fileStorageTotal state", () => {
				const fileStorageTotal = {
					_id: "123",
					name: "some dummy data",
				};
				const mockState = {
					fileStorageTotal,
				};

				const expectedState = getters.getFileStorageTotal(mockState);

				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(fileStorageTotal);
			});
		});

		describe("getCurrentYear", () => {
			it("should return the current year state", () => {
				const currentYear = "id";
				const mockState = {
					currentYear,
				};
				const expectedState = getters.getCurrentYear(mockState);
				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(currentYear);
			});
		});

		describe("getFederalState", () => {
			it("should return the federalState state", () => {
				const federalState = "state_id";
				const mockState = {
					federalState,
				};
				const expectedState = getters.getFederalState(mockState);
				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(federalState);
			});
		});
		describe("getSystems", () => {
			it("should return the systems state", () => {
				const systemsState = ["system"];
				const mockState = {
					systemsState,
				};
				const expectedState = getters.getSystems(mockState);
				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(systemsState);
			});
		});
		describe("getLoading", () => {
			it("should return the loading state", () => {
				const loadingState = false;
				const mockState = {
					loadingState,
				};
				const expectedState = getters.getLoading(mockState);
				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(loadingState);
			});
		});
		describe("getError", () => {
			it("should return the error state", () => {
				const errorState = null;
				const mockState = {
					errorState,
				};
				const expectedState = getters.getError(mockState);
				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(errorState);
			});
		});
		describe("schoolIsExternallyManaged", () => {
			it("should return the schoolIsExternallyManaged state", () => {
				const isExternallyManaged = true;
				const mockState = {
					isExternallyManaged,
				};
				const expectedState = getters.getError(mockState);
				expect(expectedState).toStrictEqual(expect.any(Object));
				expect(expectedState).toBe(isExternallyManaged);
			});
		});
	});
});
