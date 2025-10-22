import { setupCollaboraFileSelectionMock } from "../test-utils/add-collabora-file-mock";
import { collaboraFileSelectionOptionsFactory } from "../test-utils/collabora-file-selection-options.factory";
import AddCollaboraFileDialog from "./AddCollaboraFileDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Dialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VForm, VSelect } from "vuetify/lib/components/index";

vi.mock("./add-collabora-file.composable");

describe("CollaboraFileDialog", () => {
	const setupMocks = () => {
		const { closeCollaboraFileDialog, isCollaboraFileDialogOpen, collaboraFileSelectionOptions } =
			setupCollaboraFileSelectionMock();

		collaboraFileSelectionOptions.value =
			collaboraFileSelectionOptionsFactory.createCollaboraFileSelectionOptionsList();

		return {
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
			collaboraFileSelectionOptions,
		};
	};

	describe("when isCollaboraFileDialogOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			setupMocks();

			const wrapper = mount(AddCollaboraFileDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
				},
			});

			return { wrapper };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("the modal should not be visible", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(VForm).exists()).toBe(false);
		});
	});

	describe("when isCollaboraFileDialogOpen is changed from false to true", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isCollaboraFileDialogOpen, closeCollaboraFileDialog, collaboraFileSelectionOptions } = setupMocks();

			const wrapper = mount(AddCollaboraFileDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
				},
				attachTo: document.body,
			});

			isCollaboraFileDialogOpen.value = true;
			await nextTick();

			return { isCollaboraFileDialogOpen, closeCollaboraFileDialog, collaboraFileSelectionOptions, wrapper };
		};

		it("should make modal visible", async () => {
			const { wrapper } = await setup();

			expect(wrapper.findComponent(VForm).exists()).toBe(true);
			expect(wrapper.findComponent(VForm).isVisible()).toBe(true);
		});

		it("should render options", async () => {
			const { collaboraFileSelectionOptions, wrapper } = await setup();

			const typeSelect = wrapper.findComponent(VSelect);
			expect(typeSelect.props("items")).toBe(collaboraFileSelectionOptions.value);
		});

		describe("when form is valid", () => {
			it("should call item action", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions.value[0];
				const FILENAME = "myDocument";

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();
				expect(typeSelect.find("input").element.value).toBe(selectOption.id);

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-element-form-filename']");
				await fileNameInput.find("input").setValue(FILENAME);
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-element-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();
				expect(selectOption.action).toHaveBeenCalled();
				expect(selectOption.action).toHaveBeenCalledWith(FILENAME, "");
			});
		});

		describe("when filetype is not selected", () => {
			it("should not call item action", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();
				const selectOption = collaboraFileSelectionOptions.value[0];

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-element-form-filename']");
				await fileNameInput.find("input").setValue("myDocument");
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-element-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();
				expect(selectOption.action).toHaveBeenCalledTimes(0);
			});
		});

		describe("when filename is empty", () => {
			it("should not call item action", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions.value[0];

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();
				expect(typeSelect.find("input").element.value).toBe(selectOption.id);

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-element-form-filename']").find("input");
				expect(fileNameInput.element.value).toBe("");

				const form = wrapper.findComponent("[data-testid='collabora-element-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();
				expect(selectOption.action).toHaveBeenCalledTimes(0);
			});
		});

		it("should close modal on close button click", async () => {
			const { closeCollaboraFileDialog, wrapper } = await setup();

			const dialog = wrapper.findComponent(Dialog);
			dialog.vm.$emit("cancel");

			await nextTick();

			expect(closeCollaboraFileDialog).toHaveBeenCalled();
		});
	});
});
