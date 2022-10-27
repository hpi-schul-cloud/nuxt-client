// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/index.ts

import Vue from "vue";
import Vuex, { Store } from "vuex";
// Note: you shouldn't need to import store modules here.
import { initializeStores, modules } from "@/store/store-accessor";

import activation from "./activation";
import { bulkConsent } from "./bulkConsent";
import calendar from "./calendar";
import classes from "./classes";
import consentVersions from "./consent-versions";
// import contentSearch from "./content-search"; // NUXT_REMOVAL unused
// import courseGroups from "./courseGroups"; // NUXT_REMOVAL unused
import courses from "./courses";
import error from "./error";
// import ghost from "./ghost"; // NUXT_REMOVAL unused
import { insights } from "./insights";
import { ldapConfig } from "./ldap-config";
import lessons from "./lessons";
import { messenger } from "./messenger";
// import publicTeachers from "./public-teachers";  // NUXT_REMOVAL unused
// import teams from "./teams"; // NUXT_REMOVAL unused
import termsAndConditions from "./terms-and-conditions";
import uiState from "./uiState";
import users from "./users";

Vue.use(Vuex);

// Initialize the modules using a Vuex plugin that runs when the root store is
// first initialized. This is vital to using static modules because the
// modules don't know the root store when they are loaded. Initializing them
// when the root store is created allows them to be hooked up properly.
const initializer = (store: Store<any>) => initializeStores(store);
export const plugins = [initializer];
export * from "@/store/store-accessor"; // re-export the modules

// Export the root store. You can add mutations & actions here as well.
// Note that this is a standard Vuex store, not a vuex-module-decorator one.
// (Perhaps could be, but I put everything in modules)
export default new Store({
	plugins,
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
