import base from "@/themes/base-vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				colors: {
					primary: "#2876d0",
					"primary-darken-1": "#1e599c",
					"primary-lighten": "#e9f1fa",
					secondary: "#355478",
					"secondary-lighten-1": "#536e8c",
					"secondary-darken-1": "#283f5a",
					accent: "#970000",
				},
			},
		},
	},
};

export default merge(base, custom);
