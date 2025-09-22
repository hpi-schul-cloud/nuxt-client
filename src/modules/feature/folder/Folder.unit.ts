import { ParentNodeInfo, ParentNodeType } from "@/types/board/ContentElement";
import { FileRecordParent } from "@/types/file/File";
import * as FileHelper from "@/utils/fileHelper";
import {
	fileRecordFactory,
	mockedPiniaStoreTyping,
	parentNodeInfoFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as BoardApi from "@data-board";
import * as FileStorageApi from "@data-file";
import * as FolderState from "@data-folder";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import * as ConfirmationDialog from "@ui-confirmation-dialog";
import { KebabMenuActionDelete, KebabMenuActionRename } from "@ui-kebab-menu";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";
import dayjs from "dayjs";
import { ComputedRef, nextTick, ref } from "vue";
import { VCard, VSkeletonLoader } from "vuetify/lib/components/index";
import DeleteFileDialog from "./file-table/DeleteFileDialog.vue";
import EmptyFolderSvg from "./file-table/EmptyFolderSvg.vue";
import KebabMenuActionDeleteFiles from "./file-table/KebabMenuActionDeleteFiles.vue";
import KebabMenuActionDownloadFiles from "./file-table/KebabMenuActionDownloadFiles.vue";
import RenameFileDialog from "./file-table/RenameFileDialog.vue";
import Folder from "./Folder.vue";
import FolderMenu from "./FolderMenu.vue";
import { Mock } from "vitest";
import { Router, useRouter } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useBoardStore } from "@/modules/data/board/Board.store"; // FIX_CIRCULAR_DEPENDENCY

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

vi.mock("@data-board/BoardApi.composable");
const mockedUseBoardApi = vi.mocked(BoardApi.useBoardApi);

