import { unref } from "vue";
import { createI18n } from "./i18n";
import { createTestEnvStore, createTestAppStore } from "@@/tests/test-utils";

import { useAppStore } from "@data-app";

describe("i18n plugin", () => {
	beforeAll(() => {
		createTestAppStore();
		createTestEnvStore({
			I18N__FALLBACK_LANGUAGE: "da",
		});
	});

	it("sets locale to the locale computed in the application store module", () => {
		useAppStore().$patch({ userLocale: "fi" });
		const i18n = createI18n();

		expect(unref(i18n.global.locale)).toBe("fi");
		expect(unref(i18n.global.fallbackLocale)).toBe("da");
	});

	it("sets the number formats for all supported languages correctly", () => {
		useAppStore().$patch({ userLocale: "fi" });
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
