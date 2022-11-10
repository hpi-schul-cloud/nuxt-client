import FilesOverview from "@pages/files/FilesOverview.page.vue";
import { mount, shallowMount, Wrapper, WrapperArray } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import FilesModule from "@store/files";
import { provide } from "@vue/composition-api";
import { Route } from "vue-router";
import { createModuleMocks } from "@utils/mock-store-module";
import { FileType } from "@store/types/file";

const $route: Route = {
	path: "/cfiles",
} as Route;

const $router = { replace: jest.fn() };

const loadFilesFunctionMock = jest.fn();

const fileTableUtil = require("./file-table-utils");
jest.spyOn(fileTableUtil, "getFilesPageForRoute").mockReturnValue({
	title: "test",
	breadcrumbs: [],
	loadFilesFunction: loadFilesFunctionMock,
});

describe("FileOverview", () => {
	let wrapper: Wrapper<any>;
	let filesModule: FilesModule;

	function setup(getters: Partial<FilesModule> = {}) {
		document.body.setAttribute("data-app", "true");
		filesModule = createModuleMocks(FilesModule, {
			getFiles: [],
			...getters,
		});

		wrapper = mount(FilesOverview, {
			...createComponentMocks({
				i18n: true,
				$router,
				$route,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
				provide("filesModule", filesModule);
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
		it("should display dataTableHeaders in v-data-table", () => {
			setup();

			const vueWrapperArray: WrapperArray<any> = wrapper
				.find(".v-data-table-header")
				.findAll("th");

			expect(vueWrapperArray.at(0).find("span").text()).toEqual("");
			expect(vueWrapperArray.at(1).find("span").text()).toEqual(
				"common.labels.name"
			);
			expect(vueWrapperArray.at(2).find("span").text()).toEqual(
				"common.labels.size"
			);
			expect(vueWrapperArray.at(3).find("span").text()).toEqual(
				"common.labels.changed"
			);
		});
	});

	describe("items", () => {
		it("should display data of fetched files in a datatable row", () => {
			const size = 221;
			setup({
				getFiles: [
					{
						name: "notExpectedToBeDisplayed",
						translationKey: "pages.files.overview.favorites",
						icon: "favorite",
						path: "/cfiles/",
						size,
						type: FileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4),
					},
				],
			});

			const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
			const firstRowElements: WrapperArray<any> = tableRows.at(0).findAll("td");
			expect(firstRowElements.at(0).html()).toBeTruthy();
			expect(firstRowElements.at(1).text()).toBeTruthy();
			expect(firstRowElements.at(2).text()).toEqual(size.toString());
			expect(firstRowElements.at(3).text()).toBeTruthy();
		});

		it("should display name of file when traslationKey is undefined", () => {
			const name = "Favorites";
			setup({
				getFiles: [
					{
						name,
						translationKey: undefined,
						icon: "favorite",
						path: "/cfiles/",
						size: 221,
						type: FileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4),
					},
				],
			});

			const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
			const firstRowElements: WrapperArray<any> = tableRows.at(0).findAll("td");
			expect(firstRowElements.at(1).text()).toEqual(name);
		});

		it("should display translated name of file", () => {
			const translationKey = "pages.files.overview.favorites";
			setup({
				getFiles: [
					{
						name: "notDisplayed",
						translationKey: translationKey,
						icon: "favorite",
						path: "/cfiles/",
						size: 123,
						type: FileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4),
					},
				],
			});

			const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
			const firstRowElements: WrapperArray<any> = tableRows.at(0).findAll("td");
			expect(firstRowElements.at(1).text()).toEqual(translationKey);
		});
	});

	describe("click", () => {
		it("", () => {});
	});

	describe("timesAgo", () => {
		it("", () => {});
	});
});
