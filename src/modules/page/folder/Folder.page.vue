<template>
	<Folder :folder-id="folderId" @update:folder-name="handleFolderNameUpdate" />
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { Folder } from "@feature-folder";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";

defineProps({
	folderId: {
		type: String,
		required: true,
	},
});
const { t } = useI18n();

const handleFolderNameUpdate = (newFolderName: string) => {
	const pageTitle = buildPageTitle(
		`${newFolderName} - ${t("pages.folder.title")}`
	);

	useTitle(pageTitle);
};
</script>
