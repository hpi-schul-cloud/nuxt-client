import { createI18n } from "./i18n";
import { createTestAppStore, createTestEnvStore } from "@@/tests/test-utils";
import { LanguageType } from "@api-server";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { unref } from "vue";

describe("i18n plugin", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
		createTestEnvStore({
			I18N__FALLBACK_LANGUAGE: LanguageType.UK,
		});
	});

	it("sets locale to the locale computed in the application store module", () => {
		useAppStore().$patch({ userLocale: LanguageType.ES });
		const i18n = createI18n();

		expect(unref(i18n.global.locale)).toBe(LanguageType.ES);
		expect(unref(i18n.global.fallbackLocale)).toBe(LanguageType.UK);
	});

	it("sets the number formats for all supported languages correctly", () => {
		useAppStore().$patch({ userLocale: LanguageType.ES });
		const i18n = createI18n();

		// eslint-disable-next-line
		const numberFormats = unref(i18n.global.numberFormats) as any;

		expect(numberFormats.de.fileSize.maximumFractionDigits).toBe(2);
		expect(numberFormats.en.fileSize.maximumFractionDigits).toBe(2);
		expect(numberFormats.es.fileSize.maximumFractionDigits).toBe(2);
		expect(numberFormats.uk.fileSize.maximumFractionDigits).toBe(2);
	});
});
