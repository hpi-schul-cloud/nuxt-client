// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/index.ts

import activation from "@/store/activation";
import { bulkConsent } from "@/store/bulkConsent";
import calendar from "@/store/calendar";
import classes from "@/store/classes";
import courses from "@/store/courses";
import { ldapConfig } from "@/store/ldap-config";
import lessons from "@/store/lessons";
// Note: you shouldn't need to import store modules here.
import { initializeStores, modules } from "@/store/store-accessor";
import uiState from "@/store/uiState";
import users from "@/store/users";
import { createStore, Store } from "vuex";

// Initialize the modules using a Vuex plugin that runs when the root store is
// first initialized. This is vital to using static modules because the
// modules don't know the root store when they are loaded. Initializing them
// when the root store is created allows them to be hooked up properly.
const initializer = (store: Store<unknown>) => initializeStores(store);

// Export the root store. You can add mutations & actions here as well.
// Note that this is a standard Vuex store, not a vuex-module-decorator one.
// (Perhaps could be, but I put everything in modules)
export default createStore({
	plugins: [initializer], // triggers initializeStores
	modules: {
		...modules,
		activation,
		bulkConsent,
		calendar,
		classes,
		courses,
		"ldap-config": ldapConfig,
		lessons,
		uiState,
		users,
	},
	state: {},
	mutations: {},
	actions: {},
});
