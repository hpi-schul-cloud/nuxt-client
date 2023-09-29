import { createVuetify } from "vuetify";
import * as components from "vuetify/lib/components/index.mjs";
import * as directives from "vuetify/lib/directives/index.mjs";
import {
	VSkeletonLoader,
	VStepper,
	VStepperHeader,
	VStepperItem,
	VStepperWindow,
	VStepperWindowItem,
} from "vuetify/lib/labs/components.mjs";

export const createTestingVuetify = (options = {}) => {
	const vuetify = createVuetify({
		components: {
			...components,
			VSkeletonLoader,
			VStepper,
			VStepperHeader,
			VStepperItem,
			VStepperWindow,
			VStepperWindowItem,
		},
		directives,
		...options,
	});
	return vuetify;
};

// see https://vuetifyjs.com/en/getting-started/unit-testing/
global.ResizeObserver = require("resize-observer-polyfill");
