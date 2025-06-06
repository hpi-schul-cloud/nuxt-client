<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="fabClickHandler"
	>
		<template #header>
			<div class="d-flex align-items-center">
				<h1 class="text-h3 mb-4" data-testid="folder-title">
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
			@delete-files="onDeleteFiles"
			@update:name="onUpdateName"
			@reset-upload-progress="onResetUploadProgress"
		/>
	</DefaultWireframe>
	<ConfirmationDialog />
	<RenameFolderDialog
		v-model:is-dialog-open="isRenameDialogOpen"
		:name="folderName"
		@confirm="onRename"
		@cancel="onRenameCancel"
	/>
	<input
		ref="fileInput"
		type="file"
		multiple
		hidden
		data-testid="input-folder-fileupload"
		aria-hidden="true"
	/>
	<LightBox />
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import router from "@/router";
import { ParentNodeType } from "@/types/board/ContentElement";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import {
	useBoardApi,
	useBoardPermissions,
	useBoardStore,
	useSharedBoardPageInformation,
} from "@data-board";
import { useFileStorageApi } from "@data-file";
import { useFolderState } from "@data-folder";
import { mdiPlus } from "@icons/material";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { LightBox } from "@ui-light-box";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import FileTable from "./file-table/FileTable.vue";
import FolderMenu from "./FolderMenu.vue";
import RenameFolderDialog from "./RenameFolderDialog.vue";

const boardApi = useBoardApi();

const { t } = useI18n();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const {
	breadcrumbs,
	folderName,
	fetchFileFolderElement,
	parent,
	mapNodeTypeToPathType,
	renameFolder,
} = useFolderState();

const { createPageInformation } = useSharedBoardPageInformation();

const { fetchFiles, upload, getFileRecordsByParentId, deleteFiles, rename } =
	useFileStorageApi();

const boardStore = useBoardStore();

const { hasEditPermission } = useBoardPermissions();

const folderId = toRef(props, "folderId");
const fileRecords = computed(() => getFileRecordsByParentId(folderId.value));
const fileInput = ref<HTMLInputElement | null>(null);
const isRenameDialogOpen = ref(false);

const fabAction = computed(() => {
	if (!hasEditPermission.value) return;

	return {
		icon: mdiPlus,
		title: t("pages.folder.fab.title"),
		ariaLabel: t("pages.folder.fab.title"),
		dataTestId: "fab-add-files",
	};
});

const uploadProgress = ref({
	uploaded: 0,
	total: 0,
});
const isLoading = ref(true);
const isEmpty = computed(() => uploadedFileRecords.value.length === 0);

const uploadedFileRecords = computed(() => {
	return fileRecords.value.filter((fileRecord) => !fileRecord.isUploading);
});

const fabClickHandler = () => {
	if (fileInput.value) {
		fileInput.value.click();
	}
};

const uploadFiles = async (files: File[]) => {
	await Promise.all(
		files.map(async (file) => {
			await upload(file, props.folderId, FileRecordParent.BOARDNODES);

			uploadProgress.value.uploaded += 1;
		})
	);
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

const onUpdateName = async (fileName: string, fileRecord: FileRecord) => {
	await rename(fileRecord.id, { fileName });
};

const deleteAndNavigateToBoard = async (folderId: string) => {
	const boardPath = mapNodeTypeToPathType(parent.value.type);

	await boardApi.deleteElementCall(folderId);
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

const onResetUploadProgress = () => {
	uploadProgress.value = { uploaded: 0, total: 0 };
};

onMounted(async () => {
	if (fileInput.value) {
		fileInput.value.addEventListener("change", async (event) => {
			const files = (event.target as HTMLInputElement).files;

			if (files) {
				const fileArray = Array.from(files);
				uploadProgress.value.total += fileArray.length;

				await uploadFiles(fileArray);
			}
		});
	}

	await fetchFileFolderElement(props.folderId);
	await fetchFiles(folderId.value, FileRecordParent.BOARDNODES);
	if (!boardStore.board) {
		await boardStore.fetchBoardRequest({ boardId: parent.value.id });
	}

	isLoading.value = false;
});

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
</script>
