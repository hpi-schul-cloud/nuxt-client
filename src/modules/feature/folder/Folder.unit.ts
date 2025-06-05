import router from "@/router";
import { ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
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
import { KebabMenuActionDelete, KebabMenuActionRename } from "@ui-kebab-menu";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";
import { ComputedRef, nextTick, ref } from "vue";
import { VCard, VSkeletonLoader } from "vuetify/lib/components/index";
import DeleteFileDialog from "./file-table/DeleteFileDialog.vue";
import EmptyFolderSvg from "./file-table/EmptyFolderSvg.vue";
import KebabMenuActionDeleteFiles from "./file-table/KebabMenuActionDeleteFiles.vue";
import RenameFileDialog from "./file-table/RenameFileDialog.vue";
import Folder from "./Folder.vue";
import FolderMenu from "./FolderMenu.vue";

describe("Folder.vue", () => {
	enableAutoUnmount(afterEach);

	beforeEach(() => {
		jest.restoreAllMocks();
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

	describe("when user has board edit permission", () => {
		describe("when folder contains no files", () => {
			describe("when component is loaded", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Board,
					});
					folderStateMock.parent = ref(parent) as ComputedRef<ParentNodeInfo>;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					useBoardStoreMock.board = undefined;
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

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

					expect(folderStateMock.fetchFileFolderElement).toHaveBeenCalledWith(
						"123"
					);
				});

				it("should call fetchFiles", async () => {
					const { fileStorageApiMock } = await setup();

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalled();
				});

				it("should call fetchBoardRequest", async () => {
					const { useBoardStoreMock, parent } = await setup();

					expect(useBoardStoreMock.fetchBoardRequest).toHaveBeenCalledWith({
						boardId: parent.id,
					});
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

				describe("when folder is board", () => {
					it("should call createPageInformation with the correct parentId", async () => {
						const { boardState, parent } = await setup();

						expect(boardState.createPageInformation).toHaveBeenCalledWith(
							parent.id
						);
					});
				});
			});

			describe("when parent is not a board", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Course,
					});
					folderStateMock.parent = ref(parent) as ComputedRef<ParentNodeInfo>;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

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
					expect(async () => await setup()).rejects.toThrow(error);
				});
			});

			describe("when component is loading", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as ComputedRef<ParentNodeInfo>;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					// eslint-disable-next-line @typescript-eslint/no-empty-function
					const mockFolderPromise = new Promise<void>(() => {});
					folderStateMock.fetchFileFolderElement.mockReturnValueOnce(
						mockFolderPromise
					);

					// eslint-disable-next-line @typescript-eslint/no-empty-function
					const mockFilePromise = new Promise<void>(() => {});
					fileStorageApiMock.fetchFiles.mockReturnValueOnce(mockFilePromise);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

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
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const confirmationDialogMock =
						createMock<
							ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
						>();
					jest
						.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog")
						.mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

					const routerSpy = jest.spyOn(router, "replace").mockImplementation();

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

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

			describe("when delete folder button is clicked, dialog confirmed and parent not a board", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Course,
					});
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const confirmationDialogMock =
						createMock<
							ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
						>();
					jest
						.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog")
						.mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

					const routerSpy = jest.spyOn(router, "replace").mockImplementation();

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

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

				it("should throw", async () => {
					const error = new Error("Unsupported parent type");
					expect(async () => await setup()).rejects.toThrow(error);
				});
			});

			describe("when delete folder button is clicked and dialog not confirmed", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const confirmationDialogMock =
						createMock<
							ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
						>();
					jest
						.spyOn(ConfirmationDialog, "useDeleteConfirmationDialog")
						.mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(false);

					const routerSpy = jest.spyOn(router, "replace").mockImplementation();

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

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

			describe("when rename folder button is clicked and dialog confirmed", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const routerSpy = jest.spyOn(router, "replace").mockImplementation();

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

					const kebabMenu = wrapper.find("[data-testid='folder-menu']");
					await kebabMenu.trigger("click");

					const renameButton = wrapper.findComponent(KebabMenuActionRename);
					await renameButton.trigger("click");

					const renameDialog = wrapper.findComponent(VCard);
					const confirmButton = renameDialog.find(
						"[data-testid='dialog-confirm']"
					);
					await confirmButton.trigger("click");

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

				it("should call rename", async () => {
					const { folderStateMock, folderName } = await setup();

					expect(folderStateMock.renameFolder).toHaveBeenCalledWith(
						folderName,
						"123"
					);
				});

				it("should close the dialog", async () => {
					const { wrapper } = await setup();

					const renameDialog = wrapper.findComponent(VCard);
					const cancelButton = renameDialog.find(
						"[data-testid='dialog-cancel']"
					);

					expect(cancelButton.isVisible()).toBe(false);
				});
			});

			describe("when rename folder button is clicked and dialog not confirmed", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const routerSpy = jest.spyOn(router, "replace").mockImplementation();

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

					const kebabMenu = wrapper.find("[data-testid='folder-menu']");
					await kebabMenu.trigger("click");

					const renameButton = wrapper.findComponent(KebabMenuActionRename);
					await renameButton.trigger("click");

					const renameDialog = wrapper.findComponent(VCard);
					const cancelButton = renameDialog.find(
						"[data-testid='dialog-cancel']"
					);
					await cancelButton.trigger("click");

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

				it("should not call rename", async () => {
					const { folderStateMock, folderName } = await setup();

					expect(folderStateMock.renameFolder).not.toHaveBeenCalledWith(
						folderName,
						"123"
					);
				});

				it("should close the dialog", async () => {
					const { wrapper } = await setup();

					const renameDialog = wrapper.findComponent(VCard);
					const cancelButton = renameDialog.find(
						"[data-testid='dialog-cancel']"
					);

					expect(cancelButton.isVisible()).toBe(false);
				});
			});

			describe("when file is checked, deleted by actions menu and confirmed", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Board,
					});
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord,
					]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

					await nextTick();
					await nextTick();
					await nextTick();

					const checkbox = wrapper.find(
						`[data-testid='select-checkbox-${fileRecord.name}']`
					);
					await checkbox.trigger("click");

					const actionMenuButton = wrapper.find(
						`[data-testid='action-menu-button']`
					);
					await actionMenuButton.trigger("click");

					const deleteButton = wrapper.findComponent(
						KebabMenuActionDeleteFiles
					);
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
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Board,
					});
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord,
					]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					jest.spyOn(BoardApi, "useBoardApi").mockReturnValueOnce(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

					await nextTick();
					await nextTick();
					await nextTick();

					const checkbox = wrapper.find(
						`[data-testid='select-checkbox-${fileRecord.name}']`
					);
					await checkbox.trigger("click");

					const actionMenuButton = wrapper.find(
						`[data-testid='action-menu-button']`
					);
					await actionMenuButton.trigger("click");

					const deleteButton = wrapper.findComponent(
						KebabMenuActionDeleteFiles
					);
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
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValueOnce(folderStateMock);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build({ isUploading: true });
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

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

				const includesFileRecordName = wrapper
					.html()
					.includes(fileRecord1.name);

				expect(includesFileRecordName).toBe(true);
			});

			it("should not render file record that is still uploading", async () => {
				const { wrapper, fileRecord2 } = await setup();

				const includesFileRecordName = wrapper
					.html()
					.includes(fileRecord2.name);

				expect(includesFileRecordName).toBe(false);
			});

			it("should not show EmptyFolderState", async () => {
				const { wrapper } = await setup();

				const emptyState = wrapper.findComponent(EmptyFolderSvg);
				expect(emptyState.exists()).toBe(false);
			});

			describe("when user clicks rename button in item menu", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord1,
						fileRecord2,
					]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const itemMenuButton = wrapper.find(
						`[data-testid='kebab-menu-${fileRecord1.name}']`
					);
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

					expect(fileStorageApiMock.rename).toHaveBeenCalledWith(
						fileRecord1.id,
						{
							fileName: "new filename.txt",
						}
					);
				});
			});

			describe("when user clicks delete button in item menu", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					jest
						.spyOn(FolderState, "useFolderState")
						.mockReturnValueOnce(folderStateMock);

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					jest
						.spyOn(BoardApi, "useSharedBoardPageInformation")
						.mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					jest
						.spyOn(FileStorageApi, "useFileStorageApi")
						.mockReturnValueOnce(fileStorageApiMock);

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord1,
						fileRecord2,
					]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					jest
						.spyOn(BoardApi, "useBoardStore")
						.mockReturnValueOnce(useBoardStoreMock);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					jest
						.spyOn(BoardApi, "useBoardPermissions")
						.mockReturnValueOnce(useBoardPermissionsMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const itemMenuButton = wrapper.find(
						`[data-testid='kebab-menu-${fileRecord1.name}']`
					);
					await itemMenuButton.trigger("click");

					// We had to emit the click event on the delete button manually,
					// as the "normal" trigger("click") does not work, when running
					// multiple tests at once.
					const deleteButton = wrapper.findComponent(
						KebabMenuActionDeleteFiles
					);
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

					expect(fileStorageApiMock.deleteFiles).toHaveBeenCalledWith([
						fileRecord1,
					]);
				});
			});
		});

		describe("when folder contains only one file with isUploading true", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValueOnce(folderStateMock);
				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

				const fileRecord1 = fileRecordFactory.build({ isUploading: true });
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

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
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValueOnce(folderStateMock);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([
					{
						title: "Test Folder",
						to: "/test-folder",
					},
				]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

				const { wrapper } = setupWrapper();

				return { wrapper };
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
					.mockReturnValueOnce(folderStateMock);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

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

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

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

	describe("when user has not board edit permission", () => {
		describe("check visibility of the folder menu and fab button", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValueOnce(folderStateMock);

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(false) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

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
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValueOnce(folderStateMock);

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(false) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

				const { wrapper } = setupWrapper();

				await flushPromises();

				const itemMenuButton = wrapper.find(
					`[data-testid='kebab-menu-${fileRecord1.name}']`
				);
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
		});

		describe("check visibility of actions in the action menu", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				jest
					.spyOn(FolderState, "useFolderState")
					.mockReturnValueOnce(folderStateMock);

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				jest
					.spyOn(BoardApi, "useSharedBoardPageInformation")
					.mockReturnValueOnce(boardState);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				jest
					.spyOn(FileStorageApi, "useFileStorageApi")
					.mockReturnValueOnce(fileStorageApiMock);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				jest
					.spyOn(BoardApi, "useBoardStore")
					.mockReturnValueOnce(useBoardStoreMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(false) });
				jest
					.spyOn(BoardApi, "useBoardPermissions")
					.mockReturnValueOnce(useBoardPermissionsMock);

				const { wrapper } = setupWrapper();

				await flushPromises();

				const checkbox = wrapper.find(
					`[data-testid='select-checkbox-${fileRecord1.name}']`
				);
				await checkbox.trigger("click");

				const actionMenuButton = wrapper.find(
					`[data-testid='action-menu-button']`
				);
				await actionMenuButton.trigger("click");

				return { wrapper };
			};

			it("should not show delete button in action menu", async () => {
				const { wrapper } = await setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionDeleteFiles);

				expect(deleteButton.exists()).toBe(false);
			});
		});
	});
});
