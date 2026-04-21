<template>
	<FolderTrash :folder-id="folderId" @update:folder-name="handleFolderNameUpdate" />
</template>

<script setup lang="ts">
import { FolderTrash } from "@feature-folder";
import { useTitle } from "@vueuse/core";

defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const handleFolderNameUpdate = (pageTitle: string) => {
	useTitle(pageTitle);
};
</script>
