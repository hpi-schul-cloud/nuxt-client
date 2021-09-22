import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				primary: "#9e292b",
				secondary: "#54616e",
				accent: "#E98404",
			},
		},
	},
};

export default merge(custom, base);
