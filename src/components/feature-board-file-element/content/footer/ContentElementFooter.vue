<template>
	<v-card-actions class="pa-4">
		<FileAttributes
			:fileSize="fileProperties.size"
			:fileName="fileProperties.name"
		/>

		<v-spacer></v-spacer>

		<FileDownload
			:fileName="fileProperties.name"
			:isDownloadAllowed="fileProperties.isDownloadAllowed"
			:url="fileProperties.url"
		></FileDownload>
	</v-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import FileAttributes from "./attributes/FileAttributes.vue";
import FileDownload from "./download/FileDownload.vue";

export default defineComponent({
	name: "ContentElementFooter",
	components: {
		FileAttributes,
		FileDownload,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
	},
});
</script>
