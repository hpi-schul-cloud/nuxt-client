import base from "@/themes/base-vuetify.options";
import { merge } from "lodash-es";
import { type ThemeDefinition } from "vuetify";

const defaultTheme: ThemeDefinition = {
	dark: false,
	colors: {
		"on-surface": "#3a424b",
		"on-background": "#3a424b",
		"on-white": "#3a424b",
		"surface-light": "#f3f4f4",
		"on-surface-light": "#3a424b",
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
