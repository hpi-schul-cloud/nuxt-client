import SCDialog from "./SCDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCard, VCardTitle, VDialog } from "vuetify/components";

describe("Dialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (isOpened = true) => {
		const title = "title of dialog";
		const slotContent = "<div>content</div>";
		const confirmBtnLangKey = "language.key";

		const wrapper = mount(SCDialog, {
			props: {
				modelValue: isOpened,
				title,
				confirmBtnLangKey,
			},
			slots: {
				content: slotContent,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
				renderStubDefaultSlot: true, // to access content inside focus trap
			},
		});
		const dialog = wrapper.findComponent(VDialog);
		const card = dialog.findComponent(VCard);

		return { wrapper, title, dialog, card };
	};

	describe("when the dialog is opened", () => {
		it("should render title", () => {
			const { title, dialog } = setup();
			expect(dialog.findComponent(VCardTitle).text()).toContain(title);
		});

		describe("when cancel button is clicked", () => {
			it("should emit cancel", async () => {
				const { wrapper, card } = setup();
				const cancelButton = card.find('[data-testid="dialog-cancel"]');
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toHaveLength(1);
			});
		});

		describe("when confirm button is clicked", () => {
			it("should emit confirm", async () => {
				const { wrapper, card } = setup();
				const confirmButton = card.find('[data-testid="dialog-confirm"]');
				await confirmButton.trigger("click");

				expect(wrapper.emitted("confirm")).toHaveLength(1);
			});
		});

		describe("when the dialog has finished transition out", () => {
			it("should emit after-leave", () => {
				const { wrapper } = setup();

				wrapper.vm.$emit("after-leave");
				expect(wrapper.emitted("after-leave")).toHaveLength(1);
			});
		});
	});

	describe("when the dialog is closed", () => {
		it("should not render card", () => {
			const { card } = setup(false);
			expect(card.exists()).toBe(false);
		});
	});
});
