import { createModuleMocks } from "@/utils/mock-store-module";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolsModule from "@/store/external-tools";
import flushPromises from "flush-promises";
import Vue from "vue";
import { toolConfigurationTemplateFactory } from "@@/tests/test-utils/factory";
import {
	SchoolExternalTool,
	ToolConfigurationTemplate,
} from "@/store/external-tool";
import ExternalToolConfiguration from "./ExternalToolConfiguration.page.vue";
import {
	businessErrorFactory,
	schoolExternalToolFactory,
	toolConfigurationFactory,
} from "@@/tests/test-utils/factory";
import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { I18N_KEY } from "@/utils/inject";

describe("ExternalToolConfiguration", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;

	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getTranslationKey: () => "",
		});

	const setup = async (
		getters: Partial<ExternalToolsModule> = {},
		propsData?: { configId: string }
	) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getToolConfigurations: [toolConfigurationFactory.build()],
			getBusinessError: businessErrorFactory.build(),
			...getters,
		}) as jest.Mocked<ExternalToolsModule>;

		const routerPush = jest.fn();
		const $router = {
			push: routerPush,
		};

		const toolTemplate: ToolConfigurationTemplate =
			toolConfigurationTemplateFactory.build();
		const loadedSchoolExternalTool: SchoolExternalTool =
			schoolExternalToolFactory.build();

		externalToolsModule.loadToolConfigurationTemplateFromExternalTool.mockResolvedValue(
			toolTemplate
		);
		externalToolsModule.loadSchoolExternalTool.mockResolvedValue(
			loadedSchoolExternalTool
		);

		const wrapper: Wrapper<any> = mount(
			ExternalToolConfiguration as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY as symbol]: { t: (key: string) => key },
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
			loadedSchoolExternalTool,
		};
	};

	describe("basic functions", () => {
		it("should render component", async () => {
			const { wrapper } = await setup();
			expect(wrapper.findComponent(ExternalToolConfiguration).exists()).toBe(
				true
			);
		});
	});

	describe("inject", () => {
		it("should throw an error when externalToolsModule injection fails", () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(ExternalToolConfiguration as MountOptions<Vue>, {
					provide: {
						[I18N_KEY as symbol]: { t: (key: string) => key },
					},
				});
			} catch (e) {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(/injection "externalToolsModule" not found/)
				);
			}

			consoleErrorSpy.mockRestore();
		});

		it("should throw an error when i18n injection fails", () => {
			expect(() => {
				shallowMount(ExternalToolConfiguration as MountOptions<Vue>, {
					provide: {
						externalToolsModule,
					},
				});
			}).toThrow();
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
		it("should load available tool configurations", () => {
			setup();
			expect(
				externalToolsModule.loadAvailableToolConfigurations
			).toHaveBeenCalled();
		});
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", async () => {
			const { wrapper } = await setup();

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
					externalToolsModule.loadToolConfigurationTemplateFromExternalTool
				).toHaveBeenCalledWith(id);
			});

			it("should set parameters valid on selection", async () => {
				const id = "expectedToolId";
				const toolTemplate: ToolConfigurationTemplate =
					toolConfigurationTemplateFactory.build({
						id,
					});
				const { wrapper } = await setup({
					getToolConfigurations: [toolTemplate],
				});
				externalToolsModule.loadToolConfigurationTemplateFromExternalTool.mockResolvedValue(
					toolTemplate
				);

				await openSelect(wrapper);

				expect(wrapper.vm.parametersValid).toBeTruthy();
			});
		});

		describe("when editing a configuration", () => {
			it("should disable the selection", async () => {
				const { wrapper } = await setup(
					{},
					{
						configId: "configId",
					}
				);

				const select = wrapper.find('[data-testid="configuration-select"]');

				expect(select.attributes().disabled).toBeDefined();
			});

			it("should display the edited tool in the selection", async () => {
				const { toolTemplate, wrapper } = await setup(
					{},
					{
						configId: "configId",
					}
				);

				const selectionRow = wrapper.find(".row");
				expect(selectionRow.find("span").text().includes(toolTemplate.name));
			});
		});
	});

	describe("cancel button", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, routerPush } = await setup();

			await wrapper.find('[data-testid="cancel-button"]').trigger("click");

			expect(routerPush).toHaveBeenCalledWith({
				path: "/administration/school-settings",
			});
		});
	});

	describe("save button", () => {
		describe("when creating a new configuration", () => {
			it("should call store action to save tool", async () => {
				const { wrapper } = await setup();
				wrapper.vm.toolTemplate = toolConfigurationTemplateFactory.build();

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(
					externalToolsModule.createSchoolExternalTool
				).toHaveBeenCalledWith(wrapper.vm.toolTemplate);
			});

			it("should redirect back to school settings page when there is no error", async () => {
				const { wrapper, routerPush } = await setup({
					getBusinessError: businessErrorFactory.build({ message: undefined }),
				});

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(routerPush).toHaveBeenCalledWith({
					path: "/administration/school-settings",
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

		describe("when editing a configuration", () => {
			it("should call store action to update tool", async () => {
				const { wrapper } = await setup(
					{},
					{
						configId: "configId",
					}
				);

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(
					externalToolsModule.updateSchoolExternalTool
				).toHaveBeenCalledWith(wrapper.vm.toolTemplate);
			});

			it("should redirect back to school settings page when there is no error", async () => {
				const { wrapper, routerPush } = await setup({
					getBusinessError: businessErrorFactory.build({ message: undefined }),
				});

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(routerPush).toHaveBeenCalledWith({
					path: "/administration/school-settings",
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
