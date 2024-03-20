import { authModule, envConfigModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { createI18n } from "./i18n";
import { unref } from "vue";

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
};

describe("i18n plugin", () => {
	beforeEach(() => {
		setupStores({ authModule: AuthModule, envConfigModule: EnvConfigModule });
	});

	it("sets locale to the locale computed in the auth store module", () => {
		authModule.setLocale("fi");
		envConfigModule.setEnvs({ ...envs, I18N__FALLBACK_LANGUAGE: "da" });

		const i18n = createI18n();

		expect(unref(i18n.global.locale)).toBe("fi");
		expect(unref(i18n.global.fallbackLocale)).toBe("da");
	});

	it("sets the number formats for all supported languages correctly", () => {
		authModule.setLocale("fi");
		envConfigModule.setEnvs({ ...envs, I18N__FALLBACK_LANGUAGE: "da" });

		const i18n = createI18n();

		expect(
			unref(i18n.global.numberFormats).de.fileSize.maximumFractionDigits
		).toBe(2);
		expect(
			unref(i18n.global.numberFormats).en.fileSize.maximumFractionDigits
		).toBe(2);
		expect(
			unref(i18n.global.numberFormats).es.fileSize.maximumFractionDigits
		).toBe(2);
		expect(
			unref(i18n.global.numberFormats).uk.fileSize.maximumFractionDigits
		).toBe(2);
	});
});
