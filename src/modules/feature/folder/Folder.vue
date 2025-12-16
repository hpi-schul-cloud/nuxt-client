<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@on-fab-item-click="fabItemClickHandler"
	>
		<template #header>
			<div class="d-flex align-center">
				<h1 data-testid="folder-title">
					{{ folderName }}
				</h1>
				<FolderMenu
					v-if="hasEditPermission"
					:folder-name="folderName"
					@delete="onDelete"
					@rename="onRenameActionClick"
				/>
			</div>
		</template>
		<FileTable
			:is-loading="isLoading"
			:is-empty="isEmpty"
			:has-edit-permission="hasEditPermission"
			:file-records="uploadedFileRecords"
			:upload-progress="uploadProgress"
			:are-upload-stats-visible="areUploadStatsVisible"
			@delete-files="onDeleteFiles"
			@update:name="onUpdateName"
			@reset-upload-progress="resetUploadProgress"
			@download-file="downloadFileHandler"
			@download-files-as-archive="downloadFilesAsArchiveHandler"
		/>
	</DefaultWireframe>
	<ConfirmationDialog />
	<RenameFolderDialog
		v-model:is-dialog-open="isRenameDialogOpen"
		:name="folderName"
		@confirm="onRename"
		@cancel="onRenameCancel"
	/>
	<input ref="fileInput" type="file" multiple hidden data-testid="input-folder-fileupload" aria-hidden="true" />
	<LightBox />
	<AddCollaboraFileDialog @create-collabora-file="onCreateCollaboraFile" />
</template>

<script setup lang="ts">
import FileTable from "./file-table/FileTable.vue";
import FolderMenu from "./FolderMenu.vue";
import RenameFolderDialog from "./RenameFolderDialog.vue";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ParentNodeType } from "@/types/board/ContentElement";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import { downloadFile, downloadFilesAsArchive } from "@/utils/fileHelper";
import { buildPageTitle } from "@/utils/pageTitle";
import { useBoardApi, useBoardPermissions, useBoardStore, useSharedBoardPageInformation } from "@data-board";
import { useEnvConfig } from "@data-env";
import { useFileStorageApi } from "@data-file";
import { useFolderState } from "@data-folder";
import type { CreateCollaboraFilePayload } from "@feature-collabora";
import { AddCollaboraFileDialog, useAddCollaboraFile } from "@feature-collabora";
import { mdiFileDocumentPlusOutline, mdiPlus, mdiTrayArrowUp } from "@icons/material";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import dayjs from "dayjs";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const boardApi = useBoardApi();

const { t } = useI18n();
const router = useRouter();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(update: "update:folder-name", pageTitle: string): void;
}>();

const { breadcrumbs, folderName, fetchFileFolderElement, parent, mapNodeTypeToPathType, renameFolder } =
	useFolderState();

const { createPageInformation } = useSharedBoardPageInformation();

const { fetchFiles, upload, uploadCollaboraFile, getFileRecordsByParentId, deleteFiles, rename } = useFileStorageApi();

const boardStore = useBoardStore();

const { hasEditPermission } = useBoardPermissions();
const { handleError, notifyWithTemplate } = useErrorHandler();

const { openCollaboraFileDialog } = useAddCollaboraFile();

const folderId = toRef(props, "folderId");
const fileRecords = computed(() => getFileRecordsByParentId(folderId.value));

const fileInput = ref<HTMLInputElement | null>(null);
const isRenameDialogOpen = ref(false);

const enum FabEvent {
	CreateDocument = "CREATE_DOCUMENT",
	UploadFile = "UPLOAD_FILE",
}

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);

const fabAction = computed(() => {
	if (!hasEditPermission.value) return;

	const actions = [
		{
			icon: mdiTrayArrowUp,
			label: t("pages.folder.fab.upload-file"),
			ariaLabel: t("pages.folder.fab.upload-file"),
			dataTestId: "fab-button-upload-file",
			customEvent: FabEvent.UploadFile,
		},
	];

	if (isCollaboraEnabled.value) {
		actions.push({
			icon: mdiFileDocumentPlusOutline,
			label: t("pages.folder.fab.create-document"),
			ariaLabel: t("pages.folder.fab.create-document"),
			dataTestId: "fab-button-create-document",
			customEvent: FabEvent.CreateDocument,
		});
	}

	return {
		icon: mdiPlus,
		title: t("pages.folder.fab.title"),
		ariaLabel: t("pages.folder.fab.title"),
		dataTestId: "fab-add-files",
		actions: actions,
	};
});

const uploadProgress = ref({
	uploaded: 0,
	total: 0,
});
const areUploadStatsVisible = ref(false);
const isLoading = ref(true);
const isEmpty = computed(() => uploadedFileRecords.value.length === 0);
const runningUploads = ref<number>(0);

const uploadedFileRecords = computed(() => fileRecords.value.filter((fileRecord) => !fileRecord.isUploading));

