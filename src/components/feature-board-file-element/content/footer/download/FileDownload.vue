<template>
	<v-icon
		data-testid="board-file-element-edit-menu-download"
		@click="onDownload"
		:disabled="!isDownloadAllowed"
		class="float-right"
		>{{ mdiTrayArrowDown }}
	</v-icon>
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
