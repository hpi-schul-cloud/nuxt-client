import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const n21Theme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#2876d0",
		"primary-darken-1": "#1e599c",
		"primary-lighten": "#e9f1fa",
		secondary: "#355478",
		"secondary-lighten-1": "#536e8c",
		"secondary-darken-1": "#283f5a",
		accent: "#970000",
	},
};

const custom = {
	theme: {
		themes: {
			light: n21Theme,
		},
	},
};

export default merge(base, custom);
