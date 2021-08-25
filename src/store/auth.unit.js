import { getters } from "./auth";
import EnvConfigModule from "@/store/env-config";

const envs = {
	FALLBACK_DISABLED: false,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default",
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: null,
	FEATURE_ES_COLLECTIONS_ENABLED: null,
	FEATURE_EXTENSIONS_ENABLED: null,
	FEATURE_TEAMS_ENABLED: null,
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: "",
	SC_TITLE: "",
	SC_SHORT_TITLE: "",
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
		// TODO
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
					auth: {
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
					auth: {
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
					auth: {
						school: {},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("de");
			});
		});
	});
});
