import base from "@/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: {
					base: "#0a9396",
					darken1: "#086e71",
				},
				secondary: {
					base: "#38677a",
					lighten1: "#567e8e",
					darken1: "#2a4d5b",
				},
				accent: {
					base: "#e4032e",
				},
			},
		},
	},
};

export default merge(base, custom);
