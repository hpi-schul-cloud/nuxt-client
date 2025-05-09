<template>
	<KebabMenuAction
		:icon="mdiTrayArrowDown"
		data-testid="kebab-menu-action-download"
		:disabled="disabled"
		@click="onClick"
	>
		{{ t("components.board.action.download") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { downloadFile } from "@/utils/fileHelper";
import { mdiTrayArrowDown } from "@icons/material";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
const { t } = useI18n();

const props = defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
	selectedIds: {
		type: Array as PropType<string[]>,
		required: true,
	},
});

const selectedFileRecords = computed(() => {
	return props.fileRecords.filter((fileRecord) =>
		props.selectedIds.includes(fileRecord.id)
	);
});

const onClick = () => {
	selectedFileRecords.value.forEach(async (fileRecord) => {
		downloadFile(fileRecord.url, fileRecord.name);
	});
};
</script>
