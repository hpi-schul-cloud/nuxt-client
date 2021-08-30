import { getters, mutations } from "./auth";
import EnvConfigModule from "@/store/env-config";

const envs = {
	FEATURE_EXTENSIONS_ENABLED: null,
	FEATURE_TEAMS_ENABLED: null,
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
};

jest.useFakeTimers();
describe("store/auth", () => {
	let consoleErrorSpy;
	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});
	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	describe("actions", () => {
		// TODO
	});

	describe("mutations", () => {
		describe("setUser", () => {
			it("should set the user data", () => {
				const mockState = {
					user: {
						_id: "123",
						name: "Paula Meyer",
					},
				};
				const userToBeChanged = {
					_id: "456",
					name: "Updated Name",
				};
				mutations.setUser(mockState, userToBeChanged);
				expect(mockState.user).toStrictEqual(userToBeChanged);
			});
		});

		describe("setLocale", () => {
			it("should set the locale data", () => {
				const mockState = {
					locale: "de",
				};
				const localeToBeChanged = "en";
				mutations.setLocale(mockState, localeToBeChanged);
				expect(mockState.locale).toStrictEqual(localeToBeChanged);
			});
		});

		describe("setAccessToken", () => {
			it("should set the accessToken data", () => {
				const mockState = {
					accessToken: "",
				};
				const accessTokenToBeChanged = "someAccessToken";
				mutations.setAccessToken(mockState, accessTokenToBeChanged);
				expect(mockState.accessToken).toStrictEqual(accessTokenToBeChanged);
			});
		});

		describe("addUserPermission", () => {
			it("should add user permission data", () => {
				const mockState = {
					user: {
						permissions: ["permission_X", "permission_Y"],
					},
				};
				const permissionToBeAdded = ["permission_Z"];
				mutations.addUserPermission(mockState, permissionToBeAdded);
				expect(mockState.user.permissions).toContain(permissionToBeAdded);
			});
		});

		describe("clearAuthData", () => {
			it("should clear the auth data", () => {
				const mockState = {
					accessToken: "",
					user: {
						_id: "123",
						name: "Test Tester",
					},
				};
				mutations.clearAuthData(mockState);
				expect(mockState.accessToken).toBeNull();
				expect(mockState.user).toBeNull();
			});
		});
	});

	describe("getters", () => {
		describe("local", () => {
			it("returns the user's language", () => {
				const mockState = {
					locale: "ko",
				};
				const mockRootState = {
					auth: {
						locale: "ko",
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("ko");
			});

			it("returns the school's language", () => {
				const mockState = {
					school: {
						language: "fi",
					},
				};
				const mockRootState = {
					auth: {},
					schools: {
						school: {
							language: "fi",
						},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("fi");
			});

			it("returns the instance language", () => {
				EnvConfigModule.setEnvs({ ...envs, I18N__DEFAULT_LANGUAGE: "da" });
				const mockState = {};
				const mockRootState = {
					auth: {},
					schools: {
						school: {},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("da");
			});

			it("returns the default language", () => {
				EnvConfigModule.setEnvs({ ...envs, I18N__DEFAULT_LANGUAGE: "de" });
				const mockState = {};
				const mockRootState = {
					auth: {},
					schools: {
						school: {},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("de");
			});
		});
	});
});
