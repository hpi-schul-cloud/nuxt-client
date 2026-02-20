<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title="message"
		data-testid="delete-file-dialog"
		@confirm="emit('confirm')"
		@cancel="emit('cancel')"
	>
		<template #content>
			<ul class="ml-6" data-testid="confirmation-dialog-message-list">
				<li v-for="student in props.selectedUsers" :key="student._id">
					{{ student.firstName }} {{ student.lastName }}
				</li>
			</ul>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t: translate } = useI18n();

const props = defineProps({
	selectedUsers: {
		type: Array as PropType<{ _id: string; firstName: string; lastName: string }[]>,
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
//let message;
//if (selectionType === "inclusive") {
//	message = this.t("pages.administration.students.index.remove.confirm.message.some", rowIds.length, {
//		number: rowIds.length,
//	});
//} else {
//	if (rowIds.length) {
//		message = this.t("pages.administration.students.index.remove.confirm.message.many", {
//			number: rowIds.length,
//		});
//	} else {
//		message = this.t("pages.administration.students.index.remove.confirm.message.all");
//	}
//}
</script>
