<template>
	<v-card-actions class="py-2 px-4">
		<FileAttributes :file-size="fileProperties.size" :file-name="fileProperties.name" />

		<v-spacer />

		<FileDownload
			:file-name="fileProperties.name"
			:is-download-allowed="fileProperties.isDownloadAllowed"
			:url="fileProperties.url"
		/>
	</v-card-actions>
</template>

<script setup lang="ts">
import { FileProperties } from "../../shared/types/file-properties";
import FileAttributes from "./attributes/FileAttributes.vue";
import FileDownload from "./download/FileDownload.vue";

type Props = {
	fileProperties: FileProperties;
};

defineProps<Props>();
</script>
