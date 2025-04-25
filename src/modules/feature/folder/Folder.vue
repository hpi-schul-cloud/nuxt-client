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
			:is-empty="isEmpty"
			:file-records="fileRecords"
			:upload-progress="uploadProgress"
		/>
	</DefaultWireframe>
	<input
		ref="fileInput"
		type="file"
		multiple
		hidden
		data-testid="input-folder-fileupload"
	/>
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
const fileInput = ref<HTMLInputElement | null>(null);

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
const isLoading = ref(true);
const isEmpty = computed(() => fileRecords.value.length === 0);

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

const onDelete = () => {
	// Handle delete logic here
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
</script>
