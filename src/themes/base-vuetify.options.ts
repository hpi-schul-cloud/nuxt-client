import { customAliases } from "@/components/icons/custom";
import * as materialAliases from "@/components/icons/material";
import { type ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

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
		accent: "#e98404",
		white: "#ffffff",
		info: "#0a7ac9",
		"info-darken-1": "#0e8c71",
		success: "#13ba98",
		"success-darken-1": "#0e8c71",
		warning: "#ff8311",
		"warning-lighten-1": "#fff0e2",
		error: "#ed0122",
		"error-darken-1": "#bf0d26",
		"surface-variant": "#4E555D",
		"on-surface-variant": "#F7F7F8",
	},
	variables: {
		"high-emphasis-opacity": 1,
		"medium-emphasis-opacity": 0.8,
		"disabled-opacity": 0.6,
	},
};

export default {
	theme: {
		cspNonce: "**CSP_NONCE**",
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
