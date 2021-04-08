import { actions, mutations } from "./users";

describe("store/users", () => {
	describe("actions", () => {
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