describe("Folder.vue", () => {
	enableAutoUnmount(afterEach);

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	const buildUploadStatsTranslation = (uploaded: string, total: string) => {
		return `${uploaded} von ${total} Dateien hochgeladen`;
	};
	const setupWrapper = () => {
		const router: DeepMocked<Router> = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		vi.spyOn(FileHelper, "downloadFilesAsArchive");
		vi.spyOn(FileHelper, "downloadFile");

		const notifierModule = createModuleMocks(NotifierModule);

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
					createTestingPinia(),
				],
				stubs: { ConfirmationDialog: true, UseFocusTrap: true },
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
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
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const { wrapper } = setupWrapper();
					const useBoardStoreMock = mockedPiniaStoreTyping(useBoardStore);

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
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as ComputedRef<ParentNodeInfo>;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);
					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

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
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const confirmationDialogMock =
						createMock<
							ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
						>();
					vi.spyOn(
						ConfirmationDialog,
						"useDeleteConfirmationDialog"
					).mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const confirmationDialogMock =
						createMock<
							ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
						>();
					vi.spyOn(
						ConfirmationDialog,
						"useDeleteConfirmationDialog"
					).mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(true);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const confirmationDialogMock =
						createMock<
							ReturnType<typeof ConfirmationDialog.useDeleteConfirmationDialog>
						>();
					vi.spyOn(
						ConfirmationDialog,
						"useDeleteConfirmationDialog"
					).mockReturnValueOnce(confirmationDialogMock);
					confirmationDialogMock.askDeleteConfirmation.mockResolvedValue(false);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = ref(
						"Test Folder"
					) as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const { wrapper, router } = setupWrapper();

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
						router,
						parent,
					};
				};

				it("should call rename", async () => {
					const { folderStateMock, folderName } = await setup();

					expect(folderStateMock.renameFolder).toHaveBeenCalledWith(
						folderName.value,
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

				it("should emit 'update:folder-name' event", async () => {
					const { wrapper, folderStateMock } = await setup();

					await flushPromises();

					// @ts-expect-error accessing private property
					folderStateMock.folderName.value = "New Name";
					await flushPromises();

					expect(wrapper.emitted("update:folder-name")).toEqual([
						["Test Folder"],
						["New Name"],
					]);
				});
			});

			describe("when rename folder button is clicked and dialog not confirmed", () => {
				const setup = async () => {
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const { wrapper, router } = setupWrapper();

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
						router,
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
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord,
					]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const { wrapper } = setupWrapper();

					await flushPromises();

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
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

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
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord,
					]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const { wrapper } = setupWrapper();

					await flushPromises();

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
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build({ isUploading: true });
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord1,
						fileRecord2,
					]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord1,
						fileRecord2,
					]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

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
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);
				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				const fileRecord1 = fileRecordFactory.build({ isUploading: true });
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

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
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

				const { wrapper } = setupWrapper();

				return { wrapper };
			};

			it("should show the breadcrumbs", () => {
				const { wrapper } = setup();

				const breadcrumbItem = wrapper.html().includes("Test Folder");
				expect(breadcrumbItem).toBe(true);
			});
		});

		describe("when fab button is clicked, files are selected and upload succeed", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

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

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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

		describe("when fab button is clicked, files are selected and one upload fails", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

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

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(true) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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
						buildUploadStatsTranslation("1", "2")
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
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(false) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardState = createMock<
					ReturnType<typeof BoardApi.useSharedBoardPageInformation>
				>({});
				vi.spyOn(BoardApi, "useSharedBoardPageInformation").mockReturnValueOnce(
					boardState
				);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(false) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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

			it("should show download button in item menu", async () => {
				const { wrapper } = await setup();

				const downloadButton = wrapper.findComponent(
					KebabMenuActionDownloadFiles
				);

				expect(downloadButton.exists()).toBe(true);
			});
		});

		describe("check visibility of actions in the action menu", () => {
			const setup = async () => {
				const folderStateMock =
					createMock<ReturnType<typeof FolderState.useFolderState>>();
				vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
					folderStateMock
				);

				const parent = parentNodeInfoFactory.build();
				folderStateMock.parent = ref(parent) as unknown as ComputedRef;

				const folderName = "Test Folder" as unknown as ComputedRef<string>;
				folderStateMock.folderName = folderName;
				folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

				const boardApiMock =
					createMock<ReturnType<typeof BoardApi.useBoardApi>>();
				mockedUseBoardApi.mockReturnValue(boardApiMock);

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				const fileRecord1 = fileRecordFactory.build();
				const fileRecord2 = fileRecordFactory.build();
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecord1,
					fileRecord2,
				]);

				const useBoardStoreMock =
					createMock<ReturnType<typeof BoardApi.useBoardStore>>();
				vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
					useBoardStoreMock
				);

				const useBoardPermissionsMock = createMock<
					ReturnType<typeof BoardApi.useBoardPermissions>
				>({ hasEditPermission: ref(false) });
				vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
					useBoardPermissionsMock
				);

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

			it("should show download button in action menu", async () => {
				const { wrapper } = await setup();

				const downloadButton = wrapper.findComponent(
					KebabMenuActionDownloadFiles
				);

				expect(downloadButton.exists()).toBe(true);
			});
		});

		describe("download handlers", () => {
			describe("when user clicks download button in action menu", () => {
				const setup = async () => {
					HTMLFormElement.prototype.submit = vi.fn();
					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

					folderStateMock.mapNodeTypeToPathType.mockImplementationOnce(
						() => "boards"
					);

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = ref(folderName);
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const parent = parentNodeInfoFactory.build({
						type: ParentNodeType.Board,
					});
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					const fileRecord = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord,
					]);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(true) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const checkbox = wrapper.find(
						`[data-testid='select-checkbox-${fileRecord.name}']`
					);
					await checkbox.trigger("click");

					const actionMenuButton = wrapper.find(
						`[data-testid='action-menu-button']`
					);
					await actionMenuButton.trigger("click");

					const downloadButton = wrapper.findComponent(
						KebabMenuActionDownloadFiles
					);
					await downloadButton.trigger("click");

					const now = dayjs().format("YYYYMMDD");
					const expectedResult = {
						archiveName: `${now}_${folderName}`,
						fileRecordIds: [fileRecord.id],
					};

					return {
						expectedResult,
					};
				};

				it("should call downloadFilesAsArchive", async () => {
					const { expectedResult } = await setup();

					expect(FileHelper.downloadFilesAsArchive).toHaveBeenCalledWith(
						expectedResult
					);
				});
			});

			describe("when user clicks download button in item menu", () => {
				const setup = async () => {
					HTMLAnchorElement.prototype.click = vi.fn();

					const folderStateMock =
						createMock<ReturnType<typeof FolderState.useFolderState>>();
					vi.spyOn(FolderState, "useFolderState").mockReturnValueOnce(
						folderStateMock
					);

					const parent = parentNodeInfoFactory.build();
					folderStateMock.parent = ref(parent) as unknown as ComputedRef;

					const folderName = "Test Folder" as unknown as ComputedRef<string>;
					folderStateMock.folderName = folderName;
					folderStateMock.breadcrumbs = ref([]) as unknown as ComputedRef;

					const boardState = createMock<
						ReturnType<typeof BoardApi.useSharedBoardPageInformation>
					>({});
					vi.spyOn(
						BoardApi,
						"useSharedBoardPageInformation"
					).mockReturnValueOnce(boardState);

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);

					const fileRecord1 = fileRecordFactory.build();
					const fileRecord2 = fileRecordFactory.build();
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord1,
						fileRecord2,
					]);

					const useBoardStoreMock =
						createMock<ReturnType<typeof BoardApi.useBoardStore>>();
					vi.spyOn(BoardApi, "useBoardStore").mockReturnValueOnce(
						useBoardStoreMock
					);

					const useBoardPermissionsMock = createMock<
						ReturnType<typeof BoardApi.useBoardPermissions>
					>({ hasEditPermission: ref(false) });
					vi.spyOn(BoardApi, "useBoardPermissions").mockReturnValueOnce(
						useBoardPermissionsMock
					);

					const boardApiMock =
						createMock<ReturnType<typeof BoardApi.useBoardApi>>();
					mockedUseBoardApi.mockReturnValue(boardApiMock);

					const { wrapper } = setupWrapper();

					await flushPromises();

					const itemMenuButton = wrapper.find(
						`[data-testid='kebab-menu-${fileRecord1.name}']`
					);
					await itemMenuButton.trigger("click");

					const itemDownloadButton = wrapper.findComponent(
						KebabMenuActionDownloadFiles
					);
					await itemDownloadButton.trigger("click");

					const expectedResult = [
						`${fileRecord1.id}/${fileRecord1.name}`,
						`${fileRecord1.name}`,
					];

					return {
						expectedResult,
						wrapper,
					};
				};

				it("should call downloadFile", async () => {
					const { expectedResult } = await setup();

					expect(FileHelper.downloadFile).toHaveBeenCalledWith(
						...expectedResult
					);
				});
			});
		});
	});
});
