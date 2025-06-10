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
import { downloadFiles } from "@/utils/fileHelper";
import { mdiTrayArrowDown } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import dayjs from "dayjs";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
	selectedIds: {
		type: Array as PropType<string[]>,
		required: true,
	},
	archiveName: {
		type: String as PropType<string>,
		default: "",
	},
});

const onClick = async () => {
	if (props.disabled) {
		return;
	}
	const now = dayjs().format("YYYYMMDD");
	// Use the provided archive name or generate a default one
	// If no archive name is provided, use the current date as the default

	const archiveName = `${now}_${props.archiveName}`;

	downloadFiles({
		fileRecordIds: props.selectedIds,
		archiveName,
	});
};
</script>
