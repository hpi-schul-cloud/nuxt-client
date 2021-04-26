import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default (ctx) => {
	const vuetify = new Vuetify({
		theme: {
			dark: false, // From 2.0 You have to select the theme dark or light here
		},
	});

	ctx.app.vuetify = vuetify;
	ctx.$vuetify = vuetify.framework;
};
