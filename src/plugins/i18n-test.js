import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const locale = "de";
const fallbackLocale = "de";
const messages = {
	en: require("@/locales/en.json"),
	de: require("@/locales/de.json"),
	es: require("@/locales/es.json"),
	ua: require("@/locales/ua.json"),
};

// for setting up i18n in localVue
export const setupI18n = () => {
	return new VueI18n({
		locale,
		fallbackLocale,
		messages,
	});
};

// make i18n globally available
Vue.prototype._i18n = setupI18n();

// NUXT_REMOVAL remove $ts when refactored
Vue.prototype.$ts = function (key) {
	const result = this.$t(key);
	if (typeof result !== "string") {
		throw new Error("Translation Result is not a string");
	}
	return result;
};
