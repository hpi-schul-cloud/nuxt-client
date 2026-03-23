import CourseCommonCartridgeImportModal from "./CourseCommonCartridgeImportModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { VDialog } from "vuetify/components";

describe("CourseCommonCartridgeImportModal", () => {
	const getWrapper = (options: ComponentMountingOptions<typeof CourseCommonCartridgeImportModal> = {}) =>
		mount(CourseCommonCartridgeImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isOpen: false,
				...options.props,
			},
			...options,
		});

	describe("when dialog is closed", () => {
		it("should not render the dialog content", () => {
			const wrapper = getWrapper({ props: { isOpen: false } });

			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("modelValue")).toBe(false);
		});
	});

	describe("when dialog is open", () => {
		it("should contain disabled confirm button when no file is selected", () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");

			expect(confirmBtn.exists()).toBe(true);
			expect(confirmBtn.classes()).toContain("v-btn--disabled");
		});

		it("should contain enabled cancel button", () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");

			expect(cancelBtn.exists()).toBe(true);
			expect(cancelBtn.classes()).not.toContain("v-btn--disabled");
		});

		it("should contain file input", () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");

			expect(fileInput.exists()).toBe(true);
		});
	});

	describe("when a file is selected", () => {
		it("should enable confirm button", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });
			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");

			await fileInput.setValue([new File([], "test.imscc")]);

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");
			expect(confirmBtn.classes()).not.toContain("v-btn--disabled");
		});
	});

	describe("when confirm is clicked", () => {
		it("should emit import event with file", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });
			const testFile = new File([], "test.imscc");

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");
			await fileInput.setValue(testFile);

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");
			await confirmBtn.trigger("click");

			expect(wrapper.emitted("import")).toBeTruthy();
			const emittedEvents = wrapper.emitted("import");
			expect(emittedEvents?.[0]?.[0]).toBe(testFile);
		});

		it("should not emit import event when no file is selected", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");
			await confirmBtn.trigger("click");

			expect(wrapper.emitted("import")).toBeFalsy();
		});
	});

	describe("when cancel is clicked", () => {
		it("should emit update:isOpen with false", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");
			await cancelBtn.trigger("click");

			expect(wrapper.emitted("update:isOpen")).toBeTruthy();
			expect(wrapper.emitted("update:isOpen")?.[0]?.[0]).toBe(false);
		});

		it("should clear the selected file", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");
			await fileInput.setValue([new File([], "test.imscc")]);

			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");
			await cancelBtn.trigger("click");

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");
			expect(confirmBtn.classes()).toContain("v-btn--disabled");
		});
	});

	describe("when dialog is closed via ESC or click outside", () => {
		it("should call onCancel on ESC which emits update:isOpen with false", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const dialog = wrapper.findComponent(VDialog);
			dialog.vm.$emit("keydown", { key: "Escape" });

			expect(wrapper.emitted("update:isOpen")).toBeTruthy();
			expect(wrapper.emitted("update:isOpen")?.[0]?.[0]).toBe(false);
		});

		it("should call onCancel on click outside which emits update:isOpen with false", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const dialog = wrapper.findComponent(VDialog);
			dialog.vm.$emit("click:outside");

			expect(wrapper.emitted("update:isOpen")).toBeTruthy();
			expect(wrapper.emitted("update:isOpen")?.[0]?.[0]).toBe(false);
		});

		it("should clear the selected file on click outside", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");
			await fileInput.setValue([new File([], "test.imscc")]);

			const dialog = wrapper.findComponent(VDialog);
			dialog.vm.$emit("click:outside");

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");
			expect(confirmBtn.classes()).toContain("v-btn--disabled");
		});
	});

	describe("when dialog model-value is updated", () => {
		it("should emit update:isOpen when VDialog emits update:model-value", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const dialog = wrapper.findComponent(VDialog);
			dialog.vm.$emit("update:model-value", false);

			expect(wrapper.emitted("update:isOpen")).toBeTruthy();
			expect(wrapper.emitted("update:isOpen")?.[0]?.[0]).toBe(false);
		});
	});

	describe("maxWidth prop", () => {
		it("should use default maxWidth of 480", () => {
			const wrapper = getWrapper({ props: { isOpen: true } });

			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("maxWidth")).toBe(480);
		});

		it("should use custom maxWidth when provided", () => {
			const wrapper = getWrapper({ props: { isOpen: true, maxWidth: 600 } });

			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("maxWidth")).toBe(600);
		});
	});

	describe("when confirm is clicked with file selected", () => {
		it("should clear the file after emitting import event", async () => {
			const wrapper = getWrapper({ props: { isOpen: true } });
			const testFile = new File([], "test.imscc");

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");
			await fileInput.setValue(testFile);

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");
			await confirmBtn.trigger("click");

			expect(confirmBtn.classes()).toContain("v-btn--disabled");
		});
	});
});
