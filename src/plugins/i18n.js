import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = (store) => {
	let locale = "de";
	if (store?.state["env-config"]?.env.I18N__DEFAULT_LANGUAGE) {
		locale = store?.state["env-config"]?.env.I18N__DEFAULT_LANGUAGE;
	}
	if (store?.state?.auth?.locale) {
		locale = store?.state?.auth?.locale;
	}

	let fallbackLocale = "de";
	if (store?.state["env-config"]?.env.I18N__FALLBACK_LANGUAGE) {
		fallbackLocale = store?.state["env-config"]?.env.I18N__FALLBACK_LANGUAGE;
	}

	return new VueI18n({
		// fallback for storybook
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
