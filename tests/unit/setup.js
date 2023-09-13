// VUE3_UPGRADE
import { app } from "@/main";
import VueI18n from "vue-i18n";
import Vuelidate from "@vuelidate/core";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueDOMPurifyHTML from "vue-dompurify-html";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import { mountBaseComponents } from "@/components/base/components";
import { setupI18n } from "@/plugins/i18n-test.js";
// VUE3_UPGRADE
// import "@/plugins/directives";
import { mountDirectives } from "@/plugins/directives";
import globalStubs from "./stubs.js";
import { htmlConfig } from "@feature-render-html";

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
app.config.productionTip = false;

mountDirectives(app);
// ===
// Register global components
// ===

app.use(Vuelidate);
app.use(Vuex);

app.use(VueDOMPurifyHTML, {
	namedConfigurations: htmlConfig,
});

mountBaseComponents(app);

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
			addListener: () => ({}),
			removeListener: () => ({}),
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
global.mount = mount;

// https://vue-test-utils.vuejs.org/api/#shallowmount
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	dialog,
	mocks,
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
	if (store || i18n || user || vueMeta) {
		localVue.use(Vuex);
		const storeModules = store || {};

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
		returnOptions.i18n = setupI18n();
	}

	app.use(Vuetify);
	returnOptions.vuetify = new Vuetify();

	localVue.use(Vuelidate);

	// If using `router: true`, we'll automatically stub out
	// components from Vue Router.
	if (router) {
		returnOptions.stubs["NuxtLink"] = true;
		returnOptions.stubs["Nuxt"] = true;
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
				global.expect(element.innerHTML).toContain(slots[slotName]);
			});
		},
	];
};

// is imported by @@/tests/test-utils/componentMocks.ts
// please refactor
export default global.createComponentMocks;
