import { ToolContextType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	contextExternalToolConfigurationStatusFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ExternalToolDisplayData } from "@data-external-tool";
import { createMock } from "@golevelup/ts-vitest";
import { mount, MountingOptions } from "@vue/test-utils";
import { nextTick } from "vue";
import { Router, useRouter } from "vue-router";
import RoomExternalToolsErrorDialog from "./RoomExternalToolsErrorDialog.vue";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import { Mock } from "vitest";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));
const useRouterMock = <Mock>useRouter;

describe("RoomExternalToolsSection", () => {
	const getWrapper = (props: {
		tools: ExternalToolDisplayData[];
		roomId: string;
	}) => {
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
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[AUTH_MODULE_KEY.valueOf()]: authModule,
					},
					stubs: {
						RoomExternalToolCard: true,
						RoomExternalToolsErrorDialog: true,
					},
				},
				props: {
					...props,
				},
			}
		);

		return {
			wrapper,
			authModule,
		};
	};

	afterEach(() => {
		vi.clearAllMocks();
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

			const { wrapper } = getWrapper({
				tools: [tool],
				roomId: "roomId",
			});

			return {
				tool,
				wrapper,
			};
		};

		it("should call delete function of store", async () => {
			const { wrapper, tool } = await setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("delete", tool);

			const confirmBtn = wrapper.findComponent(
				'[data-testId="dialog-confirm"]'
			);

			await confirmBtn.trigger("click");

			expect(wrapper.emitted("delete")).toEqual([[tool]]);
		});
	});

	describe("when clicking on cancel button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper({
				tools: [tool],
				roomId: "roomId",
			});

			return {
				tool,
				wrapper,
			};
		};

		it("should close dialog", async () => {
			const { wrapper, tool } = await setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			await card.vm.$emit("delete", tool);

			const cancelBtn = wrapper.findComponent('[data-testId="dialog-cancel"]');
			await cancelBtn.trigger("click");

			expect(wrapper.emitted("delete")).toBeUndefined();
		});
	});

	describe("when a card reports an error", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build({
					status: contextExternalToolConfigurationStatusFactory.build(),
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

			const dialog = wrapper.findComponent(RoomExternalToolsErrorDialog);
			expect(dialog.exists()).toBe(true);
			expect(dialog.props("isOpen")).toEqual(true);
		});
	});
});
