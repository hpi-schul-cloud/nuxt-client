<template>
	<div class="download-btn">
		<v-icon
			data-testid="board-file-element-edit-menu-download"
			@click="onDownload"
			:disabled="!isDownloadAllowed"
			class="float-right"
			>{{ mdiTrayArrowDown }}
		</v-icon>
	</div>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiTrayArrowDown } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileDownload",
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
			mdiTrayArrowDown,
		};
	},
});
</script>

<style scoped>
.download-btn {
	margin: 10px 14px 0px 0px;
	padding: 0px;
}
</style>
