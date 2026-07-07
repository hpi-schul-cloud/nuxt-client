import ImportColumnDialog from "./ImportColumnDialog.vue";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VForm, VSelect } from "vuetify/components";

vi.mock("@data-room");

const mockRooms = [
	roomItemFactory.build({ allowedOperations: { editContent: true } }),
	roomItemFactory.build({ allowedOperations: { editContent: true } }),
	roomItemFactory.build({ allowedOperations: { editContent: false } }),
];

describe("ImportColumnDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());
	});

	const setup = (rooms = mockRooms) => {
		const shareTokenInfo: ShareTokenInfoResponse = {
			token: "token-123",
			parentType: ShareTokenInfoResponseParentType.COLUMN,
			parentName: "My Section",
		};

		const wrapper = mount(ImportColumnDialog, {
			props: {
				shareTokenInfo,
				availableDestinations: rooms.map((room) => ({ id: room.id, name: room.name })),
				modelValue: true,
			},
			global: {
				stubs: { UseFocusTrap: true },
				provide: {},
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, shareTokenInfo };
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

	it("should emit confirm event with correct payload when board is selected", async () => {
		const { wrapper, shareTokenInfo } = setup();

		const boardSelect = wrapper.findAllComponents(VSelect)[1];
		await boardSelect.vm.$emit("update:modelValue", "board-123");
		await nextTick();

		const dialog = wrapper.findComponent(SvsDialog);
		dialog.vm.$emit("confirm");

		expect(wrapper.emitted("complete")).toEqual([
			[
				{
					newName: shareTokenInfo.parentName,
					destinations: [
						{
							type: "board",
							id: "board-123",
						},
					],
				},
			],
		]);
	});

	it("should disable confirm button when no board is selected", () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("should enable confirm button when a board is selected", async () => {
		const { wrapper } = setup();

		const boardSelect = wrapper.findAllComponents(VSelect)[1];
		await boardSelect.vm.$emit("update:modelValue", "board-456");
		await nextTick();

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(false);
	});

	it("should emit cancel when dialog is cancelled", () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent(SvsDialog);
		dialog.vm.$emit("cancel");
		expect(wrapper.emitted("cancel")).toBeDefined();
	});
});
