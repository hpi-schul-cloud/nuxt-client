import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				primary: "#9e292b",
				//primary: {
				// base: string
				// lighten5: string
				// lighten4: string
				// lighten3: string
				// lighten2: string
				// lighten1: string
				// darken1: string
				// darken2: string
				// darken3: string
				// darken4: string
				//},
				secondary: "#54616e",
				accent: "#E98404",
				black: "#1b1b1b",
				gray: "#aaaaaa",
			},
		},
	},
};

export default merge(base, custom);
