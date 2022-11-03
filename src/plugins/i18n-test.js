import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = () => {
	const locale = "de";
	const fallbackLocale = "de";

	return new VueI18n({
		locale,
		fallbackLocale,
		messages: {
			en: require("@/locales/en.json"),
			de: require("@/locales/de.json"),
			es: require("@/locales/es.json"),
			ua: require("@/locales/ua.json"),
		},
	});
};

Vue.prototype.$ts = function (key) {
	const result = this.$t(key);
	if (typeof result !== "string") {
		throw new Error("Translation Result is not a string");
	}
	return result;
};
