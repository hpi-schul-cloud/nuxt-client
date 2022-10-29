// Styles
import "../styles/pt-sans-font-face.css";
import "../styles/vuetify.scss";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vuetify
import { createVuetify } from "vuetify";
import { customTheme } from "@/styles/custom-theme";
import { Language } from "@/store/types/Language";

export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "customTheme",
		themes: {
			customTheme,
		},
	},
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
	// https://next.vuetifyjs.com/en/features/internationalization/#getting-started
	locale: {
		locale: Language.German,
		fallback: Language.English,
	},
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
