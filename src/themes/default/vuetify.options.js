import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				primary: "#e98404",
				secondary: "#b1063a",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
