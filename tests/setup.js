import { config, mount, shallowMount } from "@vue/test-utils";

// enable rendering of default slot on stubbed components
// see https://test-utils.vuejs.org/migration/#shallowMount-and-renderStubDefaultSlot
config.global.renderStubDefaultSlot = true;

global.mount = mount;
global.shallowMount = shallowMount;

/**
 * matchMedia is used by
 * - useBreakpoints from VueUse to distinguish breakpoints
 * - VProgressLinear from vuetify with ('forced-colors: active')
 * We need to mock it to run tests that rely on useBreakpoints
 * @see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {
			return;
		}, // deprecated
		removeListener: () => {
			return;
		}, // deprecated
		addEventListener: () => {
			return;
		},
		removeEventListener: () => {
			return;
		},
		dispatchEvent: () => {
			return;
		},
	}),
});
