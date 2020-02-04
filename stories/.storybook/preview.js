import { configure, addDecorator, addParameters } from "@storybook/vue";

import { withInfo } from "storybook-addon-vue-info";
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
addParameters({
	info: true,
});
addDecorator(withInfo);

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
	i18n: i18n(),
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
