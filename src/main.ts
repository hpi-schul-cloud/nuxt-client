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
	schoolsModule,
	shareModule,
	statusAlertsModule,
	systemsModule,
	taskCardModule,
	tasksModule,
	userLoginMigrationModule,
	videoConferenceModule,
} from "@/store";
import Vue from "vue";
import App from "./App.vue";
import { createI18n } from "./plugins/i18n";
import store from "./plugins/store";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

Vue.config.errorHandler = handleApplicationError;

// NUXT_REMOVAL set this based on the tenant theme
import themeConfig from "@/theme.config";
Vue.prototype.$theme = themeConfig;

// NUXT_REMOVAL try to solve without vue-mq dependency
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.mixin({
	computed: {
		$user() {
			return authModule.getUser;
		},
	},
});

import htmlConfig from "@/components/common/render-html/config";
import VueDOMPurifyHTML from "vue-dompurify-html";

Vue.use(VueDOMPurifyHTML, {
	namedConfigurations: htmlConfig,
});

// NUXT_REMOVAL change how global components are handled
import "@/components/base/_globals";
import "@/plugins/directives";
import "@/plugins/polyfills";

import "@/styles/global.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { handleApplicationError } from "./plugins/application-error-handler";
import { initializeAxios } from "./utils/api";

import {
	APPLICATION_ERROR_KEY,
	AUTH_MODULE,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
} from "./utils/inject";

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

	new Vue({
		router,
		store,
		vuetify,
		i18n,
		// NUXT_REMOVAL get rid of store DI
		provide: {
			accountsModule,
			[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModule,
			authModule,
			[AUTH_MODULE.valueOf()]: authModule,
			autoLogoutModule,
			collaborativeFilesModule,
			contentModule,
			[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: contextExternalToolsModule,
			copyModule,
			[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
			[EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: externalToolsModule,
			filePathsModule,
			finishedTasksModule,
			importUsersModule,
			loadingStateModule,
			newsModule,
			[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			privacyPolicyModule,
			[ROOM_MODULE_KEY.valueOf()]: roomModule,
			roomsModule,
			schoolsModule,
			shareModule,
			[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
			systemsModule,
			taskCardModule,
			tasksModule,
			userLoginMigrationModule,
			[I18N_KEY.valueOf()]: i18n,
			[VIDEO_CONFERENCE_MODULE_KEY.valueOf()]: videoConferenceModule,
		},
		render: (h) => h(App),
	}).$mount("#app");
})();
