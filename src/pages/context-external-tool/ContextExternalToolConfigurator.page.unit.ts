import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import { ToolContextType } from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ContextExternalToolSave } from "@/store/external-tool/context-external-tool";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { contextExternalToolFactory } from "@@/tests/test-utils";
import {
	businessErrorFactory,
	contextExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { Router, useRouter } from "vue-router";
import ContextExternalToolConfigurator from "./ContextExternalToolConfigurator.page.vue";

jest.mock("vue-router", () => ({
	useRoute: jest.fn(),
	useRouter: jest.fn(),
}));

const useRouterMock = <jest.Mock>useRouter;
const router = createMock<Router>();
useRouterMock.mockReturnValue(router);

describe("ContextExternalToolConfigurator", () => {
	const getWrapper = (
		props: {
			contextId: string;
			contextType: ToolContextType;
			configId?: string;
		},
		getters: Partial<ContextExternalToolsModule> = {}
	) => {
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
				isSynchronized: false,
			},
		});

		const wrapper = mount(ContextExternalToolConfigurator, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ROOM_MODULE_KEY.valueOf()]: roomModule,
					[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						contextExternalToolsModule,
				},
			},
			props: {
				...props,
			},
		});

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
				contextType: ToolContextType.Course,
			});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0)?.text()).toEqual("common.words.courses");
			expect(breadcrumbs.at(1)?.text()).toEqual(roomTitle);
		});
	});

	describe("title", () => {
		it("should render title", () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("onMounted", () => {
		describe("when creating a new configuration", () => {
			it("should load the available tools for a context", async () => {
				const { contextExternalToolsModule } = getWrapper({
					contextId: "contextId",
					contextType: ToolContextType.Course,
				});

				await nextTick();

				expect(
					contextExternalToolsModule.loadAvailableToolsForContext
				).toHaveBeenCalledWith({
					contextId: "contextId",
					contextType: ToolContextType.Course,
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
					contextType: ToolContextType.Course,
				});

				await nextTick();

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
				contextType: ToolContextType.Course,
			});

			await wrapper.findComponent(ExternalToolConfigurator).vm.$emit("cancel");

			expect(router.push).toHaveBeenCalledWith({
				path: "/rooms/contextId",
				query: { tab: "tools" },
			});
		});
	});

	describe("onSave", () => {
		describe("when creating a new configuration", () => {
			const setup = () => {
				const contextId = "contextId";
				const contextType: ToolContextType = ToolContextType.Course;
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

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, [
						{
							name: template.parameters[0].name,
							value: testValue,
						},
					]);
				await nextTick();

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

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: `/rooms/${contextId}`,
					query: { tab: "tools" },
				});
			});

			it("should display a notification when created", async () => {
				const { wrapper, notifierModule, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

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
				const contextType: ToolContextType = ToolContextType.Course;
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

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

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

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: `/rooms/${contextId}`,
					query: { tab: "tools" },
				});
			});

			it("should display a notification when updated", async () => {
				const { wrapper, notifierModule, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

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
						contextType: ToolContextType.Course,
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

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						contextExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await nextTick();

				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});

			it("should not redirect", async () => {
				const { wrapper } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						contextExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await nextTick();

				expect(router.push).not.toHaveBeenCalled();
			});
		});
	});
});
