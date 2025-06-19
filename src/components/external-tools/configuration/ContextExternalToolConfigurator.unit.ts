import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import { ToolContextType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import {
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import {
	businessErrorFactory,
	contextExternalToolFactory,
} from "@@/tests/test-utils";
import {
	contextExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	ContextExternalToolSave,
	useContextExternalToolConfigurationState,
	useContextExternalToolState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import ContextExternalToolConfigurator from "./ContextExternalToolConfigurator.vue";

vi.mock("@data-external-tool/contextExternalToolConfigurationState.composable");
vi.mock("@data-external-tool/contextExternalToolState.composable");

describe("CourseContextExternalToolConfigurator", () => {
	let useContextExternalToolConfigurationStateMock: DeepMocked<
		ReturnType<typeof useContextExternalToolConfigurationState>
	>;
	let useContextExternalToolStateMock: DeepMocked<
		ReturnType<typeof useContextExternalToolState>
	>;

	const getWrapper = (
		props: ComponentProps<typeof ContextExternalToolConfigurator>,
		getters: Partial<SchoolExternalToolsModule> = {}
	) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const schoolExternalToolsModule = createModuleMocks(
			SchoolExternalToolsModule,
			{
				getContextExternalToolConfigurationTemplate: undefined,
				...getters,
			}
		);

		const wrapper = mount(ContextExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						schoolExternalToolsModule,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useContextExternalToolConfigurationStateMock = createMock<
			ReturnType<typeof useContextExternalToolConfigurationState>
		>({
			error: ref(),
			isLoading: ref(),
			availableTools: ref([]),
		});
		useContextExternalToolStateMock = createMock<
			ReturnType<typeof useContextExternalToolState>
		>({
			error: ref(),
			isLoading: ref(),
			contextExternalTool: ref(),
		});

		vi.mocked(useContextExternalToolConfigurationState).mockReturnValue(
			useContextExternalToolConfigurationStateMock
		);
		vi.mocked(useContextExternalToolState).mockReturnValue(
			useContextExternalToolStateMock
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchData", () => {
		describe("when creating a new configuration", () => {
			it("should load the available tools for a context", async () => {
				const { wrapper } = getWrapper({
					contextId: "contextId",
					contextType: ToolContextType.Course,
				});

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolConfigurationStateMock.fetchAvailableToolConfigurationsForContext
				).toHaveBeenCalledWith("contextId", ToolContextType.Course);
			});
		});

		describe("when updating an existing configuration", () => {
			const setup = async () => {
				const contextExternalTool = contextExternalToolFactory.build({
					displayName: "testName",
				});

				const { wrapper } = getWrapper({
					configId: contextExternalTool.id,
					contextId: contextExternalTool.contextId,
					contextType: contextExternalTool.contextType,
				});

				useContextExternalToolStateMock.contextExternalTool.value =
					contextExternalTool;

				return {
					wrapper,
					contextExternalTool,
				};
			};

			it("should load the template", async () => {
				const { wrapper, contextExternalTool } = await setup();

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolConfigurationStateMock.fetchConfigurationForContextExternalTool
				).toHaveBeenCalledWith(contextExternalTool.id);
			});

			it("should load the configuration", async () => {
				const { wrapper, contextExternalTool } = await setup();

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolStateMock.fetchContextExternalTool
				).toHaveBeenCalledWith(contextExternalTool.id);
			});
		});

		describe("when a preferred tool with a custom parameter is loaded", () => {
			const setup = async () => {
				const contextExternalToolConfigurationTemplate =
					contextExternalToolConfigurationTemplateFactory.build();
				const { wrapper } = getWrapper(
					{
						contextId: "contextId",
						contextType: ToolContextType.BoardElement,
					},
					{
						getContextExternalToolConfigurationTemplate:
							contextExternalToolConfigurationTemplate,
					}
				);

				return {
					wrapper,
					contextExternalToolConfigurationTemplate,
				};
			};

			it("should not fetch available tools", async () => {
				const { wrapper } = await setup();

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolConfigurationStateMock.fetchAvailableToolConfigurationsForContext
				).not.toHaveBeenCalledWith("contextId", ToolContextType.BoardElement);
			});

			it("should set the preferred tool as an available tool", async () => {
				const { wrapper, contextExternalToolConfigurationTemplate } =
					await setup();

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolConfigurationStateMock.availableTools.value
				).toEqual([contextExternalToolConfigurationTemplate]);
			});
		});
	});

	describe("onCancel", () => {
		it("should emit cancel", async () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			await wrapper.vm.fetchData();

			wrapper.findComponent(ExternalToolConfigurator).vm.$emit("cancel");
			await nextTick();

			expect(wrapper.emitted("cancel")).toBeDefined();
		});
	});

	describe("onSave", () => {
		describe("when creating a new configuration", () => {
			const setup = async () => {
				const contextId = "contextId";
				const contextType: ToolContextType = ToolContextType.Course;
				const template = contextExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});

				useContextExternalToolConfigurationStateMock.availableTools.value = [
					template,
				];

				const { wrapper } = getWrapper({
					contextId,
					contextType,
				});

				await wrapper.vm.fetchData();

				return {
					wrapper,
					template,
					contextId,
					contextType,
				};
			};

			it("should save the tool", async () => {
				const { wrapper, template, contextId, contextType } = await setup();
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
					useContextExternalToolStateMock.createContextExternalTool
				).toHaveBeenCalledWith<[ContextExternalToolSave]>({
					contextId,
					contextType,
					displayName: undefined,
					schoolToolId: template.schoolExternalToolId,
					parameters: [
						{
							name: template.parameters[0].name,
							value: testValue,
						},
					],
				});
			});

			it("should should emit the success event", async () => {
				const { wrapper, template } = await setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(wrapper.emitted("success")).toBeDefined();
			});
		});

		describe("when editing a configuration", () => {
			const setup = async () => {
				const template =
					contextExternalToolConfigurationTemplateFactory.build();
				const contextExternalTool = contextExternalToolFactory.build({
					displayName: "testName",
					contextId: "contextId",
					contextType: ToolContextType.Course,
				});

				useContextExternalToolConfigurationStateMock.availableTools.value = [
					template,
				];
				useContextExternalToolStateMock.contextExternalTool.value =
					contextExternalTool;

				const { wrapper } = getWrapper({
					contextId: contextExternalTool.contextId,
					contextType: contextExternalTool.contextType,
					configId: contextExternalTool.id,
				});

				await wrapper.vm.fetchData();

				return {
					wrapper,
					template,
					contextExternalTool,
				};
			};

			it("should save the tool", async () => {
				const { wrapper, template, contextExternalTool } = await setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(
					useContextExternalToolStateMock.updateContextExternalTool
				).toHaveBeenCalledWith<[string, ContextExternalToolSave]>(
					contextExternalTool.id,
					{
						contextId: contextExternalTool.contextId,
						contextType: contextExternalTool.contextType,
						displayName: contextExternalTool.displayName,
						parameters: [],
						schoolToolId: template.schoolExternalToolId,
					}
				);
			});

			it("should redirect back to context settings page when there is no error", async () => {
				const { wrapper, template } = await setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(wrapper.emitted("success")).toBeDefined();
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({
					contextId: "contextId",
					contextType: ToolContextType.Course,
				});

				await wrapper.vm.fetchData();

				useContextExternalToolStateMock.error.value =
					businessErrorFactory.build();

				return {
					wrapper,
				};
			};

			it("should not emit the success event", async () => {
				const { wrapper } = await setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						contextExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await nextTick();

				expect(wrapper.emitted("success")).toBeUndefined();
			});
		});
	});
});
