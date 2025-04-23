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
				<FolderMenu :folder-name="folderName" @delete="onDelete" />
			</div>
		</template>
		<FileTable
			:is-loading="isLoading"
			:is-empty="fileRecords.length === 0"
			:file-records="fileRecords"
			:upload-progress="uploadProgress"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { FileRecordParent } from "@/types/file/File";
import { useFileStorageApi } from "@data-file";
import { useFolderState } from "@data-folder";
import { mdiPlus } from "@icons/material";
import { computed, onMounted, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import FileTable from "./file-table/FileTable.vue";
import FolderMenu from "./FolderMenu.vue";

const { t } = useI18n();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { breadcrumbs, folderName, fetchFileFolderElement } = useFolderState();
const { fetchFiles, upload, getFileRecordsByParentId } = useFileStorageApi();

const folderId = toRef(props, "folderId");
const fileRecords = computed(() => getFileRecordsByParentId(folderId.value));

const fabAction = {
	icon: mdiPlus,
	title: t("pages.folder.fab.title"),
	ariaLabel: t("pages.folder.fab.title"),
	dataTestId: "fab-add-files",
};

const uploadProgress = ref({
	uploaded: 0,
	total: 0,
});
const isLoading = ref(false);

const fabClickHandler = () => {
	const input = buildInput();

	input.addEventListener("change", async (event) => {
		const files = (event.target as HTMLInputElement).files;

		if (files) {
			const fileArray = Array.from(files);
			uploadProgress.value.total = fileArray.length;

			await uploadFiles(fileArray);

			// Reset state after all files are uploaded
			uploadProgress.value.total = 0;
			uploadProgress.value.uploaded = 0;
		}
	});
	input.click();
};

const uploadFiles = async (files: File[]) => {
	await Promise.all(
		files.map((file) =>
			upload(file, props.folderId, FileRecordParent.BOARDNODES).then(() => {
				uploadProgress.value.uploaded += 1;
			})
		)
	);
};

const buildInput = (): HTMLInputElement => {
	const input = document.createElement("input");
	input.type = "file";
	input.multiple = true;

	return input;
};

const onDelete = () => {
	// Handle delete logic here
};

onMounted(async () => {
	isLoading.value = true;
	await fetchFileFolderElement(props.folderId);
	await fetchFiles(folderId.value, FileRecordParent.BOARDNODES);
	isLoading.value = false;
});
</script>
