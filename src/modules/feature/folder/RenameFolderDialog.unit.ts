import RenameFolderDialog from "./RenameFolderDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCard, VTextField } from "vuetify/components";

describe("RenameFolderDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("when the dialog isDialogOpen is true", () => {
		const setup = () => {
			const name = "name of item";

			const wrapper = mount(RenameFolderDialog, {
				props: {
					isDialogOpen: true,
					name,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});

			return { wrapper, name };
		};

		it("should render entity name with name", () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(VCard);

			expect(dialog.text()).toContain("pages.folder.ariaLabels.menu.action.edit");
		});

		it("should render input with name", () => {
			const { wrapper, name } = setup();

			const input = wrapper.findComponent(VCard).find("input[type='text']");

			expect(input.exists()).toBe(true);
			expect(input.attributes("value")).toBe(name);
		});

		describe("when Dialog emits cancel", () => {
			it("should emit cancel", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(SvsDialog);
				dialog.vm.$emit("cancel");

				expect(wrapper.emitted("cancel")).toHaveLength(1);
			});
		});

		describe("when Dialog emits confirm", () => {
			it("should emit confirm", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(SvsDialog);

				const input = dialog.findComponent(VCard).find("input[type='text']");
				await input.setValue("new name");
				await input.trigger("input");

				dialog.vm.$emit("confirm");

				expect(wrapper.emitted("confirm")?.[0]).toEqual(["new name"]);
			});
		});
	});

	describe("when the dialog isDialogOpen is false", () => {
		const setup = () => {
			const wrapper = mount(RenameFolderDialog, {
				props: {
					isDialogOpen: false,
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
			const card = wrapper.findComponent(SvsDialog).findComponent(VCard);

			expect(card.exists()).toBe(false);
		});
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		const setup = () => {
			const wrapper = mount(RenameFolderDialog, {
				props: {
					isDialogOpen: true,
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
});
