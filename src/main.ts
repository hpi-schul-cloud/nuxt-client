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
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./plugins/store";

Vue.config.productionTip = false;

// NUXT_REMOVAL set this based on the tenant theme
import themeConfig from "@/theme.config";
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

import "@/styles/global.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { initializeAxios } from "./utils/api";

(async () => {
	const runtimeConfigJson = await axios.get(
		`${window.location.origin}/runtime.config.json`
	);
	axios.defaults.baseURL = runtimeConfigJson.data.apiURL;
	const cookies = new Cookies();
	const jwt = cookies.get("jwt");

	if (!jwt) {
		const target = `${window.location.pathname}${window.location.search}`;
		window.location.assign(`/login?redirect=${target}`);
	}

	axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;

	initializeAxios(axios);

	await envConfigModule.findEnvs();
	await authModule.login(jwt);

	// console.log("--- main login finished");

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
})();
