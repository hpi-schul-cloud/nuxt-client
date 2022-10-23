// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/index.ts

import Vue from "vue";
import Vuex, { Store } from "vuex";
// Note: you shouldn't need to import store modules here.
import { initializeStores, modules } from "@/store/store-accessor";

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
	plugins, // important!
	modules, // important!
	state: {},
	mutations: {},
	actions: {},
});
