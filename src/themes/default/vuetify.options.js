import base from "@@/src/themes/base/vuetify.options.js";
import { merge } from "lodash";

const custom = {
	theme: {
		themes: {
			light: {
				primary: {
					base: "#9e292b",
					darken1: "#800416",
				},
				secondary: {
					base: "#54616e",
					lighten1: "#8A9199",
					darken1: "#3A424B",
				},
				accent: {
					base: "#E98404",
				},
			},
		},
	},
};

export default merge(base, custom);
