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
				//primary: {
				// base: string
				// lighten5: string
				// lighten4: string
				// lighten3: string
				// lighten2: string
				// lighten1: string
				// darken1: string
				// darken2: string
				// darken3: string
				// darken4: string
				//},
				secondary: {
					base: "#54616e",
					light1: "#8A9199",
					darken1: "#3A424B",
				},
				black: {
					base: "#1b1b1b",
				},
				white: {
					base: "#ffffff",
				},
				gray: {
					base: "#aaaaaa",
					lighten1: "#eeeeee",
					lighten2: "#E0E0E0",
					darken1: "#444444",
				},
				info: {
					base: "#0A7AC9",
					darken1: "#085C96",
				},
				success: {
					base: "#13BA98",
					darken1: "#0E8C71",
				},
				warning: {
					base: "#FF8311",
				},
				danger: {
					base: "#ff1134",
					darken1: "#BF0D26",
				},
				accent: {
					base: "#E98404",
				},
			},
		},
	},
};

export default merge(base, custom);
