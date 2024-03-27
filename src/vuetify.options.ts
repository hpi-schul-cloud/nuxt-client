import base from "@/themes/base-vuetify.options";
import { merge } from "lodash";
import { type ThemeDefinition } from "vuetify";

const defaultTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#9e292b",
		"primary-darken-1": "#800416",
		"primary-lighten": "#f5eaea",
		secondary: "#3a424b",
		"secondary-lighten-1": "#8a9199",
		"secondary-darken-1": "#3a424b",
		accent: "#e98404",
		"on-surface": "#3a424b",
		"on-background": "#3a424b",
		"on-white": "#3a424b",
	},
	variables: {
		"high-emphasis-opacity": 1,
		"medium-emphasis-opacity": 0.9,
		"disabled-opacity": 0.7,
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
