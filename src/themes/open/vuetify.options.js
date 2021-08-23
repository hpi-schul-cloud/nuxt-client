import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#126dc4",
				secondary: "#df0b40",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
