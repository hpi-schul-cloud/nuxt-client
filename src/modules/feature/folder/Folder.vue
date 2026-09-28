<template>
	<DefaultWireframe max-width="full" :breadcrumbs="extendedBreadcrumbs" :fab-items="fabItems">
		<template #header>
			<div class="d-flex align-center">
				<h1 data-testid="folder-title">
					{{ displayName }}
				</h1>
				<FolderMenu
					v-if="allowedOperations.createFileElement && !currentFolderId"
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
				:current-folder-id="currentFolderId"
				:upload-progress="uploadProgress"
				:are-upload-stats-visible="areUploadStatsVisible"
				:is-over-drop-zone="isOverDropZone"
				@delete-files="onDeleteFiles"
				@update:name="onUpdateName"
				@reset-upload-progress="resetUploadProgress"
				@download-file="downloadFileHandler"
				@download-files-as-archive="downloadFilesAsArchiveHandler"
				@click:browse="uploadFile"
				@navigate-into-folder="onNavigateIntoFolder"
				@move-record="onMoveRecord"
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
	<CreateFolderDialog
		v-model:is-dialog-open="isCreateFolderDialogOpen"
		@confirm="onCreateSubfolderConfirm"
		@cancel="onCreateSubfolderCancel"
	/>
	<input ref="fileInput" type="file" multiple hidden data-testid="input-folder-fileupload" aria-hidden="true" />
	<LightBox />
	<AddCollaboraFileDialog @create-collabora-file="onCreateCollaboraFile" />
</template>

<script setup lang="ts">
import CreateFolderDialog from "./CreateFolderDialog.vue";
import FileTable from "./file-table/FileTable.vue";
import FolderMenu from "./FolderMenu.vue";
import RenameFolderDialog from "./RenameFolderDialog.vue";
import { ParentNodeType } from "@/types/board/ContentElement";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { downloadFile, downloadFilesAsArchive, extractFilesFromItems, filterByFolderId } from "@/utils/fileHelper";
import { buildPageTitle } from "@/utils/pageTitle";
import { useSharedBoardPageInformation } from "@data-board";
import { useEnvConfig } from "@data-env";
import { useFileStorageApi } from "@data-file";
import { useFolderState } from "@data-folder";
import type { CreateCollaboraFilePayload } from "@feature-collabora";
import { AddCollaboraFileDialog, useAddCollaboraFile } from "@feature-collabora";
import { mdiFileDocumentPlusOutline, mdiFolderPlusOutline, mdiPlus, mdiTrayArrowUp } from "@icons/material";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { LightBox } from "@ui-light-box";
import { FabAction } from "@ui-speed-dial-menu";
import { useErrorHandler } from "@util-error-handling";
import { useDropZone, useEventListener } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, onMounted, PropType, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
	subFolderPath: {
		type: Array as PropType<string[]>,
		default: () => [],
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
	fileFolderElement,
	folderName,
	mapNodeTypeToPathType,
	parent,
	removeFolder,
	renameFolder,
} = useFolderState();

const { createPageInformation } = useSharedBoardPageInformation();

const {
	fetchFiles,
	upload,
	uploadCollaboraFile,
	getFileRecordsByParentId,
	deleteFiles,
	rename,
	createFolder,
	moveFile,
} = useFileStorageApi();

const { handleError, notifyWithTemplate } = useErrorHandler();

const { openCollaboraFileDialog } = useAddCollaboraFile();

const folderId = toRef(props, "folderId");
const subFolderPath = toRef(props, "subFolderPath");
const currentFolderId = computed<string | undefined>(() => subFolderPath.value.at(-1));

/**
 * Names of nested subfolders, populated when navigating into them via a row click so the
 * breadcrumb can show a real name instead of a raw id. Not populated on a direct/deep-link
 * page load - see docs/nested-folders.md for this accepted limitation.
 */
const subfolderNameCache = ref<Map<string, string>>(new Map());

