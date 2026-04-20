<template>
	<GroupSelectionDialog
		:is-open="isOpen"
		:description="$t('feature-course-sync.StartExistingCourseSyncDialog.text')"
		@confirm="onConfirmGroupSelection"
		@cancel="closeDialog"
	/>
</template>

<script setup lang="ts">
import GroupSelectionDialog from "./GroupSelectionDialog.vue";
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { GroupResponse, GroupUserResponse, RoleName } from "@api-server";
import { notifyError, notifySuccess, useAppStore } from "@data-app";
import { useCourseApi } from "@data-room";
import { computed, ModelRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	courseName: {
		type: String,
		default: "",
	},
	courseId: {
		type: String,
		default: undefined,
	},
	courseTeachers: {
		type: Array,
		default: undefined,
	},
});

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "success"): void;
}>();

const selectedGroup: Ref<GroupResponse | undefined> = ref();

const onConfirmGroupSelection = async (group: GroupResponse) => {
	selectedGroup.value = group;
	isOpen.value = false;

	const isSelectionConfirmed = await askConfirmation({
		title: t("feature-course-sync.StartExistingCourseSyncDialog.confirmation.text", {
			groupName: group?.name || "",
			courseName: props.courseName,
		}),
		message: t(
			isUserInGroup.value
				? "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userInGroupWarning"
				: "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userNotInGroupWarning"
		),
		messageType: "warning",
	});

	if (isSelectionConfirmed) {
		await onConfirmWarning();
	}
};

const { startSynchronization } = useCourseApi();

const isUserInGroup = computed(() => {
	const me = useAppStore().meResponse;

	if (!me || !selectedGroup.value) {
		return false;
	}

	const isPartOfGroup: boolean = selectedGroup.value.users.some((user: GroupUserResponse) => user.id === me.user.id);

	const isAdmin: boolean = me.roles.some((role) => role.name === RoleName.ADMINISTRATOR);

	if (isAdmin && !isPartOfGroup) {
		const allCourseTeacherPartOfGroup = props.courseTeachers?.every((teacher) =>
			selectedGroup.value?.users.some((user) => user.firstName + " " + user.lastName === teacher)
		);

		return allCourseTeacherPartOfGroup;
	} else {
		return isPartOfGroup;
	}
});

const onConfirmWarning = async () => {
	if (!selectedGroup.value || !props.courseId) {
		notifyError(t("common.notification.error"));
		return;
	}

	try {
		await startSynchronization(props.courseId, selectedGroup.value.id);

		closeDialog();

		notifySuccess(t("feature-course-sync.StartExistingCourseSyncDialog.success"));
		emit("success");
	} catch {
		notifyError(t("common.notification.error"));
		return;
	}

	closeDialog();
};

const closeDialog = () => {
	isOpen.value = false;
};
</script>
