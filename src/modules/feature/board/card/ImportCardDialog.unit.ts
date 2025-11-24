import { useCardDialogData } from "./card-dialog-composable";
import ImportCardDialog from "./ImportCardDialog.vue";
import { Permission, ShareTokenInfoResponseParentTypeEnum } from "@/serverApi/v3";
import CopyModule from "@/store/copy";
import { COPY_MODULE_KEY } from "@/utils/inject";
import { mockApiResponse, mockedPiniaStoreTyping, roomItemFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useNotificationStore } from "@data-app";
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
	selectedColumn: computed(() => undefined),
	selectedBoard: computed(() => undefined),
};

const mockRooms = [
	roomItemFactory.build({ permissions: [Permission.RoomEditContent] }),
	roomItemFactory.build({ permissions: [Permission.RoomEditContent] }),
	roomItemFactory.build({ permissions: [] }),
];

vi.mock("./card-dialog-composable", () => ({
	useCardDialogData: () => mockCardDialogData,
}));

let copyModuleMock: CopyModule;

describe("ImportCardDialog", () => {
	const router = createRouterMock();
	beforeEach(() => {
		setActivePinia(createTestingPinia());

		injectRouterMock(router);
	});

	const setup = (rooms = mockRooms) => {
		const roomStore = mockedPiniaStoreTyping(useRoomStore);
		const token = "abcde";
		roomStore.fetchRoomsPlain.mockResolvedValue(mockApiResponse({ data: { data: rooms } }));

		copyModuleMock = createModuleMocks(CopyModule);
		copyModuleMock.validateShareToken = () =>
			Promise.resolve({
				token,
				parentName: "parentName",
				parentType: ShareTokenInfoResponseParentTypeEnum.Card,
			});

		const wrapper = mount(ImportCardDialog, {
			props: {
				token,
				isDialogOpen: true,
			},
			global: {
				stubs: { UseFocusTrap: true },
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				},
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
		const { wrapper } = setup([]);
		await nextTick();

		expect(wrapper.findComponent(WarningAlert).exists()).toBe(true);
	});

	it("should notify about the success of the move action.", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const dialog = wrapper.findComponent(Dialog);
		await dialog.vm.$emit("confirm");
		await flushPromises();
		expect(useNotificationStore().notify).toHaveBeenCalled();
		expect(router.push).toHaveBeenCalled();
	});
});
