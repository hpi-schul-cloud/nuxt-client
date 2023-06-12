import {
	accountsModule,
	applicationErrorModule,
	authModule,
	autoLogoutModule,
	collaborativeFilesModule,
	contextExternalToolsModule,
	contentModule,
	copyModule,
	envConfigModule,
	externalToolsModule,
	filePathsModule,
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
import { createI18n } from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./plugins/store";

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

import VueDOMPurifyHTML from "vue-dompurify-html";
import htmlConfig from "@/components/common/render-html/config";

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
import { initializeAxios } from "./utils/api";
import { handleApplicationError } from "./plugins/application-error-handler";

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
			roomModule,
			roomsModule,
			schoolsModule,
			shareModule,
			statusAlertsModule,
			systemsModule,
			taskCardModule,
			tasksModule,
			userLoginMigrationModule,
			i18n,
		},
		render: (h) => h(App),
	}).$mount("#app");
})();
