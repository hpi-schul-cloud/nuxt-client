import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const defaultTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#9e292b",
		"primary-darken-1": "#800416",
		"primary-lighten": "#f5eaea",
		secondary: "#54616e",
		"secondary-lighten-1": "#8a9199",
		"secondary-darken-1": "#3a424b",
		accent: "#e98404",
		"on-surface": "#01A4A4",
		"on-background": "#01A238",
		"on-white": "#01A238",
	},
};

const custom = {
	theme: {
		themes: {
			light: defaultTheme,
		},
	},
};

export default merge(base, custom);
