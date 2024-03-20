import base from "@/themes/base-vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				colors: {
					primary: "#0a9396",
					"primary-darken-1": "#086e71",
					"primary-lighten": "#e6f4f5",
					secondary: "#38677a",
					"secondary-lighten-1": "#567e8e",
					"secondary-darken-1": "#2a4d5b",
					accent: "#e4032e",
				},
			},
		},
	},
};

export default merge(base, custom);
