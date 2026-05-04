<template>
	<FolderTrash :folder-id="folderId" @update:folder-name="handleFolderNameUpdate" />
</template>

<script setup lang="ts">
import { FolderTrash } from "@feature-folder";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";

defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();

const handleFolderNameUpdate = (folderName: string) => {
	useTitle(t("pages.folder.trash.title", { folderName }));
};
</script>
