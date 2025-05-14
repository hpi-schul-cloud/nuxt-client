<template>
	<KebabMenuAction
		:icon="mdiTrayArrowDown"
		data-testid="kebab-menu-action-download"
		:disabled="disabled"
		@click="onClick"
	>
		{{ t("common.actions.download") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { downloadFile } from "@/utils/fileHelper";
import { delay } from "@/utils/helpers";
import { mdiTrayArrowDown } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
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

const onClick = async () => {
	if (props.disabled) {
		return;
	}
	for (const fileRecord of selectedFileRecords.value) {
		await downloadFile(fileRecord.url, fileRecord.name);
		await delay(500);
	}
};
</script>
