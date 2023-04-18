import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import theme from "@/vuetify.options";

export default createVuetify({
	components,
	directives,
	...theme,
});
