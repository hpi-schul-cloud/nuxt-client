import ImportCardDialog from "./ImportCardDialog.vue";
import { mockComposable, roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { useCardDialogData } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VForm } from "vuetify/components";

vi.mock("@data-board/card-dialog.composable");

const mockRooms = [
	roomItemFactory.build({ allowedOperations: { editContent: true } }),
	roomItemFactory.build({ allowedOperations: { editContent: true } }),
	roomItemFactory.build({ allowedOperations: { editContent: false } }),
];

describe("ImportCardDialog", () => {
	let useCardDialogDataMock: ReturnType<typeof useCardDialogData>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());
		useCardDialogDataMock = mockComposable(useCardDialogData, {
			boards: ref([]),
			columns: ref([]),
		});
		vi.mocked(useCardDialogData).mockReturnValue(useCardDialogDataMock);
	});

	const setup = (rooms = mockRooms) => {
		const shareTokenInfo: ShareTokenInfoResponse = {
			token: "token-123",
			parentType: ShareTokenInfoResponseParentType.ROOM,
			parentName: "Room 1",
		};

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
		return { wrapper };
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

	it("should emit confirm event with correct payload", async () => {
		const { wrapper } = setup();

		useCardDialogDataMock.selectedBoardId.value = "board-123";
		useCardDialogDataMock.selectedColumnId.value = "column-123";

		const dialog = wrapper.findComponent(SvsDialog);
		dialog.vm.$emit("confirm");

		expect(wrapper.emitted("confirm")).toEqual([
			[
				{
					newName: "Room 1",
					destination: {
						type: "column",
						id: "column-123",
						boardId: "board-123",
					},
				},
			],
		]);
	});
});
