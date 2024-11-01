import "@/styles/global.scss";
import { createVuetify } from "vuetify";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import { createI18n } from "./i18n";

import theme from "@/vuetify.options";

const i18n = createI18n();

export default createVuetify({
	...theme,
	locale: {
		adapter: createVueI18nAdapter({ i18n, useI18n }),
	},
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