const fabItemClickHandler = (event: string | undefined): void => {
	if (event === FabEvent.UploadFile) {
		if (fileInput.value) {
			// Reset the file input to allow re-uploading the same file
			fileInput.value.value = "";
			fileInput.value.click();
		}
	} else if (event === FabEvent.CreateDocument) {
		openCollaboraFileDialog();
	}
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;

	if (!shouldDelete) {
		return;
	}

	const parentIsBoard = parent.value.type === ParentNodeType.Board;

	if (parentIsBoard) {
		deleteAndNavigateToBoard(folderId.value);
	} else {
		throw new Error("Unsupported parent type");
	}
};

const onDeleteFiles = async (fileRecords: FileRecord[]) => {
	await deleteFiles(fileRecords);
};

const downloadFileHandler = (selectedIds: string[]) => {
	const fileRecord = fileRecords.value.find((file) => file.id === selectedIds[0]);
	if (fileRecord) {
		downloadFile(fileRecord.url, fileRecord.name);
	}
};

const downloadFilesAsArchiveHandler = async (selectedIds: string[]) => {
	const now = dayjs().format("YYYYMMDD");
	const archiveName = `${now}_${folderName.value}`;

	downloadFilesAsArchive({
		fileRecordIds: selectedIds,
		archiveName,
	});
};

const onUpdateName = async (fileName: string, fileRecord: FileRecord) => {
	await rename(fileRecord.id, { fileName });
};

const deleteAndNavigateToBoard = async (folderId: string) => {
	const boardPath = mapNodeTypeToPathType(parent.value.type);

	try {
		await boardApi.deleteElementCall(folderId);
	} catch (error) {
		handleError(error, {
			404: notifyWithTemplate("notDeleted", "boardElement"),
		});
	}
	router.replace(`/${boardPath}/${parent.value.id}`);
};

const onRenameActionClick = () => {
	isRenameDialogOpen.value = true;
};

const onRename = async (newName: string) => {
	await renameFolder(newName, folderId.value);
	isRenameDialogOpen.value = false;
};

const onRenameCancel = () => {
	isRenameDialogOpen.value = false;
};

const onCreateCollaboraFile = async (payload: CreateCollaboraFilePayload) => {
	const newFile = await uploadCollaboraFile(
		payload.type,
		props.folderId,
		FileRecordParent.BOARDNODES,
		payload.fileName
	);
	if (!newFile) return;

	const url = router.resolve({
		name: "collabora",
		params: {
			id: newFile.id,
		},
		query: {
			edit: hasEditPermission.value.toString(),
		},
	}).href;
	window.open(url, "_blank");
};

const resetUploadProgress = () => {
	uploadProgress.value = { uploaded: 0, total: 0 };
};
const incrementUploadProgressTotal = (count: number) => {
	uploadProgress.value.total += count;
};
const incrementUploadProgressUploaded = (count: number) => {
	uploadProgress.value.uploaded += count;
};

const showUploadStats = () => {
	areUploadStatsVisible.value = true;
};
const hideUploadStats = () => {
	areUploadStatsVisible.value = false;
};

const incrementRunningUploads = (count: number) => {
	runningUploads.value += count;
};
const decrementRunningUploads = (count: number) => {
	runningUploads.value -= count;
};

onMounted(async () => {
	if (fileInput.value) {
		fileInput.value.addEventListener("change", async (event) => onFileSelection(event));
	}

	await fetchFileFolderElement(props.folderId);
	await fetchFiles(folderId.value, FileRecordParent.BOARDNODES);
	if (!boardStore.board || boardStore.board.id !== parent.value.id) {
		await boardStore.fetchBoardRequest({ boardId: parent.value.id });
	}

	isLoading.value = false;
});

const onFileSelection = async (event: Event) => {
	const files = (event.target as HTMLInputElement).files;

	if (!files) return;

	const fileArray = Array.from(files);
	incrementUploadProgressTotal(fileArray.length);

	incrementRunningUploads(fileArray.length);
	await uploadFiles(fileArray);
	decrementRunningUploads(fileArray.length);
};

watch(
	() => runningUploads.value,
	(newCount) => {
		if (newCount === 0) {
			hideUploadStats();
		} else {
			showUploadStats();
		}
	}
);

const uploadFiles = async (files: File[]) => {
	await Promise.allSettled(
		files.map(async (file) => {
			await upload(file, props.folderId, FileRecordParent.BOARDNODES);
			incrementUploadProgressUploaded(1);
		})
	);
};

watch(
	parent,
	(newParent) => {
		if (newParent && newParent.type === ParentNodeType.Board) {
			createPageInformation(parent.value.id);
		} else if (newParent && newParent.type !== ParentNodeType.Board) {
			throw new Error("Unsupported parent type");
		}
	},
	{ immediate: true }
);

watch(
	() => folderName.value,
	(newName) => {
		emit("update:folder-name", buildPageTitle(newName, parent.value?.name));
	},
	{ immediate: true }
);
</script>
