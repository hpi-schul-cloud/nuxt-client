import base from "@/themes/base-vuetify.options";
import { merge } from "lodash-es";
import { type ThemeDefinition } from "vuetify";

const brbTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#2876d0",
		"primary-darken-1": "#1e599c",
		"primary-lighten": "#e9f1fa",
		accent: "#e4032e",
		"on-surface": "#0f3551",
		"on-background": "#0f3551",
		"on-white": "#0f3551",
		"surface-light": "#f1f3f5",
		"on-surface-light": "#0f3551",
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
