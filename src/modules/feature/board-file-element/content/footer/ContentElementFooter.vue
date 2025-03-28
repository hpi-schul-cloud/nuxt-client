<template>
	<v-card-actions class="py-2 px-4">
		<FileAttributes
			:file-size="fileProperties.size"
			:file-name="fileProperties.name"
		/>

		<v-spacer />

		<FileDownload
			:file-name="fileProperties.name"
			:is-download-allowed="fileProperties.isDownloadAllowed"
			:url="fileProperties.url"
		/>
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
