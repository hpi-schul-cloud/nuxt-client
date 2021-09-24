import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#0a9396",
				secondary: "#38677a",
				accent: "#E4032E",
			},
		},
	},
};

export default merge(base, custom);
