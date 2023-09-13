import {
	accountsModule,
	applicationErrorModule,
	authModule,
	autoLogoutModule,
	collaborativeFilesModule,
	contentModule,
	contextExternalToolsModule,
	copyModule,
	envConfigModule,
	externalToolsModule,
	filePathsModule,
	finishedTasksModule,
	importUsersModule,
	loadingStateModule,
	newsModule,
	notifierModule,
	privacyPolicyModule,
	roomModule,
	roomsModule,
	schoolExternalToolsModule,
	schoolsModule,
	shareModule,
	statusAlertsModule,
	systemsModule,
	tasksModule,
	userLoginMigrationModule,
	videoConferenceModule,
} from "@/store";
import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "./plugins/i18n";
import store from "./plugins/store";
import vuetify from "./plugins/vuetify";
import router from "./router";
// NUXT_REMOVAL set this based on the tenant theme
import themeConfig from "@/theme.config";
// NUXT_REMOVAL try to solve without vue-mq dependency
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Vue3Mq } from "vue3-mq";
import { htmlConfig } from "@feature-render-html";
import VueDOMPurifyHTML from "vue-dompurify-html";
// NUXT_REMOVAL change how global components are handled
import "@/plugins/polyfills";

import "@/styles/global.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { handleApplicationError } from "./plugins/application-error-handler";
import { initializeAxios } from "./utils/api";

import {
	APPLICATION_ERROR_KEY,
	AUTH_MODULE_KEY,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "./utils/inject";

export const app = createApp(App);

// VUE3_UPGRADE -- Mounting Base Components - remove later
import { mountLegacyComponents } from "@/components/base/components";
mountLegacyComponents(app);

// VUE3_UPGRADE -- Mounting Base Directives - remove later
import { mountLegacyDirectives } from "@/plugins/directives";
mountLegacyDirectives(app);

// app.config.productionTip = false;

app.config.errorHandler = handleApplicationError;

app.config.globalProperties.$theme = themeConfig;

// NUXT_REMOVAL try to solve without vue-mq dependency
app.use(Vue3Mq, {
	breakpoints: {
		mobile: 750,
		tabletPortrait: 770,
		tablet: 991,
		desktop: 1200,
		large: Infinity,
	},
	defaultBreakpoint: "mobile",
});

app.mixin({
	computed: {
		$user() {
			return authModule.getUser;
		},
	},
});

app.use(VueDOMPurifyHTML, {
	namedConfigurations: htmlConfig,
});

(async () => {
	const runtimeConfigJson = await axios.get(
		`${window.location.origin}/runtime.config.json`
	);
	axios.defaults.baseURL = runtimeConfigJson.data.apiURL;

	initializeAxios(axios);

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
	const i18n = createI18n();

	app.use(router).use(store).use(vuetify).use(i18n);

	// NUXT_REMOVAL get rid of store DI
	app.provide("accountsModule", accountsModule);
	app.provide(APPLICATION_ERROR_KEY.valueOf(), applicationErrorModule);
	app.provide("authModule", authModule);
	app.provide(AUTH_MODULE_KEY.valueOf(), authModule);
	app.provide("autoLogoutModule", autoLogoutModule);
	app.provide("collaborativeFilesModule", collaborativeFilesModule);
	app.provide("contentModule", contentModule);
	app.provide(
		CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf(),
		contextExternalToolsModule
	);
	app.provide("copyModule", copyModule);
	app.provide(ENV_CONFIG_MODULE_KEY.valueOf(), envConfigModule);
	app.provide(EXTERNAL_TOOLS_MODULE_KEY.valueOf(), externalToolsModule);
	app.provide("filePathsModule", filePathsModule);
	app.provide("finishedTasksModule", finishedTasksModule);
	app.provide("importUsersModule", importUsersModule);
	app.provide("loadingStateModule", loadingStateModule);
	app.provide("newsModule", newsModule);
	app.provide(NOTIFIER_MODULE_KEY.valueOf(), notifierModule);
	app.provide("privacyPolicyModule", privacyPolicyModule);
	app.provide(ROOM_MODULE_KEY.valueOf(), roomModule);
	app.provide("roomsModule", roomsModule);
	app.provide(
		SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf(),
		schoolExternalToolsModule
	);
	app.provide("schoolsModule", schoolsModule);
	app.provide("shareModule", shareModule);
	app.provide(STATUS_ALERTS_MODULE_KEY.valueOf(), statusAlertsModule);
	app.provide(SYSTEMS_MODULE_KEY.valueOf(), systemsModule);
	app.provide("tasksModule", tasksModule);
	app.provide(
		USER_LOGIN_MIGRATION_MODULE_KEY.valueOf(),
		userLoginMigrationModule
	);
	app.provide(I18N_KEY.valueOf(), i18n);
	app.provide(VIDEO_CONFERENCE_MODULE_KEY.valueOf(), videoConferenceModule);

	app.mount("#app");
})();
