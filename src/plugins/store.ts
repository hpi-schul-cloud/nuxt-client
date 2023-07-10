// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/index.ts

import Vue from "vue";
import Vuex, { Store } from "vuex";
// Note: you shouldn't need to import store modules here.
import { initializeStores, modules } from "@/store/store-accessor";

import activation from "@/store/activation";
import { bulkConsent } from "@/store/bulkConsent";
import calendar from "@/store/calendar";
import classes from "@/store/classes";
<<<<<<< HEAD
import consentVersions from "@/store/consent-versions";
=======
import courses from "@/store/courses";
>>>>>>> b9402ed524afccb36d9d6fd58711901431cd6a05
import { ldapConfig } from "@/store/ldap-config";
import lessons from "@/store/lessons";
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
<<<<<<< HEAD
		"consent-versions": consentVersions,
=======
		courses,
>>>>>>> b9402ed524afccb36d9d6fd58711901431cd6a05
		"ldap-config": ldapConfig,
		lessons,
		"terms-and-conditions": termsAndConditions,
		uiState,
		users,
	},
	state: {},
	mutations: {},
	actions: {},
});
