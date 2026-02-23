<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title="message"
		data-testid="delete-file-dialog"
		confirm-btn-lang-key="common.actions.delete"
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
	userType: {
		type: String as PropType<"student" | "teacher">,
		required: true,
	},
});

import { computed } from "vue";

const message = computed(() => {
	switch (props.userType) {
		case "student":
			return props.selectedUsers.length === 1
				? translate(`pages.administration.students.index.remove.confirm.message`)
				: translate(`pages.administration.students.index.remove.confirm.message.multiple`, {
						number: props.selectedUsers.length,
					});
		case "teacher":
			return props.selectedUsers.length === 1
				? translate(`pages.administration.teachers.index.remove.confirm.message`)
				: translate(`pages.administration.teachers.index.remove.confirm.message.multiple`, {
						number: props.selectedUsers.length,
					});
		default:
			return "";
	}
});

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
