<template>
	<Folder :folder-id="folderId" />
</template>

<script setup lang="ts">
import { useFolderState } from "@data-folder";
import { Folder } from "@feature-folder";
import { useTitle } from "@vueuse/core";
import { watch } from "vue";

defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { pageTitle } = useFolderState();

watch(pageTitle, (newPageTitle: string) => {
	useTitle(newPageTitle);
});
</script>
