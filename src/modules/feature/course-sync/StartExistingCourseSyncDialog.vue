<template>
	<GroupSelectionDialog
		:is-open="isOpen && step === 0"
		:description="$t('feature-course-sync.StartExistingCourseSyncDialog.text')"
		@confirm="onConfirmGroupSelection"
		@cancel="closeDialog"
	/>
	<vCustomDialog
		:is-open="isOpen && step === 1"
		has-buttons
		:buttons="['cancel', 'confirm']"
		@dialog-confirmed="onConfirmWarning"
		@dialog-closed="closeDialog"
	>
		<template #title>
			<div class="text-h4 my-2 text-break">Synchronisation bestätigen</div>
		</template>

		<template #content>
			<WarningAlert data-testid="no-teacher-warning">
				<RenderHTML
					component="span"
					:html="
						$t(
							'feature-course-sync.StartExistingCourseSyncDialog.confirmation.warning',
							{
								systemName: 'moin.schule',
							}
						)
					"
					data-testid="no-teacher-warning-text"
				/>
			</WarningAlert>
			<p class="text-md mt-2" data-testid="group-dialog-info-text">
				{{
					$t(
						"feature-course-sync.StartExistingCourseSyncDialog.confirmation.text",
						{
							groupName: selectedGroup?.name || "",
							courseName: courseName || "",
						}
					)
				}}
			</p>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { GroupResponse } from "@/serverApi/v3";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useCourseApi } from "@data-room";
import { RenderHTML } from "@feature-render-html";
import { WarningAlert } from "@ui-alert";
import { ModelRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import GroupSelectionDialog from "./GroupSelectionDialog.vue";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();

const props = defineProps({
	courseName: {
		type: String,
	},
	courseId: {
		type: String,
	},
});

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "success"): void;
}>();

const step: Ref<number> = ref(0);
const selectedGroup: Ref<GroupResponse | undefined> = ref();

const onConfirmGroupSelection = async (group: GroupResponse) => {
	selectedGroup.value = group;
	step.value = 1;
};

const { startSynchronization } = useCourseApi();

const onConfirmWarning = async () => {
	if (!selectedGroup.value || !props.courseId) {
		notifierModule.show({
			text: t("common.notification.error"),
			status: "error",
		});

		return;
	}

	try {
		await startSynchronization(props.courseId, selectedGroup.value.id);

		closeDialog();

		notifierModule.show({
			text: t("feature-course-sync.StartExistingCourseSyncDialog.success"),
			status: "success",
		});

		emit("success");
	} catch (errorResponse) {
		notifierModule.show({
			text: t("common.notification.error"),
			status: "error",
		});

		return;
	}

	closeDialog();
};

const closeDialog = () => {
	isOpen.value = false;
	step.value = 0;
};
</script>
