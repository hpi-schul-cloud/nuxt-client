import DeleteFileDialog from "./file-table/DeleteFileDialog.vue";
import EmptyFolderSvg from "./file-table/EmptyFolderSvg.vue";
import KebabMenuActionDeleteFiles from "./file-table/KebabMenuActionDeleteFiles.vue";
import KebabMenuActionDownloadFiles from "./file-table/KebabMenuActionDownloadFiles.vue";
import RenameFileDialog from "./file-table/RenameFileDialog.vue";
import Folder from "./Folder.vue";
import FolderMenu from "./FolderMenu.vue";
import RenameFolderDialog from "./RenameFolderDialog.vue";
import BrokenPencilSvg from "@/assets/img/BrokenPencilSvg.vue";
import { BoardResponseAllowedOperations } from "@/serverApi/v3";
import { ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
import { FileRecordParent } from "@/types/file/File";
import * as FileHelper from "@/utils/fileHelper";
import {
	boardResponseFactory,
	createTestEnvStore,
	fileRecordFactory,
	mockedPiniaStoreTyping,
	parentNodeInfoFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as BoardApi from "@data-board";
import { useBoardAllowedOperations, useBoardStore } from "@data-board";
import * as FileStorageApi from "@data-file";
import { CollaboraFileType } from "@data-file";
import * as FolderState from "@data-folder";
import { AddCollaboraFileDialog, useAddCollaboraFile } from "@feature-collabora";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import * as ConfirmationDialog from "@ui-confirmation-dialog";
import { KebabMenuActionDelete, KebabMenuActionRename } from "@ui-kebab-menu";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";
import dayjs from "dayjs";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { computed, ComputedRef, nextTick, ref } from "vue";
import { Router, useRouter } from "vue-router";
import { VBtn, VSkeletonLoader } from "vuetify/lib/components/index";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

vi.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = vi.mocked(BoardApi.useBoardApi);

vi.mock("@data-board/BoardAllowedOperations.composable");

vi.mock("@feature-collabora/composables/add-collabora-file.composable");
const mockedUseAddCollaboraFile = vi.mocked(useAddCollaboraFile);

describe("Folder.vue", () => {
	enableAutoUnmount(afterEach);

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.restoreAllMocks();
	});

	const setupMocks = (
		options: {
			breadcrumbs?: Array<{ title: string; to: string }>;
			parentType?: ParentNodeType;
			canCreateFileElement?: boolean;
			allowedOperations?: Partial<BoardResponseAllowedOperations>;
		} = {}
	) => {
		const { folderStateMock, folderName, parent } = setupFolderStateMock(options);

		const boardState = createMock<ReturnType<typeof BoardApi.useSharedBoardPageInformation>>({});
		vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(boardState);

		const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
		vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

		const boardApiMock = createMock<ReturnType<typeof BoardApi.useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(boardApiMock);

		const useBoardStoreMock = createMock<ReturnType<typeof BoardApi.useBoardStore>>();
		vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(useBoardStoreMock);

		setupBoardAllowedOperationsMock(options.allowedOperations);

		return { folderStateMock, folderName, parent, boardState, boardApiMock, fileStorageApiMock };
	};

	const setupFolderStateMock = (
		options: {
			breadcrumbs?: Array<{ title: string; to: string }>;
			parentType?: ParentNodeType;
			canCreateFileElement?: boolean;
			allowedOperations?: Partial<BoardResponseAllowedOperations>;
		} = {}
	) => {
		const { breadcrumbs = [], parentType = ParentNodeType.Board } = options;
		const folderStateMock = createMock<ReturnType<typeof FolderState.useFolderState>>();
		vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(folderStateMock);

		const parent = parentNodeInfoFactory.build({ type: parentType });
		folderStateMock.parent = ref(parent) as unknown as ComputedRef;

		if (parentType === ParentNodeType.Board) {
			folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(() => "boards");
		} else {
			folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(() => "courses");
		}

		const folderName = ref("Test Folder") as unknown as ComputedRef<string>;
		folderStateMock.folderName = folderName;
		folderStateMock.breadcrumbs = ref(breadcrumbs) as unknown as ComputedRef;

		return { folderStateMock, folderName, parent };
	};

	const setupBoardAllowedOperationsMock = (allowedOperations?: Partial<BoardResponseAllowedOperations>) => {
		const { createFileElement = true, ...restAllowedOperations } = allowedOperations ?? {};
		vi.mocked(useBoardAllowedOperations).mockReturnValue({
			allowedOperations: computed(
				() =>
					({
						createFileElement,
						...restAllowedOperations,
					}) as unknown as BoardResponseAllowedOperations
			),
		} as ReturnType<typeof useBoardAllowedOperations>);
	};

	const buildUploadStatsTranslation = (uploaded: string, total: string) =>
		`${uploaded} von ${total} Dateien hochgeladen`;
	const setupWrapper = () => {
		const router: DeepMocked<Router> = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		vi.spyOn(FileHelper, "downloadFilesAsArchive");
		vi.spyOn(FileHelper, "downloadFile");

		const parentId = "123";
		const wrapper = mount(Folder, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n({
						messages: {
							en: {
								"pages.folder.uploadstats": buildUploadStatsTranslation("{uploaded}", "{total}"),
							},
						},
					}),
				],
				stubs: { ConfirmationDialog: true, UseFocusTrap: true },
			},
			props: {
				folderId: parentId,
			},
		});

		return { wrapper, parentId, router };
	};

	describe("when user has board edit permission", () => {
		describe("when folder contains no files", () => {
			describe("when component is loaded", () => {
				const setup = async (boardInStoreUndefined = false, boardInStoreIsParent = true) => {
					const folderStateMock = createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(folderStateMock);

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Board,
					});
					folderStateMock.parent = ref(parent) as ComputedRef<ParentNodeInfo>;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<ReturnType<typeof BoardApi.useSharedBoardPageInformation>>({});
					vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(boardState);

					const boardApiMock = createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					vi.mocked(useBoardAllowedOperations).mockReturnValue({
						allowedOperations: computed(() => ({ createFileElement: true }) as unknown),
					} as ReturnType<typeof useBoardAllowedOperations>);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();
					const useBoardStoreMock = mockedPiniaStoreTyping(useBoardStore);
					const id = boardInStoreIsParent && parent["id"] ? parent.id : "different-board-id";
					const board = boardResponseFactory.build({ id });
					useBoardStoreMock.board = boardInStoreUndefined ? undefined : board;

					const windowOpenMock = vi.fn();
					vi.spyOn(globalThis, "open").mockImplementation(windowOpenMock);

					await nextTick();
					await nextTick();
					await nextTick();

					return {
						folderStateMock,
						wrapper,
						fileStorageApiMock,
						folderName,
						boardState,
						parent,
						useBoardStoreMock,
					};
				};

				it("should call fetchFileFolderElement with the correct folderId", async () => {
					const { folderStateMock } = await setup();

					expect(folderStateMock.fetchFileFolderElement).toHaveBeenCalledWith("123");
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

					const includesFolderName = wrapper.text().includes(folderName as unknown as string);

					expect(includesFolderName).toBe(true);
				});

				describe("when board is not in store", () => {
					it("should call fetchBoardRequest", async () => {
						const { useBoardStoreMock, parent } = await setup(true);

						expect(useBoardStoreMock.fetchBoardRequest).toHaveBeenCalledWith({
							boardId: parent.id,
						});
					});
				});

				describe("when board in store is not the same as parent", () => {
					it("should call fetchBoardRequest", async () => {
						const { useBoardStoreMock, parent } = await setup(false, false);

						expect(useBoardStoreMock.fetchBoardRequest).toHaveBeenCalledWith({
							boardId: parent.id,
						});
					});
				});

				describe("when board in store is the same as parent", () => {
					it("should not call fetchBoardRequest", async () => {
						const { useBoardStoreMock } = await setup(false, true);

						expect(useBoardStoreMock.fetchBoardRequest).not.toHaveBeenCalled();
					});
				});

				describe("when folder is board", () => {
					it("should call createPageInformation with the correct parentId", async () => {
						const { boardState, parent } = await setup();

						expect(boardState.createPageInformation).toHaveBeenCalledWith(parent.id);
					});
				});
			});

			describe("when parent is not a board", () => {
				const setup = async () => {
					const { fileStorageApiMock, boardState } = setupMocks({
						parentType: ParentNodeType.Course,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					setupWrapper();

					await nextTick();
					await nextTick();
					await nextTick();

					return {
						boardState,
					};
				};

				it("should throw error", async () => {
					const error = new Error("Unsupported parent type");
					await expect(async () => await setup()).rejects.toThrow(error);
				});
			});

			describe("when component is loading", () => {
				const setup = async () => {
					const { folderStateMock, fileStorageApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					// eslint-disable-next-line @typescript-eslint/no-empty-function
					const mockFolderPromise = new Promise<void>(() => {});
					folderStateMock.fetchFileFolderElement.mockReturnValueOnce(mockFolderPromise);

					// eslint-disable-next-line @typescript-eslint/no-empty-function
					const mockFilePromise = new Promise<void>(() => {});
					fileStorageApiMock.fetchFiles.mockReturnValueOnce(mockFilePromise);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

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
					const { folderStateMock, folderName, parent, fileStorageApiMock, boardApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const confirmationDialogMock =
						createMock<ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>>();
					vi.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog").mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper, router } = setupWrapper();

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
						router,
						parent,
					};
				};

				it("should call delete", async () => {
					const { boardApiMock } = await setup();

					expect(boardApiMock.deleteElementCall).toHaveBeenCalled();
				});

				it("should call router replace", async () => {
					const { router, parent } = await setup();

					expect(router.replace).toHaveBeenCalledWith(`/boards/${parent.id}`);
				});
			});

			describe("when delete folder button is clicked, dialog confirmed and parent not a board", () => {
				const setup = async () => {
					const { folderStateMock, folderName, fileStorageApiMock, boardApiMock } = setupMocks({
						parentType: ParentNodeType.Course,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const confirmationDialogMock =
						createMock<ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>>();
					vi.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog").mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper, router } = setupWrapper();

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
						router,
						parent,
					};
				};

				it("should throw", async () => {
					const error = new Error("Unsupported parent type");
					await expect(async () => await setup()).rejects.toThrow(error);
				});
			});

			describe("when delete folder button is clicked and dialog not confirmed", () => {
				const setup = async () => {
					const { folderStateMock, folderName, fileStorageApiMock, boardApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const confirmationDialogMock =
						createMock<ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>>();
					vi.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog").mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(false);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper, router } = setupWrapper();

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
						router,
					};
				};

				it("should not call delete", async () => {
					const { boardApiMock } = await setup();

					expect(boardApiMock.deleteElementCall).not.toHaveBeenCalled();
				});

				it("should not call router replace", async () => {
					const { router } = await setup();

					expect(router.replace).not.toHaveBeenCalled();
				});
			});

			describe("when rename folder button is clicked and dialog confirmed", () => {
				const setup = async () => {
					const { folderStateMock, folderName, parent, fileStorageApiMock, boardApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper, router } = setupWrapper();

					const kebabMenu = wrapper.find("[data-testid='folder-menu']");
					await kebabMenu.trigger("click");

					const renameButton = wrapper.findComponent(KebabMenuActionRename);
					await renameButton.trigger("click");

					const renameDialog = wrapper.findComponent(RenameFolderDialog);
					renameDialog.vm.$emit("confirm", "Test Folder");

					return {
						folderStateMock,
						wrapper,
						fileStorageApiMock,
						folderName,
						boardApiMock,
						router,
						parent,
					};
				};

				it("should call rename", async () => {
					const { folderStateMock, folderName } = await setup();

					expect(folderStateMock.renameFolder).toHaveBeenCalledWith(folderName.value, "123");
				});

				it("should close the dialog", async () => {
					const { wrapper } = await setup();

					const renameDialog = wrapper.findComponent(RenameFolderDialog);
					renameDialog.vm.$emit("cancel");
					await nextTick();
					expect(renameDialog.props().isDialogOpen).toBe(false);
				});

				it("should emit 'update:folder-name' event", async () => {
					const { wrapper, folderStateMock, parent } = await setup();

					await flushPromises();

					// @ts-expect-error accessing private property
					folderStateMock.folderName.value = "New Name";
					await flushPromises();

					expect(wrapper.emitted("update:folder-name")).toEqual([
						[`Test Folder - ${parent.name}`],
						[`New Name - ${parent.name}`],
					]);
				});
			});

			describe("when rename folder button is clicked and dialog not confirmed", () => {
				const setup = async () => {
					const { folderStateMock, folderName, fileStorageApiMock, boardApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper, router } = setupWrapper();

					const kebabMenu = wrapper.find("[data-testid='folder-menu']");
					await kebabMenu.trigger("click");

					const renameButton = wrapper.findComponent(KebabMenuActionRename);
					await renameButton.trigger("click");

					const renameDialog = wrapper.findComponent(RenameFolderDialog);
					renameDialog.vm.$emit("cancel");

					return {
						folderStateMock,
						wrapper,
						fileStorageApiMock,
						folderName,
						boardApiMock,
						router,
						parent,
					};
				};

				it("should not call rename", async () => {
					const { folderStateMock, folderName } = await setup();

					expect(folderStateMock.renameFolder).not.toHaveBeenCalledWith(folderName, "123");
				});

				it("should close the dialog", async () => {
					const { wrapper } = await setup();

					const renameDialog = wrapper.findComponent(RenameFolderDialog);
					renameDialog.vm.$emit("cancel");
					await nextTick();
					expect(renameDialog.props().isDialogOpen).toBe(false);
				});
			});

			describe("when file is checked, deleted by actions menu and confirmed", () => {
				const setup = async () => {
					const { fileStorageApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord.name}']`);
					await checkbox.trigger("click");

					const actionMenuButton = wrapper.find(`[data-testid='action-menu-button']`);
					await actionMenuButton.trigger("click");

					const deleteButton = wrapper.findComponent(KebabMenuActionDeleteFiles);
					await deleteButton.trigger("click");

					const deleteDialog = wrapper.findComponent(DeleteFileDialog);
					deleteDialog.vm.$emit("confirm");

					return {
						fileStorageApiMock,
					};
				};

				it("should call deleteFiles", async () => {
					const { fileStorageApiMock } = await setup();

					expect(fileStorageApiMock.deleteFiles).toHaveBeenCalled();
				});
			});

			describe("when file is checked, deleted by actions menu and not confirmed", () => {
				const setup = async () => {
					const { fileStorageApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
					});

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord.name}']`);
					await checkbox.trigger("click");

					const actionMenuButton = wrapper.find(`[data-testid='action-menu-button']`);
					await actionMenuButton.trigger("click");

					const deleteButton = wrapper.findComponent(KebabMenuActionDeleteFiles);
					await deleteButton.trigger("click");

					const deleteDialog = wrapper.findComponent(DeleteFileDialog);
					deleteDialog.vm.$emit("cancel");

					return {
						fileStorageApiMock,
					};
				};

				it("should not call deleteFiles", async () => {
					const { fileStorageApiMock } = await setup();

					expect(fileStorageApiMock.deleteFiles).not.toHaveBeenCalled();
				});
			});
		});

		describe("when folder contains files", () => {
			const setup = async (fileStorageFails = false) => {
				const { folderStateMock, fileStorageApiMock } = setupMocks();

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build({ isUploading: true });

				if (fileStorageFails) {
					fileStorageApiMock.fetchFiles.mockRejectedValueOnce(new Error("File fetch failed"));
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);
				} else {
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);
				}

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper } = setupWrapper();

				await nextTick();
				await nextTick();
				await nextTick();

				return {
					folderStateMock,
					wrapper,
					fileStorageApiMock,
					fileRecord1,
					fileRecord2,
				};
			};

			it("should render file record name", async () => {
				const { wrapper, fileRecord1 } = await setup();

				const includesFileRecordName = wrapper.html().includes(fileRecord1.name);

				expect(includesFileRecordName).toBe(true);
			});

			it("should not render file record that is still uploading", async () => {
				const { wrapper, fileRecord2 } = await setup();

				const includesFileRecordName = wrapper.html().includes(fileRecord2.name);

				expect(includesFileRecordName).toBe(false);
			});

			it("should not show EmptyFolderState", async () => {
				const { wrapper } = await setup();

				const emptyState = wrapper.findComponent(EmptyFolderSvg);
				expect(emptyState.exists()).toBe(false);
			});

			describe("when user clicks rename button in item menu", () => {
				const setup = async () => {
					const { folderStateMock, fileStorageApiMock } = setupMocks();

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const itemMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
					await itemMenuButton.trigger("click");

					// We had to emit the click event on the rename button manually,
					// as the "normal" trigger("click") does not work, when running
					// multiple tests at once.
					const renameButton = wrapper.findComponent(KebabMenuActionRename);
					await renameButton.vm.$emit("click", fileRecord1);

					const renameDialog = wrapper.findComponent(RenameFileDialog);
					renameDialog.vm.$emit("confirm", "new filename");

					return {
						folderStateMock,
						wrapper,
						fileStorageApiMock,
						fileRecord1,
						fileRecord2,
					};
				};

				it("should call rename with correct parameters", async () => {
					const { fileStorageApiMock, fileRecord1 } = await setup();

					expect(fileStorageApiMock.rename).toHaveBeenCalledWith(fileRecord1.id, {
						fileName: "new filename.txt",
					});
				});
			});

			describe("when user clicks delete button in item menu", () => {
				const setup = async () => {
					const { folderStateMock, fileStorageApiMock } = setupMocks();

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const itemMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
					await itemMenuButton.trigger("click");

					// We had to emit the click event on the delete button manually,
					// as the "normal" trigger("click") does not work, when running
					// multiple tests at once.
					const deleteButton = wrapper.findComponent(KebabMenuActionDeleteFiles);
					await deleteButton.vm.$emit("delete-files", [fileRecord1]);

					const deleteDialog = wrapper.findComponent(DeleteFileDialog);
					deleteDialog.vm.$emit("confirm");

					return {
						folderStateMock,
						wrapper,
						fileStorageApiMock,
						fileRecord1,
						fileRecord2,
					};
				};

				it("should call deleteFiles with correct parameters", async () => {
					const { fileStorageApiMock, fileRecord1 } = await setup();

					expect(fileStorageApiMock.deleteFiles).toHaveBeenCalledWith([fileRecord1]);
				});
			});

			describe("when file fetching fails", () => {
				it("should show error state", async () => {
					const { wrapper, fileStorageApiMock } = await setup(true);

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalled();
					const errorState = wrapper.findComponent(BrokenPencilSvg);
					expect(errorState.exists()).toBe(true);
				});
			});
		});

		describe("when folder contains only one file with isUploading true", () => {
			const setup = async () => {
				const { folderStateMock, fileStorageApiMock } = setupMocks();

				const fileRecord1 = fileRecordFactory.build({ isUploading: true });
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1]);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper } = setupWrapper();

				await nextTick();
				await nextTick();
				await nextTick();

				return {
					folderStateMock,
					wrapper,
					fileStorageApiMock,
					fileRecord1,
				};
			};

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
		});

		describe("when breadcrumbs are present", () => {
			const setup = () => {
				const { folderStateMock, fileStorageApiMock } = setupMocks({
					breadcrumbs: [
						{
							title: "Test Folder",
							to: "/test-folder",
						},
					],
				});

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper } = setupWrapper();

				return { wrapper };
			};

			it("should show the breadcrumbs", () => {
				const { wrapper } = setup();

				const breadcrumbItem = wrapper.html().includes("Test Folder");
				expect(breadcrumbItem).toBe(true);
			});
		});

		describe("when fab button is clicked", () => {
			const setup = async (collaboraEnabled = false) => {
				const { folderStateMock, fileStorageApiMock } = setupMocks();

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const mockedOpenCollaboraFileDialog = vi.fn();
				mockedUseAddCollaboraFile.mockReturnValue({
					isCollaboraFileDialogOpen: ref(false),
					openCollaboraFileDialog: mockedOpenCollaboraFileDialog,
					closeCollaboraFileDialog: vi.fn(),
				});

				createTestEnvStore({
					FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: collaboraEnabled,
				});

				const windowOpenMock = vi.fn();
				vi.spyOn(globalThis, "open").mockImplementation(windowOpenMock);

				const { wrapper } = setupWrapper();

				return {
					wrapper,
					mockedOpenCollaboraFileDialog,
				};
			};

			it("should render fab item", async () => {
				const { wrapper } = await setup();

				const fabComponent = wrapper.findComponent(SpeedDialMenu);

				expect(fabComponent.exists()).toBe(true);
			});

			describe("when collabora is not enabled", () => {
				it("should render fab action for upload file", async () => {
					const { wrapper } = await setup();

					const fabComponent = wrapper.findComponent(SpeedDialMenu);
					await fabComponent.findComponent(VBtn).trigger("click");

					const fabActions = wrapper.findAllComponents(SpeedDialMenuAction);
					expect(fabActions.length).toBe(1);

					const uploadFileAction = fabActions[0].getComponent(VBtn);
					expect(uploadFileAction.attributes("data-testid")).toBe("fab-button-upload-file");
				});
			});

			describe("when collabora is enabled", () => {
				it("should render fab actions for upload file and collabora creating", async () => {
					const { wrapper } = await setup(true);

					const fabComponent = wrapper.findComponent(SpeedDialMenu);
					await fabComponent.findComponent(VBtn).trigger("click");

					const fabActions = wrapper.findAllComponents(SpeedDialMenuAction);

					expect(fabActions.length).toBe(2);

					const uploadFileAction = fabActions[0].getComponent(VBtn);
					expect(uploadFileAction.attributes("data-testid")).toBe("fab-button-upload-file");

					const createDocumentAction = fabActions[1].getComponent(VBtn);
					expect(createDocumentAction.attributes("data-testid")).toBe("fab-button-create-document");
				});
			});

			describe("and file upload is chosen", () => {
				it("should reset input field", async () => {
					const { wrapper } = await setup();

					const file1 = new File(["content"], "filename.txt", {
						type: "text/plain",
					});
					const input = wrapper.find("input[type='file']");
					Object.defineProperty(input.element, "files", {
						value: [file1],
						writable: false,
					});

					const fabComponent = wrapper.getComponent(SpeedDialMenu);
					await fabComponent.getComponent(VBtn).trigger("click");
					const fabActions = wrapper.findAllComponents(SpeedDialMenuAction);

					const uploadFileAction = fabActions[0].getComponent(VBtn);
					await uploadFileAction.trigger("click");

					expect((input.element as HTMLInputElement).value).toBe("");
				});
			});

			describe("and create document is chosen", () => {
				it("should open collabora file dialog", async () => {
					const { wrapper, mockedOpenCollaboraFileDialog } = await setup(true);

					const fabComponent = wrapper.getComponent(SpeedDialMenu);
					await fabComponent.getComponent(VBtn).trigger("click");
					const fabActions = wrapper.findAllComponents(SpeedDialMenuAction);

					const createDocumentAction = fabActions[1].getComponent(VBtn);
					await createDocumentAction.trigger("click");

					expect(mockedOpenCollaboraFileDialog).toHaveBeenCalled();
				});
			});
		});

		describe("when collabora file should be created", () => {
			const setup = async () => {
				const { folderStateMock, fileStorageApiMock } = setupMocks();

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const windowOpenMock = vi.fn();
				const windowOpenSpy = vi.spyOn(globalThis, "open").mockImplementation(windowOpenMock);

				const { wrapper } = setupWrapper();

				await nextTick();
				await nextTick();
				await nextTick();

				return {
					wrapper,
					windowOpenSpy,
					fileStorageApiMock,
				};
			};

			it("should upload collabora file", async () => {
				const { wrapper, fileStorageApiMock } = await setup();

				const collaboraFileDialog = wrapper.findComponent(AddCollaboraFileDialog);
				await collaboraFileDialog.vm.$emit("create-collabora-file", {
					type: CollaboraFileType.Text,
					fileName: "myDoc",
				});

				expect(fileStorageApiMock.uploadCollaboraFile).toHaveBeenCalled();
			});

			it("should show open collabora file in new tab", async () => {
				const { wrapper, windowOpenSpy } = await setup();

				const collaboraFileDialog = wrapper.findComponent(AddCollaboraFileDialog);
				await collaboraFileDialog.vm.$emit("create-collabora-file", {
					type: CollaboraFileType.Text,
					fileName: "myDoc",
				});

				expect(windowOpenSpy).toHaveBeenCalled();
			});

			describe("and upload fails", () => {
				it("should not open new tab", async () => {
					const { wrapper, windowOpenSpy, fileStorageApiMock } = await setup();

					fileStorageApiMock.uploadCollaboraFile.mockReturnValueOnce(undefined);

					const collaboraFileDialog = wrapper.findComponent(AddCollaboraFileDialog);
					await collaboraFileDialog.vm.$emit("create-collabora-file", {
						type: CollaboraFileType.Text,
						fileName: "myDoc",
					});

					expect(windowOpenSpy).not.toHaveBeenCalled();
				});
			});
		});

		describe("when fab button is clicked, file upload is chosen, files are selected and upload succeed", () => {
			const setup = async () => {
				const { folderStateMock, fileStorageApiMock, folderName } = setupMocks();

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const resolveUploadPromise1 = vi.fn();
				const mockUploadPromise1 = new Promise<void>((resolve) => {
					resolveUploadPromise1.mockImplementation(() => {
						resolve();
					});
				});
				fileStorageApiMock.upload.mockReturnValueOnce(mockUploadPromise1);

				const resolveUploadPromise2 = vi.fn();
				const mockUploadPromise2 = new Promise<void>((resolve) => {
					resolveUploadPromise2.mockImplementation(() => {
						resolve();
					});
				});
				fileStorageApiMock.upload.mockReturnValueOnce(mockUploadPromise2);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper, parentId } = setupWrapper();

				await nextTick();
				await nextTick();
				await nextTick();

				const fabButton = wrapper.find("[data-testid='fab-add-files']");
				await fabButton.trigger("click");
				await nextTick();

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

					expect(fileStorageApiMock.upload).toHaveBeenCalledWith(file1, parentId, FileRecordParent.BOARDNODES);
					expect(fileStorageApiMock.upload).toHaveBeenCalledWith(file2, parentId, FileRecordParent.BOARDNODES);
				});

				it("should show upload progress", async () => {
					const { wrapper, resolveUploadPromise1, resolveUploadPromise2 } = await setup();

					const progressBar = wrapper.find("[data-testid='upload-progress']");
					expect(progressBar.exists()).toBe(true);
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("0", "2"));

					resolveUploadPromise1();
					await nextTick();
					await nextTick();
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("1", "2"));

					resolveUploadPromise2();
					await nextTick();
					await nextTick();
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("2", "2"));
				});

				it("should show upload progress", async () => {
					const { wrapper, resolveUploadPromise1, resolveUploadPromise2 } = await setup();

					const progressBar = wrapper.find("[data-testid='upload-progress']");
					expect(progressBar.exists()).toBe(true);
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("0", "2"));

					resolveUploadPromise1();
					await nextTick();
					await nextTick();
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("1", "2"));

					resolveUploadPromise2();
					await nextTick();
					await nextTick();
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("2", "2"));
				});
			});
		});

		describe("when fab button is clicked, files are selected and one upload fails", () => {
			const setup = async () => {
				const { folderStateMock, folderName, fileStorageApiMock } = setupMocks();

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const resolveUploadPromise1 = vi.fn();
				const mockUploadPromise1 = new Promise<void>((resolve) => {
					resolveUploadPromise1.mockImplementation(() => {
						resolve();
					});
				});
				fileStorageApiMock.upload.mockReturnValueOnce(mockUploadPromise1);

				const resolveUploadPromise2 = vi.fn();
				const mockUploadPromise2 = new Promise<void>((resolve, rejects) => {
					resolveUploadPromise2.mockImplementation(() => {
						rejects();
					});
				});
				fileStorageApiMock.upload.mockReturnValueOnce(mockUploadPromise2);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

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

					expect(fileStorageApiMock.upload).toHaveBeenCalledWith(file1, parentId, FileRecordParent.BOARDNODES);
					expect(fileStorageApiMock.upload).toHaveBeenCalledWith(file2, parentId, FileRecordParent.BOARDNODES);
				});

				it("should show upload progress", async () => {
					const { wrapper, resolveUploadPromise1, resolveUploadPromise2 } = await setup();

					const progressBar = wrapper.find("[data-testid='upload-progress']");
					expect(progressBar.exists()).toBe(true);
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("0", "2"));

					resolveUploadPromise1();
					await nextTick();
					await nextTick();
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("1", "2"));

					resolveUploadPromise2();
					await nextTick();
					await nextTick();
					expect(progressBar.text()).toContain(buildUploadStatsTranslation("1", "2"));
				});
			});
		});
	});

	describe("when user has not board edit permission", () => {
		describe("check visibility of the folder menu and fab button", () => {
			const setup = async () => {
				const { fileStorageApiMock } = setupMocks({ allowedOperations: { createFileElement: false } });

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper } = setupWrapper();

				await flushPromises();

				return { wrapper };
			};

			it("should not show folder menu", async () => {
				const { wrapper } = await setup();

				const folderMenu = wrapper.findComponent(FolderMenu);

				expect(folderMenu.exists()).toBe(false);
			});

			it("should not show fab button", async () => {
				const { wrapper } = await setup();

				const fabButton = wrapper.find("[data-testid='fab-add-files']");

				expect(fabButton.exists()).toBe(false);
			});
		});

		describe("check visibility of actions in the item menu", () => {
			const setup = async () => {
				const { fileStorageApiMock } = setupMocks({ allowedOperations: { createFileElement: false } });

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper } = setupWrapper();

				await flushPromises();

				const itemMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
				await itemMenuButton.trigger("click");

				return { wrapper };
			};

			it("should not show rename button in item menu", async () => {
				const { wrapper } = await setup();

				const renameButton = wrapper.findComponent(KebabMenuActionRename);

				expect(renameButton.exists()).toBe(false);
			});

			it("should not show delete button in item menu", async () => {
				const { wrapper } = await setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionDeleteFiles);

				expect(deleteButton.exists()).toBe(false);
			});

			it("should show download button in item menu", async () => {
				const { wrapper } = await setup();

				const downloadButton = wrapper.findComponent(KebabMenuActionDownloadFiles);

				expect(downloadButton.exists()).toBe(true);
			});
		});

		describe("check visibility of actions in the action menu", () => {
			const setup = async () => {
				const { fileStorageApiMock } = setupMocks({ allowedOperations: { createFileElement: false } });

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);

				const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
					isCollaboraFileDialogOpen: ref(false),
				});
				mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

				const { wrapper } = setupWrapper();

				await flushPromises();

				const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord1.name}']`);
				await checkbox.trigger("click");

				const actionMenuButton = wrapper.find(`[data-testid='action-menu-button']`);
				await actionMenuButton.trigger("click");

				return { wrapper };
			};

			it("should not show delete button in action menu", async () => {
				const { wrapper } = await setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionDeleteFiles);

				expect(deleteButton.exists()).toBe(false);
			});

			it("should show download button in action menu", async () => {
				const { wrapper } = await setup();

				const downloadButton = wrapper.findComponent(KebabMenuActionDownloadFiles);

				expect(downloadButton.exists()).toBe(true);
			});
		});

		describe("download handlers", () => {
			describe("when user clicks download button in action menu", () => {
				const setup = async () => {
					HTMLFormElement.prototype.submit = vi.fn();
					const { folderName, fileStorageApiMock } = setupMocks({ parentType: ParentNodeType.Board });

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord.name}']`);
					await checkbox.trigger("click");

					const actionMenuButton = wrapper.find(`[data-testid='action-menu-button']`);
					await actionMenuButton.trigger("click");

					const downloadButton = wrapper.findComponent(KebabMenuActionDownloadFiles);
					await downloadButton.trigger("click");

					const now = dayjs().format("YYYYMMDD");
					const expectedResult = {
						archiveName: `${now}_${folderName.value}`,
						fileRecordIds: [fileRecord.id],
					};

					return {
						expectedResult,
					};
				};

				it("should call downloadFilesAsArchive", async () => {
					const { expectedResult } = await setup();

					expect(FileHelper.downloadFilesAsArchive).toHaveBeenCalledWith(expectedResult);
				});
			});

			describe("when user clicks download button in item menu", () => {
				const setup = async () => {
					HTMLAnchorElement.prototype.click = vi.fn();

					const { fileStorageApiMock } = setupMocks({
						parentType: ParentNodeType.Board,
						allowedOperations: { createFileElement: false },
					});

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecord1, fileRecord2]);

					const addCollaboraFileMock = createMock<ReturnType<typeof useAddCollaboraFile>>({
						isCollaboraFileDialogOpen: ref(false),
					});
					mockedUseAddCollaboraFile.mockReturnValue(addCollaboraFileMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const itemMenuButton = wrapper.find(`[data-testid='kebab-menu-${fileRecord1.name}']`);
					await itemMenuButton.trigger("click");

					const itemDownloadButton = wrapper.findComponent(KebabMenuActionDownloadFiles);
					await itemDownloadButton.trigger("click");

					const expectedResult = [`${fileRecord1.id}/${fileRecord1.name}`, `${fileRecord1.name}`];

					return {
						expectedResult,
						wrapper,
					};
				};

				it("should call downloadFile", async () => {
					const { expectedResult } = await setup();

					expect(FileHelper.downloadFile).toHaveBeenCalledWith(...expectedResult);
				});
			});
		});
	});
});
