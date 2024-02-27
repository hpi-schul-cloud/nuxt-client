import { authModule, envConfigModule } from "@/store";
import { createI18n } from "vue-i18n";
// It looks like we have to use default exports and no additional imports in the language files. Otherwise resource pre-compilation will fail.
// https://github.com/intlify/bundle-tools/blob/b245313be48c089db3f325f9bc96ad37ab2011b8/packages/bundle-utils/src/js.ts#L83C1-L109C6
// Pre-compilation is needed in order to make CSP work
// https://github.com/intlify/bundle-tools/blob/main/packages/vue-i18n-loader/README.md#-i18n-resource-pre-compilation
import deDE from "../locales/de";
import enGB from "../locales/en";
import esES from "../locales/es";
import ukUA from "../locales/uk";

export declare type I18nLanguage = typeof deDE;

export declare type I18nConfig = { message: I18nLanguage };

declare type SupportedLanguages = "en" | "de" | "es" | "uk";

const messages: Record<SupportedLanguages, I18nLanguage> = {
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
	const i18n = createI18n<I18nLanguage, SupportedLanguages>({
		legacy: false,
		locale: authModule.getLocale,
		fallbackLocale: envConfigModule.getFallbackLanguage,
		messages: messages,
		numberFormats,
	});

	return i18n;
};

export { localCreateI18n as createI18n };
