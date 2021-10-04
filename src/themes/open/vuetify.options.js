import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#126dc4",
				secondary: "#54616e",
				accent: "#E98404",
			},
		},
	},
};

export default merge(base, custom);
