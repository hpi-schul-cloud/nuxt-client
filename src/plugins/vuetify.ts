import "@/styles/global.scss";
import { createVuetify } from "vuetify";

import theme from "@/vuetify.options";

export default createVuetify({
	...theme,
	defaults: {
		VAlert: { variant: "tonal" },
		VAutocomplete: { color: "primary" },
		VCheckbox: { color: "primary" },
		VFileInput: { variant: "underlined", color: "primary" },
		VSelect: { variant: "underlined", color: "primary" },
		VSwitch: { inset: true, flat: true, color: "primary" },
		VTabs: { color: "primary" },
		VTextarea: { variant: "underlined", color: "primary" },
		VTextField: { variant: "underlined", color: "primary" },
	},
});
