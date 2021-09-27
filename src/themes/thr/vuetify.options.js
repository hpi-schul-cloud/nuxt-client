import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#2876D0",
				secondary: "#185888",
				accent: "#f56b00",
			},
		},
	},
};

export default merge(base, custom);
