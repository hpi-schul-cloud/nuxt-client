import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { Dialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { VCard, VDialog, VTextField } from "vuetify/lib/components/index";
import RenameFileDialog from "./RenameFileDialog.vue";

describe("RenameFileDialog", () => {
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
			const card = wrapper.findComponent(VDialog).findComponent(VCard);

			expect(card.text()).toContain(entityName);
		});

		it("should render input with name", () => {
			const { wrapper, name } = setup();

			const input = wrapper
				.findComponent(VDialog)
				.findComponent(VCard)
				.find("input[type='text']");
			expect(input.exists()).toBe(true);
			expect(input.attributes("value")).toBe(name);
		});

		describe("when Dialog emits update:is-dialog-open", () => {
			it("should emit update:is-dialog-open", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(Dialog);

				await dialog.vm.$emit("update:is-dialog-open", false);

				expect(wrapper.emitted("update:is-dialog-open")).toBeTruthy();
				expect(wrapper.emitted("update:is-dialog-open")?.[0]).toEqual([false]);
			});
		});

		describe("when Dialog emits cancel", () => {
			it("should emit cancel", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(Dialog);
				dialog.vm.$emit("cancel");

				expect(wrapper.emitted("cancel")).toBeTruthy();
			});
		});

		describe("when Dialog emits confirm", () => {
			it("should emit confirm", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(Dialog);

				const input = wrapper
					.findComponent(VDialog)
					.findComponent(VCard)
					.find("input[type='text']");
				await input.setValue("new name");
				await input.trigger("input");

				dialog.vm.$emit("confirm");

				expect(wrapper.emitted("confirm")).toBeTruthy();
				expect(wrapper.emitted("confirm")?.[0]).toEqual(["new name"]);
			});
		});

		describe("when name is set to undefined after the dialog is opened", () => {
			it("should still show the latest valid name", async () => {
				const { name, wrapper } = setup();

				const input = wrapper
					.findComponent(VDialog)
					.findComponent(VCard)
					.find("input[type='text']");

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
				},
			});
			return { wrapper };
		};

		it("should not render card", () => {
			const { wrapper } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);

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

			expect(textField.text()).toContain(
				"common.validation.containsOpeningTag"
			);
		});
	});
});
