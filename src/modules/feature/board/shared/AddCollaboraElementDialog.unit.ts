import { elementTypeSelectionOptionsFactory } from "../test-utils/ElementTypeSelectionOptions.factory";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import AddCollaboraElementDialog from "./AddCollaboraElementDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Dialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VForm, VSelect } from "vuetify/lib/components/index";

vi.mock("./SharedElementTypeSelection.composable");

describe("CollaboraElementTypeSelection", () => {
	const setupMocks = () => {
		const { closeCollaboraDialog, isCollaboraDialogOpen, collaboraElementTypeOptions } =
			setupSharedElementTypeSelectionMock();

		collaboraElementTypeOptions.value = elementTypeSelectionOptionsFactory.createCollaboraElementList();
		return {
			isCollaboraDialogOpen,
			closeCollaboraDialog,
			collaboraElementTypeOptions,
		};
	};

	describe("when isCollaboraDialogOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			setupMocks();

			const wrapper = mount(AddCollaboraElementDialog, {
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

	describe("when isCollaboraDialogOpen is changed from false to true", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isCollaboraDialogOpen, closeCollaboraDialog, collaboraElementTypeOptions } = setupMocks();

			const wrapper = mount(AddCollaboraElementDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
				},
				attachTo: document.body,
			});

			isCollaboraDialogOpen.value = true;
			await nextTick();

			return { isCollaboraDialogOpen, closeCollaboraDialog, collaboraElementTypeOptions, wrapper };
		};

		it("should make modal visible", async () => {
			const { wrapper } = await setup();

			expect(wrapper.findComponent(VForm).exists()).toBe(true);
			expect(wrapper.findComponent(VForm).isVisible()).toBe(true);
		});

		it("should render options", async () => {
			const { collaboraElementTypeOptions, wrapper } = await setup();

			const typeSelect = wrapper.findComponent(VSelect);
			expect(typeSelect.props("items")).toBe(collaboraElementTypeOptions.value);
		});

		describe("when form is valid", () => {
			it("should call item action", async () => {
				const { collaboraElementTypeOptions, wrapper } = await setup();

				const selectOption = collaboraElementTypeOptions.value[0];
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
				const { collaboraElementTypeOptions, wrapper } = await setup();
				const selectOption = collaboraElementTypeOptions.value[0];

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
				const { collaboraElementTypeOptions, wrapper } = await setup();

				const selectOption = collaboraElementTypeOptions.value[0];

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
			const { closeCollaboraDialog, wrapper } = await setup();

			const dialog = wrapper.findComponent(Dialog);
			dialog.vm.$emit("cancel");

			await nextTick();

			expect(closeCollaboraDialog).toHaveBeenCalled();
		});
	});
});
