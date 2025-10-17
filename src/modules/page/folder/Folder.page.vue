<template>
	<Folder :folder-id="folderId" />
</template>

<script setup lang="ts">
import { useFolderState } from "@data-folder";
import { Folder } from "@feature-folder";
import { useTitle } from "@vueuse/core";

defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { pageTitle } = useFolderState();
useTitle(pageTitle);
</script>
