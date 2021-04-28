import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#f56b00",
				secondary: "#185888",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
