import { state, actions, mutations } from "./env-config";

describe("store/env-config", () => {
	describe("actions", () => {
		it("triggers commit", async () => {
			const dummyReturnObject = { FEATURE_ENV_VARIABLE: "string_value" };
			let receivedUrl;
			actions.$axios = {
				$get: (url) => {
					receivedUrl = url;
					return Promise.resolve(dummyReturnObject);
				},
			};
			const spyCommit = jest.fn();
			const spyDispatch = jest.fn();

			await actions.get({ commit: spyCommit, dispatch: spyDispatch });

			expect(receivedUrl).toBe("/config/app/public");
			expect(spyCommit.mock.calls).toHaveLength(1);
			expect(spyCommit.mock.calls[0][1]).toStrictEqual(dummyReturnObject);
		});
	});

	describe("mutations", () => {
		it("sets the state with payload", () => {
			const { setEnv } = mutations;
			const env = {
				FEATURE_ENV_VARIABLE: "string_value",
				OTHER_FEATURE_ENV_VARIABLE: true,
			};

			setEnv(state, env);

			expect(state.env).toBe(env);
		});
	});
});
