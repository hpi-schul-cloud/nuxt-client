import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import {
	accountsModule,
	authModule,
	autoLogoutModule,
	contentModule,
	copyModule,
	envConfigModule,
	filePathsModule,
	filesPOCModule,
	finishedTaskModule,
	importUsersModule,
	loadingStateModule,
	newsModule,
	notifierModule,
	roomModule,
	roomsModule,
	schoolsModule,
	shareCourseModule,
	statusAlertsModule,
	taskModule,
} from "@/store";

Vue.config.productionTip = false;

// NUXT_REMOVAL set this based on the tenant theme
// import Theme from "@/theme/config";
// Vue.prototype.$theme = Theme;
Vue.prototype.$theme = {
	name: "dBildungscloud",
	short_name: "dbc",
};

// NUXT_REMOVAL change how global components are handled
import "@/components/base/_globals";

import "@/scss/styles.scss";

new Vue({
	router,
	store,
	vuetify,
	i18n,
	provide: {
		accountsModule,
		authModule,
		autoLogoutModule,
		contentModule,
		copyModule,
		envConfigModule,
		filePathsModule,
		filesPOCModule,
		finishedTaskModule,
		importUsersModule,
		loadingStateModule,
		newsModule,
		notifierModule,
		roomModule,
		roomsModule,
		schoolsModule,
		shareCourseModule,
		statusAlertsModule,
		taskModule,
	},
	render: (h) => h(App),
}).$mount("#app");
