import { ToolContextType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool";
import {
	AUTH_MODULE_KEY,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	ContextExternalToolConfigurationStatusFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import { createMock } from "@golevelup/ts-jest";
import { mount, MountingOptions } from "@vue/test-utils";
import { nextTick } from "vue";
import { Router, useRouter } from "vue-router";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

jest.mock("vue-router", () => ({
	useRoute: jest.fn(),
	useRouter: jest.fn(),
}));
const useRouterMock = <jest.Mock>useRouter;

describe("RoomExternalToolsSection", () => {
	const getWrapper = (props: {
		tools: ExternalToolDisplayData[];
		roomId: string;
	}) => {
		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule
		);

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
			getUserRoles: ["teacher"],
		});

		const wrapper = mount(
			RoomExternalToolsSection as MountingOptions<
				typeof RoomExternalToolsSection
			>,
			{
				global: {
					plugins: [
						createTestingVuetify(),
						createTestingI18n(),
						vueDompurifyHTMLPlugin,
					],
					provide: {
						[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
							contextExternalToolsModule,
						[AUTH_MODULE_KEY.valueOf()]: authModule,
					},
				},
				props: {
					...props,
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

			const deleteDialog = wrapper.getComponent({ name: "v-dialog" });

			expect(deleteDialog.element.childNodes.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe("when clicking the edit button on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const roomId = "roomId";

			const router = createMock<Router>();
			useRouterMock.mockReturnValue(router);

			const { wrapper } = getWrapper({ tools: [tool], roomId });

			return {
				wrapper,
				router,
				roomId,
				tool,
			};
		};

		it("should redirect to the edit page", async () => {
			const { wrapper, router, tool, roomId } = setup();

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

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.findComponent({ name: "v-dialog" });

			const confirmBtn = wrapper.findComponent(
				'[data-testId="dialog-confirm"]'
			);

			await confirmBtn.trigger("click");

			expect(
				contextExternalToolsModule.deleteContextExternalTool
			).toHaveBeenCalledWith(tool.contextExternalToolId);
			expect(deleteDialog.exists()).toBe(false);
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

			const deleteDialog = wrapper.findComponent({ name: "v-dialog" });

			const cancelBtn = wrapper.findComponent('[data-testId="dialog-cancel"]');
			await cancelBtn.trigger("click");

			expect(
				contextExternalToolsModule.deleteContextExternalTool
			).not.toHaveBeenCalled();
			expect(deleteDialog.exists()).toBe(false);
		});
	});

	describe("when a card reports an error", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build({
					status: ContextExternalToolConfigurationStatusFactory.build(),
				});

			const { wrapper } = getWrapper({ tools: [tool], roomId: "roomId" });

			return {
				wrapper,
				tool,
			};
		};

		it("should open up the error dialog", async () => {
			const { wrapper, tool } = await setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			card.vm.$emit("error", tool);
			await nextTick();

			const dialog = wrapper.findComponent({ name: "v-dialog" });
			expect(dialog.exists()).toBe(true);
			expect(dialog.props("modelValue")).toEqual(true);
		});
	});
});
