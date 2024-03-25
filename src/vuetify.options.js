import base from "@/themes/base-vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				colors: {
					primary: "#9e292b",
					"primary-darken-1": "#800416",
					"primary-lighten": "#f5eaea",
					secondary: "#54616e",
					"secondary-lighten-1": "#8a9199",
					"secondary-darken-1": "#3a424b",
					accent: "#e98404",
				},
			},
		},
	},
};

export default merge(base, custom);
