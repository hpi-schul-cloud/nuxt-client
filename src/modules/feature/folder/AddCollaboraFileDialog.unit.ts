import { useAddCollaboraFile } from "./add-collabora-file.composable";
import AddCollaboraFileDialog from "./AddCollaboraFileDialog.vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Dialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { VForm, VSelect } from "vuetify/lib/components/index";

vi.mock("./add-collabora-file.composable");
const mockedCollaboraFileSelection = vi.mocked(useAddCollaboraFile);
mockedCollaboraFileSelection.mockReturnValue({
	collaboraFileSelectionOptions: [
		{
			id: "1",
			label: "Text Document",
			action: vi.fn(),
		},
		{
			id: "2",
			label: "Table Document",
			action: vi.fn(),
		},
	],
	isCollaboraFileDialogOpen: ref(false),
	openCollaboraFileDialog: vi.fn(),
	closeCollaboraFileDialog: vi.fn(),
	latestAddedCollaboraFile: ref<FileRecordResponse | null>(null),
});

describe("CollaboraFileDialog", () => {
	const setupMocks = () => {
		const { closeCollaboraFileDialog, isCollaboraFileDialogOpen, collaboraFileSelectionOptions } =
			mockedCollaboraFileSelection();

		return {
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
			collaboraFileSelectionOptions,
		};
	};

	describe("when isCollaboraFileDialogOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			vi.clearAllMocks();
			setupMocks();

			const wrapper = mount(AddCollaboraFileDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
				},
				props: {
					folderId: "folder-id",
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

			vi.clearAllMocks();
			setupMocks();

			const { isCollaboraFileDialogOpen, closeCollaboraFileDialog, collaboraFileSelectionOptions } = setupMocks();

			const wrapper = mount(AddCollaboraFileDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
				},
				props: {
					folderId: "folder-id",
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

		it("should have confirm button disabled initially", async () => {
			const { wrapper } = await setup();

			const dialog = wrapper.findComponent(Dialog);
			expect(dialog.props("confirmBtnDisabled")).toBe(true);
		});

		it("should render options", async () => {
			const { collaboraFileSelectionOptions, wrapper } = await setup();

			const typeSelect = wrapper.findComponent(VSelect);
			expect(typeSelect.props("items")).toBe(collaboraFileSelectionOptions);
		});

		describe("when form is valid", () => {
			it("should call item action", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions[0];
				const FILENAME = "myDocument";

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();
				expect(typeSelect.find("input").element.value).toBe(selectOption.id);

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue(FILENAME);
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();
				expect(selectOption.action).toHaveBeenCalled();
				expect(selectOption.action).toHaveBeenCalledWith("folder-id", FILENAME);
			});

			it("should have confirm button enabled", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions[0];
				const FILENAME = "myDocument";

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue(FILENAME);
				await nextTick();

				const dialog = wrapper.findComponent(Dialog);
				expect(dialog.props("confirmBtnDisabled")).toBe(false);
			});
		});

		describe("when filetype is not selected", () => {
			it("should not call item action", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();
				const selectOption = collaboraFileSelectionOptions[0];

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue("myDocument");
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();
				expect(selectOption.action).toHaveBeenCalledTimes(0);
			});

			it("should have confirm button disabled", async () => {
				const { wrapper } = await setup();

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue("myDocument");
				await nextTick();

				const dialog = wrapper.findComponent(Dialog);
				expect(dialog.props("confirmBtnDisabled")).toBe(true);
			});
		});

		describe("when filename is empty", () => {
			it("should not call item action", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions[0];

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();
				expect(typeSelect.find("input").element.value).toBe(selectOption.id);

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']").find("input");
				expect(fileNameInput.element.value).toBe("");

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();
				expect(selectOption.action).toHaveBeenCalledTimes(0);
			});

			it("should have confirm button disabled", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions[0];

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();

				const dialog = wrapper.findComponent(Dialog);
				expect(dialog.props("confirmBtnDisabled")).toBe(true);
			});
		});

		describe("when filename contains invalid characters", () => {
			it("should have confirm button disabled", async () => {
				const { collaboraFileSelectionOptions, wrapper } = await setup();

				const selectOption = collaboraFileSelectionOptions[0];

				const typeSelect = wrapper.findComponent(VSelect);
				typeSelect.vm.$emit("update:modelValue", selectOption.id);
				await nextTick();

				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue("invalid/filename");
				await nextTick();

				const dialog = wrapper.findComponent(Dialog);
				expect(dialog.props("confirmBtnDisabled")).toBe(true);
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
