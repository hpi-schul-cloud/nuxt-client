import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		dark: false,
		themes: {
			light: {
				primary: {
					base: "#0a688c",
					darken1: "#084e69",
				},
				secondary: {
					base: "#17212a",
					lighten1: "#3a424a",
					darken1: "#111920",
				},
				accent: {
					base: "#d9174c",
				},
			},
		},
	},
};

export default merge(base, custom);
