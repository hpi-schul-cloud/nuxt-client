import { configure, addDecorator, addParameters } from "@storybook/vue";

import { withInfo } from "storybook-addon-vue-info";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

import "./mockComponents";
import "@components/ui/_globals";

import Vue from "vue";

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
import Vuex from "vuex";
Vue.use(Vuex);
import createStore from "@store";
addDecorator(() => ({
	store: createStore(),
	template: "<story/>",
}));

// add i18n support
import { i18n } from "@plugins/i18n";
addDecorator(() => ({
	i18n: i18n(),
	template: "<story/>",
}));

// automatically import all files ending in *.stories.js
const req = require.context("../", true, /.stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
