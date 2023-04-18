import {
	accountsModule,
	applicationErrorModule,
	authModule,
	autoLogoutModule,
	collaborativeFilesModule,
	contentModule,
	copyModule,
	envConfigModule,
	externalToolsModule,
	filePathsModule,
	filesPOCModule,
	finishedTasksModule,
	importUsersModule,
	loadingStateModule,
	newsModule,
	notifierModule,
	roomModule,
	roomsModule,
	schoolsModule,
	shareModule,
	statusAlertsModule,
	systemsModule,
	taskCardModule,
	tasksModule,
	userLoginMigrationModule,
} from "@/store";
import Vue from "vue";
import App from "./App.vue";
// import { createI18n } from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./plugins/store";

const app = Vue.createApp(App);

// app.config.productionTip = false;

app.config.errorHandler = handleApplicationError;

// NUXT_REMOVAL set this based on the tenant theme
import themeConfig from "@/theme.config";
app.config.globalProperties.$theme = themeConfig;

// NUXT_REMOVAL try to solve without vue-mq dependency
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMq from "vue-mq";
app.use(VueMq, {
	breakpoints: {
		mobile: 750,
		tabletPortrait: 770,
		tablet: 991,
		desktop: 1200,
		large: Infinity,
	},
	defaultBreakpoint: "mobile",
});

// import Vuelidate from "vuelidate";
// app.use(Vuelidate);

app.mixin({
	computed: {
		$user() {
			return authModule.getUser;
		},
	},
});

// NUXT_REMOVAL change how global components are handled
import "@/components/base/_globals";
import "@/plugins/directives";
import "@/plugins/polyfills";

import "@/styles/global.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { initializeAxios } from "./utils/api";
import { handleApplicationError } from "./plugins/application-error-handler";

(async () => {
	const runtimeConfigJson = await axios.get(
		`${window.location.origin}/runtime.config.json`
	);
	axios.defaults.baseURL = runtimeConfigJson.data.apiURL;

	initializeAxios(axios);
	app.config.globalProperties.$axios = axios;

	await envConfigModule.findEnvs();

	const cookies = new Cookies();
	const jwt = cookies.get("jwt");

	if (jwt) {
		axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
		// NUXT_REMOVAL TODO
		// catch invalid jwt error and
		// const loginUrl = getLoginUrlWithRedirect(<current location>);
		// authModule.logout(loginUrl);
		try {
			await authModule.login(jwt);
		} catch (e) {
			console.log("### JWT invalid: ", e);
		}
	}

	// creation of i18n relies on envConfigModule authModule
	// const i18n = createI18n();

	app.use(router).use(store).use(vuetify); //.use(i18n);

	// NUXT_REMOVAL get rid of store DI
	app.provide("accountsModule", accountsModule);
	app.provide("applicationErrorModule", applicationErrorModule);
	app.provide("authModule", authModule);
	app.provide("autoLogoutModule", autoLogoutModule);
	app.provide("collaborativeFilesModule", collaborativeFilesModule);
	app.provide("contentModule", contentModule);
	app.provide("copyModule", copyModule);
	app.provide("envConfigModule", envConfigModule);
	app.provide("externalToolsModule", externalToolsModule);
	app.provide("filePathsModule", filePathsModule);
	app.provide("filesPOCModule", filesPOCModule);
	app.provide("finishedTasksModule", finishedTasksModule);
	app.provide("importUsersModule", importUsersModule);
	app.provide("loadingStateModule", loadingStateModule);
	app.provide("newsModule", newsModule);
	app.provide("notifierModule", notifierModule);
	app.provide("roomModule", roomModule);
	app.provide("roomsModule", roomsModule);
	app.provide("schoolsModule", schoolsModule);
	app.provide("shareModule", shareModule);
	app.provide("statusAlertsModule", statusAlertsModule);
	app.provide("systemsModule", systemsModule);
	app.provide("taskCardModule", taskCardModule);
	app.provide("tasksModule", tasksModule);
	app.provide("userLoginMigrationModule", userLoginMigrationModule);
	app.provide("i18n", i18n);

	app.mount("#app");
})();
