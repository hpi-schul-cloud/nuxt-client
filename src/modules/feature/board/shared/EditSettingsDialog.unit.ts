import EditSettingsDialog from "./EditSettingsDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { WarningAlert } from "@ui-alert";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap.mjs";
import { Mock } from "vitest";
import { VCard, VDialog, VRadioGroup } from "vuetify/components";

vi.mock("@vueuse/integrations/useFocusTrap", () => ({
	useFocusTrap: vi.fn(),
}));

describe("EditSettingsDialog", () => {
	let deactivateMock: Mock;

	beforeEach(() => {
		deactivateMock = vi.fn();
		(useFocusTrap as Mock).mockReturnValue({
			deactivate: deactivateMock,
		});
	});

	const setup = (options?: { modelValue?: boolean; isDraftMode?: boolean; isEditableSelected?: boolean }) => {
		const { modelValue, isDraftMode, isEditableSelected } = {
			modelValue: true,
			isDraftMode: false,
			isEditableSelected: false,
			...options,
		};

		const wrapper = mount(EditSettingsDialog, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			props: {
				modelValue,
				isDraftMode,
				isEditableSelected,
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

		describe("responsive dialog", () => {
			describe("when window width is greater than 480px", () => {
				it("should set width prop to 480", () => {
					Object.defineProperty(window, "innerWidth", {
						writable: true,
						configurable: true,
						value: 1000,
					});
					const { wrapper } = setup();
					const dialogComponent = wrapper.findComponent(VDialog);
					expect(dialogComponent.exists()).toBe(true);
					expect(dialogComponent.props("modelValue")).toBe(true);

					expect(dialogComponent.props("width")).toBe(480);
				});
			});
			describe("when window width is less than or equal to 480px", () => {
				it("should set width prop to auto", () => {
					Object.defineProperty(window, "innerWidth", {
						writable: true,
						configurable: true,
						value: 400,
					});
					const { wrapper } = setup();
					const dialogComponent = wrapper.findComponent(VDialog);
					expect(dialogComponent.exists()).toBe(true);
					expect(dialogComponent.props("modelValue")).toBe(true);

					expect(dialogComponent.props("width")).toBe("auto");
				});
			});
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
					const cardComponent = wrapper.findComponent(VCard);
					const option = cardComponent.find(`[data-testid="${dataTestid}"]`);

					expect(option.exists()).toBe(true);
				}
			);

			it("should render the cancel and save buttons", () => {
				const { wrapper } = setup({ isDraftMode: false });
				const cardComponent = wrapper.findComponent(VCard);
				const cancelButton = cardComponent.find('[data-testid="edit-settings-cancel-btn"]');
				const saveButton = cardComponent.find('[data-testid="edit-settings-save-btn"]');

				expect(cancelButton.exists()).toBe(true);
				expect(saveButton.exists()).toBe(true);
			});
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
				const cardComponent = wrapper.findComponent(VCard);
				const cancelButton = cardComponent.find('[data-testid="edit-settings-cancel-btn"]');
				const saveButton = cardComponent.find('[data-testid="edit-settings-save-btn"]');

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

	describe("focus trap", () => {
		it("should deactivate the focus trap when the dialog is closed", async () => {
			const { wrapper } = setup({ modelValue: true });

			await wrapper.setProps({ modelValue: false });
			expect(deactivateMock).toHaveBeenCalled();
		});
	});

	describe("@emits", () => {
		it("should emit 'close' when the cancel button is clicked", async () => {
			const { wrapper } = setup();
			const cardComponent = wrapper.findComponent(VCard);
			const cancelButton = cardComponent.find('[data-testid="edit-settings-cancel-btn"]');

			await cancelButton.trigger("click");
			expect(wrapper.emitted()).toHaveProperty("close");
		});

		describe("when modelValue is changed and the save button is clicked", () => {
			it("should emit 'save' with the selected option ", async () => {
				const { wrapper } = setup({ isEditableSelected: true });
				const cardComponent = wrapper.findComponent(VCard);
				const saveButton = cardComponent.find('[data-testid="edit-settings-save-btn"]');
				const radioGroupComponent = cardComponent.findComponent(VRadioGroup);
				radioGroupComponent.vm.$emit("update:modelValue", "notEditable");

				await saveButton.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("save");
				expect(wrapper.emitted("save")?.[0]).toEqual([false]);
			});
		});

		describe("when modelValue is not changed and the save button is clicked", () => {
			it("should not emit 'save'", async () => {
				const { wrapper } = setup({ isEditableSelected: true });
				const cardComponent = wrapper.findComponent(VCard);
				const saveButton = cardComponent.find('[data-testid="edit-settings-save-btn"]');

				await saveButton.trigger("click");
				expect(wrapper.emitted("save")).toBeUndefined();
			});
		});
	});
});
