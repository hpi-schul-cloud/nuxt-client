import { configure, addDecorator, addParameters } from "@storybook/vue";

import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

// show root sections in sidebar
addParameters({
	options: {
		showRoots: true,
		storySort: (a, b) => a[1].id.localeCompare(b[1].id),
	},
});

import "./mockComponents";
import "@basecomponents/_globals";

import "@styles";

// Vue Docs ( storybook-addon-vue-info )
//addParameters({
//	info: true,
//});

// Preview Backgrounds ( @storybook/addon-backgrounds )
addParameters({
	backgrounds: {
		default: "--color-white",
		values: [
			"primary",
			"primary-light",
			"primary-dark",
			"secondary",
			"secondary-light",
			"secondary-dark",
			"tertiary",
			"tertiary-light",
			"tertiary-dark",
			"black",
			"gray",
			"gray-light",
			"gray-dark",
			"white",
			"white-transparent",
			"overlay-light",
			"overlay-dark",
			"info",
			"info-light",
			"info-dark",
			"success",
			"success-light",
			"success-dark",
			"warning",
			"warning-light",
			"warning-dark",
			"danger",
			"danger-light",
			"danger-dark",
			"disabled",
			"disabled-dark",
		].map((color) => ({
			name: `--color-${color}`,
			value: `var(--color-${color})`,
		})),
	},
});

// A11y
addDecorator(withA11y);

// Knobs
addDecorator(withKnobs);

// Padding
addDecorator(() => ({
	template: '<div style="padding: 2rem"><story/></div>',
}));

// add vuex support
import Vue from "vue";
import Vuex from "vuex";
import store from "./store.js";
Vue.use(Vuex);
addDecorator(() => ({
	store: store(),
	template: "<story/>",
}));

// add i18n support
import { i18n } from "@plugins/i18n";
addDecorator(() => ({
	i18n: i18n({
		getters: {
			"auth/getLocale": "de",
		},
	}),
	template: "<story/>",
}));

// add vuetify support
import Vuetify from "vuetify"; // loads all components
import "vuetify/dist/vuetify.min.css"; // all the css for components
import options from "../../src/themes/default/vuetify.options.js";

Vue.use(Vuetify);
addDecorator(() => ({
	vuetify: new Vuetify(options),
	template: "<story/>",
}));

// automatically import all files ending in *.stories.js
const reqStories = require.context("../", true, /\.stories\.js$/);
const reqComponentStories = require.context(
	"../../src",
	true,
	/\.stories\.js$/
);
const testStories = require.context("../../tests", true, /\.stories\.js$/);
function loadStories() {
	reqStories.keys().forEach(reqStories);
	reqComponentStories.keys().forEach(reqComponentStories);
	// testStories must be the last entry to ensure all other stories are already registerd!
	testStories.keys().forEach(testStories);
}
configure(loadStories, module);
