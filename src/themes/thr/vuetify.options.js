import base from "@/themes/base-vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				colors: {
					primary: "#2876d0",
					"primary-darken-1": "#1e599c",
					"primary-lighten": "#e9f1fa",
					secondary: "#185888",
					"secondary-lighten-1": "#3b719a",
					"secondary-darken-1": "#124266",
					accent: "#f56b00",
				},
			},
		},
	},
};

export default merge(base, custom);
