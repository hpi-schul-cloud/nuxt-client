import FilesOverview from "@pages/files/FilesOverview.page.vue";
import { mount, shallowMount, Wrapper, WrapperArray } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CollaborativeFilesModule from "@store/collaborative-files";
import { provide } from "@vue/composition-api";
import { Route } from "vue-router";
import { createModuleMocks } from "@utils/mock-store-module";
import { CollaborativeFileType } from "@store/types/collaborative-file";
import * as fileTableComposable from "@pages/files/file-table-utils.composable";
import { FilesPageConfig } from "@pages/files/file-page-config.type";

const $route: Route = {
	path: "/cfiles",
} as Route;

const $router = { replace: jest.fn(), push: jest.fn() };

describe("FileOverview", () => {
	let wrapper: Wrapper<any>;
	let collaborativeFilesModule: CollaborativeFilesModule;

	const pageTitle = "Page Title";
	const loadFilesFunctionMock = jest.fn();
	const breadcrumbTitle = "breadcrumb1";
	const breadcrumbPath = "/cfiles/";

	beforeAll(() => {
		jest.spyOn(fileTableComposable, "fileTableComposable").mockReturnValue({
			...fileTableComposable.fileTableComposable(collaborativeFilesModule),
			getFilesPageForRoute(
				t: (key: string) => string,
				route: Route
			): FilesPageConfig {
				return {
					title: pageTitle,
					breadcrumbs: [
						{
							text: breadcrumbTitle,
							to: breadcrumbPath,
						},
					],
					loadFilesFunction: loadFilesFunctionMock,
				};
			},
		});
	});

	function setup(getters: Partial<CollaborativeFilesModule> = {}) {
		document.body.setAttribute("data-app", "true");
		collaborativeFilesModule = createModuleMocks(CollaborativeFilesModule, {
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
				provide("collaborativeFilesModule", collaborativeFilesModule);
			},
		});

		const pageTitle = "Page Title";
		const loadFilesFunctionMock = jest.fn();
		const breadcrumbTitle = "breadcrumb1";
		const breadcrumbPath = "/cfiles/";

		return {
			loadFilesFunctionMock,
			pageTitle,
			breadcrumbTitle,
			breadcrumbPath,
		};
	}

	describe("basic functions", () => {
		it("should render component", () => {
			setup();
			expect(wrapper.findComponent(FilesOverview).exists()).toBe(true);
		});
	});

	describe("inject", () => {
		it("should throw an error when i18n injection fails", () => {
			try {
				wrapper = shallowMount(FilesOverview, {
					setup() {
						provide("collaborativeFiles", collaborativeFilesModule);
					},
				});
			} catch (e) {
				expect(e.message.includes('Injection "i18n" not found')).toBeTruthy();
			}
		});

		it("should throw an error when collaborativeFilesModule injection fails", () => {
			try {
				wrapper = shallowMount(FilesOverview, {
					setup() {
						provide("i18n", { t: (key: string) => key });
					},
				});
			} catch (e) {
				expect(
					e.message.includes('Injection "collaborativeFilesModule" not found')
				).toBeTruthy();
			}
		});
	});

	describe("onMounted", () => {
		it("should call the loadFilesFunction onMounted", () => {
			setup();
			expect(loadFilesFunctionMock).toHaveBeenCalled();
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
						type: CollaborativeFileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4).toISOString(),
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
						type: CollaborativeFileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4).toISOString(),
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
						type: CollaborativeFileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4).toISOString(),
					},
				],
			});

			const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
			const firstRowElements: WrapperArray<any> = tableRows.at(0).findAll("td");
			expect(firstRowElements.at(1).text()).toEqual(translationKey);
		});
	});

	describe("click", () => {
		const path = "/cfiles/";
		it("should push path of fileTableItem to router when clicked on a row", () => {
			setup({
				getFiles: [
					{
						name: "name",
						translationKey: undefined,
						icon: "favorite",
						path,
						size: 123,
						type: CollaborativeFileType.FAVORITES,
						lastChanged: new Date(2022, 10, 1, 14, 4).toISOString(),
					},
				],
			});

			const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
			tableRows.at(0).trigger("click");

			expect($router.push).toHaveBeenCalledWith(
				expect.objectContaining({ path })
			);
		});
	});

	describe("breadcrumbs", () => {
		it("should display breadcrumbs", () => {
			setup();

			const breadcrumbs: WrapperArray<any> =
				wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.length).toEqual(1);
			expect(breadcrumbs.at(0).text()).toEqual(breadcrumbTitle);
		});
	});

	describe("title", () => {
		it("should display the page title", () => {
			setup();

			const title: Wrapper<any> = wrapper.find("h1");

			expect(title.text()).toEqual(pageTitle);
		});
	});
});
