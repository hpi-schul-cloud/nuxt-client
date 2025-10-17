import RoomCopyInfoDialog from "./RoomCopyInfoDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@feature-room/RoomCopyInfoDialog", () => {
	const setup = () => {
		const wrapper = mount(RoomCopyInfoDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true }, // unfortuantely it is not as straightward to test the focus trap
				renderStubDefaultSlot: true,
			},
		});

		const dialog = wrapper.findComponent({ name: "v-card" });

		return { wrapper, dialog };
	};

	it("should render component with correct text", async () => {
		const { dialog } = setup();

		expect(dialog.exists()).toBe(true);
		expect(dialog.text()).toContain("feature-room.CopyInfoDialog.title");
		expect(dialog.text()).toContain("feature-room.CopyInfoDialog.text.alert.membersPermissions");
	});

	describe("when clicking the cancel button", () => {
		it("should emit cancel event", async () => {
			const { dialog, wrapper } = setup();

			const cancelButton = dialog.findComponent('[data-testid="copy-info-dialog-cancel"]');
			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("copy:cancel");
		});
	});

	describe("when clicking the confirm button", () => {
		it("should emit confirm event", async () => {
			const { dialog, wrapper } = setup();

			const cancelButton = dialog.findComponent('[data-testid="copy-info-dialog-confirm"]');
			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("copy:confirm");
		});
	});
});
