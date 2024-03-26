import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const thrTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#2876d0",
		"primary-darken-1": "#1e599c",
		"primary-lighten": "#e9f1fa",
		secondary: "#185888",
		"secondary-lighten-1": "#3b719a",
		"secondary-darken-1": "#124266",
		accent: "#f56b00",
		"on-surface": "#185888",
		"on-background": "#185888",
		"on-white": "#185888",
	},
};

const custom = {
	theme: {
		themes: {
			light: thrTheme,
		},
	},
};

export default merge(base, custom);
