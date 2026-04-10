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
			<VList data-testid="delete-user-dialog-user-list">
				<VListItem
					v-for="(user, index) in props.selectedUsers"
					:key="user._id"
					density="compact"
					:variant="setListItemVariant(index)"
				>
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
		return t("pages.administration.students.index.remove.confirm.message", props.selectedUsers.length);
	} else if (props.userType === "teacher") {
		return t("pages.administration.teachers.index.remove.confirm.message", props.selectedUsers.length);
	}

	return "";
});

const setListItemVariant = (index: number) => (index % 2 === 0 ? "tonal" : "text");
</script>
