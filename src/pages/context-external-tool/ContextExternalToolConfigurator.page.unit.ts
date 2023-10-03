import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ToolContextType } from "@/store/external-tool";
import { ContextExternalToolSave } from "@/store/external-tool/context-external-tool";
import NotifierModule from "@/store/notifier";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { contextExternalToolFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import {
	businessErrorFactory,
	contextExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RoomModule from "@/store/room";
import EnvConfigModule from "@/store/env-config";
import ContextExternalToolConfigurator from "./ContextExternalToolConfigurator.page.vue";

describe("ContextExternalToolConfigurator", () => {
	const routerPush = jest.fn();

	const getWrapper = (
		propsData: {
			contextId: string;
			contextType: ToolContextType;
			configId?: string;
		},
		getters: Partial<ContextExternalToolsModule> = {}
	) => {
		document.body.setAttribute("data-app", "true");

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule,
			{
				getContextExternalToolConfigurationTemplates: [
					contextExternalToolConfigurationTemplateFactory.build(),
				],
				getLoading: false,
				getBusinessError: businessErrorFactory.build({ message: undefined }),
				...getters,
			}
		);

		const notifierModule = createModuleMocks(NotifierModule);

		const roomTitle = "Room Title";
		const roomModule = createModuleMocks(RoomModule, {
			getRoomData: {
				title: roomTitle,
				roomId: "contextId",
				displayColor: "#ffffff",
				elements: [],
				isArchived: false,
			},
		});

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getCtlContextConfigurationEnabled: true,
		});

		const $router = {
			push: routerPush,
		};

		const wrapper: Wrapper<Vue> = mount(
			ContextExternalToolConfigurator as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ROOM_MODULE_KEY.valueOf()]: roomModule,
					[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						contextExternalToolsModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
				propsData: {
					...propsData,
				},
				mocks: {
					$router,
				},
			}
		);

		return {
			wrapper,
			contextExternalToolsModule,
			roomModule,
			notifierModule,
			roomTitle,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper, roomTitle } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.COURSE,
			});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual("common.words.courses");
			expect(breadcrumbs.at(1).text()).toEqual(roomTitle);
		});
	});

	describe("title", () => {
		it("should render title", () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.COURSE,
			});

			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("onMounted", () => {
		describe("when creating a new configuration", () => {
			it("should load the available tools for a context", async () => {
				const { contextExternalToolsModule } = getWrapper({
					contextId: "contextId",
					contextType: ToolContextType.COURSE,
				});

				await Vue.nextTick();

				expect(
					contextExternalToolsModule.loadAvailableToolsForContext
				).toHaveBeenCalledWith({
					contextId: "contextId",
					contextType: ToolContextType.COURSE,
				});
			});
		});

		describe("when updating an existing configuration", () => {
			const setup = async () => {
				const contextExternalTool = contextExternalToolFactory.build({
					displayName: "testName",
				});

				const { contextExternalToolsModule, wrapper } = getWrapper({
					configId: "configId",
					contextId: "contextId",
					contextType: ToolContextType.COURSE,
				});

				await Vue.nextTick();

				contextExternalToolsModule.loadContextExternalTool.mockResolvedValue(
					contextExternalTool
				);

				return {
					contextExternalToolsModule,
					wrapper,
					contextExternalTool,
				};
			};

			it("should load the template", async () => {
				const { contextExternalToolsModule } = await setup();

				expect(
					contextExternalToolsModule.loadConfigurationTemplateForContextExternalTool
				).toHaveBeenCalledWith("configId");
			});

			it("should load the configuration", async () => {
				const { contextExternalToolsModule } = await setup();

				expect(
					contextExternalToolsModule.loadContextExternalTool
				).toHaveBeenCalledWith("configId");
			});
		});
	});

	describe("onCancel", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.COURSE,
			});

			await wrapper.findComponent(ExternalToolConfigurator).vm.$emit("cancel");

			expect(routerPush).toHaveBeenCalledWith({
				path: "/rooms/contextId",
				query: { tab: "tools" },
			});
		});
	});

	describe("onSave", () => {
		describe("when creating a new configuration", () => {
			const setup = () => {
				const contextId = "contextId";
				const contextType: ToolContextType = ToolContextType.COURSE;
				const template = contextExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});

				const { wrapper, contextExternalToolsModule, notifierModule } =
					getWrapper(
						{
							contextId,
							contextType,
						},
						{
							getContextExternalToolConfigurationTemplates: [template],
						}
					);

				return {
					wrapper,
					contextExternalToolsModule,
					notifierModule,
					template,
					contextId,
					contextType,
				};
			};

			it("should call store action to save tool", async () => {
				const {
					wrapper,
					template,
					contextExternalToolsModule,
					contextId,
					contextType,
				} = setup();
				const testValue = "test";

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, [testValue]);

				expect(
					contextExternalToolsModule.createContextExternalTool
				).toHaveBeenCalledWith<[ContextExternalToolSave]>({
					contextId,
					contextType,
					displayName: template.name,
					schoolToolId: template.schoolExternalToolId,
					toolVersion: template.version,
					parameters: [
						{
							name: template.parameters[0].name,
							value: testValue,
						},
					],
				});
			});

			it("should redirect back to the room page", async () => {
				const { wrapper, template, contextId } = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);

				expect(routerPush).toHaveBeenCalledWith({
					path: `/rooms/${contextId}`,
					query: { tab: "tools" },
				});
			});

			it("should display a notification when created", async () => {
				const { wrapper, notifierModule, template } = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "components.administration.externalToolsSection.notification.created",
					status: "success",
				});
			});
		});

		describe("when editing a configuration", () => {
			const setup = () => {
				const template =
					contextExternalToolConfigurationTemplateFactory.build();

				const contextId = "contextId";
				const contextType: ToolContextType = ToolContextType.COURSE;
				const contextExternalToolId = "configId";

				const { wrapper, contextExternalToolsModule, notifierModule } =
					getWrapper(
						{
							contextId,
							contextType,
							configId: contextExternalToolId,
						},
						{
							getContextExternalToolConfigurationTemplates: [template],
						}
					);

				return {
					wrapper,
					contextExternalToolsModule,
					notifierModule,
					template,
					contextExternalToolId,
					contextId,
					contextType,
				};
			};

			it("should call store action to update tool", async () => {
				const {
					wrapper,
					contextExternalToolsModule,
					template,
					contextExternalToolId,
					contextId,
					contextType,
				} = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);

				expect(
					contextExternalToolsModule.updateContextExternalTool
				).toHaveBeenCalledWith<
					[
						{
							contextExternalToolId: string;
							contextExternalTool: ContextExternalToolSave;
						},
					]
				>({
					contextExternalToolId: contextExternalToolId,
					contextExternalTool: {
						contextId,
						contextType,
						displayName: template.name,
						parameters: [],
						toolVersion: template.version,
						schoolToolId: template.schoolExternalToolId,
					},
				});
			});

			it("should redirect back to context settings page when there is no error", async () => {
				const { wrapper, template, contextId } = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);

				expect(routerPush).toHaveBeenCalledWith({
					path: `/rooms/${contextId}`,
					query: { tab: "tools" },
				});
			});

			it("should display a notification when updated", async () => {
				const { wrapper, notifierModule, template } = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "components.administration.externalToolsSection.notification.updated",
					status: "success",
				});
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					},
					{
						getBusinessError: businessErrorFactory.build(),
					}
				);

				return {
					wrapper,
				};
			};

			it("should display an alert", async () => {
				const { wrapper } = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						contextExternalToolConfigurationTemplateFactory.build(),
						[]
					);

				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});

			it("should not redirect", async () => {
				const { wrapper } = setup();

				await wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						contextExternalToolConfigurationTemplateFactory.build(),
						[]
					);

				expect(routerPush).not.toHaveBeenCalled();
			});
		});
	});
});
