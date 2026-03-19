import RoomExternalToolsErrorDialog from "./RoomExternalToolsErrorDialog.vue";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import {
	contextExternalToolConfigurationStatusFactory,
	createTestAppStore,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission, RoleName, ToolContextType } from "@api-server";
import { ExternalToolDisplayData } from "@data-external-tool";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount, MountingOptions } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";
import { useRouter } from "vue-router";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("vue-router");
const useRouterMock = vi.mocked(useRouter);

describe("RoomExternalToolsSection", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAppStore({
			me: {
				roles: [{ id: "teacher-id", name: RoleName.TEACHER }],
				permissions: [Permission.CONTEXT_TOOL_ADMIN],
			},
		});
	});

	const getWrapper = (props: { tools: ExternalToolDisplayData[]; roomId: string }) => {
		const wrapper = mount(RoomExternalToolsSection as MountingOptions<typeof RoomExternalToolsSection>, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					RoomExternalToolCard: true,
					RoomExternalToolsErrorDialog: true,
				},
			},
			props: {
				...props,
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when there are tools in the list", () => {
		const setup = () => {
			const tools: ExternalToolDisplayData[] = externalToolDisplayDataFactory.buildList(2);

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
			const tool: ExternalToolDisplayData = externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper({ tools: [tool], roomId: "roomId" });

			return {
				wrapper,
				tool,
			};
		};

		it("should emit delete event when deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(true);
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("delete", tool);
			await flushPromises();

			expect(confirmDialogUtils.askDeletion).toHaveBeenCalledWith(
				"pages.rooms.tools.deleteDialog.title",
				"pages.rooms.tools.deleteDialog.content",
				"warning",
				"common.actions.remove"
			);
			expect(wrapper.emitted("delete")).toEqual([[tool]]);
		});

		it("should not emit delete event when deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(false);
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("delete", tool);
			await flushPromises();

			expect(wrapper.emitted("delete")).toBeUndefined();
		});
	});

	describe("when clicking the edit button on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData = externalToolDisplayDataFactory.build();

			const roomId = "roomId";

			const { router } = injectRouterMock(createRouterMock());
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
					contextType: ToolContextType.COURSE,
				},
			});
		});
	});

	describe("when a card reports an error", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData = externalToolDisplayDataFactory.build({
				status: contextExternalToolConfigurationStatusFactory.build(),
			});

			const { wrapper } = getWrapper({ tools: [tool], roomId: "roomId" });

			return {
				wrapper,
				tool,
			};
		};

		it("should open up the error dialog", async () => {
			const { wrapper, tool } = setup();

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
