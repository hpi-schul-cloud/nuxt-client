import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#b10438",
				secondary: "#78aae5",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
