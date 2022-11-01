// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/index.ts

import Vue from "vue";
import Vuex, { Store } from "vuex";
// Note: you shouldn't need to import store modules here.
import { initializeStores, modules } from "@/store/store-accessor";

import activation from "@/store/activation";
import { bulkConsent } from "@/store/bulkConsent";
import calendar from "@/store/calendar";
import classes from "@/store/classes";
import consentVersions from "@/store/consent-versions";
// import contentSearch from "@/store/content-search"; // NUXT_REMOVAL unused
// import courseGroups from "@/store/courseGroups"; // NUXT_REMOVAL unused
import courses from "@/store/courses";
import error from "@/store/error";
// import ghost from "@/store/ghost"; // NUXT_REMOVAL unused
import { insights } from "@/store/insights";
import { ldapConfig } from "@/store/ldap-config";
import lessons from "@/store/lessons";
import { messenger } from "@/store/messenger";
// import publicTeachers from "@/store/public-teachers";  // NUXT_REMOVAL unused
// import teams from "@/store/teams"; // NUXT_REMOVAL unused
import termsAndConditions from "@/store/terms-and-conditions";
import uiState from "@/store/uiState";
import users from "@/store/users";

Vue.use(Vuex);

// Initialize the modules using a Vuex plugin that runs when the root store is
// first initialized. This is vital to using static modules because the
// modules don't know the root store when they are loaded. Initializing them
// when the root store is created allows them to be hooked up properly.
const initializer = (store: Store<any>) => initializeStores(store);

// Export the root store. You can add mutations & actions here as well.
// Note that this is a standard Vuex store, not a vuex-module-decorator one.
// (Perhaps could be, but I put everything in modules)
export default new Store({
	plugins: [initializer], // triggers initializeStores
	modules: {
		...modules,
		activation,
		bulkConsent,
		calendar,
		classes,
		"consent-versions": consentVersions,
		// "content-search": contentSearch, // NUXT_REMOVAL unused
		// courseGroups, // NUXT_REMOVAL unused
		courses,
		error,
		// ghost, // NUXT_REMOVAL unused
		insights,
		ldapConfig,
		lessons,
		messenger,
		// publicTeachers, // NUXT_REMOVAL unused
		// teams, // NUXT_REMOVAL unused
		"terms-and-conditions": termsAndConditions,
		uiState,
		users,
	},
	state: {},
	mutations: {},
	actions: {},
});
