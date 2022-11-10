import FilesOverview from "@pages/files/FilesOverview.page.vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import FilesModule from "@store/files";
import { provide } from "@vue/composition-api";
import { Route } from "vue-router";
import { createModuleMocks } from "@utils/mock-store-module";
import { DataTableHeader } from "vuetify";
import { ComputedRef } from "@nuxtjs/composition-api";
import { FileTableItem } from "@pages/files/file-table-item";
import { FileType } from "@store/types/file";

const $route: Route = {
	path: "/cfiles",
} as Route;

const $router = { replace: jest.fn() };

describe("FileOverview", () => {
	let wrapper: Wrapper<any>;
	let filesModule: FilesModule;

	function setup(getters: Partial<FilesModule> = {}) {
		document.body.setAttribute("data-app", "true");
		filesModule = createModuleMocks(FilesModule, {
			getFiles: [],
			...getters,
		});

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

		it("should return 'unknown translation-key'", () => {
			setup();
			const testKey = 123;

			const result: string = wrapper.vm.t(testKey);

			expect(result.includes("unknown translation-key:")).toBeTruthy();
		});
	});

	describe("headers", () => {
		it("should display dataTableHeaders in v-data-table ", () => {
			setup();

			const result: DataTableHeader[] = wrapper.vm.headers;

			expect(result.length).toBeGreaterThan(0);
		});
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
