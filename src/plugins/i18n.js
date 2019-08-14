import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = (store) =>
	new VueI18n({
		// fallback for storybook
		locale: store ? store.state.i18n.locale : "de",
		fallbackLocale: "de",
		messages: {
			en: require("@locales/en.json"),
			de: require("@locales/de.json"),
		},
	});

export default ({ app, store }) => {
	// Set i18n instance on app
	// This way we can use it in middleware and pages asyncData/fetch
	app.i18n = i18n(store);
};
