<template>
	<v-container class="ma-0 pa-0">
		<v-row>
			<v-col cols="10">
				<ContentElementChips
					:fileSize="fileProperties.size"
					:fileName="fileProperties.name"
				/>
			</v-col>

			<v-col cols="2">
				<FileDownload
					:fileName="fileProperties.name"
					:isDownloadAllowed="fileProperties.isDownloadAllowed"
					:url="fileProperties.url"
				></FileDownload>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import ContentElementChips from "./chips/ContentElementChips.vue";
import FileDownload from "./download/FileDownload.vue";

export default defineComponent({
	name: "FileContentElementFooter",
	components: {
		ContentElementChips,
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
