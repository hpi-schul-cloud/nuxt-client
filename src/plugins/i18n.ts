import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import { authModule, envConfigModule } from "@/store";

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
	const locales = require.context(
		"../locales",
		true,
		/[A-Za-z0-9-_,\s]+\.json$/i
	);
	const messages: LocaleMessages = {};
	locales.keys().forEach((key) => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);
		if (matched && matched.length > 1) {
			const locale = matched[1];
			messages[locale] = locales(key);
		}
	});
	return messages;
}

const locale = authModule && authModule.getLocale ? authModule.getLocale : "de"; // 'de' fallback for unit tests
const fallbackLocale =
	envConfigModule && envConfigModule.getFallbackLanguage
		? envConfigModule.getFallbackLanguage
		: "de"; // 'de' fallback for unit tests

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

export default new VueI18n({
	locale,
	fallbackLocale,
	messages: loadLocaleMessages(),
});
