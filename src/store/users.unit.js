import { actions, mutations } from "./users";

describe("store/users", () => {
	describe("actions", () => {
		describe("deleteUsers", () => {
			it("triggers commit", async () => {
				const receivedUrls = [];
				actions.$axios = {
					$delete: async (url) => {
						receivedUrls.push(url);
					},
				};
				const spyCommit = jest.fn();
				const payload = {
					ids: ["5f2987e020834114b8efd6f1", "5f2987e020834114b8efd6f2"],
					userType: "teacher",
				};

				await actions.deleteUsers({ commit: spyCommit }, payload);

				expect(receivedUrls[0]).toBe(
					`/users/v2/admin/${payload.userType}/${payload.ids[0]}`
				);
				expect(receivedUrls[1]).toBe(
					`/users/v2/admin/${payload.userType}/${payload.ids[1]}`
				);
				expect(spyCommit.mock.calls).toHaveLength(2);
				expect(spyCommit.mock.calls[0][1]).toStrictEqual(payload.ids[0]);
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(payload.ids[1]);
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
