import { mountBaseComponents } from "@/components/base/components";
import {
	accountsModule,
	applicationErrorModule,
	authModule,
	autoLogoutModule,
	commonCartridgeImportModule,
	contentModule,
	contextExternalToolsModule,
	copyModule,
	envConfigModule,
	filePathsModule,
	finishedTasksModule,
	groupModule,
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
	termsOfUseModule,
	userLoginMigrationModule,
	videoConferenceModule,
	commonCartridgeExportModule,
} from "@/store";
import themeConfig from "@/theme.config";
import { htmlConfig } from "@feature-render-html";
import axios from "axios";
import Cookies from "universal-cookie";
import { createApp } from "vue";
import VueDOMPurifyHTML from "vue-dompurify-html";
import "@/plugins/polyfills";

import "@/styles/global.scss";
// TODO solve without vue-mq dependency
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Vue3Mq } from "vue3-mq";
import App from "./App.vue";
import { handleApplicationError } from "./plugins/application-error-handler";
import { createI18n } from "./plugins/i18n";
import store from "./plugins/store";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { initializeAxios } from "./utils/api";

import {
	APPLICATION_ERROR_KEY,
	AUTH_MODULE_KEY,
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	CONTENT_MODULE_KEY,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	COPY_MODULE_KEY,
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	GROUP_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NEWS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	PRIVACY_POLICY_MODULE_KEY,
	ROOM_MODULE_KEY,
	ROOMS_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	SYSTEMS_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
	THEME_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "./utils/inject";

export const app = createApp(App);

mountBaseComponents(app);

// app.config.productionTip = false;

app.config.errorHandler = handleApplicationError;

app.config.globalProperties.$theme = themeConfig;

app.use(Vue3Mq, {
	breakpoints: {
		mobile: 0,
		tabletPortrait: 750,
		tablet: 770,
		desktop: 991,
		large: 1200,
	},
	defaultBreakpoint: "mobile",
});

app.mixin({
	computed: {
		$me() {
			return authModule.getMe;
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
			console.error("### JWT invalid: ", e);
		}
	}

	// creation of i18n relies on envConfigModule authModule
	const i18n = createI18n();

	app.use(router).use(store).use(vuetify).use(i18n);

	// NUXT_REMOVAL get rid of store DI
	app.provide("accountsModule", accountsModule);
	app.provide(APPLICATION_ERROR_KEY.valueOf(), applicationErrorModule);
	app.provide(AUTH_MODULE_KEY.valueOf(), authModule);
	app.provide("autoLogoutModule", autoLogoutModule);
	app.provide(CONTENT_MODULE_KEY, contentModule);
	app.provide(
		CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf(),
		contextExternalToolsModule
	);
	app.provide(COPY_MODULE_KEY.valueOf(), copyModule);
	app.provide(ENV_CONFIG_MODULE_KEY.valueOf(), envConfigModule);
	app.provide("filePathsModule", filePathsModule);
	app.provide("finishedTasksModule", finishedTasksModule);
	app.provide(GROUP_MODULE_KEY.valueOf(), groupModule);
	app.provide("importUsersModule", importUsersModule);
	app.provide("loadingStateModule", loadingStateModule);
	app.provide(NEWS_MODULE_KEY.valueOf(), newsModule);
	app.provide(NOTIFIER_MODULE_KEY.valueOf(), notifierModule);
	app.provide(PRIVACY_POLICY_MODULE_KEY.valueOf(), privacyPolicyModule);
	app.provide(TERMS_OF_USE_MODULE_KEY.valueOf(), termsOfUseModule);
	app.provide(ROOM_MODULE_KEY.valueOf(), roomModule);
	app.provide("roomsModule", roomsModule);
	app.provide(
		SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf(),
		schoolExternalToolsModule
	);
	app.provide(SCHOOLS_MODULE_KEY.valueOf(), schoolsModule);
	app.provide("shareModule", shareModule);
	app.provide(
		COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf(),
		commonCartridgeExportModule
	);
	app.provide(STATUS_ALERTS_MODULE_KEY.valueOf(), statusAlertsModule);
	app.provide(SYSTEMS_MODULE_KEY.valueOf(), systemsModule);
	app.provide("tasksModule", tasksModule);
	app.provide(
		USER_LOGIN_MIGRATION_MODULE_KEY.valueOf(),
		userLoginMigrationModule
	);
	app.provide(VIDEO_CONFERENCE_MODULE_KEY.valueOf(), videoConferenceModule);
	app.provide(LOADING_STATE_MODULE_KEY.valueOf(), loadingStateModule);
	app.provide(ROOMS_MODULE_KEY.valueOf(), roomsModule);
	app.provide(
		COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf(),
		commonCartridgeImportModule
	);
	app.provide(THEME_KEY.valueOf(), themeConfig);

	app.mount("#app");
})();
