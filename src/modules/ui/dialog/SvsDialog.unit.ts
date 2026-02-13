import SvsDialog from "./SvsDialog.vue";
import SvsDialogBtnCancel from "./SvsDialogBtnCancel.vue";
import SvsDialogBtnConfirm from "./SvsDialogBtnConfirm.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VCard, VCardTitle, VDialog } from "vuetify/components";

describe("SvsDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (
		props: {
			isOpen?: boolean;
			noCancel?: boolean;
			noConfirm?: boolean;
			noActions?: boolean;
			isOpenStateManagedExternally?: boolean;
		} = {}
	) => {
		const title = "title of dialog";
		const slotContent = "<div>content</div>";
		const confirmBtnLangKey = "language.key";

		const wrapper = mount(SvsDialog, {
			props: {
				modelValue: props.isOpen ?? true,
				title,
				confirmBtnLangKey,
				noActions: props.noActions ?? false,
				noConfirm: props.noConfirm ?? false,
				noCancel: props.noCancel ?? false,
				isOpenStateManagedExternally: props.isOpenStateManagedExternally ?? false,
			},
			slots: {
				content: slotContent,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
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

		it("should close dialog when confirm button is clicked", async () => {
			const { wrapper, dialog } = setup();
			wrapper.findComponent(SvsDialogBtnConfirm).vm.$emit("click");
			await nextTick();
			expect(dialog.props().modelValue).toBe(false);
		});

		it("should close dialog when cancel button is clicked", async () => {
			const { wrapper, dialog } = setup();
			wrapper.findComponent(SvsDialogBtnCancel).vm.$emit("click");
			await nextTick();
			expect(dialog.props().modelValue).toBe(false);
		});

		it("should not render cancel button, when no-cancel prop is true", () => {
			const { wrapper } = setup({ noCancel: true, noConfirm: false });
			expect(wrapper.findComponent(SvsDialogBtnCancel).exists()).toBe(false);
			expect(wrapper.findComponent(SvsDialogBtnConfirm).exists()).toBe(true);
		});

		it("should not render confirm button, when no-confirm prop is true", () => {
			const { wrapper } = setup({ noCancel: true, noConfirm: false });
			expect(wrapper.findComponent(SvsDialogBtnCancel).exists()).toBe(false);
			expect(wrapper.findComponent(SvsDialogBtnConfirm).exists()).toBe(true);
		});

		it("should neither render confirm and cancel button when no-action prop is true", () => {
			const { wrapper } = setup({ noActions: true });
			expect(wrapper.findComponent(SvsDialogBtnCancel).exists()).toBe(false);
			expect(wrapper.findComponent(SvsDialogBtnConfirm).exists()).toBe(false);
		});

		describe("when cancel button is clicked", () => {
			it("should emit cancel", async () => {
				const { wrapper, card } = setup();
				const cancelButton = card.find('[data-testid="dialog-cancel"]');
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toHaveLength(1);
			});

			it("should not close dialog when open state is managed externally", async () => {
				const { card, dialog } = setup({ isOpenStateManagedExternally: true });
				const cancelButton = card.find('[data-testid="dialog-cancel"]');
				await cancelButton.trigger("click");

				expect(dialog.props().modelValue).toBe(true);
			});
		});

		describe("when confirm button is clicked", () => {
			it("should emit confirm", async () => {
				const { wrapper, card } = setup();
				const confirmButton = card.find('[data-testid="dialog-confirm"]');
				await confirmButton.trigger("click");

				expect(wrapper.emitted("confirm")).toHaveLength(1);
			});

			it("should not close dialog when open state is managed externally", async () => {
				const { card, dialog } = setup({ isOpenStateManagedExternally: true });
				const confirmButton = card.find('[data-testid="dialog-confirm"]');
				await confirmButton.trigger("click");

				expect(dialog.props().modelValue).toBe(true);
			});
		});

		describe("when the dialog has finished transition out", () => {
			it("should emit after-leave", () => {
				const { wrapper, dialog } = setup();

				dialog.vm.$emit("after-leave");
				expect(wrapper.emitted("after-leave")).toHaveLength(1);
			});
		});
	});

	describe("when the dialog is closed", () => {
		it("should not render card", () => {
			const { card } = setup({ isOpen: false });
			expect(card.exists()).toBe(false);
		});
	});

	describe("v-model functionality", () => {
		it("should handle model value updates from VDialog", async () => {
			const { wrapper, dialog } = setup();

			dialog.vm.$emit("update:modelValue", false);
			await nextTick();

			expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
			expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
		});

		it("should handle external model value changes", async () => {
			const { wrapper } = setup({ isOpen: false });

			await wrapper.setProps({ modelValue: true });

			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("modelValue")).toBe(true);
		});
	});

	describe("dialog events", () => {
		it("should emit cancel when clicking outside", () => {
			const { wrapper, dialog } = setup();

			dialog.vm.$emit("click:outside");

			expect(wrapper.emitted("cancel")).toHaveLength(1);
		});

		it("should emit cancel on escape keydown", async () => {
			const { wrapper } = setup();

			document.dispatchEvent(
				new KeyboardEvent("keydown", {
					key: "Escape",
					keyCode: 27,
					bubbles: true,
				})
			);
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("cancel")).toBeTruthy();
		});
	});
});
