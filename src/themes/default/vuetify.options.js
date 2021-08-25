import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				primary: "#b1063a",
				secondary: "#e98404",
				accent: "#455b6a",
			},
		},
	},
};

export default merge(custom, base);
