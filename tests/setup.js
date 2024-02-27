import { jest } from "@jest/globals";
import { config, mount, shallowMount } from "@vue/test-utils";

// enable rendering of default slot on stubbed components
// see https://test-utils.vuejs.org/migration/#shallowMount-and-renderStubDefaultSlot
config.global.renderStubDefaultSlot = true;

global.mount = mount;
global.shallowMount = shallowMount;

/**
 * matchMedia is used by useBreakpoints from VueUse to distinguish breakpoints.
 * We need to mock it to run tests that rely on useBreakpoints
 * @see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});
