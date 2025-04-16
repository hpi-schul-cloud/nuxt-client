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
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useFolderState } from "@data-folder";
import { mdiPlus } from "@icons/material";
import { onMounted } from "vue";
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

const { breadcrumbs, folderName, fetchFileFolderElement, isLoading, isEmpty } =
	useFolderState();

const fabAction = {
	icon: mdiPlus,
	title: t("pages.folder.fab.title"),
	ariaLabel: t("pages.folder.fab.title"),
	dataTestId: "fab-add-files",
};

const fabClickHandler = () => {
	// Handle FAB click logic here
};

const onDelete = () => {
	// Handle delete logic here
};

onMounted(async () => {
	await fetchFileFolderElement(props.folderId);
});
</script>
