import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { AxiosError } from "axios";
import Vue from "vue";
import {
	AUTH_MODULE,
	CONTEXT_EXTERNAL_TOOLS_MODULE,
	EXTERNAL_TOOLS_MODULE,
	I18N_KEY,
} from "@/utils/inject";
import {
	businessErrorFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import { ExternalToolDisplayData } from "@/store/external-tool";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import ExternalToolsModule from "@/store/external-tools";
import { BusinessError } from "@/store/types/commons";
import { createModuleMocks } from "@/utils/mock-store-module";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";

describe("RoomExternalToolsSection", () => {
	const getWrapper = (
		props: { tools: ExternalToolDisplayData[] },
		externalToolsModuleGetter?: Partial<ExternalToolsModule>
	) => {
		document.body.setAttribute("data-app", "true");

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule
		);
		const externalToolsModule = createModuleMocks(ExternalToolsModule, {
			...externalToolsModuleGetter,
		});
		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
		});

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
					[CONTEXT_EXTERNAL_TOOLS_MODULE.valueOf()]: contextExternalToolsModule,
					[EXTERNAL_TOOLS_MODULE.valueOf()]: externalToolsModule,
					[AUTH_MODULE.valueOf()]: authModule,
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

			const { wrapper } = getWrapper({ tools });

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

			const { wrapper } = getWrapper({ tools: [tool] });

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

	describe("when clicking on confirm button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, contextExternalToolsModule } = getWrapper({
				tools: [tool],
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
			).toHaveBeenCalledWith(tool.id);
			expect(deleteDialog.element.childNodes.length).toEqual(0);
		});
	});

	describe("when clicking on cancel button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, contextExternalToolsModule } = getWrapper({
				tools: [tool],
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

			const { wrapper, externalToolsModule } = getWrapper({ tools: [tool] });

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
				tool.id
			);
		});
	});

	describe("when click on a outdated tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const error: BusinessError = businessErrorFactory.build({
				error: new AxiosError("this error is expected"),
			});

			const { wrapper } = getWrapper(
				{ tools: [tool] },
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

			const { wrapper } = getWrapper({ tools: [tool] });

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
