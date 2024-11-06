import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const brbTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#2876d0",
		"primary-darken-1": "#086e71",
		"primary-lighten": "#e6f4f5",
		accent: "#e4032e",
		"on-surface": "#0f3551",
		"on-background": "#0f3551",
		"surface-light": "#f2f4f5",
		"on-surface-light": "#294c5a",
		"on-white": "#0f3551",
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
