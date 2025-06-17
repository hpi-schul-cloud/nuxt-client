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
import { mdiTrayArrowDown } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface KebabMenuActionDownloadFilesProps {
	selectedIds: string[];
	disabled?: boolean;
}

const props = defineProps<KebabMenuActionDownloadFilesProps>();

const emit = defineEmits(["download"]);

const onClick = (): void => {
	if (props.disabled || props.selectedIds.length === 0) {
		return;
	}
	emit("download", props.selectedIds);
};
</script>
