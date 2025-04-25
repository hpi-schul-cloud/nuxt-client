import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { DuplicationInfoDialog } from "@feature-room";

describe("@feature-room/DuplicationInfoDialog", () => {
	const setup = () => {
		const wrapper = mount(DuplicationInfoDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: true,
			},
		});

		const dialog = wrapper.findComponent({ name: "v-card" });

		return { wrapper, dialog };
	};

	it("should render component with correct text", async () => {
		const { dialog } = setup();

		expect(dialog.exists()).toBe(true);
		expect(dialog.text()).toContain("feature-room.DuplicationInfoDialog.title");
		expect(dialog.text()).toContain(
			"feature-room.DuplicationInfoDialog.text.alert.membersPermissions"
		);
	});

	describe("when clicking the cancel button", () => {
		it("should emit cancel event", async () => {
			const { dialog, wrapper } = setup();

			const cancelButton = dialog.findComponent(
				'[data-testid="duplication-info-dialog-cancel"]'
			);
			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("duplication:cancel");
		});
	});

	describe("when clicking the confirm button", () => {
		it("should emit confirm event", async () => {
			const { dialog, wrapper } = setup();

			const cancelButton = dialog.findComponent(
				'[data-testid="duplication-info-dialog-confirm"]'
			);
			await cancelButton.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("duplication:confirm");
		});
	});
});
