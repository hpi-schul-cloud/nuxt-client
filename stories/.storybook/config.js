import { configure, addDecorator } from "@storybook/vue";
import centered from "@storybook/addon-centered";
import { checkA11y } from "@storybook/addon-a11y";
import VueInfoAddon from "storybook-addon-vue-info";

addDecorator(VueInfoAddon);
addDecorator(checkA11y);
// addDecorator(centered);

// automatically import all files ending in *.stories.js
const req = require.context("../", true, /.stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
