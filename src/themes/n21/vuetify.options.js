import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: "#6E9CD2",
				secondary: "#355478",
				accent: "#970000",
			},
		},
	},
};

export default merge(custom, base);
