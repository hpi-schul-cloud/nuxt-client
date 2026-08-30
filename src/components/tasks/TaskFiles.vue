<template>
	<div
		@dragenter.prevent="isOverDropZone = true"
		@dragover.prevent
		@dragleave.prevent="isOverDropZone = false"
		@drop.prevent="onDrop"
	>
		<FileTable
			:is-loading="isLoading"
			:is-empty="fileRecords.length === 0"
			:file-storage-error="fileStorageError"
			:has-edit-permission="editable"
			:file-records="fileRecords"
			:highlighted-file-ids="highlightedFileIds"
			:upload-progress="uploadProgress"
			:are-upload-stats-visible="areUploadStatsVisible"
			:is-over-drop-zone="isOverDropZone"
			:show-search="false"
			:hide-default-footer="true"
			@delete-files="onDeleteFiles"
			@update:name="onRename"
			@reset-upload-progress="resetUploadProgress"
			@download-file="onDownloadFile"
			@download-files-as-archive="onDownloadFilesAsArchive"
			@click:browse="browse"
		/>
		<input ref="fileInput" type="file" multiple hidden data-testid="task-file-input" @change="onFileSelection" />
		<div v-if="pendingFiles.length" class="text-body-2 text-medium-emphasis mt-2">
			{{ pendingFiles.length }} file(s) selected. They will be uploaded when the task is saved.
		</div>
		<LightBox />
	</div>
</template>

<script setup lang="ts">
import { type FileRecord, FileRecordParent } from "@/types/file/File";
import { downloadFile, downloadFilesAsArchive } from "@/utils/fileHelper";
import { extractReferencedTaskFileIds } from "@/utils/task-description-files";
import { useFileRecordsStore, useFileStorageApi } from "@data-file";
import { FileTable } from "@feature-folder";
import { LightBox } from "@ui-light-box";
import { computed, onMounted, ref } from "vue";

const props = withDefaults(defineProps<{ taskId: string; editable?: boolean; description?: string }>(), {
	editable: false,
	description: "",
});
const { fetchFiles, upload, deleteFiles, rename } = useFileStorageApi();
const fileRecordsStore = useFileRecordsStore();
const fileInput = ref<HTMLInputElement>();
const isLoading = ref(true);
const fileStorageError = ref(false);
const isOverDropZone = ref(false);
const pendingFiles = ref<File[]>([]);
const runningUploads = ref(0);
const uploadProgress = ref({ uploaded: 0, total: 0 });
const areUploadStatsVisible = computed(() => runningUploads.value > 0);
const fileRecords = computed(() =>
	fileRecordsStore.getFileRecordsByParentId(props.taskId).filter((file) => !file.isUploading)
);
const highlightedFileIds = computed(() => extractReferencedTaskFileIds(props.description));
const uploadSelectedFiles = async (parentId = props.taskId) => {
	if (!pendingFiles.value.length) return;
	const files = pendingFiles.value;
	pendingFiles.value = [];
	await uploadFiles(files, parentId);
};

defineExpose({ uploadSelectedFiles });

onMounted(async () => {
	if (props.taskId === "pending-task") {
		isLoading.value = false;
		return;
	}
	try {
		await fetchFiles(props.taskId, FileRecordParent.TASKS);
	} catch {
		fileStorageError.value = true;
	} finally {
		isLoading.value = false;
	}
});

const browse = () => {
	if (!props.editable) return;
	if (fileInput.value) {
		fileInput.value.value = "";
		fileInput.value.click();
	}
};

const onFileSelection = async (event: Event) => {
	const files = Array.from((event.target as HTMLInputElement).files ?? []);
	await handleSelectedFiles(files);
};

const onDrop = async (event: DragEvent) => {
	isOverDropZone.value = false;
	if (!props.editable) return;
	await handleSelectedFiles(Array.from(event.dataTransfer?.files ?? []));
};

const handleSelectedFiles = async (files: File[]) => {
	if (!files.length) return;
	if (props.taskId === "pending-task") {
		pendingFiles.value.push(...files);
		return;
	}
	await uploadFiles(files, props.taskId);
};

const uploadFiles = async (files: File[], parentId: string) => {
	runningUploads.value += files.length;
	uploadProgress.value.total += files.length;
	await Promise.allSettled(
		files.map(async (file) => {
			await upload(file, parentId, FileRecordParent.TASKS);
			uploadProgress.value.uploaded += 1;
		})
	);
	runningUploads.value -= files.length;
};

const onDeleteFiles = async (files: FileRecord[]) => deleteFiles(files);
const onRename = async (fileName: string, file: FileRecord) => rename(file.id, { fileName });

const onDownloadFile = (selectedIds: string[]) => {
	const file = fileRecords.value.find((record) => record.id === selectedIds[0]);
	if (file) downloadFile(file.url, file.name);
};

const onDownloadFilesAsArchive = (selectedIds: string[]) => {
	downloadFilesAsArchive({ fileRecordIds: selectedIds, archiveName: "task-files" });
};

const resetUploadProgress = () => {
	uploadProgress.value = { uploaded: 0, total: 0 };
};
</script>
