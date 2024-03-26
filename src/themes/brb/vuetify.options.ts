import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const brbTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#0a9396",
		"primary-darken-1": "#086e71",
		"primary-lighten": "#e6f4f5",
		secondary: "#38677a",
		"secondary-lighten-1": "#567e8e",
		"secondary-darken-1": "#2a4d5b",
		accent: "#e4032e",
		"on-surface": "#294C5A",
		"on-background": "#294C5A",
		"on-white": "#294C5A",
	},
};

const custom = {
	theme: {
		themes: {
			light: brbTheme,
		},
	},
};

export default merge(base, custom);
