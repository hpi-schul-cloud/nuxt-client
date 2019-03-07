import { configure, addDecorator, addParameters } from "@storybook/vue";

import { withInfo } from "storybook-addon-vue-info";
import centered from "@storybook/addon-centered/vue";
import { checkA11y } from "@storybook/addon-a11y";

import "@styles/index.scss";

// Vue Docs ( storybook-addon-vue-info )
addParameters({
	info: true,
});
addDecorator(withInfo);

// center Component
addDecorator(centered);

// A11y
addDecorator(checkA11y);

// automatically import all files ending in *.stories.js
const req = require.context("../", true, /.stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
