import { createModuleMocks } from "@/utils/mock-store-module";
import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolsModule from "@/store/external-tools";
import ExternalToolConfigOverviewPage from "./ExternalToolConfigOverview.page.vue";
import {
	businessErrorFactory,
	toolConfigurationFactory,
} from "@@/tests/test-utils/factory";
import * as useExternalToolUtilsComposable from "../../../composables/external-tool-mappings.composable";

describe("ExternalToolConfigOverview", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;

	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getTranslationKey: () => "",
		});

	const setup = (getters: Partial<ExternalToolsModule> = {}) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getToolConfigurations: [toolConfigurationFactory()],
			getBusinessError: businessErrorFactory(),
			...getters,
		}) as jest.Mocked<ExternalToolsModule>;

		const routerPush = jest.fn();
		const $router = {
			push: routerPush,
		};

		const wrapper: Wrapper<any> = mount(ExternalToolConfigOverviewPage, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
				externalToolsModule,
			},
			propsData: {},
			mocks: {
				$router,
			},
		});

		return {
			wrapper,
			routerPush,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(
				wrapper.findComponent(ExternalToolConfigOverviewPage).exists()
			).toBe(true);
		});
	});

	describe("inject", () => {
		it("should throw an error when externalToolsModule injection fails", () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(ExternalToolConfigOverviewPage, {
					provide: {
						i18n: { t: (key: string) => key },
					},
				});
			} catch (e) {}

			expect(consoleErrorSpy).toHaveBeenCalledWith(
				expect.stringMatching(/injection "externalToolsModule" not found/)
			);

			consoleErrorSpy.mockRestore();
		});

		it("should throw an error when i18n injection fails", () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(ExternalToolConfigOverviewPage, {
					provide: {
						externalToolsModule,
					},
				});
			} catch (e) {}

			expect(consoleErrorSpy).toHaveBeenCalledWith(
				expect.stringMatching(/injection "i18n" not found/)
			);

			consoleErrorSpy.mockRestore();
		});
	});

	describe("t", () => {
		it("should return translation", () => {
			const { wrapper } = setup({});
			const testKey = "testKey";

			const result: string = wrapper.vm.t(testKey);

			expect(result).toEqual(testKey);
		});

		it("should return 'unknown translation-key'", () => {
			const { wrapper } = setup({});
			const testKey = 123;

			const result: string = wrapper.vm.t(testKey);

			expect(result.includes("unknown translation-key:")).toBeTruthy();
		});
	});

	describe("onMounted is called", () => {
		it("should load available tool configurations", () => {
			setup();
			expect(
				externalToolsModule.loadAvailableToolConfigurations
			).toHaveBeenCalled();
		});
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = setup();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1).text()).toEqual(
				"pages.administration.school.index.title"
			);
			expect(breadcrumbs.at(2).text()).toEqual("pages.tool.title");
		});
	});

	describe("title", () => {
		it("should render title", () => {
			const { wrapper } = setup();
			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("select", () => {
		const openSelect = async (wrapper: Wrapper<any>) => {
			await wrapper
				.find('[data-testid="configuration-select"]')
				.trigger("click");
			await wrapper
				.find(".menuable__content__active")
				.findAll(".v-list-item")
				.at(0)
				.trigger("click");
		};

		it("should display name and logo of an tool configuration in selection list", async () => {
			const name = "nameForSelect";
			const { wrapper } = setup({
				getToolConfigurations: [
					toolConfigurationFactory({
						name,
					}),
				],
			});

			await openSelect(wrapper);

			const selectionRow = wrapper.find(".row");
			expect(selectionRow.find(".v-image__image").exists()).toBeTruthy();
			expect(selectionRow.find("span").text().includes(name));
		});

		it("should load template when tool configuration was changed", async () => {
			const id = "expectedToolId";
			const { wrapper } = setup({
				getToolConfigurations: [toolConfigurationFactory({ id })],
			});

			await openSelect(wrapper);

			expect(
				externalToolsModule.loadToolConfigurationTemplateFromExternalTool
			).toHaveBeenCalledWith(id);
		});

		it("should set parameters valid on selection", async () => {
			const id = "expectedToolId";
			const { wrapper } = setup({
				getToolConfigurations: [toolConfigurationFactory({ id })],
			});

			await openSelect(wrapper);

			expect(wrapper.vm.parametersValid).toBeTruthy();
		});
	});

	describe("cancel button", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, routerPush } = setup();

			await wrapper.find('[data-testid="cancel-button"]').trigger("click");

			expect(routerPush).toHaveBeenCalledWith({
				path: "/administration/school-settings",
			});
		});
	});

	describe("save button", () => {
		it("should call store action to save tool", async () => {
			const { wrapper } = setup();

			wrapper.vm.parametersValid = true;
			const saveButton = wrapper.find('[data-testid="save-button"]');
			await saveButton.vm.$emit("click");

			expect(externalToolsModule.createSchoolExternalTool).toHaveBeenCalledWith(
				wrapper.vm.toolTemplate
			);
		});

		it("should redirect back to school settings page when there is no error", async () => {
			const { wrapper, routerPush } = setup({
				getBusinessError: businessErrorFactory({ message: undefined }),
			});

			wrapper.vm.parametersValid = true;
			const saveButton = wrapper.find('[data-testid="save-button"]');
			await saveButton.vm.$emit("click");

			expect(routerPush).toHaveBeenCalledWith({
				path: "/administration/school-settings",
			});
		});

		it("should display alert when server side error on save occurred", async () => {
			const { wrapper, routerPush } = setup({
				getBusinessError: businessErrorFactory({
					message: "someErrorOccurred",
				}),
			});

			wrapper.vm.parametersValid = true;
			const saveButton = wrapper.find('[data-testid="save-button"]');
			await saveButton.vm.$emit("click");

			expect(routerPush).not.toHaveBeenCalled();
			expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
		});
	});
});
