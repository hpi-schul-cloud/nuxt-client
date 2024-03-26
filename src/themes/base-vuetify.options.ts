import * as materialAliases from "@/components/icons/material";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { type ThemeDefinition } from "vuetify";
import { customAliases } from "@/components/icons/custom";

declare global {
	interface Window {
		nonce: string;
	}
}

const baseTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: "#9e292b",
		"primary-darken-1": "#800416",
		"primary-lighten": "#f5eaea",
		secondary: "#3a424b",
		"secondary-lighten-1": "#8a9199",
		"secondary-darken-1": "#3a424b",
		accent: "#e98404",
		black: "#1b1b1b",
		white: "#ffffff",
		info: "#0a7ac9",
		"info-darken-1": "#0e8c71",
		success: "#13ba98",
		"success-darken-1": "#0e8c71",
		warning: "#ff8311",
		"warning-lighten-1": "#fff0e2",
		error: "#ff1134",
		"error-darken-1": "#bf0d26",
	},
};

export default {
	theme: {
		options: {
			customProperties: true,
			cspNonce: window.nonce,
		},
		themes: { light: baseTheme },
	},
	icons: {
		defaultSet: "mdi",
		aliases: {
			...aliases,
			...materialAliases,
			...customAliases,
		},
		sets: {
			mdi,
		},
	},
};
