import i18n from "./i18n";
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

describe("i18n plugin", () => {
	it("sets locale to the locale computed in the auth store module", () => {
		EnvConfigModule.setEnvs({ ...envs, I18N__FALLBACK_LANGUAGE: "da" });
		const mockContext = {
			app: {},
			store: {
				getters: {
					"auth/getLocale": "fi",
				},
			},
		};

		i18n(mockContext);
		const vue18n = mockContext.app.i18n;

		expect(vue18n.locale).toBe("fi");
		expect(vue18n.fallbackLocale).toBe("da");
	});
});
