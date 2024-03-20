import { ToolContextType } from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ContextExternalToolSave } from "@/store/external-tool/context-external-tool";
import { CONTEXT_EXTERNAL_TOOLS_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	businessErrorFactory,
	contextExternalToolConfigurationTemplateFactory,
	contextExternalToolFactory,
	toolParameterFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import ExternalToolConfigurator from "../external-tools/configuration/ExternalToolConfigurator.vue";
import ExternalToolElementConfigurationDialog from "./ExternalToolElementConfigurationDialog.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";

jest.mock("@util-board");

describe("ExternalToolElementConfigurationDialog", () => {
	let useBoardNotifierMock: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		useBoardNotifierMock = createMock<ReturnType<typeof useBoardNotifier>>();

		jest.mocked(useBoardNotifier).mockReturnValue(useBoardNotifierMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = async (
		props: { configId?: string } = {},
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

		const propsData = {
			isOpen: false,
			contextId: "contextId",
			...props,
		};

		const wrapper = mount(ExternalToolElementConfigurationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						contextExternalToolsModule,
				},
			},
			props: propsData,
		});

		wrapper.setProps({
			...propsData,
			isOpen: true,
		});

		// Wait for the DOM to update after opening the dialog
		await nextTick();

		return {
			wrapper,
			contextExternalToolsModule,
		};
	};

	describe("Title", () => {
		const setup = async () => {
			const { wrapper } = await getWrapper();

			return {
				wrapper,
			};
		};

		it("should display the title", async () => {
			const { wrapper } = await setup();

			const dialog = wrapper.findComponent(vCustomDialog);
			const title = dialog.findComponent({ name: "v-card-title" });

			expect(title.text()).toEqual(
				"feature-board-external-tool-element.dialog.title"
			);
		});
	});

	describe("when the dialog is opened", () => {
		describe("when creating a new configuration", () => {
			it("should load the available tools for a context", async () => {
				const { contextExternalToolsModule } = await getWrapper();

				await nextTick();

				expect(
					contextExternalToolsModule.loadAvailableToolsForContext
				).toHaveBeenCalledWith({
					contextId: "contextId",
					contextType: ToolContextType.BoardElement,
				});
			});
		});

		describe("when updating an existing configuration", () => {
			const setup = async () => {
				const contextExternalTool = contextExternalToolFactory.build({
					displayName: "testName",
					contextType: ToolContextType.BoardElement,
				});

				const { contextExternalToolsModule, wrapper } = await getWrapper({
					configId: "configId",
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

	describe("when canceling the operation", () => {
		it("should emit the close event", async () => {
			const { wrapper } = await getWrapper();

			const configurator = wrapper.findComponent(ExternalToolConfigurator);
			configurator.vm.$emit("cancel");
			await nextTick();

			expect(wrapper.emitted("close")).toBeDefined();
		});
	});

	describe("when saving a tool", () => {
		describe("when creating a new configuration", () => {
			const setup = async () => {
				const template = contextExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});

				const { wrapper, contextExternalToolsModule } = await getWrapper();

				contextExternalToolsModule.createContextExternalTool.mockResolvedValue(
					contextExternalToolFactory.build()
				);

				return {
					wrapper,
					contextExternalToolsModule,
					template,
				};
			};

			it("should call store action to save tool", async () => {
				const { wrapper, template, contextExternalToolsModule } = await setup();
				const testValue = "test";

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, [
					{
						name: template.parameters[0].name,
						value: testValue,
					},
				]);
				await nextTick();

				expect(
					contextExternalToolsModule.createContextExternalTool
				).toHaveBeenCalledWith<[ContextExternalToolSave]>({
					contextId: "contextId",
					contextType: ToolContextType.BoardElement,
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

			it("should display a notification when created", async () => {
				const { wrapper, template } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

				expect(useBoardNotifierMock.showSuccess).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.notification.created"
				);
			});

			it("should emit the save event", async () => {
				const { wrapper, template } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

				expect(wrapper.emitted("save")).toBeDefined();
			});

			it("should emit the close event", async () => {
				const { wrapper, template } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

				expect(wrapper.emitted("close")).toBeDefined();
			});
		});

		describe("when editing a configuration", () => {
			const setup = async () => {
				const template =
					contextExternalToolConfigurationTemplateFactory.build();

				const contextExternalToolId = "configId";

				const { wrapper, contextExternalToolsModule } = await getWrapper({
					configId: contextExternalToolId,
				});

				contextExternalToolsModule.updateContextExternalTool.mockResolvedValue(
					contextExternalToolFactory.build({ id: contextExternalToolId })
				);

				return {
					wrapper,
					contextExternalToolsModule,
					template,
					contextExternalToolId,
				};
			};

			it("should call store action to update tool", async () => {
				const {
					wrapper,
					contextExternalToolsModule,
					template,
					contextExternalToolId,
				} = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

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
						contextId: "contextId",
						contextType: ToolContextType.BoardElement,
						displayName: template.name,
						parameters: [],
						toolVersion: template.version,
						schoolToolId: template.schoolExternalToolId,
					},
				});
			});

			it("should display a notification when updated", async () => {
				const { wrapper, template } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

				expect(useBoardNotifierMock.showSuccess).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.notification.updated"
				);
			});

			it("should emit the save event", async () => {
				const { wrapper, template } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

				expect(wrapper.emitted("save")).toBeDefined();
			});

			it("should emit the close event", async () => {
				const { wrapper, template } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit("save", template, []);
				await flushPromises();

				expect(wrapper.emitted("close")).toBeDefined();
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = async () => {
				const error = businessErrorFactory.build();

				const { wrapper } = await getWrapper(
					{},
					{
						getBusinessError: error,
					}
				);

				return {
					wrapper,
					error,
				};
			};

			it("should display an alert", async () => {
				const { wrapper, error } = await setup();

				const configurator = wrapper.findComponent(ExternalToolConfigurator);
				configurator.vm.$emit(
					"save",
					contextExternalToolConfigurationTemplateFactory.build(),
					[]
				);
				await nextTick();

				expect(configurator.props("error")).toEqual(error);
			});
		});
	});
});
