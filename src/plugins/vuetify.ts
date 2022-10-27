import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import theme from "@/themes/default/vuetify.options";
/*
 * NUXT_REMOVAL
 * Register missing icons from @assets/icons in here using their filename.
 * After registration, the original Icon in the icons folder should be deleted to narrow down unused icons
 */
const CUSTOM_ICONS = {
	tasks:
		"M10.382 13.295c.39.39.39 1.02 0 1.4l-4.588 4.588a1 1 0 01-1.414 0l-2.088-2.088a.984.984 0 010-1.4 1 1 0 011.412-.002l1.383 1.377 3.884-3.876a1 1 0 011.411.001zM21 15a1 1 0 110 2h-8a1 1 0 110-2h8zM8 5a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h4zM7 7H5v2h2V7zm14 0a1 1 0 110 2h-8a1 1 0 110-2h8z",
};

Vue.use(Vuetify);

export default new Vuetify({
	...theme,
	icons: { iconFont: "custom", values: CUSTOM_ICONS },
});
