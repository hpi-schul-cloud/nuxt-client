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
import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// NUXT_REMOVAL set this based on the tenant theme
import themeConfig from "@/themes/default/config";
Vue.prototype.$theme = themeConfig;

// NUXT_REMOVAL try to solve without vue-mq dependency
// @ts-ignore
import VueMq from "vue-mq";
Vue.use(VueMq, {
	breakpoints: {
		mobile: 750,
		tabletPortrait: 770,
		tablet: 991,
		desktop: 1200,
		large: Infinity,
	},
	defaultBreakpoint: "mobile",
});

// NUXT_REMOVAL change how global components are handled
import "@/components/base/_globals";
import "@/plugins/directives";

import "@/scss/styles.scss";

new Vue({
	router,
	store,
	vuetify,
	i18n,
	// NUXT_REMOVAL get rid of store DI
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
		i18n,
	},
	render: (h) => h(App),
}).$mount("#app");
