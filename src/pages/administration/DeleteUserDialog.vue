<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title="message"
		data-testid="delete-file-dialog"
		@confirm="emit('confirm')"
		@cancel="emit('cancel')"
	/>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t: translate } = useI18n();

const props = defineProps({
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
});

const message = translate("pages.administration.students.index.remove.confirm.message.all");

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits(["confirm", "cancel"]);

/*
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
});*/
</script>
