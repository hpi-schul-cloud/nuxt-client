import { createModuleMocks } from "@/utils/mock-store-module";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolsModule from "@/store/external-tools";
import flushPromises from "flush-promises";
import Vue from "vue";
import {
	toolConfigurationTemplateFactory,
	businessErrorFactory,
	toolConfigurationFactory,
} from "@@/tests/test-utils/factory";
import { ToolConfigurationTemplate } from "@/store/external-tool";
import ContextExternalToolConfigOverviewPage from "./ContextExternalToolConfigOverview.page.vue";
import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";

describe("ContextExternalToolConfigOverview", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;

	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getTranslationKey: () => "",
		});

	const setup = async (
		getters: Partial<ExternalToolsModule> = {},
		propsData?: { contextId: string; contextType: ToolContextType }
	) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getToolConfigurations: [toolConfigurationFactory.build()],
			getBusinessError: businessErrorFactory.build(),
			...getters,
		});

		const routerPush = jest.fn();
		const $router = {
			push: routerPush,
		};

		const toolTemplate: ToolConfigurationTemplate =
			toolConfigurationTemplateFactory.build();

		externalToolsModule.loadToolConfigurationTemplateFromSchoolExternalTool.mockResolvedValue(
			toolTemplate
		);

		const wrapper: Wrapper<any> = mount(
			ContextExternalToolConfigOverviewPage as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					i18n: { t: (key: string) => key },
					externalToolsModule,
				},
				propsData: {
					...propsData,
				},
				mocks: {
					$router,
				},
			}
		);

		await flushPromises();

		return {
			wrapper,
			routerPush,
			toolTemplate,
		};
	};

	describe("basic functions", () => {
		it("should render component", async () => {
			const { wrapper } = await setup();
			expect(
				wrapper.findComponent(ContextExternalToolConfigOverviewPage).exists()
			).toBe(true);
		});
	});

	describe("inject", () => {
		it("should throw an error when externalToolsModule injection fails", () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(
					ContextExternalToolConfigOverviewPage as MountOptions<Vue>,
					{
						provide: {
							i18n: { t: (key: string) => key },
						},
					}
				);
			} catch (e) {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(/injection "externalToolsModule" not found/)
				);
			}

			consoleErrorSpy.mockRestore();
		});

		it("should throw an error when i18n injection fails", () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(
					ContextExternalToolConfigOverviewPage as MountOptions<Vue>,
					{
						provide: {
							externalToolsModule,
						},
					}
				);
			} catch (e) {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(/injection "i18n" not found/)
				);
			}

			consoleErrorSpy.mockRestore();
		});

		it("should throw an error when i18n injection fails", () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(
					ContextExternalToolConfigOverviewPage as MountOptions<Vue>,
					{
						provide: {
							externalToolsModule,
							i18n: { t: (key: string) => key },
						},
					}
				);
			} catch (e) {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(/injection "roomsModule" not found/)
				);
			}

			consoleErrorSpy.mockRestore();
		});
	});

	describe("t", () => {
		it("should return translation", async () => {
			const { wrapper } = await setup({});
			const testKey = "testKey";

			const result: string = wrapper.vm.t(testKey);

			expect(result).toEqual(testKey);
		});

		it("should return 'unknown translation-key'", async () => {
			const { wrapper } = await setup({});
			const testKey = 123;

			const result: string = wrapper.vm.t(testKey);

			expect(result.includes("unknown translation-key:")).toBeTruthy();
		});
	});

	describe("onMounted is called", () => {
		it("should load available tool configurations", async () => {
			await setup();
			expect(
				externalToolsModule.loadAvailableSchoolToolConfigurations
			).toHaveBeenCalled();
		});
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", async () => {
			const { wrapper } = await setup();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual("pages.courses.index.title");
			expect(breadcrumbs.at(1).text()).toEqual("Mathe"); //TODO change to courseName after implementation
			expect(breadcrumbs.at(2).text()).toEqual("pages.tool.context.title");
		});
	});

	describe("title", () => {
		it("should render title", async () => {
			const { wrapper } = await setup();
			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("select", () => {
		describe("when creating a new configuration", () => {
			const openSelect = async (wrapper: Wrapper<any>) => {
				await wrapper
					.find('[data-testid="configuration-select"]')
					.trigger("click");
				await wrapper
					.find(".menuable__content__active")
					.findAll(".v-list-item")
					.at(0)
					.trigger("click");
				await Vue.nextTick();
			};

			it("should display name and logo of an tool configuration in selection list", async () => {
				const name = "nameForSelect";
				const { wrapper } = await setup({
					getToolConfigurations: [
						toolConfigurationFactory.build({
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
				const { wrapper } = await setup({
					getToolConfigurations: [toolConfigurationFactory.build({ id })],
				});

				await openSelect(wrapper);

				expect(
					externalToolsModule.loadToolConfigurationTemplateFromSchoolExternalTool
				).toHaveBeenCalledWith(id);
			});
		});
	});

	describe("cancel button", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, routerPush } = await setup();

			await wrapper.find('[data-testid="cancel-button"]').trigger("click");

			expect(routerPush).toHaveBeenCalledWith({
				path: "/rooms/undefined",
			});
		});
	});

	describe("save button", () => {
		describe("when creating a new configuration", () => {
			it("should call store action to save tool", async () => {
				const { wrapper } = await setup(
					{},
					{
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					}
				);
				wrapper.vm.toolTemplate = toolConfigurationTemplateFactory.build();

				const payload = {
					toolTemplate: wrapper.vm.toolTemplate,
					contextId: "contextId",
					contextType: ToolContextType.COURSE,
				};

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(
					externalToolsModule.createContextExternalTool
				).toHaveBeenCalledWith(payload);
			});

			it("should redirect back to context page when there is no error", async () => {
				const { wrapper, routerPush } = await setup({
					getBusinessError: businessErrorFactory.build({ message: undefined }),
				});

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(routerPush).toHaveBeenCalledWith({
					path: "/rooms/undefined",
				});
			});

			it("should display alert when server side error on save occurred", async () => {
				const { wrapper, routerPush } = await setup({
					getBusinessError: businessErrorFactory.build({
						message: "someErrorOccurred",
					}),
				});

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(routerPush).not.toHaveBeenCalled();
				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});
		});
	});
});
