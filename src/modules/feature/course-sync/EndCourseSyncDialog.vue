<template>
	<SvsDialog
		v-model="isOpen"
		data-testid="end-course-sync-dialog"
		:title="endSyncTitle"
		:confirm-btn-disabled="!courseId"
		@confirm="onConfirm"
		@cancel="closeDialog"
	/>
</template>

<script setup lang="ts">
import { notifyError, notifySuccess } from "@data-app";
import { useCourseApi } from "@data-room";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isOpen = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const props = defineProps({
	courseName: {
		type: String,
		default: "",
	},
	groupName: {
		type: String,
		default: "",
	},
	courseId: {
		type: String,
		default: undefined,
	},
});

const emit = defineEmits<{
	(e: "success"): void;
}>();

const endSyncTitle = computed(() =>
	t("feature-course-sync.EndCourseSyncDialog", {
		courseName: props.courseName,
		groupName: props.groupName,
	})
);

const closeDialog = () => {
	isOpen.value = false;
};

const { stopSynchronization } = useCourseApi();

const onConfirm = async () => {
	if (!props.courseId) {
		return;
	}

	try {
		await stopSynchronization(props.courseId);

		closeDialog();
		notifySuccess(t("feature-course-sync.EndCourseSyncDialog.success"));

		emit("success");
	} catch {
		notifyError(t("common.notification.error"));
		return;
	}
};
</script>
