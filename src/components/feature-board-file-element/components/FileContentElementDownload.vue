<template>
	<div class="pa-2 mr-2 mt-1">
		<v-icon
			data-testid="board-file-element-edit-menu-download"
			@click="onDownload"
			:disabled="!isDownloadAllowed"
			class="float-right"
			>$mdiTrayArrowDown
		</v-icon>
	</div>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementDownload",
	props: {
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
		url: { type: String, required: true },
	},
	setup(props) {
		const onDownload = async () => {
			await downloadFile(props.url, props.fileName);
		};
		return {
			onDownload,
		};
	},
});
</script>
