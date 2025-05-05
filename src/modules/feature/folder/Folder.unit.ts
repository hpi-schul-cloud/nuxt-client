import router from "@/router";
import { FileRecordParent } from "@/types/file/File";
import { fileRecordFactory, parentNodeInfoFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as BoardApi from "@data-board";
import * as FileStorageApi from "@data-file";
import * as FolderState from "@data-folder";
import { createMock } from "@golevelup/ts-jest";
import * as ConfirmationDialog from "@ui-confirmation-dialog";
import { KebabMenuActionDelete } from "@ui-kebab-menu";
import { ComputedRef, nextTick, ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import EmptyFolderSvg from "./file-table/EmptyFolderSvg.vue";
import Folder from "./Folder.vue";

describe("Folder.vue", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const buildUploadStatsTranslation = (uploaded: string, total: string) => {
		return `${uploaded} von ${total} Dateien hochgeladen`;
	};

	const setupWrapper = () => {
		const parentId = "123";
		const wrapper = mount(Folder, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n({
						messages: {
							en: {
								"pages.folder.uploadstats": buildUploadStatsTranslation(
									"{uploaded}",
									"{total}"
								),
							},
						},
					}),
				],
			},
			props: {
				folderId: parentId,
			},
		});

		return { wrapper, parentId };
	};

	describe("when folder contains no files", () => {
		describe("when component is loaded", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValue(folderStateMock);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValue(fileStorageApiMock);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValue([]);

				const { wrapper } = setupWrapper();

				await nextTick();
				await nextTick();
				await nextTick();

				return { folderStateMock, wrapper, fileStorageApiMock, folderName };
			};

			it("should call fetchFileFolderElement with the correct folderId", async () => {
				const { folderStateMock } = await setup();

				expect(folderStateMock.fetchFileFolderElement).toHaveBeenCalledWith(
					"123"
				);
			});

			it("should call fetchFiles", async () => {
				const { fileStorageApiMock } = await setup();

				expect(fileStorageApiMock.fetchFiles).toHaveBeenCalled();
			});

			it("should not show the loading spinner", async () => {
				const { wrapper } = await setup();

				const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
				expect(loadingSpinner.exists()).toBe(false);
			});

			it("should show EmptyFolderState", async () => {
				const { wrapper } = await setup();

				const emptyState = wrapper.findComponent(EmptyFolderSvg);
				expect(emptyState.exists()).toBe(true);
			});

			it("should render folder name", async () => {
				const { wrapper, folderName } = await setup();

				const includesFolderName = wrapper
					.text()
					.includes(folderName as unknown as string);
				expect(includesFolderName).toBe(true);
			});
		});

		describe("when component is loading", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValue(folderStateMock);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValue(fileStorageApiMock);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValue([]);

				// eslint-disable-next-line @typescript-eslint/no-empty-function
				const mockFolderPromise = new Promise<void>(() => {});
				folderStateMock.fetchFileFolderElement.mockReturnValue(
					mockFolderPromise
				);

				// eslint-disable-next-line @typescript-eslint/no-empty-function
				const mockFilePromise = new Promise<void>(() => {});
				fileStorageApiMock.fetchFiles.mockReturnValue(mockFilePromise);

				const { wrapper } = setupWrapper();

				await nextTick();
				await nextTick();
				await nextTick();

				return {
					folderStateMock,
					wrapper,
					fileStorageApiMock,
				};
			};

			it("should show the loading spinner", async () => {
				const { wrapper } = await setup();

				const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
				expect(loadingSpinner.exists()).toBe(true);
			});

			it("should not show EmptyFolderState", async () => {
				const { wrapper } = await setup();

				const emptyState = wrapper.findComponent(EmptyFolderSvg);
				expect(emptyState.exists()).toBe(false);
			});
		});

		describe("when delete folder button is clicked and dialog confirmed", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValue(folderStateMock);

				folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
					() => "boards"
				);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValue(fileStorageApiMock);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValue([]);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				jest.spyOn(BoardApi, "useBoardApi").mockReturnValue(boardApiMock);

				const confirmationDialogMock =
					createMock<
						ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
					>();
				jest
					.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog")
					.mockReturnValue(confirmationDialogMock);
				confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

				const routerSpy = jest.spyOn(router, "replace").mockImplementation();

				const { wrapper } = setupWrapper();

				const kebabMenu = wrapper.find("[data-testid='folder-menu']");
				await kebabMenu.trigger("click");

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
				await deleteButton.trigger("click");

				return {
					folderStateMock,
					wrapper,
					fileStorageApiMock,
					folderName,
					boardApiMock,
					routerSpy,
					parent,
				};
			};

			it("should call delete", async () => {
				const { boardApiMock } = await setup();

				expect(boardApiMock.deleteElementCall).toHaveBeenCalled();
			});

			it("should call router replace", async () => {
				const { routerSpy, parent } = await setup();

				expect(routerSpy).toHaveBeenCalledWith(`/boards/${parent.id}`);
			});
		});

		describe("when delete folder button is clicked and dialog not confirmed", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValue(folderStateMock);

				folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
					() => "boards"
				);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;
				const parent = parentNodeInfoFactory.build();

				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValue(fileStorageApiMock);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValue([]);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				jest.spyOn(BoardApi, "useBoardApi").mockReturnValue(boardApiMock);

				const confirmationDialogMock =
					createMock<
						ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
					>();
				jest
					.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog")
					.mockReturnValue(confirmationDialogMock);
				confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(false);

				const routerSpy = jest.spyOn(router, "replace").mockImplementation();

				const { wrapper } = setupWrapper();

				const kebabMenu = wrapper.find("[data-testid='folder-menu']");
				await kebabMenu.trigger("click");

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
				await deleteButton.trigger("click");

				return {
					folderStateMock,
					wrapper,
					fileStorageApiMock,
					folderName,
					boardApiMock,
					routerSpy,
				};
			};

			it("should not call delete", async () => {
				const { boardApiMock } = await setup();

				expect(boardApiMock.deleteElementCall).not.toHaveBeenCalled();
			});

			it("should not call router replace", async () => {
				const { routerSpy } = await setup();

				expect(routerSpy).not.toHaveBeenCalled();
			});
		});
	});

	describe("when folder contains files", () => {
		const setup = async () => {
			const folderStateMock =
				createMock<ReturnType<typeof FolderState.useFolderState>>();
			jest
				.spyOn(FolderState, "useFolderState")
				.mockReturnValue(folderStateMock);

			const fileStorageApiMock =
				createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			jest
				.spyOn(FileStorageApi, "useFileStorageApi")
				.mockReturnValue(fileStorageApiMock);

			const fileRecord = fileRecordFactory.build();
			fileStorageApiMock.getFileRecordsByParentId.mockReturnValue([fileRecord]);

			const { wrapper } = setupWrapper();

			await nextTick();
			await nextTick();
			await nextTick();

			return { folderStateMock, wrapper, fileStorageApiMock, fileRecord };
		};

		it("should render file record name", async () => {
			const { wrapper, fileRecord } = await setup();

			const includesFileRecordName = wrapper.html().includes(fileRecord.name);

			expect(includesFileRecordName).toBe(true);
		});

		it("should not show EmptyFolderState", async () => {
			const { wrapper } = await setup();

			const emptyState = wrapper.findComponent(EmptyFolderSvg);
			expect(emptyState.exists()).toBe(false);
		});
	});

	describe("when breadcrumbs are present", () => {
		const setup = () => {
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({
				breadcrumbs: ref([
					{
						title: "Test Folder",
						to: "/test-folder",
					},
				]),
			});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const fileStorageApiMock =
				createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			jest
				.spyOn(FileStorageApi, "useFileStorageApi")
				.mockReturnValue(fileStorageApiMock);

			fileStorageApiMock.getFileRecordsByParentId.mockReturnValue([]);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper };
		};

		it("should show the breadcrumbs", () => {
			const { wrapper } = setup();

			const breadcrumbItem = wrapper.html().includes("Test Folder");
			expect(breadcrumbItem).toBe(true);
		});
	});

	describe("when fab button is clicked and files are selected", () => {
		const setup = async () => {
			const folderStateMock =
				createMock<ReturnType<typeof FolderState.useFolderState>>();
			jest
				.spyOn(FolderState, "useFolderState")
				.mockReturnValue(folderStateMock);

			const folderName = "Test Folder" as unknown as ComputedRef<string>;
			folderStateMock.folderName = folderName;

			const fileStorageApiMock =
				createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			jest
				.spyOn(FileStorageApi, "useFileStorageApi")
				.mockReturnValue(fileStorageApiMock);

			fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

			const resolveUploadPromise1 = jest.fn();
			const mockUploadPromise1 = new Promise<void>((resolve) => {
				resolveUploadPromise1.mockImplementation(() => {
					resolve();
				});
			});
			fileStorageApiMock.upload.mockReturnValueOnce(mockUploadPromise1);

			const resolveUploadPromise2 = jest.fn();
			const mockUploadPromise2 = new Promise<void>((resolve) => {
				resolveUploadPromise2.mockImplementation(() => {
					resolve();
				});
			});
			fileStorageApiMock.upload.mockReturnValueOnce(mockUploadPromise2);

			const { wrapper, parentId } = setupWrapper();

			await nextTick();
			await nextTick();
			await nextTick();

			const fabButton = wrapper.find("[data-testid='fab-add-files']");
			await fabButton.trigger("click");

			const file1 = new File(["content"], "filename.txt", {
				type: "text/plain",
			});
			const file2 = new File(["content"], "filename2.txt", {
				type: "text/plain",
			});
			const input = wrapper.find("input[type='file']");

			Object.defineProperty(input.element, "files", {
				value: [file1, file2],
				writable: false,
			});
			await input.trigger("change");

			return {
				folderStateMock,
				wrapper,
				fileStorageApiMock,
				folderName,
				parentId,
				file1,
				file2,
				resolveUploadPromise1,
				resolveUploadPromise2,
			};
		};

		describe("when file is selected", () => {
			it("should call uploadFiles", async () => {
				const { fileStorageApiMock, parentId, file1, file2 } = await setup();

				expect(fileStorageApiMock.upload).toHaveBeenCalledWith(
					file1,
					parentId,
					FileRecordParent.BOARDNODES
				);
				expect(fileStorageApiMock.upload).toHaveBeenCalledWith(
					file2,
					parentId,
					FileRecordParent.BOARDNODES
				);
			});

			it("should show upload progress", async () => {
				const { wrapper, resolveUploadPromise1, resolveUploadPromise2 } =
					await setup();

				const progressBar = wrapper.find("[data-testid='upload-progress']");
				expect(progressBar.exists()).toBe(true);
				expect(progressBar.text()).toContain(
					buildUploadStatsTranslation("0", "2")
				);

				resolveUploadPromise1();
				await nextTick();
				await nextTick();
				expect(progressBar.text()).toContain(
					buildUploadStatsTranslation("1", "2")
				);

				resolveUploadPromise2();
				await nextTick();
				await nextTick();
				expect(progressBar.text()).toContain(
					buildUploadStatsTranslation("2", "2")
				);
			});
		});
	});
});
