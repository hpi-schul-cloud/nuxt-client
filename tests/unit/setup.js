import Vue from "vue";
//import Vuex from "vuex";
import fs from "fs";
import path from "path";
import commonTest from "./commonTests.js";

// ===
// Utility functions
// ===

// https://vue-test-utils.vuejs.org/
import vueTestUtils from "@vue/test-utils";

// ===
// Configure Vue
// ===

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
Vue.config.productionTip = false;

// ===
// Register global components
// ===

import "@plugins/global";
import { mountBaseComponents } from "@basecomponents/_globals";

const baseComponentDir = path.join(__dirname, "../../src/components/ui/");

function readDirRecursiveSync(dir) {
	const results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const filepath = path.join(dir, file);
		const stat = fs.statSync(filepath);
		if (stat && stat.isDirectory()) {
			/* Recurse into a subdirectory */
			results.push(...readDirRecursiveSync(filepath));
		} else {
			/* Is a file */
			results.push(filepath);
		}
	});
	return results;
}

const globalComponentFiles = readDirRecursiveSync(baseComponentDir)
	// Only include "Base" prefixed .vue files
	.filter((fileName) => /Base[A-Z][\w]+\.vue$/.test(fileName))
	.map((fileName) => "./" + path.relative(baseComponentDir, fileName));

mountBaseComponents(globalComponentFiles, (fileName) =>
	require(path.join(baseComponentDir, fileName))
);

// ===
// Mock window properties not handled by jsdom
// ===

Object.defineProperty(window, "localStorage", {
	value: (function() {
		let store = {};
		return {
			getItem: function(key) {
				return store[key] || null;
			},
			setItem: function(key, value) {
				store[key] = value.toString();
			},
			clear: function() {
				store = {};
			},
		};
	})(),
});

// ===
// Global helpers
// ===

// https://vue-test-utils.vuejs.org/api/#mount
global.mount = vueTestUtils.mount;

// https://vue-test-utils.vuejs.org/api/#shallowmount
global.shallowMount = vueTestUtils.shallowMount;

/*
// A special version of `shallowMount` for view components
global.shallowMountView = (Component, options = {}) => {
	return global.shallowMount(Component, {
		...options,
		stubs: {
			Layout: {
				functional: true,
				render(h, { slots }) {
					return <div>{slots().default}</div>;
				},
			},
			...(options.stubs || {}),
		},
	});
};
*/
// A helper for creating Vue component mocks
global.createComponentMocks = ({
	/*store,*/ router,
	/*style,*/ mocks,
	stubs,
}) => {
	// Use a local version of Vue, to avoid polluting the global
	// Vue and thereby affecting other tests.
	// https://vue-test-utils.vuejs.org/api/#createlocalvue
	const localVue = vueTestUtils.createLocalVue();
	const returnOptions = { localVue };

	// https://vue-test-utils.vuejs.org/api/options.html#stubs
	returnOptions.stubs = stubs || {};
	// https://vue-test-utils.vuejs.org/api/options.html#mocks
	returnOptions.mocks = mocks || {};
	/*
	// Converts a `store` option shaped like:
	//
	// store: {
	//   someModuleName: {
	//     state: { ... },
	//     getters: { ... },
	//     actions: { ... },
	//   },
	//   anotherModuleName: {
	//     getters: { ... },
	//   },
	// },
	//
	// to a store instance, with each module namespaced by
	// default, just like in our app.
	if (store) {
		localVue.use(Vuex);
		returnOptions.store = new Vuex.Store({
			modules: Object.keys(store)
				.map((moduleName) => {
					const storeModule = store[moduleName];
					return {
						[moduleName]: {
							state: storeModule.state || {},
							getters: storeModule.getters || {},
							actions: storeModule.actions || {},
							namespaced:
								typeof storeModule.namespaced === "undefined"
									? true
									: storeModule.namespaced,
						},
					};
				})
				.reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {}),
		});
	}
	*/
	// If using `router: true`, we'll automatically stub out
	// components from Vue Router.
	if (router) {
		returnOptions.stubs["NuxtLink"] = true;
		returnOptions.stubs["Nuxt"] = true;
	}
	/*
	// If a `style` object is provided, mock some styles.
	if (style) {
		returnOptions.mocks.$style = style;
	}*/

	return returnOptions;
};

/*
global.createModuleStore = (vuexModule, options = {}) => {
	vueTestUtils.createLocalVue().use(Vuex);
	const store = new Vuex.Store({
		..._.cloneDeep(vuexModule),
		modules: {
			auth: {
				namespaced: true,
				state: {
					currentUser: options.currentUser,
				},
			},
		},
	});
	axios.defaults.headers.common.Authorization = options.currentUser
		? options.currentUser.token
		: "";
	if (vuexModule.actions.init) {
		store.dispatch("init");
	}
	return store;
};
*/

// ===
// Common tests
// ===
for (name in commonTest) {
	global[name] = commonTest[name];
}
