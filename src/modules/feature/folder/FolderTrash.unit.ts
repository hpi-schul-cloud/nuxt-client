import BrokenPencilSvg from "@/assets/img/BrokenPencilSvg.vue";
import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";
import { axiosErrorFactory, fileRecordFactory, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as FileTrashApi from "@data-file";
import * as FolderState from "@data-folder";
import { createTestingPinia } from "@pinia/testing";
import { DataTable } from "@ui-data-table";
import { KebabMenuAction } from "@ui-kebab-menu";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { HttpStatusCode } from "axios";
import { computed, ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/components/index";
import EmptyFolderSvg from "./file-table/EmptyFolderSvg.vue";
import FolderTrash from "./FolderTrash.vue";
import PurgeFilesDialog from "./PurgeFilesDialog.vue";

const createFolderStateMock = () =>
	mockComposable(FolderState.useFolderState, {
		breadcrumbs: computed(() => []),
		folderName: computed(() => "Test Folder"),
	});

const createFileTrashMock = () =>
	mockComposable(FileTrashApi.useFileTrash, {
		deletedFileRecords: ref([]),
		fetchDeletedFiles: vi.fn().mockResolvedValue(undefined),
		restoreFiles: vi.fn().mockResolvedValue(undefined),
		purgeFiles: vi.fn().mockResolvedValue(undefined),
	});

describe("FolderTrash.vue", () => {
	enableAutoUnmount(afterEach);

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	const setupWrapper = () => {
		const folderStateMock = createFolderStateMock();
		vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(folderStateMock);

		const fileTrashMock = createFileTrashMock();
		vi.spyOn(FileTrashApi, "useFileTrash").mockReturnValueOnce(fileTrashMock);

		const wrapper = mount(FolderTrash, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				folderId: "test-folder-id",
			},
		});

		return { wrapper, folderStateMock, fileTrashMock };
	};

	describe("when component is loading", () => {
		it("should show the loading skeleton", () => {
			const { wrapper, fileTrashMock } = setupWrapper();

			fileTrashMock.fetchDeletedFiles.mockReturnValueOnce(new Promise(vi.fn()));

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(true);
		});

		it("should not show the empty state", () => {
			const { wrapper } = setupWrapper();

			const emptyState = wrapper.findComponent(EmptyFolderSvg);
			expect(emptyState.exists()).toBe(false);
		});

		it("should not show the data table", () => {
			const { wrapper } = setupWrapper();

			const dataTable = wrapper.findComponent(DataTable);
			expect(dataTable.exists()).toBe(false);
		});
	});

	describe("when file storage returns an error", () => {
		const setup = async () => {
			const folderStateMock = createFolderStateMock();
			vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(folderStateMock);

			const fileTrashMock = createFileTrashMock();
			fileTrashMock.fetchDeletedFiles.mockRejectedValueOnce(new Error("Storage error"));
			vi.spyOn(FileTrashApi, "useFileTrash").mockReturnValueOnce(fileTrashMock);

			const wrapper = mount(FolderTrash, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					folderId: "test-folder-id",
				},
			});

			await flushPromises();

			return { wrapper };
		};

		it("should show the error state", async () => {
			const { wrapper } = await setup();

			const errorState = wrapper.findComponent(BrokenPencilSvg);
			expect(errorState.exists()).toBe(true);
		});

		it("should not show the loading skeleton", async () => {
			const { wrapper } = await setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should not show the data table", async () => {
			const { wrapper } = await setup();

			const dataTable = wrapper.findComponent(DataTable);
			expect(dataTable.exists()).toBe(false);
		});
	});

	describe("when file storage returns a forbidden error", () => {
		const setup = async () => {
			const folderStateMock = createFolderStateMock();
			vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(folderStateMock);

			const fileTrashMock = createFileTrashMock();
			fileTrashMock.fetchDeletedFiles.mockRejectedValueOnce(
				axiosErrorFactory.withStatusCode(HttpStatusCode.Forbidden).build()
			);
			vi.spyOn(FileTrashApi, "useFileTrash").mockReturnValueOnce(fileTrashMock);

			const wrapper = mount(FolderTrash, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					folderId: "test-folder-id",
				},
			});

			await flushPromises();

			return { wrapper };
		};

		it("should show the forbidden error state", async () => {
			const { wrapper } = await setup();

			const forbiddenState = wrapper.findComponent(PermissionErrorSvg);
			expect(forbiddenState.exists()).toBe(true);
		});

		it("should not show the file storage error state", async () => {
			const { wrapper } = await setup();

			const errorState = wrapper.findComponent(BrokenPencilSvg);
			expect(errorState.exists()).toBe(false);
		});

		it("should not show the loading skeleton", async () => {
			const { wrapper } = await setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should not show the data table", async () => {
			const { wrapper } = await setup();

			const dataTable = wrapper.findComponent(DataTable);
			expect(dataTable.exists()).toBe(false);
		});
	});

	describe("when loading is done and there are no deleted files", () => {
		const setup = async () => {
			const { wrapper, fileTrashMock } = setupWrapper();

			fileTrashMock.deletedFileRecords.value = [];

			await flushPromises();

			return { wrapper };
		};

		it("should show the empty state", async () => {
			const { wrapper } = await setup();

			const emptyState = wrapper.findComponent(EmptyFolderSvg);
			expect(emptyState.exists()).toBe(true);
		});

		it("should not show the loading skeleton", async () => {
			const { wrapper } = await setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should not show the data table", async () => {
			const { wrapper } = await setup();

			const dataTable = wrapper.findComponent(DataTable);
			expect(dataTable.exists()).toBe(false);
		});
	});

	describe("when loading is done and there are deleted files", () => {
		const setup = async () => {
			const folderStateMock = createFolderStateMock();
			vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(folderStateMock);

			const fileRecord1 = fileRecordFactory.build();
			const fileRecord2 = fileRecordFactory.build();

			const fileTrashMock = createFileTrashMock();
			fileTrashMock.deletedFileRecords = ref([fileRecord1, fileRecord2]);
			vi.spyOn(FileTrashApi, "useFileTrash").mockReturnValueOnce(fileTrashMock);

			const wrapper = mount(FolderTrash, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				},
				props: {
					folderId: "test-folder-id",
				},
			});

			await flushPromises();

			return { wrapper, fileRecord1, fileRecord2, fileTrashMock };
		};

		it("should show the data table", async () => {
			const { wrapper } = await setup();

			const dataTable = wrapper.findComponent(DataTable);
			expect(dataTable.exists()).toBe(true);
		});

		it("should not show the empty state", async () => {
			const { wrapper } = await setup();

			const emptyState = wrapper.findComponent(EmptyFolderSvg);
			expect(emptyState.exists()).toBe(false);
		});

		it("should not show the loading skeleton", async () => {
			const { wrapper } = await setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should render file names in the table", async () => {
			const { wrapper, fileRecord1, fileRecord2 } = await setup();

			expect(wrapper.html()).toContain(fileRecord1.name);
			expect(wrapper.html()).toContain(fileRecord2.name);
		});

		describe("when the kebab menu restore button is clicked for a single file", () => {
			it("should call restoreFiles with the clicked file record", async () => {
				const { wrapper, fileRecord1, fileTrashMock } = await setup();

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				await kebabMenuAction.trigger("click");

				expect(fileTrashMock.restoreFiles).toHaveBeenCalledWith([expect.objectContaining({ id: fileRecord1.id })]);
			});
		});

		describe("when the batch action menu restore button is clicked", () => {
			it("should call restoreFiles", async () => {
				const { wrapper, fileRecord1, fileTrashMock } = await setup();

				const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord1.name}']`);
				await checkbox.trigger("click");

				const actionMenuButton = wrapper.find("[data-testid='action-menu-button']");
				await actionMenuButton.trigger("click");

				const actionMenuRestore = wrapper.findAllComponents(KebabMenuAction)[0];
				await actionMenuRestore.trigger("click");
				await flushPromises();

				expect(fileTrashMock.restoreFiles).toHaveBeenCalled();
			});
		});

		describe("restore status live region", () => {
			it("should render a live region with aria-live='polite' and aria-atomic='true'", async () => {
				const { wrapper } = await setup();

				const statusRegion = wrapper.find("[data-testid='restore-status']");
				expect(statusRegion.exists()).toBe(true);
				expect(statusRegion.attributes("aria-live")).toBe("polite");
				expect(statusRegion.attributes("aria-atomic")).toBe("true");
			});

			it("should be visually hidden via d-sr-only class", async () => {
				const { wrapper } = await setup();

				const statusRegion = wrapper.find("[data-testid='restore-status']");
				expect(statusRegion.classes()).toContain("d-sr-only");
			});

			it("should be empty by default", async () => {
				const { wrapper } = await setup();

				const statusRegion = wrapper.find("[data-testid='restore-status']");
				expect(statusRegion.text()).toBe("");
			});

			it("should announce success message after successful single restore", async () => {
				const { wrapper, fileRecord1 } = await setup();

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				await kebabMenuAction.trigger("click");
				await flushPromises();

				const statusRegion = wrapper.find("[data-testid='restore-status']");
				expect(statusRegion.text()).toBe("pages.folder.trash.restore.success");
			});

			it("should announce error message after failed restore", async () => {
				const { wrapper, fileRecord1, fileTrashMock } = await setup();

				fileTrashMock.restoreFiles.mockRejectedValueOnce(new Error("restore failed"));

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				await kebabMenuAction.trigger("click");
				await flushPromises();

				const statusRegion = wrapper.find("[data-testid='restore-status']");
				expect(statusRegion.text()).toBe("pages.folder.trash.restore.error");
			});
		});

		describe("when the kebab menu purge button is clicked for a single file", () => {
			it("should open the purge dialog", async () => {
				const { wrapper, fileRecord1 } = await setup();

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuActions = wrapper.findAllComponents(KebabMenuAction);
				const purgeAction = kebabMenuActions.find((a) => a.attributes("data-testid") === "kebab-menu-action-purge");
				await purgeAction?.trigger("click");

				const purgeDialog = wrapper.findComponent(PurgeFilesDialog);
				expect(purgeDialog.props("modelValue")).toBe(true);
			});

			it("should call purgeFiles with the file record when dialog is confirmed", async () => {
				const { wrapper, fileRecord1, fileTrashMock } = await setup();

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuActions = wrapper.findAllComponents(KebabMenuAction);
				const purgeAction = kebabMenuActions.find((a) => a.attributes("data-testid") === "kebab-menu-action-purge");
				await purgeAction?.trigger("click");

				wrapper.findComponent(PurgeFilesDialog).vm.$emit("confirm");
				await flushPromises();

				expect(fileTrashMock.purgeFiles).toHaveBeenCalledWith([expect.objectContaining({ id: fileRecord1.id })]);
			});
		});

		describe("when the batch action menu purge button is clicked", () => {
			it("should open the purge dialog", async () => {
				const { wrapper, fileRecord1 } = await setup();

				const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord1.name}']`);
				await checkbox.trigger("click");

				const actionMenuButton = wrapper.find("[data-testid='action-menu-button']");
				await actionMenuButton.trigger("click");

				const actionMenuItems = wrapper.findAllComponents(KebabMenuAction);
				const purgeAction = actionMenuItems.find((a) => a.attributes("data-testid") === "action-menu-purge");
				await purgeAction?.trigger("click");

				const purgeDialog = wrapper.findComponent(PurgeFilesDialog);
				expect(purgeDialog.props("modelValue")).toBe(true);
			});

			it("should call purgeFiles when dialog is confirmed", async () => {
				const { wrapper, fileRecord1, fileTrashMock } = await setup();

				const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord1.name}']`);
				await checkbox.trigger("click");

				const actionMenuButton = wrapper.find("[data-testid='action-menu-button']");
				await actionMenuButton.trigger("click");

				const actionMenuItems = wrapper.findAllComponents(KebabMenuAction);
				const purgeAction = actionMenuItems.find((a) => a.attributes("data-testid") === "action-menu-purge");
				await purgeAction?.trigger("click");

				wrapper.findComponent(PurgeFilesDialog).vm.$emit("confirm");
				await flushPromises();

				expect(fileTrashMock.purgeFiles).toHaveBeenCalled();
			});
		});

		describe("purge status live region", () => {
			it("should render a live region with aria-live='polite' and aria-atomic='true'", async () => {
				const { wrapper } = await setup();

				const statusRegion = wrapper.find("[data-testid='purge-status']");
				expect(statusRegion.exists()).toBe(true);
				expect(statusRegion.attributes("aria-live")).toBe("polite");
				expect(statusRegion.attributes("aria-atomic")).toBe("true");
			});

			it("should be visually hidden via d-sr-only class", async () => {
				const { wrapper } = await setup();

				const statusRegion = wrapper.find("[data-testid='purge-status']");
				expect(statusRegion.classes()).toContain("d-sr-only");
			});

			it("should be empty by default", async () => {
				const { wrapper } = await setup();

				const statusRegion = wrapper.find("[data-testid='purge-status']");
				expect(statusRegion.text()).toBe("");
			});

			it("should announce success message after successful purge", async () => {
				const { wrapper, fileRecord1 } = await setup();

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuActions = wrapper.findAllComponents(KebabMenuAction);
				const purgeAction = kebabMenuActions.find((a) => a.attributes("data-testid") === "kebab-menu-action-purge");
				await purgeAction?.trigger("click");

				wrapper.findComponent(PurgeFilesDialog).vm.$emit("confirm");
				await flushPromises();

				const statusRegion = wrapper.find("[data-testid='purge-status']");
				expect(statusRegion.text()).toBe("pages.folder.trash.purge.success");
			});

			it("should announce error message after failed purge", async () => {
				const { wrapper, fileRecord1, fileTrashMock } = await setup();

				fileTrashMock.purgeFiles.mockRejectedValueOnce(new Error("purge failed"));

				const kebabMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await kebabMenuButton.trigger("click");

				const kebabMenuActions = wrapper.findAllComponents(KebabMenuAction);
				const purgeAction = kebabMenuActions.find((a) => a.attributes("data-testid") === "kebab-menu-action-purge");
				await purgeAction?.trigger("click");

				wrapper.findComponent(PurgeFilesDialog).vm.$emit("confirm");
				await flushPromises();

				const statusRegion = wrapper.find("[data-testid='purge-status']");
				expect(statusRegion.text()).toBe("pages.folder.trash.purge.error");
			});
		});
	});
});
