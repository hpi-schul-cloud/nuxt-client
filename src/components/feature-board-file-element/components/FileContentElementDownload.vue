<template>
	<div class="pa-2 mr-2 mt-1">
		<a
			v-if="isDownloadAllowed"
			data-testid="board-file-element-edit-menu-download"
			@click="onDownload"
			><v-icon class="float-right">$mdiTrayArrowDown</v-icon></a
		>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { downloadFile } from "@/utils/fileHelper";

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
