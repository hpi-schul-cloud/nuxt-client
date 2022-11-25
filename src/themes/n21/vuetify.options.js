import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: {
					base: "#2876d0",
					darken1: "#1e599c",
				},
				secondary: {
					base: "#355478",
					lighten1: "#536e8c",
					darken1: "#283f5a",
				},
				accent: {
					base: "#970000",
				},
			},
		},
	},
};

export default merge(base, custom);
