import {
	state,
	actions,
	mutations,
	getters,
	requiredVars,
	configsFromEnvironmentVars,
} from "./env-config";

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

			expect(receivedUrl).toBe("/config/app/public");
			expect(spyCommit.mock.calls).toHaveLength(1);
			expect(spyCommit.mock.calls[0][1]).toStrictEqual({
				...configsFromEnvironmentVars,
				...serverConfigMock,
			});
		});

		it("logs errors for missing required config vars", async () => {
			const serverConfigMock = {
				JWT_SHOW_TIMEOUT_WARNING_SECONDS: 5,
			};
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
	describe("getters", () => {
		describe("getFallbackLanguage", () => {
			it("should return 'de' if not fallback configured", () => {
				expect(getters.getFallbackLanguage({ env: {} })).toBe("de");
			});
			it("should return configured fallback lanugage", () => {
				expect(
					getters.getFallbackLanguage({
						env: { I18N__FALLBACK_LANGUAGE: "fi" },
					})
				).toBe("fi");
			});
		});
		describe("getDefaultTimezone", () => {
			it("should return 'Europe/Berlin' if not fallback configured", () => {
				expect(getters.getDefaultTimezone({ env: {} })).toBe("Europe/Berlin");
			});
			it("should return configured fallback lanugage", () => {
				expect(
					getters.getDefaultTimezone({
						env: { I18N__DEFAULT_TIMEZONE: "America/Los_Angeles" },
					})
				).toBe("America/Los_Angeles");
			});
		});
		describe("getMatrixConfig", () => {
			it("should return matrix configuration", () => {
				expect(
					getters.getMatrixConfig({
						env: {
							FEATURE_MATRIX_MESSENGER_ENABLED: true,
							MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: false,
							MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
							MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: false,
						},
					})
				).toStrictEqual({
					enabled: true,
					schoolSettingsVisible: false,
					studentRoomCreation: true,
					schoolRoomEnabled: false,
				});
			});
		});
		describe("getAdminToggleStudentLernstoreViewEnabled", () => {
			it("should return true if Lernstore is enabled and mode is 'EDUSHARING'", () => {
				expect(
					getters.getAdminToggleStudentLernstoreViewEnabled({
						env: {
							FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
							LERNSTORE_MODE: "EDUSHARING",
						},
					})
				).toBe(true);
			});
			it("should return false if Lernstore is disabled and mode is 'EDUSHARING'", () => {
				expect(
					getters.getAdminToggleStudentLernstoreViewEnabled({
						env: {
							FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
							LERNSTORE_MODE: "EDUSHARING",
						},
					})
				).toBe(false);
			});
			it("should return false if Lernstore is enabled and mode is NOT 'EDUSHARING'", () => {
				expect(
					getters.getAdminToggleStudentLernstoreViewEnabled({
						env: {
							FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
							LERNSTORE_MODE: "invalid config value",
						},
					})
				).toBe(false);
			});
		});
	});
});
