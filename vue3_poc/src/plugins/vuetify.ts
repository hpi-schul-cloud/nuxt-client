// Styles
import "../styles/roboto-font-face.css";
import "../styles/vuetify.scss";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vuetify
import { createVuetify } from "vuetify";
import { customTheme } from "@/styles/custom-theme";

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
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
