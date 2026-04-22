import "@/plugins/polyfills";
import App from "./App.vue";
import { createI18n } from "./plugins/i18n";
import store from "./plugins/store";
import { createVuetifyPlugin } from "./plugins/vuetify";
import router from "./router";
import { initializeAxios } from "./utils/api";
import {
	COPY_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	GROUP_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	SHARE_MODULE_KEY,
	SYSTEMS_MODULE_KEY,
} from "./utils/inject";
import {
	copyModule,
	courseRoomDetailsModule,
	filePathsModule,
	groupModule,
	importUsersModule,
	schoolExternalToolsModule,
	schoolsModule,
	shareModule,
	systemsModule,
} from "@/store";
import { createDayJs } from "@/utils/date-time.utils";
import { useAppStore } from "@data-app";
import { useEnvStore } from "@data-env";
import { useRuntimeConfigStore } from "@data-runtime-config";
import { htmlConfig } from "@feature-render-html";
import { useSessionBroadcast } from "@util-broadcast-channel";
import { logger } from "@util-logger";
import axios from "axios";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueDOMPurifyHTML from "vue-dompurify-html";

export const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

// Initialize date-time core (dayjs locale sync with app store)
createDayJs();

// app.config.productionTip = false;

app.config.errorHandler = (err: unknown) => {
	logger.error(err);
	useAppStore().handleUnknownError(err);
};

app.use(VueDOMPurifyHTML, {
	namedConfigurations: htmlConfig,
});

(async () => {
	const runtimeConfigJson = await axios.get(`${globalThis.location.origin}/runtime.config.json`);
	axios.defaults.baseURL = runtimeConfigJson.data.apiURL;

	initializeAxios(axios, useSessionBroadcast().handleUnauthorizedError);

	useRuntimeConfigStore().fetchRuntimeConfig();
	const success = await useEnvStore().loadConfiguration();

	if (success) {
		filePathsModule.init();
	}

	try {
		await useAppStore().login();
		await schoolsModule.fetchSchool(); // fetch school relies on successful login to know the school id
	} catch (error) {
		logger.info("Unhandled error during login", error);
	}

	// creation of i18n relies on App.store
	const i18n = createI18n();
	const vuetify = createVuetifyPlugin(i18n);
	app.use(router).use(store).use(vuetify).use(i18n);

	// NUXT_REMOVAL get rid of store DI
	app.provide(COPY_MODULE_KEY.valueOf(), copyModule);
	app.provide("filePathsModule", filePathsModule);
	app.provide(FILE_PATHS_MODULE_KEY, filePathsModule);
	app.provide(GROUP_MODULE_KEY.valueOf(), groupModule);
	app.provide("importUsersModule", importUsersModule);

	app.provide(COURSE_ROOM_DETAILS_MODULE_KEY.valueOf(), courseRoomDetailsModule);
	app.provide(SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf(), schoolExternalToolsModule);
	app.provide(SCHOOLS_MODULE_KEY.valueOf(), schoolsModule);
	app.provide(SHARE_MODULE_KEY.valueOf(), shareModule);
	app.provide(SYSTEMS_MODULE_KEY.valueOf(), systemsModule);

	app.mount("#app");
})();
