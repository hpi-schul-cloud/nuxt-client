import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#064963",
				secondary: "#d9174c",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
