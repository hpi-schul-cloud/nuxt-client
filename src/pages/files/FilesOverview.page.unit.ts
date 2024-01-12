import FilesOverview from "@/pages/files/FilesOverview.page.vue";
import { mount } from "@vue/test-utils";
import CollaborativeFilesModule from "@/store/collaborative-files";
import { RouteLocation, Router, useRouter } from "vue-router";
import { createModuleMocks } from "@/utils/mock-store-module";
import { CollaborativeFileType } from "@/store/types/collaborative-file";
import * as fileTableComposable from "@/pages/files/file-table-utils.composable";
import { FilesPageConfig } from "@/pages/files/file-page-config.type";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

jest.mock("vue-router", () => ({
	useRoute: jest.fn(),
	useRouter: jest.fn(),
}));
const useRouterMock = <jest.Mock>useRouter;

describe("FileOverview", () => {
	let collaborativeFilesModule: CollaborativeFilesModule;

	const pageTitle = "Page Title";
	const loadFilesFunctionMock = jest.fn();
	const breadcrumbTitle = "breadcrumb1";
	const breadcrumbPath = "/cfiles/";
	const tMock = jest.fn().mockImplementation((key: string) => {
		return key;
	});

	beforeAll(() => {
		jest.spyOn(fileTableComposable, "useFileTableUtils").mockReturnValue({
			...fileTableComposable.useFileTableUtils(collaborativeFilesModule, tMock),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			getFilesPageForRoute(route: RouteLocation): FilesPageConfig {
				return {
					title: pageTitle,
					breadcrumbs: [
						{
							title: breadcrumbTitle,
							to: breadcrumbPath,
						},
					],
					loadFilesFunction: loadFilesFunctionMock,
				};
			},
		});
	});

	function setup(getters: Partial<CollaborativeFilesModule> = {}) {
		collaborativeFilesModule = createModuleMocks(CollaborativeFilesModule, {
			getFiles: [],
			...getters,
		});

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const wrapper = mount(FilesOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					collaborativeFilesModule,
				},
			},
		});

		return { wrapper, router };
	}

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(FilesOverview).exists()).toBe(true);
		});
	});

	describe("onMounted", () => {
		it("should call the loadFilesFunction onMounted", () => {
			setup();
			expect(loadFilesFunctionMock).toHaveBeenCalled();
		});
	});

	describe("headers", () => {
		it("should display dataTableHeaders in v-data-table", () => {
			const { wrapper } = setup();

			const vueWrapperArray = wrapper.findAll(".v-data-table__th");

			expect(vueWrapperArray?.at(0)?.find("span").text()).toEqual("");
			expect(vueWrapperArray?.at(1)?.find("span").text()).toEqual(
				"common.labels.name"
			);
			expect(vueWrapperArray?.at(2)?.find("span").text()).toEqual(
				"common.labels.size"
			);
			expect(vueWrapperArray?.at(3)?.find("span").text()).toEqual(
				"common.labels.changed"
			);
		});
	});

	describe("items", () => {
		// VUE3_UPGRADE fix v-data-table rendering, see https://ticketsystem.dbildungscloud.de/browse/BC-6224
		it.only("should display data of fetched files in a datatable row", () => {
			const size = 221;
			const { wrapper } = setup({
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

			const tableRows = wrapper.find("tbody").findAll("tr");
			const firstRowElements = tableRows?.at(0)?.findAll("td");
			expect(firstRowElements?.at(0)?.html()).toBeTruthy();
			expect(firstRowElements?.at(1)?.text()).toBeTruthy();
			expect(firstRowElements?.at(2)?.text()).toEqual(size.toString());
			expect(firstRowElements?.at(3)?.text()).toBeTruthy();
		});

		it("should display name of file when traslationKey is undefined", () => {
			const name = "Favorites";
			const { wrapper } = setup({
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

			const tableRows = wrapper.find("tbody").findAll("tr");
			const firstRowElements = tableRows?.at(0)?.findAll("td");
			expect(firstRowElements?.at(1)?.text()).toEqual(name);
		});

		it("should display translated name of file", () => {
			const translationKey = "pages.files.overview.favorites";
			const { wrapper } = setup({
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

			const tableRows = wrapper.find("tbody").findAll("tr");
			const firstRowElements = tableRows?.at(0)?.findAll("td");
			expect(firstRowElements?.at(1)?.text()).toEqual(translationKey);
		});
	});

	describe("click", () => {
		const path = "/cfiles/";
		// VUE3_UPGRADE fix v-data-table rendering, see https://ticketsystem.dbildungscloud.de/browse/BC-6224
		it("should push path of fileTableItem to router when clicked on a row", () => {
			const { wrapper, router } = setup({
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

			const tableRows = wrapper.find("tbody").findAll("tr");
			tableRows?.at(0)?.trigger("click");

			expect(router.push).toHaveBeenCalledWith(
				expect.objectContaining({ path })
			);
		});
	});

	describe("breadcrumbs", () => {
		it("should display breadcrumbs", () => {
			const { wrapper } = setup();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.length).toEqual(1);
			expect(breadcrumbs?.at(0)?.text()).toEqual(breadcrumbTitle);
		});
	});

	describe("title", () => {
		it("should display the page title", () => {
			const { wrapper } = setup();

			const title = wrapper.find("h1");

			expect(title.text()).toEqual(pageTitle);
		});
	});
});
