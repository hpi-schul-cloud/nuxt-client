import { MessageSchemaCustom } from "@/locales/schema";
import { createI18n } from "vue-i18n";

export const createTestingI18n = (options = {}) => {
	const i18n = createI18n<MessageSchemaCustom, "en">({
		legacy: false,
		locale: "en",
		fallbackLocale: ["en"],
		// disable log warnings on missing translations
		// https://github.com/kazupon/vue-i18n/issues/96
		missingWarn: false,
		fallbackWarn: false,
		silentTranslationWarn: true,
		messages: {
			en: {} as MessageSchemaCustom,
		},
		...options,
	});
	return i18n;
};
