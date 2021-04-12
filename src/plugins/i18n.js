import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = (store) =>
	new VueI18n({
		// fallback for storybook
		locale: store?.state?.auth?.locale || "de",
		fallbackLocale: "de",
		messages: {
			en: require("@locale/en.json"),
			de: require("@locale/de.json"),
			es: require("@locale/es.json"),
		},
	});

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
