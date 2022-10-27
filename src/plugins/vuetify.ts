import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import theme from "@/themes/default/vuetify.options";

Vue.use(Vuetify);

export default new Vuetify({
	...theme,
});
