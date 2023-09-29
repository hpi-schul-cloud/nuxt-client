import { createI18n } from "vue-i18n";

export const createTestingI18n = (options = {}) => {
	const i18n = createI18n({
		// we still get a warning on this one
		// this can be suppressed by setting __TEST__ to true globally
		allowComposition: true,
		locale: "en",
		fallbackLocale: ["en"],
		// disable log warnings on missing translations
		// https://github.com/kazupon/vue-i18n/issues/96
		missingWarn: false,
		fallbackWarn: false,
		silentTranslationWarn: true,
		messages: {
			en: {},
		},
		...options,
	});
	return i18n;
};
