import ImportCardDialog from "./ImportCardDialog.vue";
import { mockApiResponse, mockedPiniaStoreTyping, roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { useNotificationStore } from "@data-app";
import { useRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";
import { VForm } from "vuetify/components";

const mockRooms = [
	roomItemFactory.build({ allowedOperations: { editContent: true } }),
	roomItemFactory.build({ allowedOperations: { editContent: true } }),
	roomItemFactory.build({ allowedOperations: { editContent: false } }),
];

describe("ImportCardDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());
	});

	const setup = (rooms = mockRooms) => {
		const roomStore = mockedPiniaStoreTyping(useRoomStore);
		const shareTokenInfo: ShareTokenInfoResponse = {
			token: "token-123",
			parentType: ShareTokenInfoResponseParentType.ROOM,
			parentName: "Room 1",
		};
		roomStore.fetchRoomsPlain.mockResolvedValue(mockApiResponse({ data: { data: rooms } }));

		const wrapper = mount(ImportCardDialog, {
			props: {
				shareTokenInfo,
				availableDestinations: rooms.map((room) => ({ id: room.id, name: room.name })),
				destinationType: "column",
				isDialogOpen: true,
			},
			global: {
				stubs: { UseFocusTrap: true },
				provide: {},
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

	it("should notify about the success of the import action.", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const dialog = wrapper.findComponent(SvsDialog);
		dialog.vm.$emit("confirm");
		await flushPromises();
		expect(useNotificationStore().notify).toHaveBeenCalled();
		expect(getRouter().push).toHaveBeenCalled();
	});
});
