import FilesOverview from "@pages/files/FilesOverview.page.vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import FilesModule from "@store/files";
import { provide } from "@vue/composition-api";
import { Route } from "vue-router";
import { createModuleMocks } from "@utils/mock-store-module";
import Vue from "vue";

const $route: Route = {
	path: "/cfiles",
} as Route;

const $router = { replace: jest.fn() };

describe("FileOverview", () => {
	let wrapper: Wrapper<any>;
	let filesModule: FilesModule;

	function setup() {
		document.body.setAttribute("data-app", "true");
		filesModule = createModuleMocks(FilesModule);

		wrapper = shallowMount(FilesOverview, {
			...createComponentMocks({
				i18n: true,
				$router,
				$route,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
				provide("files", filesModule);
			},
		});
		return {};
	}

	describe("basic functions", () => {
		it("should render component", () => {
			expect(wrapper.findComponent(FilesOverview).exists()).toBe(true);
		});
	});

	describe("inject", () => {
		it("should throw an error when i18n injection fails", () => {
			try {
				wrapper = shallowMount(FilesOverview, {
					setup() {
						provide("files", filesModule);
					},
				});
			} catch (e) {
				expect(e.message.includes('Injection "i18n" not found')).toBeTruthy();
			}
		});

		it("should throw an error when filesModule injection fails", () => {
			try {
				wrapper = shallowMount(FilesOverview, {
					setup() {
						provide("i18n", { t: (key: string) => key });
					},
				});
			} catch (e) {
				expect(
					e.message.includes('Injection "filesModule" not found')
				).toBeTruthy();
			}
		});
	});

	describe("t", () => {
		it("should return translation", () => {
			setup();
			const testKey = "testKey";

			const result: string = wrapper.vm.t(testKey);

			expect(result).toEqual(testKey);
		});

		it("should return 'unknown translation-key'", () => {});
	});

	describe("headers", () => {
		it("", () => {});
	});

	describe("items", () => {
		it("", () => {});
	});

	describe("currentCategory", () => {
		it("", () => {});
	});

	describe("click", () => {
		it("", () => {});
	});

	describe("timesAgo", () => {
		it("", () => {});
	});
});
