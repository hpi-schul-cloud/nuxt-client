import { useCardDialogData } from "./card-dialog-composable";
import MoveCardDialog from "./MoveCardDialog.vue";
import { Permission } from "@/serverApi/v3";
import {
	columnResponseFactory,
	mockApiResponse,
	mockedPiniaStoreTyping,
	roomBoardGridItemFactory,
	roomItemFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useNotificationStore } from "@data-app";
import { useBoardStore } from "@data-board";
import { useRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { computed, nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VForm } from "vuetify/components";

const mockCardDialogData: ReturnType<typeof useCardDialogData> = {
	selectedBoardId: ref(),
	selectedColumnId: ref(),
	selectedRoomId: ref(),
	resetBoardSelection: vi.fn(),
	columns: ref([]),
	boards: ref([]),
	selectedColumn: computed(() => columnResponseFactory.build()),
	selectedBoard: computed(() => roomBoardGridItemFactory.build()),
};

const mockRooms = [
	roomItemFactory.build({ permissions: [Permission.RoomEditContent] }),
	roomItemFactory.build({ permissions: [Permission.RoomEditContent] }),
	roomItemFactory.build({ permissions: [] }),
];

vi.mock("./card-dialog-composable", () => ({
	useCardDialogData: () => mockCardDialogData,
}));

describe("MoveCardDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());
	});

	const setup = (props = {}, rooms = mockRooms) => {
		const roomStore = mockedPiniaStoreTyping(useRoomStore);
		roomStore.fetchRoomsPlain.mockResolvedValue(mockApiResponse({ data: { data: rooms } }));

		const wrapper = mount(MoveCardDialog, {
			props: {
				cardId: "card-123",
				isDialogOpen: true,
				hasBoardManagePermission: true,
				...props,
			},
			global: {
				stubs: { UseFocusTrap: true },
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, roomStore };
	};

	it("should render the dialog with form", () => {
		const { wrapper } = setup();

		expect(wrapper.findComponent(VForm).exists()).toBe(true);
	});

	it("should show warning when no rooms available", async () => {
		const { wrapper } = setup(undefined, []);
		await nextTick();

		expect(wrapper.findComponent(WarningAlert).exists()).toBe(true);
	});

	it("should notify about the success of the move action.", async () => {
		const { wrapper } = setup();

		const dialog = wrapper.findComponent(Dialog);
		await dialog.vm.$emit("confirm");
		await flushPromises();
		expect(useBoardStore().moveCardToBoardRequest).toHaveBeenCalled();
		expect(useNotificationStore().notify).toHaveBeenCalled();
	});
});
