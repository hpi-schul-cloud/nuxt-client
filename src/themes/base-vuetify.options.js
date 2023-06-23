import customIcons from "@/components/icons/custom";

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
			// NUXT_REMOVAL Do we really have to register all these icons
			// This here is only to supplement the Vuetify Icons.
			...customIcons,
		},
	},
};
