import { createVuetify } from "vuetify";
import * as components from "vuetify/lib/components/index";
import * as directives from "vuetify/lib/directives/index";
import * as materialAliases from "@/components/icons/material";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi-svg";
import { customAliases } from "@/components/icons/custom";

export const createTestingVuetify = (options = {}) => {
	const vuetify = createVuetify({
		components: {
			...components,
		},
		directives,
		icons: {
			defaultSet: "mdi",
			aliases: {
				...aliases,
				...materialAliases,
				...customAliases,
			},
			sets: {
				mdi,
			},
		},
		...options,
	});
	return vuetify;
};

// see https://vuetifyjs.com/en/getting-started/unit-testing/
global.ResizeObserver = require("resize-observer-polyfill");
