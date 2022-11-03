import Vue from "vue";
import Vuex from "vuex";
import { config as vueTestUtilsConfig, createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
// import { mixin as userMixin } from "@/plugins/user.js";
import Vuelidate from "vuelidate";
import { mountBaseComponents } from "@/components/base/_globals";
import path from "path";
import fs from "fs";
import "@/plugins/directives";

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
Vue.config.productionTip = false;
Vue.use(Vuex);

// mock translations
const mockTranslate = (key) => key;
vueTestUtilsConfig.mocks.$t = mockTranslate;
vueTestUtilsConfig.mocks.$tc = mockTranslate;
vueTestUtilsConfig.mocks.$i18n = { t: mockTranslate };

// mock window.location
// used e.g. in @/components/atoms/vRoomAvatar.unit.ts#L96
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

global.mount = mount;
global.shallowMount = shallowMount;

// A helper for creating Vue component mocks
global.createComponentMocks = ({
	i18n,
	vueMeta,
	user,
	store,
	$route,
	$router,
	router,
	uiState,
	dialog,
	/*style,*/ mocks,
	stubs,
	$config,
}) => {
	// Use a local version of Vue, to avoid polluting the global
	// Vue and thereby affecting other tests.
	// https://vue-test-utils.vuejs.org/api/#createlocalvue
	const localVue = createLocalVue();

	const returnOptions = { localVue };

	// https://vue-test-utils.vuejs.org/api/options.html#stubs
	returnOptions.stubs = stubs || {};

	// https://vue-test-utils.vuejs.org/api/options.html#mocks
	returnOptions.mocks = mocks || {};

	// Object.entries(stubs || {}).forEach(([name, value]) => {
	// 	if (value === true && globalStubs[name]) {
	// 		stubs[name] = globalStubs[name]();
	// 	}
	// });

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
	if (store || i18n || user || vueMeta) {
		localVue.use(Vuex);
		const storeModules = store || {};
		// if (user) {
		// 	WIP: storeModules.auth = authStoreModule;
		// }
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
	// if (i18n) {
	// 	const vueI18n = new VueI18n({
	// 		locale: "de",
	// 		fallbackLocale: "en",
	// 		messages: {},
	// 	});
	// 	localVue.use(vueI18n);
	// 	// returnOptions.i18n = i18nConfig(returnOptions.store);
	// }

	Vue.use(Vuetify);
	returnOptions.vuetify = new Vuetify();

	//Set 'vueMeta: true' for accessing nuxt page meta infos
	// if (vueMeta) localVue.use(VueMeta, { keyName: "head" });

	if (user) {
		// localVue.mixin(userMixin);
	}
	localVue.use(Vuelidate);

	// Set uiState like:
	// {
	// 		get: (key, identifier) => {},
	// 		set: (key, identifier) => {},
	// }
	if (uiState) {
		localVue.use({
			install: (Vue) => {
				Vue.prototype.$uiState = uiState;
			},
		});
	}

	// Set (confirmation) dialog like:
	// {
	//		confirm: (params) => {}
	// }
	if (dialog) {
		localVue.use({
			install: (Vue) => {
				Vue.prototype.$dialog = dialog;
			},
		});
	}

	returnOptions.stubs["RouterLink"] = true;

	if ($route) {
		returnOptions.mocks.$route = $route;
	}
	if ($router) {
		returnOptions.mocks.$router = $router;
	}
	if ($config) {
		returnOptions.mocks.$config = $config;
	} else {
		returnOptions.mocks.$config = {};
	}
	return returnOptions;
};

// const customMatchers = {};
// customMatchers.toBeAComponent = function (options) {
// 	if (isAComponent()) {
// 		return {
// 			message: () =>
// 				`expected ${this.utils.printReceived(
// 					options
// 				)} not to be a Vue component`,
// 			pass: true,
// 		};
// 	} else {
// 		return {
// 			message: () =>
// 				`expected ${this.utils.printReceived(
// 					options
// 				)} to be a valid Vue component, exported from a .vue file`,
// 			pass: false,
// 		};
// 	}

// 	function isAComponent() {
// 		return _.isPlainObject(options) && typeof options.render === "function";
// 	}
// };

// // https://facebook.github.io/jest/docs/en/expect.html#expectextendmatchers
// global.expect.extend(customMatchers);

global.rendersSlotContent = (
	component,
	slotNames = ["default"],
	mountOptions
) => {
	return [
		"renders his slot(s) content(s)",
		() => {
			slotNames.forEach((slotName) => {
				const slots = {};
				slots[slotName] = `<p>Test-Slot: ${slotName}</p>`;
				const { element } = shallowMount(component, {
					...mountOptions,
					slots,
				});
				expect(element.innerHTML).toContain(slots[slotName]);
			});
		},
	];
};

const baseComponentDir = path.resolve(__dirname, "../../src/components/base/");

function readDirRecursiveSync(dir) {
	const results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const filepath = path.resolve(dir, file);
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

// is imported by @@/tests/test-utils/componentMocks.ts
// please refactor
export default global.createComponentMocks;
