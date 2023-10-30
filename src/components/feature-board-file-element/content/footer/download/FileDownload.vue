<template>
	<v-btn
		@click="onDownload"
		:aria-label="$t('components.board.action.download')"
		:disabled="!isDownloadAllowed"
		data-testid="board-file-element-edit-menu-download"
		class="float-right"
		icon
		variant="text"
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
