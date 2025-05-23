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
					v-if="!isStudent"
					:folder-name="folderName"
					@delete="onDelete"
				/>
			</div>
		</template>
		<FileTable
			:is-loading="isLoading"
			:is-empty="isEmpty"
			:is-student="isStudent"
			:file-records="uploadedFileRecords"
			:upload-progress="uploadProgress"
			@delete-files="onDeleteFiles"
			@update:name="onUpdateName"
		/>
	</DefaultWireframe>
	<ConfirmationDialog />
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
import AuthModule from "@/store/auth";
import { ParentNodeType } from "@/types/board/ContentElement";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useBoardApi, useSharedBoardPageInformation } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { useFolderState } from "@data-folder";
import { mdiPlus } from "@icons/material";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import FileTable from "./file-table/FileTable.vue";
import FolderMenu from "./FolderMenu.vue";
import { LightBox } from "@ui-light-box";

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
} = useFolderState();

const { createPageInformation } = useSharedBoardPageInformation();

const { fetchFiles, upload, getFileRecordsByParentId, deleteFiles, rename } =
	useFileStorageApi();

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const userRoles = ref(authModule.getUserRoles);
const isStudent = computed(() => {
	return userRoles.value.includes("student");
});

const folderId = toRef(props, "folderId");
const fileRecords = computed(() => getFileRecordsByParentId(folderId.value));
const fileInput = ref<HTMLInputElement | null>(null);

const fabAction = computed(() => {
	if (isStudent.value) return undefined;

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

onMounted(async () => {
	if (fileInput.value) {
		fileInput.value.addEventListener("change", async (event) => {
			const files = (event.target as HTMLInputElement).files;

			if (files) {
				const fileArray = Array.from(files);
				uploadProgress.value.total = fileArray.length;

				await uploadFiles(fileArray);

				uploadProgress.value.total = 0;
				uploadProgress.value.uploaded = 0;
			}
		});
	}

	await fetchFileFolderElement(props.folderId);
	await fetchFiles(folderId.value, FileRecordParent.BOARDNODES);
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
