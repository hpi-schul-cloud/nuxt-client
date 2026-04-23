import base from "@/themes/base-vuetify-theme.options";
import { merge } from "lodash-es";
import { type ThemeDefinition } from "vuetify";

const federalStateTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#2370CB",
		"primary-darken-1": "#1e599c",
		"primary-lighten": "#e9f1fa",
		"on-surface": "#0f3551",
		"on-background": "#0f3551",
		"on-white": "#0f3551",
		"surface-light": "#f2f5f9",
		"on-surface-light": "#0f3551",
	},
};

const dbcTheme: ThemeDefinition = {
	dark: false,
	colors: {
		"on-surface": "#3a424b",
		"on-background": "#3a424b",
		"on-white": "#3a424b",
		"surface-light": "#f3f4f4",
		"on-surface-light": "#3a424b",
	},
};

export const dbcThemeOptions = merge({}, base, {
	theme: {
		themes: {
			light: dbcTheme,
		},
	},
});
export const federalStateThemeOptions = merge({}, base, {
	theme: {
		themes: {
			light: federalStateTheme,
		},
	},
});
