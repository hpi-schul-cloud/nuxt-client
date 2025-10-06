<template>
	<vCustomDialog
		data-testid="end-course-sync-dialog"
		:has-buttons="true"
		:buttons="['cancel', 'confirm']"
		:is-open="isOpen"
		:confirm-btn-disabled="!courseId"
		@dialog-confirmed="onConfirm"
		@dialog-canceled="closeDialog"
	>
		<template #title>
			<h2 class="my-2 text-break-word">
				{{ $t("feature-course-sync.EndCourseSyncDialog.title") }}
			</h2>
		</template>
		<template #content>
			<p data-testid="end-course-sync-dialog-info-text">
				{{
					$t("feature-course-sync.EndCourseSyncDialog.description", {
						courseName: courseName,
						groupName: groupName,
					})
				}}
			</p>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { useCourseApi } from "@data-room";
import { useI18n } from "vue-i18n";
import { notifyError, notifySuccess } from "@data-app";

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
