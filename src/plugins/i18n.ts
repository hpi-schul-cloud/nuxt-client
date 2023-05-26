import { authModule, envConfigModule } from "@/store";
import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";

Vue.use(VueI18n);

const loadLocaleMessages = (): LocaleMessages => {
	const messages: LocaleMessages = {
		en: require("../locales/en.json"),
		de: require("../locales/de.json"),
		es: require("../locales/es.json"),
		uk: require("../locales/uk.json"),
	};
	return messages;
};

export let i18n: VueI18n;

export const createI18n = (): VueI18n => {
	i18n = new VueI18n({
		locale: authModule.getLocale,
		fallbackLocale: envConfigModule.getFallbackLanguage,
		messages: loadLocaleMessages(),
	});
	return i18n;
};

// NUXT_REMOVAL remove $ts when refactored
declare module "vue/types/vue" {
	interface Vue {
		$ts(key: string): string;
	}
}
// NUXT_REMOVAL remove $ts when refactored
Vue.prototype.$ts = (key: string) => {
	const result = (this as unknown as Vue).$t(key);
	if (typeof result !== "string") {
		throw new Error("Translation Result is not a string");
	}
	return result;
};
