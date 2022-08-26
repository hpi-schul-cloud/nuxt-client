// Styles
import "@mdi/font/css/materialdesignicons.css";
import "../styles/main.scss";

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
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
