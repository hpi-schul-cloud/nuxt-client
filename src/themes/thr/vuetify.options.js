import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#185888",
				secondary: "#f56b00",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
