import Vue from "vue";
import VueI18n from "vue-i18n";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import fs from "fs";
import path from "path";
import commonTest from "./commonTests.js";

// ===
// Utility functions
// ===

// https://vue-test-utils.vuejs.org/
import * as vueTestUtils from "@vue/test-utils";

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

const baseComponentDir = path.join(__dirname, "../../src/components/base/");
Vue.use(Vuelidate);

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
	.map(
		(fileName) =>
			"./" + path.relative(baseComponentDir, fileName).replace(/\\/g, "/")
	);

mountBaseComponents(globalComponentFiles, (fileName) =>
	require(path.join(baseComponentDir, fileName))
);

// ===
// Mock window properties not handled by jsdom
// ===

Object.defineProperty(window, "localStorage", {
	value: (function () {
		let store = {};
		return {
			getItem: function (key) {
				return store[key] || null;
			},
			setItem: function (key, value) {
				store[key] = value.toString();
			},
			removeItem: function (key) {
				delete store[key];
			},
			clear: function () {
				store = {};
			},
		};
	})(),
});

Object.defineProperty(window, "matchMedia", {
	value: () => {
		return {
			matches: false,
			addListener: () => {},
			removeListener: () => {},
		};
	},
});

const location = {
	href: "",
};
Object.defineProperty(window, "location", {
	set: function (val) {
		location.host = "domain.io";
		location.hostname = "domain.io";
		location.origin = "http://domain.io";
		location.href = "http://domain.io" + val;
		location.pathname = val;
	},
	get: function () {
		return location;
	},
});

// ===
// Global helpers
// ===

// https://vue-test-utils.vuejs.org/api/#mount
global.mount = vueTestUtils.mount;

// https://vue-test-utils.vuejs.org/api/#shallowmount
global.shallowMount = vueTestUtils.shallowMount;

global.wait = (duration) =>
	new Promise((resolve) => {
		setTimeout(resolve, duration);
	});

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

import { i18n as i18nConfig } from "@plugins/i18n.js";
import authStoreModule from "@store/auth";
import { mixin as userMixin } from "@plugins/user.js";
import globalStubs from "./stubs.js";

// A helper for creating Vue component mocks
global.createComponentMocks = ({
	i18n,
	user,
	store,
	$route,
	$router,
	router,
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

	Object.entries(stubs || {}).forEach(([name, value]) => {
		if (value === true && globalStubs[name]) {
			stubs[name] = globalStubs[name]();
		}
	});

	// Converts a `store` option shaped like:
	//
	// store: {
	//   someModuleName: {
	//     state: { ... },
	//     getters: { ... },
	//     mutations: { ... },
	//     actions: { ... },
	//   },
	//   anotherModuleName: {
	//     getters: { ... },
	//   },
	// },
	//
	// to a store instance, with each module namespaced by
	// default, just like in our app.
	if (store || i18n || user) {
		localVue.use(Vuex);
		const storeModules = store || {};
		if (user) {
			storeModules.auth = authStoreModule;
		}
		returnOptions.store = new Vuex.Store({
			modules: Object.entries(storeModules)
				.map(([moduleName, storeModule]) => {
					return {
						[moduleName]: {
							state: storeModule.state || {},
							getters: storeModule.getters || {},
							mutations: storeModule.mutations || {},
							actions: storeModule.actions || {},
							namespaced: true,
						},
					};
				})
				.reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {}),
		});
	}

	//Set `i18n: true` to enable localization and make `this.$i18n` available
	if (i18n) {
		localVue.use(VueI18n);
		returnOptions.i18n = i18nConfig(returnOptions.store);
	}

	if (user) {
		localVue.mixin(userMixin);
	}
	localVue.use(Vuelidate);

	// If using `router: true`, we'll automatically stub out
	// components from Vue Router.
	if (router) {
		returnOptions.stubs["NuxtLink"] = true;
		returnOptions.stubs["Nuxt"] = true;
	}

	if ($route) {
		returnOptions.mocks.$route = $route;
	}
	if ($router) {
		returnOptions.mocks.$router = $router;
	}
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
// Let tests fail on console.error
// ===
console.error = jest.fn((message) => {
	throw message instanceof Error ? `${message}` : new Error(`${message}`);
});

// ===
// Common tests
// ===
for (name in commonTest) {
	global[name] = commonTest[name];
}
