<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs" :fab-items="fabItems">
		<template #header>
			<div class="d-flex align-center">
				<h1 data-testid="folder-title">
					{{ folderName }}
				</h1>
				<FolderMenu
					v-if="allowedOperations.createFileElement"
					:folder-name="folderName"
					@delete="onDelete"
					@rename="onRenameActionClick"
				/>
			</div>
		</template>
		<div ref="dropZoneRef" class="drop-zone">
			<FileTable
				:is-loading="isLoading"
				:is-empty="isEmpty"
				:file-storage-error="fileStorageError"
				:has-edit-permission="allowedOperations.createFileElement"
				:file-records="uploadedFileRecords"
				:upload-progress="uploadProgress"
				:are-upload-stats-visible="areUploadStatsVisible"
				:is-over-drop-zone="isOverDropZone"
				@delete-files="onDeleteFiles"
				@update:name="onUpdateName"
				@reset-upload-progress="resetUploadProgress"
				@download-file="downloadFileHandler"
				@download-files-as-archive="downloadFilesAsArchiveHandler"
				@click:browse="uploadFile"
			/>
			<div
				v-if="isOverDropZone && allowedOperations.createFileElement && !isEmpty"
				class="drop-zone__overlay"
				aria-hidden="true"
			>
				<span class="drop-zone__overlay-text">{{ t("pages.folder.dropZone.dropFilesHere") }}</span>
			</div>
		</div>
		<div v-if="allowedOperations.createFileElement" class="d-flex justify-start mt-2">
			<RouterLink :to="{ name: 'folder-trash', params: { id: folderId } }" data-testid="trash-link">
				{{ t("pages.folder.trash.link") }}
			</RouterLink>
		</div>
	</DefaultWireframe>
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
import { ParentNodeType } from "@/types/board/ContentElement";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { downloadFile, downloadFilesAsArchive, extractFilesFromItems } from "@/utils/fileHelper";
import { buildPageTitle } from "@/utils/pageTitle";
import { useSharedBoardPageInformation } from "@data-board";
import { useEnvConfig } from "@data-env";
import { useFileStorageApi } from "@data-file";
import { useFolderState } from "@data-folder";
import type { CreateCollaboraFilePayload } from "@feature-collabora";
import { AddCollaboraFileDialog, useAddCollaboraFile } from "@feature-collabora";
import { mdiFileDocumentPlusOutline, mdiPlus, mdiTrayArrowUp } from "@icons/material";
import { DefaultWireframe } from "@ui-layout";
import { LightBox } from "@ui-light-box";
import { FabAction } from "@ui-speed-dial-menu";
import { useErrorHandler } from "@util-error-handling";
import { useDropZone, useEventListener } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

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

const {
	allowedOperations,
	breadcrumbs,
	fetchAllowedOperations,
	fetchFileFolderElement,
	folderName,
	mapNodeTypeToPathType,
	parent,
	removeFolder,
	renameFolder,
} = useFolderState();

const { createPageInformation } = useSharedBoardPageInformation();

const { fetchFiles, upload, uploadCollaboraFile, getFileRecordsByParentId, deleteFiles, rename } = useFileStorageApi();

const { handleError, notifyWithTemplate } = useErrorHandler();

const { openCollaboraFileDialog } = useAddCollaboraFile();

const folderId = toRef(props, "folderId");
const fileRecords = computed(() => getFileRecordsByParentId(folderId.value));

const fileInput = ref<HTMLInputElement | null>(null);
const dropZoneRef = ref<HTMLDivElement | null>(null);
const isRenameDialogOpen = ref(false);

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);

const fabItems = computed(() => {
	if (!allowedOperations.value.createFileElement) return;

	const actions: FabAction[] = [
		{
			icon: mdiPlus,
			label: t("pages.folder.fab.title"),
			dataTestId: "fab-add-files",
		},
		{
			icon: mdiTrayArrowUp,
			label: t("pages.folder.fab.upload-file"),
			dataTestId: "fab-button-upload-file",
			clickHandler: uploadFile,
		},
	];

	if (isCollaboraEnabled.value) {
		actions.push({
			icon: mdiFileDocumentPlusOutline,
			label: t("pages.folder.fab.create-document"),
			dataTestId: "fab-button-create-document",
			clickHandler: openCollaboraFileDialog,
		});
	}

	return actions;
});

const uploadProgress = ref({
	uploaded: 0,
	total: 0,
});
const areUploadStatsVisible = ref(false);
const isLoading = ref(true);
const isEmpty = computed(() => uploadedFileRecords.value.length === 0);
const fileStorageError = ref(false);
const runningUploads = ref<number>(0);

const uploadedFileRecords = computed(() => fileRecords.value.filter((fileRecord) => !fileRecord.isUploading));

const uploadFile = () => {
	if (fileInput.value) {
		// Reset the file input to allow re-uploading the same file
		fileInput.value.value = "";
		fileInput.value.click();
	}
};

const onDelete = async () => {
	const shouldDelete = await askDeletionForType("components.cardElement.folderElement");

	if (!shouldDelete) {
		return;
	}

	const parentIsBoard = parent.value.type === ParentNodeType.BOARD;

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
		await removeFolder(folderId);
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
			edit: allowedOperations.value.createFileElement.toString(),
		},
	}).href;
	window.open(url, "_blank");
};

const { isOverDropZone } = useDropZone(dropZoneRef);

useEventListener(dropZoneRef, "drop", async (event: DragEvent) => {
	event.preventDefault();
	if (!event.dataTransfer?.items || !allowedOperations.value.createFileElement) return;

	const files = await extractFilesFromItems(event.dataTransfer.items);
	if (files.length === 0) return;

	await uploadFiles(files);
});

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

	const success = await fetchFileFolderElement(props.folderId);
	if (!success) return;

	try {
		await fetchFiles(folderId.value, FileRecordParent.BOARDNODES);
	} catch {
		fileStorageError.value = true;
	}

	await fetchAllowedOperations(parent.value.id);

	isLoading.value = false;
});

const onFileSelection = async (event: Event) => {
	const files = (event.target as HTMLInputElement).files;

	if (!files) return;

	const fileArray = Array.from(files);

	await uploadFiles(fileArray);
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
	incrementUploadProgressTotal(files.length);
	incrementRunningUploads(files.length);

	await Promise.allSettled(
		files.map(async (file) => {
			await upload(file, props.folderId, FileRecordParent.BOARDNODES);
			incrementUploadProgressUploaded(1);
		})
	);

	decrementRunningUploads(files.length);
};

watch(
	parent,
	(newParent) => {
		if (newParent && newParent.type === ParentNodeType.BOARD) {
			createPageInformation(parent.value.id);
		} else if (newParent && newParent.type !== ParentNodeType.BOARD) {
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

<style scoped>
.drop-zone {
	position: relative;
}

.drop-zone__overlay {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px dashed rgb(var(--v-theme-primary));
	border-radius: 4px;
	background-color: rgba(var(--v-theme-primary), 0.5);
	pointer-events: none;
	z-index: 10;
}

.drop-zone__overlay-text {
	font-size: 1.75rem;
	font-weight: 700;
	color: white;
	text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
</style>
