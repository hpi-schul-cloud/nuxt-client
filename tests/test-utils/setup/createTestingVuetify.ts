import { createVuetify } from "vuetify";
import * as components from "vuetify/lib/components/index.mjs";
import * as directives from "vuetify/lib/directives/index.mjs";

export const createTestingVuetify = (options = {}) => {
	const vuetify = createVuetify({
		components: {
			...components,
		},
		directives,
		...options,
	});
	return vuetify;
};

// see https://vuetifyjs.com/en/getting-started/unit-testing/
global.ResizeObserver = require("resize-observer-polyfill");
