import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#0A688C",
				secondary: "#17212a",
				accent: "#D9174C",
			},
		},
	},
};

export default merge(custom, base);
