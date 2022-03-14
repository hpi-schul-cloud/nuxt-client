import Vue from "vue";
import VueI18n from "vue-i18n";
import { authModule, envConfigModule } from "@/store";

Vue.use(VueI18n);

export const i18n = () => {
	const locale =
		authModule && authModule.getLocale ? authModule.getLocale : "de"; // 'de' fallback for unit tests
	const fallbackLocale =
		envConfigModule && envConfigModule.getFallbackLanguage
			? envConfigModule.getFallbackLanguage
			: "de"; // 'de' fallback for unit tests

	return new VueI18n({
		locale,
		fallbackLocale,
		messages: {
			en: require("@locale/en.json"),
			de: require("@locale/de.json"),
			es: require("@locale/es.json"),
		},
	});
};

export default ({ app, store }) => {
	// Set i18n instance on app
	// This way we can use it in middleware and pages asyncData/fetch
	app.i18n = i18n(store);
};

Vue.prototype.$ts = function (key) {
	const result = this.$t(key);
	if (typeof result !== "string") {
		throw new Error("Translation Result is not a string");
	}
	return result;
};
