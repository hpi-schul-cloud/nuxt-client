import { createModuleMocks } from "@/utils/mock-store-module";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolsModule from "@/store/external-tools";
import flushPromises from "flush-promises";
import Vue from "vue";
import {
	businessErrorFactory,
	contextExternalToolTemplateListItemFactory,
	externalToolDisplayDataFactory,
	toolConfigurationFactory,
	toolConfigurationTemplateFactory,
} from "@@/tests/test-utils/factory";
import ContextExternalToolConfiguration from "./ContextExternalToolConfiguration.page.vue";
import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import RoomsModule from "@/store/rooms";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ToolConfigurationTemplate } from "@/store/external-tool";
import { I18N_KEY } from "@/utils/inject";

describe("ContextExternalToolConfiguration", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;
	let contextExternalToolsModule: jest.Mocked<ContextExternalToolsModule>;
	let roomsModule: jest.Mocked<RoomsModule>;

	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getBusinessErrorTranslationKey: () => "",
		});

	const getWrapper = async (
		getters: Partial<ExternalToolsModule> = {},
		Contextgetters: Partial<ContextExternalToolsModule> = {},
		propsData: { contextId: string; contextType: ToolContextType }
	) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getToolConfigurations: [toolConfigurationFactory.build()],
			getContextExternalToolTemplates: [
				contextExternalToolTemplateListItemFactory.build(),
			],
			getBusinessError: businessErrorFactory.build(),
			...getters,
		});
		contextExternalToolsModule = createModuleMocks(ContextExternalToolsModule, {
			getExternalToolDisplayDataList: [externalToolDisplayDataFactory.build()],
			getBusinessError: businessErrorFactory.build(),
			...getters,
		});
		roomsModule = createModuleMocks(RoomsModule, {
			getRoomsData: [
				{
					title: "Mathematik",
					id: propsData.contextId,
					displayColor: "red",
					shortTitle: "Mathe",
					xPosition: 1,
					yPosition: 1,
				},
			],
		});

		const routerPush = jest.fn();
		const $router = {
			push: routerPush,
		};

		const wrapper: Wrapper<any> = mount(
			ContextExternalToolConfiguration as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					externalToolsModule,
					contextExternalToolsModule,
					roomsModule,
					[I18N_KEY as symbol]: { t: (key: string) => key },
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
		};
	};

	describe("basic functions", () => {
		describe("when loaded", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				return { wrapper };
			};

			it("should render component", async () => {
				const { wrapper } = await setup();

				expect(
					wrapper.findComponent(ContextExternalToolConfiguration).exists()
				).toBe(true);
			});
		});
	});

	describe("t", () => {
		describe("when known translation key is given", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);
				const testKey = "testKey";

				return { wrapper, testKey };
			};

			it("should return translation", async () => {
				const { wrapper, testKey } = await setup();

				const result: string = wrapper.vm.t(testKey);

				expect(result).toEqual(testKey);
			});
		});

		describe("when known translation key is given", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);
				const testKey = 123;

				return { wrapper, testKey };
			};

			it("should return 'unknown translation-key'", async () => {
				const { wrapper, testKey } = await setup();

				const result: string = wrapper.vm.t(testKey);

				expect(result.includes("unknown translation-key:")).toBeTruthy();
			});
		});
	});

	describe("breadcrumbs", () => {
		describe("when page is loaded", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				return { wrapper };
			};

			it("should render static breadcrumbs", async () => {
				const { wrapper } = await setup();

				const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

				expect(breadcrumbs.at(0).text()).toEqual("pages.courses.index.title");
				expect(breadcrumbs.at(1).text()).toEqual("Mathematik");
			});
		});
	});

	describe("title", () => {
		describe("when page is loaded", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				return { wrapper };
			};

			it("should render title", async () => {
				const { wrapper } = await setup();

				expect(wrapper.find(".wireframe-header").text()).toContain(
					"pages.tool.context.title"
				);
			});
		});
	});

	describe("select", () => {
		describe("when creating a new configuration", () => {
			const setup = async () => {
				const name = "nameForSelect";
				const id = "expectedToolId";

				const { wrapper } = await getWrapper(
					{
						getContextExternalToolTemplates: [
							contextExternalToolTemplateListItemFactory.build({ name, id }),
						],
					},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				const payload = {
					toolId: id,
					contextType: wrapper.vm.contextType,
					contextId: wrapper.vm.contextId,
				};

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

				return { wrapper, openSelect, name, payload };
			};

			it("should display name and logo of an tool configuration in selection list", async () => {
				const { wrapper, openSelect, name } = await setup();

				await openSelect(wrapper);
				const selectionRow = wrapper.find(".row");

				expect(selectionRow.find(".v-image__image").exists()).toBeTruthy();
				expect(selectionRow.find("span").text().includes(name));
			});

			it("should load template when tool configuration was changed", async () => {
				const { wrapper, openSelect, payload } = await setup();

				await openSelect(wrapper);

				expect(
					externalToolsModule.loadContextToolConfigurationTemplateFromExternalTool
				).toHaveBeenCalledWith(payload);
			});
		});
	});

	describe("cancel button", () => {
		describe(" when cancel button was clicked", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				return { wrapper };
			};

			it("should change page", async () => {
				const { wrapper } = await setup();

				await wrapper.find('[data-testid="cancel-button"]').trigger("click");

				expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
					path: "/rooms/contextId",
					query: { tab: "tools" },
				});
			});
		});
	});

	describe("save button", () => {
		describe("when creating a correct new configuration", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{
						getContextExternalToolTemplates: [
							contextExternalToolTemplateListItemFactory.build(),
						],
						getBusinessError: businessErrorFactory.build({
							message: undefined,
						}),
					},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				externalToolsModule.loadContextToolConfigurationTemplateFromExternalTool.mockResolvedValue(
					toolConfigurationTemplateFactory.build()
				);
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

				return { wrapper, openSelect };
			};

			it("should call store action to save tool", async () => {
				const { wrapper, openSelect } = await setup();

				await openSelect(wrapper);
				const toolTemplate: ToolConfigurationTemplate = wrapper.vm.toolTemplate; //TODO N21-575 payload ins setup
				const payload = {
					toolTemplate: toolTemplate,
					schoolToolId: "schoolToolId",
					contextId: "contextId",
					contextType: ToolContextType.COURSE,
				};

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.trigger("click");

				expect(
					contextExternalToolsModule.createContextExternalTool
				).toHaveBeenCalledWith(payload);
			});

			it("should redirect back to context page when there is no error", async () => {
				const { wrapper, openSelect } = await setup();

				await openSelect(wrapper);
				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.trigger("click");
				await Vue.nextTick();

				expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
					path: "/rooms/contextId",
					query: {
						tab: "tools",
					},
				});
			});
		});

		describe("when creating a falsy new configuration", () => {
			const setup = async () => {
				const { wrapper } = await getWrapper(
					{
						getBusinessError: businessErrorFactory.build({
							message: "someErrorOccurred",
						}),
					},
					{},
					{ contextId: "contextId", contextType: ToolContextType.COURSE }
				);

				return { wrapper };
			};

			it("should display alert when server side error on save occurred", async () => {
				const { wrapper } = await setup();

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.trigger("click");

				expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
				expect(
					wrapper.find('[data-testId="context-tool-error"]').exists()
				).toBeTruthy();
			});
		});
	});
});
