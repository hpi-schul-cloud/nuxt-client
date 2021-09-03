import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				primary: "#b1063a",
				secondary: "#455b6a",
				accent: "#E98404",
			},
		},
	},
};

export default merge(custom, base);
