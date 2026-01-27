import RenameFileDialog from "./RenameFileDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { Dialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCard, VTextField } from "vuetify/components";

describe("RenameFileDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("when the dialog isDialogOpen is true", () => {
		const setup = () => {
			const entityName = "entity name";
			const name = "name of item";

			const wrapper = mount(RenameFileDialog, {
				props: {
					isDialogOpen: true,
					entityName,
					fileRecords: [],
					name,
				},
				global: {
					plugins: [
						createTestingVuetify(),
						createTestingI18n({
							messages: {
								en: {
									"ui.rename.dialog.title": "{entity}",
								},
							},
						}),
					],
				},
			});
			return { wrapper, entityName, name };
		};

		it("should render entity name with name", () => {
			const { wrapper, entityName } = setup();
			const card = wrapper.findComponent(Dialog).findComponent(VCard);

			expect(card.text()).toContain(entityName);
		});

		it("should render input with name", () => {
			const { wrapper, name } = setup();

			const input = wrapper.findComponent(Dialog).findComponent(VCard).find("input[type='text']");
			expect(input.exists()).toBe(true);
			expect(input.attributes("value")).toBe(name);
		});

		describe("when Dialog emits update:is-dialog-open", () => {
			it("should emit update:is-dialog-open", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(Dialog);

				await dialog.vm.$emit("update:modelValue", false);

				expect(wrapper.emitted("update:is-dialog-open")).toHaveLength(1);
				expect(wrapper.emitted("update:is-dialog-open")?.[0]).toEqual([false]);
			});
		});

		describe("when Dialog emits cancel", () => {
			it("should emit cancel", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(Dialog);
				dialog.vm.$emit("cancel");

				expect(wrapper.emitted("cancel")).toHaveLength(1);
			});
		});

		describe("when Dialog emits confirm", () => {
			it("should emit confirm", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(Dialog);

				const input = wrapper.findComponent(Dialog).findComponent(VCard).find("input[type='text']");
				await input.setValue("new name");
				await input.trigger("input");

				dialog.vm.$emit("confirm");

				expect(wrapper.emitted("confirm")).toHaveLength(1);
				expect(wrapper.emitted("confirm")?.[0]).toEqual(["new name"]);
			});
		});

		describe("when name is set to undefined after the dialog is opened", () => {
			it("should still show the latest valid name", async () => {
				const { name, wrapper } = setup();

				const input = wrapper.findComponent(Dialog).findComponent(VCard).find("input[type='text']");

				expect(input.exists()).toBe(true);
				expect(input.attributes("value")).toBe(name);

				await wrapper.setProps({ name: undefined });

				expect(input.exists()).toBe(true);
				expect(input.attributes("value")).toBe(name);
			});
		});
	});

	describe("when the dialog isDialogOpen is false", () => {
		const setup = () => {
			const wrapper = mount(RenameFileDialog, {
				props: {
					isDialogOpen: false,
					fileRecords: [],
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});
			return { wrapper };
		};

		it("should not render card", () => {
			const { wrapper } = setup();
			const card = wrapper.findComponent(Dialog).findComponent(VCard);

			expect(card.exists()).toBe(false);
		});
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		const setup = () => {
			const wrapper = mount(RenameFileDialog, {
				props: {
					isDialogOpen: true,
					fileRecords: [],
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});
			return { wrapper };
		};

		it("should display error message", async () => {
			const { wrapper } = setup();

			const textField = wrapper.findComponent(VTextField);
			const input = textField.find("input[type='text']");
			await input.setValue("<string");
			await input.trigger("input");

			expect(textField.text()).toContain("common.validation.containsOpeningTag");
		});
	});

	describe("when a value contains a /", () => {
		const setup = () => {
			const wrapper = mount(RenameFileDialog, {
				props: {
					isDialogOpen: true,
					fileRecords: [],
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});
			return { wrapper };
		};

		it("should display invalid characters error message", async () => {
			const { wrapper } = setup();

			const textField = wrapper.findComponent(VTextField);
			const input = textField.find("input[type='text']");
			await input.setValue("invalid/name");
			await input.trigger("input");

			expect(textField.text()).toContain("pages.folder.rename-file-dialog.validation.invalid-characters");
		});

		it("should disable confirm button", async () => {
			const { wrapper } = setup();

			const textField = wrapper.findComponent(VTextField);
			const input = textField.find("input[type='text']");
			await input.setValue("invalid/name");
			await input.trigger("input");

			const dialog = wrapper.findComponent(Dialog);
			expect(dialog.props("confirmBtnDisabled")).toBe(true);
		});
	});
});
