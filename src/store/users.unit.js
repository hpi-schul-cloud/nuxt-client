import { actions, mutations } from "./users";

describe("store/users", () => {
	describe("actions", () => {
		describe("handleUsers", () => {
			const spyDispatch = jest.fn();

			it("should dispatch correct action", async () => {
				const query = {
					$limit: 25,
					$skip: 0,
				};
				const queryContent = {
					query,
					action: "find",
					userType: "students",
				};

				const expectedPayload = {
					...queryContent,
					customEndpoint: "/users/admin/students",
				};

				actions.handleUsers({ dispatch: spyDispatch }, queryContent);

				expect(spyDispatch).toHaveBeenCalledWith(
					queryContent.action,
					expectedPayload
				);
			});
		});
		describe("createTeacher", () => {
			it("should call backend", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: () => {},
				};
				const teacherDataMock = {
					firstName: "Marla",
					lastName: "Mathe",
				};

				actions.$axios = {
					$post: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};

				await actions.createTeacher(ctxMock, teacherDataMock);
				expect(receivedRequests[0].url).toStrictEqual("/users/admin/teachers");
				expect(receivedRequests[0].params).toStrictEqual(teacherDataMock);
			});
		});
		describe("sendRegistrationLink", () => {
			it("should call backend", async () => {
				const receivedRequests = [];
				const ctxMock = {};
				const payloadMock = {
					someProperty: "some value",
				};

				actions.$axios = {
					$post: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};

				await actions.sendRegistrationLink(ctxMock, payloadMock);
				expect(receivedRequests[0].url).toStrictEqual(
					"/users/mail/registrationLink"
				);
				expect(receivedRequests[0].params).toStrictEqual(payloadMock);
			});
		});
		describe("getQrRegistrationLinks", () => {
			it("should call backend", async () => {
				const receivedRequests = [];
				const ctxMock = {
					commit: () => {},
				};
				const payloadMock = {
					someProperty: "some value",
				};

				actions.$axios = {
					$post: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};

				await actions.getQrRegistrationLinks(ctxMock, payloadMock);
				expect(receivedRequests[0].url).toStrictEqual(
					"/users/qrRegistrationLink"
				);
				expect(receivedRequests[0].params).toStrictEqual(payloadMock);
			});
		});
		describe("createStudent", () => {
			it("should call backend", async () => {
				const receivedRequests = [];
				const spyCommit = jest.fn();
				const ctxMock = { commit: spyCommit };
				const studentData = {
					firstName: "Marla",
					lastName: "Mathe",
				};
				const payloadMock = {
					...studentData,
					successMessage: "display this if post was successful",
				};

				actions.$axios = {
					$post: async (url, params) => {
						receivedRequests.push({ url, params });
					},
				};
				actions.$toast = {
					success: jest.fn(),
				};
				actions.$router = {
					push: jest.fn(),
				};

				await actions.createStudent(ctxMock, payloadMock);
				expect(receivedRequests[0].url).toStrictEqual("/users/admin/students");
				expect(receivedRequests[0].params).toStrictEqual(studentData);
			});

			it("should handle backend error", async () => {
				const spyCommit = jest.fn();
				const ctxMock = { commit: spyCommit };
				const studentData = {
					firstName: "Marla",
					lastName: "Mathe",
				};
				const payloadMock = {
					...studentData,
					successMessage: "display this if post was successful",
				};

				const errorMock = { response: { data: "dummy error message" } };

				actions.$axios = {
					$post: async () => {
						throw { response: { data: "dummy error message" } };
					},
				};

				await actions.createStudent(ctxMock, payloadMock);
				expect(spyCommit.mock.calls[1][0]).toStrictEqual("setBusinessError");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(
					errorMock.response.data
				);
			});
		});
		describe("deleteUsers", () => {
			it("triggers commit", async () => {
				const receivedRequests = [];
				actions.$axios = {
					$delete: async (url, { params }) => {
						receivedRequests.push({ url, params });
					},
				};
				const spyCommit = jest.fn();
				const payload = {
					ids: ["5f2987e020834114b8efd6f1", "5f2987e020834114b8efd6f2"],
					userType: "teacher",
				};

				await actions.deleteUsers({ commit: spyCommit }, payload);

				expect(receivedRequests).toHaveLength(1);
				expect(receivedRequests[0]).toMatchObject({
					url: `/users/v2/admin/${payload.userType}`,
					params: { ids: payload.ids },
				});

				const removeCommits = spyCommit.mock.calls.filter(
					(c) => c[0] === "remove"
				);
				expect(removeCommits).toHaveLength(2);
				expect(removeCommits[0][1]).toStrictEqual(payload.ids[0]);
				expect(removeCommits[1][1]).toStrictEqual(payload.ids[1]);
			});
		});
	});
	describe("mutations", () => {
		describe("remove", () => {
			it("removes user by id", () => {
				const id1 = "5f2987e020834114b8efd6f1";
				const id2 = "5f2987e020834114b8efd6f2";
				const state = {
					list: [{ _id: id1 }, { _id: id2 }],
				};
				mutations.remove(state, id1);
				expect(state.list).toStrictEqual([{ _id: id2 }]);
			});
		});
	});
});
