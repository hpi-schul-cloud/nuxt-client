import deDE from "../locales/de";
import enGB from "../locales/en";
import esES from "../locales/es";
import ukUA from "../locales/uk";
import { MessageSchema } from "@/locales/schema";
import { useAppStore } from "@data-app";
import { useEnvStore } from "@data-env";
import type { IntlDateTimeFormats } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { default as deVuetify } from "vuetify/lib/locale/de";
import { default as enVuetify } from "vuetify/lib/locale/en";
import { default as esVuetify } from "vuetify/lib/locale/es";
import { default as ukVuetify } from "vuetify/lib/locale/uk";

declare type SupportedLanguages = "en-GB" | "de" | "es" | "uk";

const messages: Record<SupportedLanguages, MessageSchema> = {
	"en-GB": { ...enGB, $vuetify: enVuetify },
	de: { ...deDE, $vuetify: deVuetify },
	es: { ...esES, $vuetify: esVuetify },
	uk: { ...ukUA, $vuetify: ukVuetify },
};

const fileSizeFormat = { maximumFractionDigits: 2 };

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

const dateFormat: Intl.DateTimeFormatOptions = { month: "2-digit", day: "2-digit", year: "numeric" };
const timeFormat: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
const datetimeFormats: IntlDateTimeFormats = {
	de: {
		date: dateFormat,
		time: timeFormat,
	},
	"en-GB": {
		date: dateFormat,
		time: timeFormat,
	},
	es: {
		date: dateFormat,
		time: timeFormat,
	},
	uk: {
		date: dateFormat,
		time: timeFormat,
	},
};

const localCreateI18n = () => {
	// If false, the type is a Composer instance for the Composition API, if true, the type is a VueI18n instance for the legacy API
	// https://vue-i18n.intlify.dev/guide/advanced/typescript#global-resource-schema-type-definition

	const i18n = createI18n<false>({
		legacy: false,
		locale: useAppStore().locale === "en" ? "en-GB" : useAppStore().locale,
		fallbackLocale: useEnvStore().fallBackLanguage,
		messages: messages,
		datetimeFormats,
		numberFormats,
	});

	return i18n;
};

let i18nInstance: ReturnType<typeof localCreateI18n>;

const createTypedI18nInstance = () => {
	if (!i18nInstance) {
		i18nInstance = localCreateI18n();
	}
	return i18nInstance;
};
export { createTypedI18nInstance as createI18n };

export const useI18nGlobal = () => createTypedI18nInstance()?.global;

export const i18nKeyExists = (key: string) => {
	const { locale, messages } = createTypedI18nInstance().global;

	// @ts-expect-error Schema for i18n is not properly written yet. TODO: Fix schema, then remove this line.
	return key in messages.value[locale.value];
};
