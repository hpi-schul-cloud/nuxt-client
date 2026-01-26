import EditSettingsDialog from "./EditSettingsDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { Dialog, DialogBtnCancel, DialogBtnConfirm } from "@ui-dialog";
import { setActivePinia } from "pinia";
import { VCard, VRadioGroup } from "vuetify/components";

describe("EditSettingsDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (options?: { modelValue?: boolean; isDraftMode?: boolean; isEditableSelected?: boolean }) => {
		const wrapper = mount(EditSettingsDialog, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			props: {
				modelValue: true,
				isDraftMode: false,
				isEditableSelected: false,
				...options,
			},
		});

		return { wrapper };
	};

	describe("rendering", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(EditSettingsDialog).exists()).toBe(true);

			const cardComponent = wrapper.findComponent(VCard);
			const dialogTitle = cardComponent.find(".dialog-title");

			expect(dialogTitle.text()).toBe("components.board.menu.editing.settings.title");
		});

		describe("when isDraftMode is false", () => {
			it("should not render the draft mode alert", () => {
				const { wrapper } = setup({ isDraftMode: false });
				const alertComponent = wrapper.findComponent(WarningAlert);
				expect(alertComponent.exists()).toBe(false);
			});

			it("should render the VRadioGroup component", () => {
				const { wrapper } = setup({ isDraftMode: false });
				const radioGroupComponent = wrapper.findComponent(VRadioGroup);
				expect(radioGroupComponent.exists()).toBe(true);
			});

			it("should render the dialog text", () => {
				const { wrapper } = setup({ isDraftMode: false });
				const cardComponent = wrapper.findComponent(VCard);
				const dialogText = cardComponent.find('[data-testid="edit-settings-subtitle"]');

				expect(dialogText.text()).toBe("components.board.dialog.readerCanEdit.subtitle");
			});

			it.each(["edit-settings-option-1", "edit-settings-option-2"])(
				"should render the radio option with %s",
				(dataTestid) => {
					const { wrapper } = setup({ isDraftMode: false });
					const radioGroup = wrapper.findComponent(VRadioGroup);
					const option = radioGroup.find(`[data-testid="${dataTestid}"]`);

					expect(option.exists()).toBe(true);
				}
			);
		});

		describe("when isDraftMode is true", () => {
			it("should render the draft mode alert", () => {
				const { wrapper } = setup({ isDraftMode: true });
				const alertComponent = wrapper.findComponent(WarningAlert);
				expect(alertComponent.exists()).toBe(true);

				const alertText = alertComponent.find(".alert-text");
				expect(alertText.text()).toBe("components.board.dialog.readerCanEdit.alert.text");
			});

			it("should not render the VRadioGroup component", () => {
				const { wrapper } = setup({ isDraftMode: true });
				const radioGroupComponent = wrapper.findComponent(VRadioGroup);
				expect(radioGroupComponent.exists()).toBe(false);
			});

			it("should not render the dialog text", () => {
				const { wrapper } = setup({ isDraftMode: true });
				const cardComponent = wrapper.findComponent(VCard);
				const dialogText = cardComponent.find('[data-testid="edit-settings-subtitle"]');

				expect(dialogText.exists()).toBe(false);
			});

			it("should render only the cancel button", () => {
				const { wrapper } = setup({ isDraftMode: true });
				const cancelButton = wrapper.findComponent(DialogBtnCancel);
				const saveButton = wrapper.findComponent(DialogBtnConfirm);

				expect(cancelButton.exists()).toBe(true);
				expect(saveButton.exists()).toBe(false);
			});
		});

		describe("when isEditableSelected prop is true", () => {
			it("should have the second radio option selected by default", () => {
				const { wrapper } = setup({
					isDraftMode: false,
					isEditableSelected: true,
				});

				const radioGroupComponent = wrapper.findComponent(VRadioGroup);
				expect(radioGroupComponent.exists()).toBe(true);
				expect(radioGroupComponent.props("modelValue")).toStrictEqual("editable");
			});
		});
	});

	describe("@emits", () => {
		describe("when modelValue is changed and the dialog options are submitted", () => {
			it("should emit 'save' with the selected option", async () => {
				const { wrapper } = setup({ isEditableSelected: true });
				const dialog = wrapper.findComponent(Dialog);
				const radioGroupComponent = wrapper.findComponent(VRadioGroup);
				radioGroupComponent.vm.$emit("update:modelValue", "notEditable");

				dialog.vm.$emit("confirm");

				expect(wrapper.emitted()).toHaveProperty("save");
				expect(wrapper.emitted("save")?.[0]).toEqual([false]);
			});
		});

		describe("when modelValue is not changed and the dialog options are submitted", () => {
			it("should not emit 'save'", async () => {
				const { wrapper } = setup({ isEditableSelected: true });
				const dialog = wrapper.findComponent(Dialog);
				dialog.vm.$emit("confirm");

				expect(wrapper.emitted("save")).toBeUndefined();
			});
		});
	});
});
