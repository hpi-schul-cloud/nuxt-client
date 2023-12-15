<template>
	<v-btn
		@click="onDownload"
		:disabled="!isDownloadAllowed"
		data-testid="board-file-element-edit-menu-download"
		class="float-right download-button"
		icon
		:aria-label="$t('components.board.action.download')"
	>
		<v-icon>{{ mdiTrayArrowDown }}</v-icon>
	</v-btn>
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

<style type="text/scss">
.download-button {
	margin-right: -6px;
}
</style>
