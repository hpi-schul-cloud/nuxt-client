<template>
	<KebabMenuAction
		:icon="mdiTrashCanOutline"
		data-testid="kebab-menu-action-delete"
		@click="onClick"
	>
		{{ t("common.actions.delete") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { mdiTrashCanOutline } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { useDeleteFilesConfirmationDialog } from "../composables";
const { t } = useI18n();

const props = defineProps({
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
	selectedIds: {
		type: Array as PropType<string[]>,
		required: true,
	},
});

const emit = defineEmits(["delete-files"]);

const { askDeleteFilesConfirmation } = useDeleteFilesConfirmationDialog();

const selectedFileRecords = computed(() => {
	return props.fileRecords.filter((fileRecord) =>
		props.selectedIds.includes(fileRecord.id)
	);
});

const onClick = (): void => {
	const confirmationPromise = askDeleteFilesConfirmation(
		selectedFileRecords.value
	);

	emit("delete-files", selectedFileRecords.value, confirmationPromise);
};
</script>
