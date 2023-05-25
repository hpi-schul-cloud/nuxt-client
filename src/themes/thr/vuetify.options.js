import base from "@/themes/base-vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: {
					base: "#2876d0",
					darken1: "#1e599c",
					lighten10: "#e9f1fb",
				},
				secondary: {
					base: "#185888",
					lighten1: "#3b719a",
					darken1: "#124266",
				},
				accent: {
					base: "#f56b00",
				},
			},
		},
	},
};

export default merge(base, custom);
