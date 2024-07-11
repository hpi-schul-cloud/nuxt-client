import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const brbTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#0a9396",
		"primary-darken-1": "#086e71",
		"primary-lighten": "#e6f4f5",
		accent: "#e4032e",
		"on-surface": "#294c5a",
		"on-background": "#294c5a",
		"surface-light": "#294c5a",
		"on-surface-light": "#0a9396",
		"on-white": "#294c5a",
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
