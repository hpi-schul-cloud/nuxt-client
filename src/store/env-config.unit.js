import { state, actions, mutations, requiredVars } from "./env-config";

jest.useFakeTimers();
describe("store/env-config", () => {
	let consoleWarnSpy;
	let consoleErrorSpy;
	beforeEach(() => {
		consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});
	afterEach(() => {
		consoleWarnSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	describe("actions", () => {
		it("triggers commit", async () => {
			const serverConfigMock = { FEATURE_ENV_VARIABLE: "string_value" };
			let receivedUrl;
			actions.$axios = {
				$get: (url) => {
					receivedUrl = url;
					return Promise.resolve(serverConfigMock);
				},
			};
			const spyCommit = jest.fn();
			const spyDispatch = jest.fn();

			await actions.get({ commit: spyCommit, dispatch: spyDispatch });

			expect(receivedUrl).toBe("/v1/config/app/public");
			expect(spyCommit.mock.calls).toHaveLength(1);
			expect(spyCommit.mock.calls[0][1]).toStrictEqual(serverConfigMock);
		});

		it("logs errors for missing required config vars", async () => {
			const serverConfigMock = { JWT_SHOW_TIMEOUT_WARNING_SECONDS: 5 };
			actions.$axios = {
				$get: () => {
					return Promise.resolve(serverConfigMock);
				},
			};
			const spyCommit = jest.fn();
			const spyDispatch = jest.fn();

			await actions.get({ commit: spyCommit, dispatch: spyDispatch });

			expect(consoleWarnSpy.mock.calls).toHaveLength(3);
		});

		it("retries on error", async () => {
			actions.$axios = {
				$get: () => {
					return Promise.reject();
				},
			};
			const spyCommit = jest.fn();
			const spyDispatch = jest.fn();

			await actions.get({
				commit: spyCommit,
				dispatch: spyDispatch,
				state: { loadingErrorCount: 0 },
			});
			jest.runOnlyPendingTimers();

			expect(spyDispatch.mock.calls[0][0]).toStrictEqual("autoLogout/init");
			expect(spyDispatch.mock.calls[1][0]).toStrictEqual("content/init");
			expect(spyDispatch.mock.calls[2][0]).toStrictEqual("filePaths/init");
			expect(spyDispatch.mock.calls[3][0]).toStrictEqual("get");
		});

		it("does not retry on error after 10th time", async () => {
			actions.$axios = {
				$get: () => {
					return Promise.reject();
				},
			};
			const spyCommit = jest.fn();
			const spyDispatch = jest.fn();

			await actions.get({
				commit: spyCommit,
				dispatch: spyDispatch,
				state: { loadingErrorCount: 10 },
			});

			expect(spyDispatch.mock.calls).toHaveLength(3);
			expect(spyDispatch.mock.calls[0][0]).toStrictEqual("autoLogout/init");
			expect(spyDispatch.mock.calls[1][0]).toStrictEqual("content/init");
			expect(spyDispatch.mock.calls[2][0]).toStrictEqual("filePaths/init");
		});
	});

	describe("mutations", () => {
		it("merges the default config with payload", () => {
			const { setEnv } = mutations;
			const env = {
				FEATURE_ENV_VARIABLE: "string_value",
				OTHER_FEATURE_ENV_VARIABLE: true,
			};

			setEnv(state, env);

			expect(state.env).toStrictEqual({
				...requiredVars,
				...env,
			});
		});
	});
});
