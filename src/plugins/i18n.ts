import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import { authModule, envConfigModule } from "@/store";

Vue.use(VueI18n);

const loadLocaleMessages = (): LocaleMessages => {
	const messages: LocaleMessages = {
		en: require("../locales/en.json"),
		de: require("../locales/de.json"),
		es: require("../locales/es.json"),
		ua: require("../locales/ua.json"),
	};
	return messages;
};

export const createI18n = (): VueI18n => {
	return new VueI18n({
		locale: authModule.getLocale,
		fallbackLocale: envConfigModule.getFallbackLanguage,
		messages: loadLocaleMessages(),
	});
};

// NUXT_REMOVAL remove $ts when refactored
declare module "vue/types/vue" {
	interface Vue {
		$ts(key: string): string;
	}
}
// NUXT_REMOVAL remove $ts when refactored
Vue.prototype.$ts = (key: string) => {
	// @ts-ignore
	const result = this.$t(key);
	if (typeof result !== "string") {
		throw new Error("Translation Result is not a string");
	}
	return result;
};
