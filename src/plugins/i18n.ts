/* eslint-disable @typescript-eslint/no-var-requires */
import { authModule, envConfigModule } from "@/store";
import { createI18n } from "vue-i18n";

const loadLocaleMessages = () => {
	const messages = {
		en: require("../locales/en.json").default,
		de: require("../locales/de.json").default,
		es: require("../locales/es.json").default,
		uk: require("../locales/uk.json").default,
	};
	return messages;
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
	const i18n = createI18n({
		legacy: false,
		locale: authModule.getLocale,
		fallbackLocale: envConfigModule.getFallbackLanguage,
		messages: loadLocaleMessages(),
		numberFormats,
	});

	return i18n;
};

export { localCreateI18n as createI18n };
