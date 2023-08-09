import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { AxiosError } from "axios";
import Vue from "vue";
import {
	AUTH_MODULE_KEY,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
} from "@/utils/inject";
import {
	businessErrorFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import {
	ExternalToolDisplayData,
	ToolContextType,
} from "@/store/external-tool";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import ExternalToolsModule from "@/store/external-tools";
import { BusinessError } from "@/store/types/commons";
import { createModuleMocks } from "@/utils/mock-store-module";
import VueRouter from "vue-router";
import * as routerComposables from "vue-router/composables";
import EnvConfigModule from "../../../store/env-config";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";

describe("RoomExternalToolsSection", () => {
	let router: DeepMocked<VueRouter>;

	const getWrapper = (
		props: { tools: ExternalToolDisplayData[]; roomId: string },
		externalToolsModuleGetter?: Partial<ExternalToolsModule>
	) => {
		document.body.setAttribute("data-app", "true");

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule
		);

		const externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getBusinessError: {
				statusCode: "",
				message: "",
				error: undefined,
			},
			...externalToolsModuleGetter,
		});

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
			getUserRoles: ["teacher"],
		});

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getCtlContextConfigurationEnabled: true,
		});

		router = createMock<VueRouter>();
		jest.spyOn(routerComposables, "useRouter").mockReturnValue(router);

		const wrapper: Wrapper<any> = mount(
			RoomExternalToolsSection as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					...props,
				},
				provide: {
					[I18N_KEY.valueOf()]: {
						tc: (key: string): string => key,
					},
					[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						contextExternalToolsModule,
					[EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: externalToolsModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			}
		);

		return {
			wrapper,
			contextExternalToolsModule,
			externalToolsModule,
			authModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when there are tools in the list", () => {
		const setup = () => {
			const tools: ExternalToolDisplayData[] =
				externalToolDisplayDataFactory.buildList(2);

			const { wrapper } = getWrapper({ tools, roomId: "roomId" });

			return {
				wrapper,
			};
		};

		it("should display the tools", () => {
			const { wrapper } = setup();

			const cards = wrapper.findAllComponents({
				name: "room-external-tool-card",
			});

			expect(cards.length).toEqual(2);
		});
	});

	describe("when clicking the delete button on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper({ tools: [tool], roomId: "roomId" });

			return {
				wrapper,
				tool,
			};
		};

		it("should open the delete dialog", async () => {
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]');

			expect(deleteDialog.element.childNodes.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe("when clicking the edit button on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const roomId = "roomId";

			const { wrapper } = getWrapper({ tools: [tool], roomId });

			return {
				wrapper,
				roomId,
				tool,
			};
		};

		it("should redirect to the edit page", async () => {
			const { wrapper, tool, roomId } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("edit", tool);

			expect(router.push).toHaveBeenCalledWith({
				name: "context-external-tool-configuration-edit",
				params: { configId: tool.contextExternalToolId },
				query: {
					contextId: roomId,
					contextType: ToolContextType.COURSE,
				},
			});
		});
	});

	describe("when clicking on confirm button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, contextExternalToolsModule } = getWrapper({
				tools: [tool],
				roomId: "roomId",
			});

			return {
				tool,
				wrapper,
				contextExternalToolsModule,
			};
		};

		it("should call delete function of store", async () => {
			const { wrapper, tool, contextExternalToolsModule } = await setup();

			const card = wrapper.find('[data-testId="external-tool-card-0"]');
			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.find('[data-testId="delete-dialog"]');

			const confirmBtn = deleteDialog.find('[data-testId="dialog-confirm"]');
			await confirmBtn.trigger("click");

			expect(
				contextExternalToolsModule.deleteContextExternalTool
			).toHaveBeenCalledWith(tool.contextExternalToolId);
			expect(deleteDialog.element.childNodes.length).toEqual(0);
		});
	});

	describe("when clicking on cancel button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, contextExternalToolsModule } = getWrapper({
				tools: [tool],
				roomId: "roomId",
			});

			return {
				tool,
				wrapper,
				contextExternalToolsModule,
			};
		};

		it("should close dialog", async () => {
			const { wrapper, tool, contextExternalToolsModule } = await setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.find("[data-testId=delete-dialog]");

			const cancelBtn = wrapper.find("[data-testId=dialog-cancel]");
			await cancelBtn.trigger("click");

			expect(
				contextExternalToolsModule.deleteContextExternalTool
			).not.toHaveBeenCalled();
			expect(deleteDialog.element.childNodes.length).toEqual(0);
		});
	});

	describe("when clicking on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, externalToolsModule } = getWrapper({
				tools: [tool],
				roomId: "roomId",
			});

			return {
				wrapper,
				externalToolsModule,
				tool,
			};
		};

		it("should fetch the launch data", async () => {
			const { wrapper, externalToolsModule, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.trigger("click");

			expect(externalToolsModule.loadToolLaunchData).toHaveBeenCalledWith(
				tool.contextExternalToolId
			);
		});
	});

	describe("when clicking on a tool which has missing auto parameters", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const error: BusinessError = businessErrorFactory.build({
				error: new AxiosError("this error is expected"),
				message: "MISSING_TOOL_PARAMETER_VALUE some value is missing",
			});

			const { wrapper } = getWrapper(
				{ tools: [tool], roomId: "roomId" },
				{
					getBusinessError: error,
				}
			);

			return {
				wrapper,
				tool,
			};
		};

		it("should display a dialog", async () => {
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			await card.vm.$emit("click", tool);

			const dialog = wrapper.find('[data-testId="error-dialog"]');

			expect(dialog.exists()).toBeTruthy();
			expect(wrapper.vm.isErrorDialogOpen).toBeTruthy();
		});
	});

	describe("when click on a outdated tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const error: BusinessError = businessErrorFactory.build({
				error: new AxiosError("this error is expected"),
				message: "TOOL_STATUS_OUTDATED this tool is outdated",
			});

			const { wrapper } = getWrapper(
				{ tools: [tool], roomId: "roomId" },
				{
					getBusinessError: error,
				}
			);

			return {
				wrapper,
				tool,
			};
		};

		it("should display a dialog", async () => {
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			await card.vm.$emit("click", tool);

			const dialog = wrapper.find('[data-testId="error-dialog"]');

			expect(dialog.exists()).toBeTruthy();
			expect(wrapper.vm.isErrorDialogOpen).toBeTruthy();
		});
	});

	describe("when click on a latest tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper({ tools: [tool], roomId: "roomId" });

			return {
				wrapper,
				tool,
			};
		};

		it("should not display a dialog", async () => {
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			await card.vm.$emit("click", tool);

			expect(wrapper.vm.isErrorDialogOpen).toBeFalsy();
		});
	});
});
