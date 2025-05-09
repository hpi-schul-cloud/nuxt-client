<template>
	<Folder :folder-id="folderId" />
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { useFolderState } from "@data-folder";
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

const { folderName } = useFolderState();

useTitle(buildPageTitle(`${folderName.value} - ${t("pages.folder.title")}`));
</script>
