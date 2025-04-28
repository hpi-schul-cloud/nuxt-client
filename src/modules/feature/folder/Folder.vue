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
		<FolderDetails :is-loading="isLoading" :is-empty="isEmpty" />
	</DefaultWireframe>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import router from "@/router";
import { useBoardApi } from "@data-board";
import { useFolderState } from "@data-folder";
import { mdiPlus } from "@icons/material";
import { ConfirmationDialog } from "@ui-confirmation-dialog";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import FolderDetails from "./FolderDetails.vue";
import FolderMenu from "./FolderMenu.vue";

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
	isLoading,
	isEmpty,
	parentNodeInfos,
} = useFolderState();

const fabAction = {
	icon: mdiPlus,
	title: t("pages.folder.fab.title"),
	ariaLabel: t("pages.folder.fab.title"),
	dataTestId: "fab-add-files",
};

const fabClickHandler = () => {
	// Handle FAB click logic here
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;

	const boardId = parentNodeInfos.value[parentNodeInfos.value.length - 1].id;

	if (shouldDelete) {
		await boardApi.deleteElementCall(props.folderId);
		router.replace(`/boards/${boardId}`);
	}
};

onMounted(async () => {
	await fetchFileFolderElement(props.folderId);
});
</script>
