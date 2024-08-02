import { authModule, envConfigModule } from "@/store";
import { createI18n } from "vue-i18n";

import deDE from "../locales/de.json";
import enGB from "../locales/en.json";
import esES from "../locales/es.json";
import ukUA from "../locales/uk.json";

type SupportedLanguages = "en" | "de" | "es" | "uk";
type MessageSchema = typeof deDE;

const messages: Record<SupportedLanguages, MessageSchema> = {
	en: enGB,
	de: deDE,
	es: esES,
	uk: ukUA,
};

const fileSizeFormat = {
	maximumFractionDigits: 2,
};

const numberFormats = {
	de: {
		fileSize: fileSizeFormat,
	},
	en: {
		fileSize: fileSizeFormat,
	},
	es: {
		fileSize: fileSizeFormat,
	},
	uk: {
		fileSize: fileSizeFormat,
	},
};

const localCreateI18n = () => {
	const i18n = createI18n<false>({
		legacy: false,
		locale: authModule.getLocale,
		fallbackLocale: envConfigModule.getFallbackLanguage,
		messages: messages,
		numberFormats,
	});

	return i18n;
};

export { localCreateI18n as createI18n };
