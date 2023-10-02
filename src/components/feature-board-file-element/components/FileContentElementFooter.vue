<template>
	<v-container class="ma-0 pa-0">
		<v-row>
			<v-col cols="10">
				<FileContentElementChips
					:fileSize="fileProperties.size"
					:fileName="fileProperties.name"
				/>
			</v-col>

			<v-col cols="2">
				<FileContentElementDownload
					:fileName="fileProperties.name"
					:isDownloadAllowed="fileProperties.isDownloadAllowed"
					:url="fileProperties.url"
				></FileContentElementDownload>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDownload from "./FileContentElementDownload.vue";
import { FileProperties } from "./types/file-properties";

export default defineComponent({
	name: "FileContentElementFooter",
	components: {
		FileContentElementChips,
		FileContentElementDownload,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
	},
});
</script>
