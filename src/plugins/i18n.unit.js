import { unref } from "vue";
import { createI18n } from "./i18n";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestAuthStore } from "../../tests/test-utils/index.js";
import { useAuthStore } from "@data-auth";

describe("i18n plugin", () => {
	beforeAll(() => {
		createTestAuthStore();
		createTestEnvStore({
			I18N__FALLBACK_LANGUAGE: "da",
		});
	});

	it("sets locale to the locale computed in the auth store module", () => {
		useAuthStore().$patch({ userLocale: "fi" });
		const i18n = createI18n();

		expect(unref(i18n.global.locale)).toBe("fi");
		expect(unref(i18n.global.fallbackLocale)).toBe("da");
	});

	it("sets the number formats for all supported languages correctly", () => {
		useAuthStore().$patch({ userLocale: "fi" });
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
