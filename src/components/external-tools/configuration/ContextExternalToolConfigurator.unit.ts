import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import { ToolContextType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	businessErrorFactory,
	contextExternalToolFactory,
} from "@@/tests/test-utils";
import {
	contextExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
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
		props: ComponentProps<typeof ContextExternalToolConfigurator>
	) => {
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(ContextExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
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

		jest
			.mocked(useContextExternalToolConfigurationState)
			.mockReturnValue(useContextExternalToolConfigurationStateMock);
		jest
			.mocked(useContextExternalToolState)
			.mockReturnValue(useContextExternalToolStateMock);
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
					configId: "configId",
					contextId: "contextId",
					contextType: ToolContextType.Course,
				});

				useContextExternalToolStateMock.contextExternalTool.value =
					contextExternalTool;

				return {
					wrapper,
					contextExternalTool,
				};
			};

			it("should load the template", async () => {
				const { wrapper } = await setup();

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolConfigurationStateMock.fetchConfigurationForContextExternalTool
				).toHaveBeenCalledWith("configId");
			});

			it("should load the configuration", async () => {
				const { wrapper } = await setup();

				await wrapper.vm.fetchData();

				expect(
					useContextExternalToolStateMock.fetchContextExternalTool
				).toHaveBeenCalledWith("configId");
			});
		});
	});

	describe("onCancel", () => {
		it("should emit cancel", async () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			wrapper.findComponent(ExternalToolConfigurator).vm.$emit("cancel");
			await nextTick();

			expect(wrapper.emitted("cancel")).toBeDefined();
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

				const { wrapper } = getWrapper({
					contextId,
					contextType,
				});

				useContextExternalToolConfigurationStateMock.availableTools.value = [
					template,
				];

				return {
					wrapper,
					template,
					contextId,
					contextType,
				};
			};

			it("should save the tool", async () => {
				const { wrapper, template, contextId, contextType } = setup();
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
					displayName: template.name,
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
				const { wrapper, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(wrapper.emitted("success")).toBeDefined();
			});
		});

		describe("when editing a configuration", () => {
			const setup = () => {
				const template =
					contextExternalToolConfigurationTemplateFactory.build();

				const contextId = "contextId";
				const contextType: ToolContextType = ToolContextType.Course;
				const contextExternalToolId = "configId";

				const { wrapper } = getWrapper({
					contextId,
					contextType,
					configId: contextExternalToolId,
				});

				useContextExternalToolConfigurationStateMock.availableTools.value = [
					template,
				];

				return {
					wrapper,
					template,
					contextExternalToolId,
					contextId,
					contextType,
				};
			};

			it("should save the tool", async () => {
				const {
					wrapper,
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
					useContextExternalToolStateMock.updateContextExternalTool
				).toHaveBeenCalledWith<[string, ContextExternalToolSave]>(
					contextExternalToolId,
					{
						contextId,
						contextType,
						displayName: template.name,
						parameters: [],
						schoolToolId: template.schoolExternalToolId,
					}
				);
			});

			it("should redirect back to context settings page when there is no error", async () => {
				const { wrapper, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(wrapper.emitted("success")).toBeDefined();
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					contextId: "contextId",
					contextType: ToolContextType.Course,
				});

				useContextExternalToolStateMock.error.value =
					businessErrorFactory.build();

				return {
					wrapper,
				};
			};

			it("should not emit the success event", async () => {
				const { wrapper } = setup();

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
