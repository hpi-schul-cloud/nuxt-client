import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#126dc4",
				secondary: "#455b6a",
				accent: "#E98404",
			},
		},
	},
};

export default merge(custom, base);
