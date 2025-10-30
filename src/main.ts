import "@/plugins/polyfills";
import App from "./App.vue";
import { createI18n } from "./plugins/i18n";
import store from "./plugins/store";
import createVuetify from "./plugins/vuetify";
import router from "./router";
import { initializeAxios } from "./utils/api";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	CONTENT_MODULE_KEY,
	COPY_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	COURSE_ROOM_LIST_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	GROUP_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NEWS_MODULE_KEY,
	PRIVACY_POLICY_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	SHARE_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	SYSTEMS_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
	THEME_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "./utils/inject";
import { mountBaseComponents } from "@/components/base/components";
import {
	commonCartridgeExportModule,
	commonCartridgeImportModule,
	contentModule,
	copyModule,
	courseRoomDetailsModule,
	courseRoomListModule,
	filePathsModule,
	finishedTasksModule,
	groupModule,
	importUsersModule,
	loadingStateModule,
	newsModule,
	privacyPolicyModule,
	schoolExternalToolsModule,
	schoolsModule,
	shareModule,
	statusAlertsModule,
	systemsModule,
	tasksModule,
	termsOfUseModule,
	userLoginMigrationModule,
	videoConferenceModule,
} from "@/store";
import themeConfig from "@/theme.config";
import { useAppStore } from "@data-app";
import { useEnvStore } from "@data-env";
import { htmlConfig } from "@feature-render-html";
import { logger } from "@util-logger";
import axios from "axios";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueDOMPurifyHTML from "vue-dompurify-html";

export const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

mountBaseComponents(app);

// app.config.productionTip = false;

app.config.errorHandler = (err: unknown) => {
	logger.error(err);
	useAppStore().handleUnknownError(err);
};

app.config.globalProperties.$theme = themeConfig;

app.use(VueDOMPurifyHTML, {
	namedConfigurations: htmlConfig,
});

(async () => {
	const runtimeConfigJson = await axios.get(`${window.location.origin}/runtime.config.json`);
	axios.defaults.baseURL = runtimeConfigJson.data.apiURL;

	initializeAxios(axios);

	const success = await useEnvStore().loadConfiguration();

	if (success) {
		contentModule.init();
		filePathsModule.init();
	}

	try {
		await useAppStore().login();
		await schoolsModule.fetchSchool(); // fetch school relies on successful login to know the school id
	} catch (error) {
		// TODO improve exception handling, best case test if its a 401, if not log the unknown error
		logger.info("probably not logged in", error);
	}

	// creation of i18n relies on App.store
	const i18n = createI18n();
	const vuetify = createVuetify(i18n);

	app.use(router).use(store).use(vuetify).use(i18n);

	// NUXT_REMOVAL get rid of store DI
	app.provide(CONTENT_MODULE_KEY, contentModule);
	app.provide(COPY_MODULE_KEY.valueOf(), copyModule);
	app.provide("filePathsModule", filePathsModule);
	app.provide(FILE_PATHS_MODULE_KEY, filePathsModule);
	app.provide("finishedTasksModule", finishedTasksModule);
	app.provide(GROUP_MODULE_KEY.valueOf(), groupModule);
	app.provide("importUsersModule", importUsersModule);
	app.provide("loadingStateModule", loadingStateModule);
	app.provide(NEWS_MODULE_KEY.valueOf(), newsModule);
	app.provide(PRIVACY_POLICY_MODULE_KEY.valueOf(), privacyPolicyModule);
	app.provide(TERMS_OF_USE_MODULE_KEY.valueOf(), termsOfUseModule);
	app.provide(COURSE_ROOM_DETAILS_MODULE_KEY.valueOf(), courseRoomDetailsModule);
	app.provide("CourseRoomListModule", courseRoomListModule);
	app.provide(SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf(), schoolExternalToolsModule);
	app.provide(SCHOOLS_MODULE_KEY.valueOf(), schoolsModule);
	app.provide(SHARE_MODULE_KEY.valueOf(), shareModule);
	app.provide(COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf(), commonCartridgeExportModule);
	app.provide(STATUS_ALERTS_MODULE_KEY.valueOf(), statusAlertsModule);
	app.provide(SYSTEMS_MODULE_KEY.valueOf(), systemsModule);
	app.provide("tasksModule", tasksModule);
	app.provide(USER_LOGIN_MIGRATION_MODULE_KEY.valueOf(), userLoginMigrationModule);
	app.provide(VIDEO_CONFERENCE_MODULE_KEY.valueOf(), videoConferenceModule);
	app.provide(LOADING_STATE_MODULE_KEY.valueOf(), loadingStateModule);
	app.provide(COURSE_ROOM_LIST_MODULE_KEY.valueOf(), courseRoomListModule);
	app.provide(COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf(), commonCartridgeImportModule);
	app.provide(THEME_KEY.valueOf(), themeConfig);

	app.mount("#app");
})();
