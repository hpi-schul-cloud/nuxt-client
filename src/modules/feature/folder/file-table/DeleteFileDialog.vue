<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:message="deleteMessage"
		@confirm="() => emit('confirm')"
		@cancel="() => emit('cancel')"
	/>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { Dialog } from "@ui-dialog";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
});

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits(["confirm", "cancel"]);

const deleteMessage = computed(() => {
	if (props.fileRecords.length > 1) {
		return t("pages.folder.delete-multiple-confirmation", {
			total: props.fileRecords.length,
		});
	} else if (props.fileRecords.length === 1) {
		return t("pages.folder.delete-confirmation", {
			name: props.fileRecords[0].name,
		});
	} else {
		// This should never happen!
		return "";
	}
});
</script>
