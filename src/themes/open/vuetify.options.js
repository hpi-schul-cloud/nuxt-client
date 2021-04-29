import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#df0b40",
				secondary: "#126dc4",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
