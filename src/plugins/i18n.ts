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
import { MessageSchema } from "@/locales/schema";
import { default as deVuetify } from "vuetify/lib/locale/de";
import { default as enVuetify } from "vuetify/lib/locale/en";
import { default as esVuetify } from "vuetify/lib/locale/es";
import { default as ukVuetify } from "vuetify/lib/locale/uk";

declare type SupportedLanguages = "en" | "de" | "es" | "uk";

const messages: Record<SupportedLanguages, MessageSchema> = {
	en: { ...enGB, $vuetify: enVuetify },
	de: { ...deDE, $vuetify: deVuetify },
	es: { ...esES, $vuetify: esVuetify },
	uk: { ...ukUA, $vuetify: ukVuetify },
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
	// If false, the type is a Composer instance for the Composition API, if true, the type is a VueI18n instance for the legacy API
	// https://vue-i18n.intlify.dev/guide/advanced/typescript#global-resource-schema-type-definition
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
