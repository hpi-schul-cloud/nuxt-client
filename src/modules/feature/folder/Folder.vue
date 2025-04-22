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
		<FolderDetails
			:is-loading="isLoading"
			:is-empty="fileRecords.length === 0"
			:file-records="fileRecords"
			:file-upload-stats="fileUploadStats"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { useFolderState } from "@data-folder";
import { useFileStorageApi } from "@feature-board-file-element";
import { mdiPlus } from "@icons/material";
import { computed, onMounted, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import FolderDetails from "./FolderDetails.vue";
import FolderMenu from "./FolderMenu.vue";

const { t } = useI18n();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { breadcrumbs, folderName, fetchFileFolderElement, isLoading } =
	useFolderState();
const { fetchFiles, upload, getFileRecordsByParentId } = useFileStorageApi();

const folderId = toRef(props, "folderId");
const fileRecords = computed(() => getFileRecordsByParentId(folderId.value));

const fabAction = {
	icon: mdiPlus,
	title: t("pages.folder.fab.title"),
	ariaLabel: t("pages.folder.fab.title"),
	dataTestId: "fab-add-files",
};

const fileUploadStats = ref({
	uploaded: 0,
	total: 0,
});

const fabClickHandler = () => {
	const input = document.createElement("input");
	input.type = "file";
	input.multiple = true;
	input.addEventListener("change", async (event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files) {
			const fileArray = Array.from(files);
			fileUploadStats.value.total = fileArray.length;

			await Promise.all(
				fileArray.map((file) =>
					upload(file, props.folderId, FileRecordParentType.BOARDNODES).then(
						() => {
							fileUploadStats.value.uploaded += 1;
						}
					)
				)
			);

			// Reset state after all files are uploaded
			fileUploadStats.value.total = 0;
			fileUploadStats.value.uploaded = 0;
		}
	});
	input.click();
};

const onDelete = () => {
	// Handle delete logic here
};

onMounted(async () => {
	await fetchFileFolderElement(props.folderId);
	await fetchFiles(folderId.value, FileRecordParentType.BOARDNODES);
});
</script>