const displayName = computed(() => {
	if (!currentFolderId.value) return folderName.value;

	return subfolderNameCache.value.get(currentFolderId.value) ?? t("pages.folder.untitled");
});

const extendedBreadcrumbs = computed<Breadcrumb[]>(() => {
	if (subFolderPath.value.length === 0 || breadcrumbs.value.length === 0) return breadcrumbs.value;

	const rootCrumbIndex = breadcrumbs.value.length - 1;
	const items: Breadcrumb[] = [
		...breadcrumbs.value.slice(0, rootCrumbIndex),
		{ ...breadcrumbs.value[rootCrumbIndex], disabled: false, to: `/folder/${folderId.value}` },
	];

	subFolderPath.value.forEach((id, index) => {
		const isLast = index === subFolderPath.value.length - 1;

		items.push({
			title: subfolderNameCache.value.get(id) ?? t("pages.folder.untitled"),
			disabled: isLast,
			to: isLast ? undefined : `/folder/${folderId.value}/${subFolderPath.value.slice(0, index + 1).join("/")}`,
		});
	});

	return items;
});

const allFileRecords = computed(() => getFileRecordsByParentId(folderId.value));
const fileRecords = computed(() => filterByFolderId(allFileRecords.value, currentFolderId.value));

const fileInput = ref<HTMLInputElement | null>(null);
const dropZoneRef = ref<HTMLDivElement | null>(null);
const isRenameDialogOpen = ref(false);
const isCreateFolderDialogOpen = ref(false);

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

	actions.push({
		icon: mdiFolderPlusOutline,
		label: t("pages.folder.fab.create-folder"),
		dataTestId: "fab-button-create-folder",
		clickHandler: () => {
			isCreateFolderDialogOpen.value = true;
		},
	});

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
	const archiveName = `${now}_${displayName.value}`;

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

const onNavigateIntoFolder = (record: FileRecord) => {
	subfolderNameCache.value.set(record.id, record.name);
	router.push({
		name: "folder-id",
		params: { id: folderId.value, subPath: [...subFolderPath.value, record.id] },
	});
};

const onMoveRecord = async (record: FileRecord, targetFolderId: string | undefined) => {
	await moveFile(record.id, targetFolderId);
};

const onCreateSubfolderConfirm = async (name: string) => {
	await createFolder(name, folderId.value, FileRecordParent.BOARDNODES, currentFolderId.value);
	isCreateFolderDialogOpen.value = false;
};

const onCreateSubfolderCancel = () => {
	isCreateFolderDialogOpen.value = false;
};

const onCreateCollaboraFile = async (payload: CreateCollaboraFilePayload) => {
	const newFile = await uploadCollaboraFile(
		payload.type,
		props.folderId,
		FileRecordParent.BOARDNODES,
		payload.fileName,
		currentFolderId.value
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

	/******************************************************************************
	 * e2e tests (hpi-schul-cloud/e2e-system-tests) depend on this window.open() call
	 * to intercept the editor URL via a stub. Do NOT replace this with an
	 * <a target="_blank"> link, router navigation, or any other mechanism that bypasses
	 * window.open — doing so will break the e2e tests.
	 ******************************************************************************/
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

const loadCurrentLevelFiles = async () => {
	try {
		await fetchFiles(folderId.value, FileRecordParent.BOARDNODES, currentFolderId.value);
	} catch {
		fileStorageError.value = true;
	}
};

watch(currentFolderId, () => {
	if (fileFolderElement.value) {
		loadCurrentLevelFiles();
	}
});

onMounted(async () => {
	if (fileInput.value) {
		fileInput.value.addEventListener("change", async (event) => onFileSelection(event));
	}

	await fetchFileFolderElement(props.folderId);
	if (!fileFolderElement.value) {
		isLoading.value = false;
		return;
	}

	await loadCurrentLevelFiles();

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
			await upload(file, props.folderId, FileRecordParent.BOARDNODES, undefined, currentFolderId.value);
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
	() => displayName.value,
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
