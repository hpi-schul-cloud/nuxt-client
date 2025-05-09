<template>
	<v-btn
		:aria-label="$t('components.board.action.download')"
		:disabled="!isDownloadAllowed"
		:data-testid="testId"
		class="float-right download-button"
		icon
		size="small"
		variant="text"
		@click="onDownload"
	>
		<v-icon>{{ mdiTrayArrowDown }}</v-icon>
	</v-btn>
</template>

<script setup lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiTrayArrowDown } from "@icons/material";

const props = defineProps({
	fileName: { type: String, required: true },
	isDownloadAllowed: { type: Boolean, required: true },
	url: { type: String, required: true },
});

const testId = "board-file-element-edit-menu-download";

const onDownload = async () => {
	downloadFile(props.url, props.fileName, testId);
};
</script>

<style type="text/scss">
.download-button {
	margin-right: -6px;
}
</style>
