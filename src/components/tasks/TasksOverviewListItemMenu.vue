<template>
	<KebabMenu :aria-label="t('common.words.task')" data-testid="task-menu">
		<template v-if="isTeacher">
			<VListItem
				:prepend-icon="mdiPencilOutline"
				:title="t('common.actions.edit')"
				:href="editLink"
				data-testId="task-edit"
				role="menuitem"
			/>
			<VListItem
				v-if="copyServiceEnabled"
				:prepend-icon="mdiContentCopy"
				:title="t('common.actions.duplicate')"
				data-testId="task-copy"
				role="menuitem"
				@click="onCopyTask"
			/>
			<VListItem
				v-if="shareTaskEnabled"
				:prepend-icon="mdiShareVariantOutline"
				:title="t('common.actions.shareCopy')"
				data-testId="task-share"
				role="menuitem"
				@click="onShareTask"
			/>
			<VListItem
				v-if="!task.status.isDraft && !task.status.isFinished"
				:prepend-icon="mdiUndoVariant"
				:title="t('pages.room.cards.label.revert')"
				data-testId="task-revert"
				role="menuitem"
				@click="emit('revert-task', task.id)"
			/>
		</template>

		<VListItem
			v-if="task.status.isFinished"
			:prepend-icon="mdiUndoVariant"
			:title="t('common.labels.restore')"
			data-testId="task-finish"
			@click="emit('restore-task', task.id)"
		/>
		<VListItem
			v-else
			:prepend-icon="mdiArchiveOutline"
			:title="t('components.molecules.TaskItemMenu.finish')"
			data-testId="task-finish"
			@click="emit('finish-task', task.id)"
		/>

		<VListItem
			v-if="isTeacher"
			:prepend-icon="mdiTrashCanOutline"
			:title="t('common.actions.delete')"
			data-testId="task-delete"
			role="menuitem"
			@click="$emit('delete-task', task.id)"
		/>
	</KebabMenu>
</template>

<script setup lang="ts">
import { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import { TaskResponse } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import {
	mdiArchiveOutline,
	mdiContentCopy,
	mdiPencilOutline,
	mdiShareVariantOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
} from "@icons/material";
import { KebabMenu } from "@ui-kebab-menu";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		task: TaskResponse;
	}>(),
	{}
);

const { isTeacher } = useAppStoreRefs();

const emit = defineEmits<{
	"copy-task": [payload: CopyParams];
	"share-task": [taskId: string];
	"delete-task": [taskId: string];
	"finish-task": [taskId: string];
	"revert-task": [taskId: string];
	"restore-task": [taskId: string];
}>();

const { t } = useI18n();
const envConfig = useEnvConfig();

const editLink = computed(() => `/homework/${props.task.id}/edit`);
const copyLink = computed(() => `/homework/${props.task.id}/copy?returnUrl=/tasks`);
const copyServiceEnabled = computed(() => envConfig.value.FEATURE_COPY_SERVICE_ENABLED);
const shareTaskEnabled = computed(() => envConfig.value.FEATURE_TASK_SHARE);

const onCopyTask = () => {
	if (!copyServiceEnabled.value) {
		window.location.href = copyLink.value;
		return;
	}

	emit("copy-task", {
		id: props.task.id,
		courseId: props.task.courseId,
		type: CopyParamsTypeEnum.Task,
	});
};

const onShareTask = () => {
	if (shareTaskEnabled.value) {
		emit("share-task", props.task.id);
	}
};
</script>

<style lang="scss" scoped>
.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
}
</style>
