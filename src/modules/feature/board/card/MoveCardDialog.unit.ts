import { useCardDialogData } from "./card-dialog-composable";
import MoveCardDialog from "./MoveCardDialog.vue";
import { cardResponseFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCardStore } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";
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
	rooms: ref([]),
};

vi.mock("./card-dialog-composable", () => ({
	useCardDialogData: () => mockCardDialogData,
}));

describe("MoveCardDialog", () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());
	});

	const setup = (props = {}) =>
		mount(MoveCardDialog, {
			props: {
				cardId: "card-123",
				isDialogOpen: true,
				...props,
			},
			global: {
				stubs: { UseFocusTrap: true },
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("should render the dialog with form", () => {
		wrapper = setup();

		expect(wrapper.findComponent(VForm).exists()).toBe(true);
	});

	it("should show warning when no rooms available", async () => {
		mockCardDialogData.rooms.value = [];
		wrapper = setup();
		expect(wrapper.findComponent(WarningAlert).exists()).toBe(true);
	});

	it("should inlcude card name in move question", async () => {
		const cardStore = mockedPiniaStoreTyping(useCardStore);
		cardStore.getCard.mockReturnValue(cardResponseFactory.build({ title: "Important card" }));
		wrapper = setup();
		expect(wrapper.find('[data-testid="admin-class-table"]').text()).toContain("Important card");
	});
});
