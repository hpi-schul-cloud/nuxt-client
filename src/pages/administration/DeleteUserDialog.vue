<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title
		data-testid="delete-user-dialog"
		confirm-btn-lang-key="common.actions.delete"
		@confirm="emit('confirm')"
		@cancel="emit('cancel')"
	>
		<template #content>
			<VList class="ml-6" data-testid="delete-user-dialog-user-list">
				<VListItem v-for="user in props.selectedUsers" :key="user._id" density="compact">
					{{ user.firstName }} {{ user.lastName }}
				</VListItem>
			</VList>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type User = {
	_id: string;
	firstName: string;
	lastName: string;
};

const props = defineProps<{
	selectedUsers: User[];
	userType: "student" | "teacher";
}>();

const emit = defineEmits<{
	(e: "cancel"): void;
	(e: "confirm"): void;
}>();

const isDialogOpen = defineModel({
	type: Boolean,
	default: false,
});

const title = computed(() => {
	if (props.userType === "student") {
		return props.selectedUsers.length === 1
			? t(`pages.administration.students.index.remove.confirm.message`)
			: t(`pages.administration.students.index.remove.confirm.message.multiple`);
	} else if (props.userType === "teacher") {
		return props.selectedUsers.length === 1
			? t(`pages.administration.teachers.index.remove.confirm.message`)
			: t(`pages.administration.teachers.index.remove.confirm.message.multiple`);
	}

	return "";
});
</script>
