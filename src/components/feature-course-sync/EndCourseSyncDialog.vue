<template>
	<vCustomDialog
		data-testid="end-course-sync-dialog"
		:has-buttons="true"
		:buttons="['cancel', 'confirm']"
		:is-open="isOpen"
		@dialog-confirmed="onConfirm"
		@dialog-canceled="closeDialog"
	>
		<template #title>
			<h2 class="text-h4 my-2 text-break-word">
				{{ $t("feature-course-sync.EndCourseSyncDialog.title") }}
			</h2>
		</template>
		<template #content>
			<WarningAlert class="mb-4">
				{{ $t("feature-course-sync.EndCourseSyncDialog.alert") }}
			</WarningAlert>
			<p>
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
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import WarningAlert from "@ui-alert/WarningAlert.vue";
import { useI18n } from "vue-i18n";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();

const isOpen = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

defineProps({
	courseName: {
		type: String,
		required: true,
	},
	groupName: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "success"): void;
}>();

const closeDialog = () => {
	isOpen.value = false;
};

const onConfirm = () => {
	closeDialog();

	// TODO call api

	notifierModule.show({
		text: t("feature-course-sync.EndCourseSyncDialog.success"),
		status: "success",
	});

	emit("success");
};
</script>
