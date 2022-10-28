import theme from "@/themes/default/vuetify.options";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
	...theme,
});
