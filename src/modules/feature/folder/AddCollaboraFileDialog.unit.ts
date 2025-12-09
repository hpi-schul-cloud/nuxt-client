import { useAddCollaboraFile } from "./add-collabora-file.composable";
import AddCollaboraFileDialog from "./AddCollaboraFileDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useFileStorageApi } from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { Dialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { VForm, VSelect } from "vuetify/lib/components/index";

vi.mock("@data-file");
vi.mock("./add-collabora-file.composable");
const mockedCollaboraFileSelection = vi.mocked(useAddCollaboraFile);
mockedCollaboraFileSelection.mockReturnValue({
	isCollaboraFileDialogOpen: ref(false),
	openCollaboraFileDialog: vi.fn(),
	closeCollaboraFileDialog: vi.fn(),
});
const mockFileStorageApi = createMock<ReturnType<typeof useFileStorageApi>>();
vi.mocked(useFileStorageApi).mockReturnValue(mockFileStorageApi);

describe("CollaboraFileDialog", () => {
	const setupMocks = () => {
		const { closeCollaboraFileDialog, isCollaboraFileDialogOpen } = mockedCollaboraFileSelection();

		return {
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
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

			const { isCollaboraFileDialogOpen, closeCollaboraFileDialog } = setupMocks();

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

			return { isCollaboraFileDialogOpen, closeCollaboraFileDialog, wrapper };
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

		describe("when form is valid", () => {
			it("should call item action", async () => {
				const { wrapper } = await setup();

				const FILENAME = "myDocument";
				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue(FILENAME);
				await nextTick();

				const typeSelect = wrapper.findComponent(VSelect);
				const typeOptions = typeSelect.props("items") as Array<{ id: string; label: string; action: () => void }>;
				expect(typeOptions.length).toBe(3);

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");

				typeOptions.forEach(async (option) => {
					await typeSelect.setValue(option.id);
					await nextTick();

					await form.trigger("submit");
					await nextTick();
				});
				await flushPromises();

				expect(mockFileStorageApi.uploadCollaboraFile).toHaveBeenCalledTimes(typeOptions.length);
			});

			it("should have confirm button enabled", async () => {
				const { wrapper } = await setup();

				const typeSelect = wrapper.findComponent(VSelect);
				await typeSelect.setValue("1");
				await nextTick();

				const FILENAME = "myDocument";
				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue(FILENAME);
				await nextTick();

				const dialog = wrapper.findComponent(Dialog);
				expect(dialog.props("confirmBtnDisabled")).toBe(false);
			});
		});

		describe("when filetype is not selected", () => {
			it("should not call item action", async () => {
				const { wrapper } = await setup();

				const FILENAME = "myDocument";
				const fileNameInput = wrapper.findComponent("[data-testid='collabora-file-name']");
				await fileNameInput.find("input").setValue(FILENAME);
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();

				expect(mockFileStorageApi.uploadCollaboraFile).not.toHaveBeenCalled();
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
				const { wrapper } = await setup();

				const typeSelect = wrapper.findComponent(VSelect);
				await typeSelect.setValue("1");
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();

				expect(mockFileStorageApi.uploadCollaboraFile).not.toHaveBeenCalled();
			});

			it("should have confirm button disabled", async () => {
				const { wrapper } = await setup();

				const typeSelect = wrapper.findComponent(VSelect);
				await typeSelect.setValue("1");
				await nextTick();

				const form = wrapper.findComponent("[data-testid='collabora-file-form']");
				await form.trigger("submit");
				await nextTick();
				await flushPromises();

				const dialog = wrapper.findComponent(Dialog);
				expect(dialog.props("confirmBtnDisabled")).toBe(true);
			});
		});

		describe("when filename contains invalid characters", () => {
			it("should have confirm button disabled", async () => {
				const { wrapper } = await setup();

				const typeSelect = wrapper.findComponent(VSelect);
				await typeSelect.setValue("1");
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
