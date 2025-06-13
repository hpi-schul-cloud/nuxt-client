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
import { downloadFilesAsArchive } from "@/utils/fileHelper";
import { mdiTrayArrowDown } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface KebabMenuActionDownloadFilesProps {
	disabled: boolean;
	selectedIds: string[];
	archiveName: string;
}

const props = withDefaults(defineProps<KebabMenuActionDownloadFilesProps>(), {
	disabled: false,
});

const onClick = async () => {
	if (props.disabled) {
		return;
	}
	const now = dayjs().format("YYYYMMDD");
	const archiveName = `${now}_${props.archiveName}`;

	downloadFilesAsArchive({
		fileRecordIds: props.selectedIds,
		archiveName,
	});
};
</script>
