import { ToolContextType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import EnvConfigModule from "@/store/env-config";
import {
	ExternalToolDisplayData,
	ToolConfigurationStatus,
} from "@/store/external-tool";
import ExternalToolsModule from "@/store/external-tools";
import { BusinessError } from "@/store/types/commons";
import {
	AUTH_MODULE_KEY,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import {
	businessErrorFactory,
	externalToolDisplayDataFactory,
	toolLaunchRequestResponseFactory,
} from "@@/tests/test-utils/factory";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { flushPromises, mount, MountingOptions } from "@vue/test-utils";
import { AxiosError } from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import * as routerComposables from "vue-router";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";

describe("RoomExternalToolsSection", () => {
	let router: DeepMocked<typeof VueRouter>;

	const getWrapper = (
		props: {
			tools: ExternalToolDisplayData[];
			roomId: string;
		},
		externalToolsModuleMock = createModuleMocks(ExternalToolsModule)
	) => {
		document.body.setAttribute("data-app", "true");

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule
		);

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
			getUserRoles: ["teacher"],
		});

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getCtlContextConfigurationEnabled: true,
		});

		router = createMock<typeof VueRouter>();
		jest.spyOn(routerComposables, "useRouter").mockReturnValue(router);

		const wrapper: Wrapper<any> = mount(
			RoomExternalToolsSection as MountingOptions<Vue>,
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
					[EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: externalToolsModuleMock,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			}
		);

		return {
			wrapper,
			contextExternalToolsModule,
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
					contextType: ToolContextType.Course,
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
		describe("when the tool has missing auto parameters and loading requestData throw an error", () => {
			const setup = async () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ToolConfigurationStatus.Latest,
					});

				const error: BusinessError = businessErrorFactory.build({
					error: new AxiosError("this error is expected"),
					message: "MISSING_TOOL_PARAMETER_VALUE some value is missing",
				});

				const externalToolsModule = createModuleMocks(ExternalToolsModule);
				externalToolsModule.loadToolLaunchData.mockRejectedValueOnce(error);

				const { wrapper } = getWrapper(
					{ tools: [tool], roomId: "roomId" },
					externalToolsModule
				);

				await flushPromises();

				return {
					wrapper,
					tool,
				};
			};

			it("should open up the error dialog", async () => {
				const { wrapper } = await setup();

				const card = wrapper.findComponent({
					name: "room-external-tool-card",
				});

				await card.trigger("click");

				const dialog = wrapper.find('[data-testId="error-dialog"]');
				expect(dialog.exists()).toBeTruthy();
				expect(wrapper.vm.isErrorDialogOpen).toBeTruthy();
			});
		});

		describe("when the tool is launchable", () => {
			const setup = async () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ToolConfigurationStatus.Latest,
					});

				const externalToolsModule = createModuleMocks(ExternalToolsModule);
				externalToolsModule.loadToolLaunchData.mockResolvedValue(
					toolLaunchRequestResponseFactory.build()
				);

				const { wrapper } = getWrapper(
					{
						tools: [tool],
						roomId: "roomId",
					},
					externalToolsModule
				);

				await flushPromises();

				return {
					wrapper,
				};
			};

			it("should not open up the error dialog", async () => {
				const { wrapper } = await setup();

				const card = wrapper.findComponent({
					name: "room-external-tool-card",
				});

				await card.trigger("click");

				wrapper.find('[data-testId="error-dialog"]');

				expect(wrapper.vm.isErrorDialogOpen).toBeFalsy();
			});
		});

		describe("and tool is not launchable because it is outdated", () => {
			const setup = async () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ToolConfigurationStatus.Outdated,
					});

				const externalToolsModule = createModuleMocks(ExternalToolsModule);
				externalToolsModule.loadToolLaunchData.mockResolvedValueOnce(
					toolLaunchRequestResponseFactory.build()
				);

				const { wrapper } = getWrapper(
					{
						tools: [tool],
						roomId: "roomId",
					},
					externalToolsModule
				);

				await flushPromises();

				return {
					wrapper,
				};
			};

			it("should open up the error dialog", async () => {
				const { wrapper } = await setup();

				const card = wrapper.findComponent({
					name: "room-external-tool-card",
				});

				await card.trigger("click");

				const dialog = wrapper.find('[data-testId="error-dialog"]');

				expect(dialog.exists()).toBeTruthy();
				expect(wrapper.vm.isErrorDialogOpen).toBeTruthy();
			});
		});
	});
});
