import "vuetify/styles";
import { createVuetify } from "vuetify";

import theme from "@/vuetify.options";

export default createVuetify({
	...theme,
	defaults: {
		VSwitch: { inset: true, flat: true, color: "primary" },
	},
});
