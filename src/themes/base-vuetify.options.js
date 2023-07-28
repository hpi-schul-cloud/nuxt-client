import customIcons from "@/components/icons/custom";
import materialIcons from "@/components/icons/material";

export default {
	theme: {
		options: {
			customProperties: true,
			cspNonce: window.nonce,
		},
		themes: {
			light: {
				primary: {
					base: "#9e292b",
					darken1: "#800416",
					lighten: "#f5eaea",
				},
				secondary: {
					base: "#54616e",
					lighten1: "#8a9199",
					darken1: "#3a424b",
				},
				accent: {
					base: "#e98404",
				},
				black: {
					base: "#1b1b1b",
				},
				white: {
					base: "#ffffff",
				},
				info: {
					base: "#0a7ac9",
					darken1: "#085c96",
				},
				success: {
					base: "#13ba98",
					darken1: "#0e8c71",
				},
				warning: {
					base: "#ff8311",
					lighten1: "#fff0e2",
				},
				error: {
					base: "#ff1134",
					darken1: "#bf0d26",
				},
				"beta-task": {
					base: "#196C9E",
				},
			},
		},
	},
	icons: {
		iconfont: "mdiSvg",
		values: {
			...customIcons,
			...materialIcons,
		},
	},
};
