<template>
	<Folder :folder-id="folderId" :sub-folder-path="subFolderPath" @update:folder-name="handleFolderNameUpdate" />
</template>

<script setup lang="ts">
import { Folder } from "@feature-folder";
import { useTitle } from "@vueuse/core";
import { PropType } from "vue";

defineProps({
	folderId: {
		type: String,
		required: true,
	},
	subFolderPath: {
		type: Array as PropType<string[]>,
		default: () => [],
	},
});

const handleFolderNameUpdate = (pageTitle: string) => {
	useTitle(pageTitle);
};
</script>
