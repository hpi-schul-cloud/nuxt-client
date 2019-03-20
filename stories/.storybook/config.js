import { configure, addDecorator, addParameters } from "@storybook/vue";

import { setDefaults, withInfo } from "storybook-addon-vue-info";
//import centered from "@storybook/addon-centered/vue";
import { withA11y } from "@storybook/addon-a11y";

import "./mockComponents";
import "@components/ui/_globals";
import "@styles/index.scss";

// Vue Docs ( storybook-addon-vue-info )
setDefaults({
	docsInPanel: false,
});
addParameters({
	info: true,
});
addDecorator(withInfo);

// A11y
addDecorator(withA11y);
addParameters({
	a11y: {
		element: ".src-components-Preview-preview-30u8", // optional selector which element to inspect
	},
});

// Padding
addDecorator(() => ({
	template: '<div style="margin: 2rem"><story/></div>',
}));

// automatically import all files ending in *.stories.js
const req = require.context("../", true, /.stories.js$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
