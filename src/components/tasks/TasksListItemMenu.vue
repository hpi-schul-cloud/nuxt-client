<template>
	<KebabMenu :aria-label="t('common.words.task')" data-testid="task-menu">
		<VListItem
			v-if="isTeacher"
			id="task-action-edit"
			:href="editLink"
			class="task-action"
			data-testId="task-edit"
			role="menuitem"
			:draggable="false"
		>
			<VListItemTitle>
				<VIcon :icon="mdiPencilOutline" class="task-action-icon" />
				{{ $t("common.actions.edit") }}
			</VListItemTitle>
		</VListItem>
		<VListItem
			v-if="isTeacher && copyServiceEnabled"
			id="task-action-copy"
			class="task-action"
			data-testId="task-copy"
			role="menuitem"
			@click="onCopyTask"
		>
			<VListItemTitle>
				<VIcon :icon="mdiContentCopy" class="task-action-icon" />
				{{ $t("common.actions.duplicate") }}
			</VListItemTitle>
		</VListItem>
		<VListItem
			v-if="isTeacher && shareTaskEnabled"
			id="task-action-share"
			class="task-action"
			data-testId="task-share"
			role="menuitem"
			@click="onShareTask"
		>
			<VListItemTitle>
				<VIcon :icon="mdiShareVariantOutline" class="task-action-icon" />
				{{ $t("common.actions.shareCopy") }}
			</VListItemTitle>
		</VListItem>
		<VListItem
			v-if="isTeacher && taskIsPublished"
			id="task-action-revert"
			class="task-action"
			data-testId="task-revert"
			role="menuitem"
			@click="onRevert"
		>
			<VListItemTitle>
				<VIcon :icon="mdiUndoVariant" class="task-action-icon" />
				{{ $t("pages.room.cards.label.revert") }}
			</VListItemTitle>
		</VListItem>
		<VListItem id="task-action-finish" class="task-action" data-testId="task-finish" role="menuitem" @click="onFinish">
			<VListItemTitle>
				<template v-if="taskIsFinished">
					<VIcon :icon="mdiUndoVariant" class="task-action-icon" />
					{{ $t("common.labels.restore") }}
				</template>
				<template v-else>
					<VIcon :icon="mdiArchiveOutline" class="task-action-icon" />
					{{ $t("components.molecules.TaskItemMenu.finish") }}
				</template>
			</VListItemTitle>
		</VListItem>
		<VListItem
			v-if="isTeacher"
			id="task-action-delete"
			class="task-action"
			data-testId="task-delete"
			role="menuitem"
			@click="onDelete"
		>
			<VListItemTitle>
				<VIcon :icon="mdiTrashCanOutline" class="task-action-icon" />
				{{ $t("common.actions.delete") }}
			</VListItemTitle>
		</VListItem>
	</KebabMenu>
</template>

<script setup lang="ts">
import { CopyParamsTypeEnum } from "@/store/copy";
import { askDeletion } from "@/utils/confirmation-dialog.utils";
import { useEnvConfig } from "@data-env";
import { useTasksOfOverview } from "@data-tasks";
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
		taskId: string;
		taskIsFinished: boolean;
		taskIsPublished?: boolean;
		taskTitle?: string;
		courseId?: string;
		userRole: "student" | "teacher";
	}>(),
	{
		taskTitle: "",
		courseId: "",
	}
);

const emit = defineEmits<{
	"copy-task": [payload: { id: string; courseId: string | undefined; type: CopyParamsTypeEnum }];
	"share-task": [taskId: string];
}>();

const { t } = useI18n();
const envConfig = useEnvConfig();

const { deleteTask, finishTask, restoreFinishedTask, revertPublishedTask } = useTasksOfOverview();

const isTeacher = computed(() => props.userRole === "teacher");
const editLink = computed(() => `/homework/${props.taskId}/edit`);
const copyLink = computed(() => `/homework/${props.taskId}/copy?returnUrl=/tasks`);
const copyServiceEnabled = computed(() => envConfig.value.FEATURE_COPY_SERVICE_ENABLED);
const shareTaskEnabled = computed(() => envConfig.value.FEATURE_TASK_SHARE);

const onDelete = async () => {
	const confirmed = await askDeletion(
		"components.molecules.TaskItemMenu.confirmDelete.title",
		t("components.molecules.TaskItemMenu.confirmDelete.text", { taskTitle: props.taskTitle }),
		"warning"
	);

	if (confirmed) {
		await deleteTask(props.taskId);
	}
};

const onFinish = () => {
	if (props.taskIsFinished) {
		restoreFinishedTask(props.taskId);
	} else {
		finishTask(props.taskId);
	}
};

const onRevert = () => revertPublishedTask(props.taskId);

const onCopyTask = () => {
	if (!copyServiceEnabled.value) {
		window.location.href = copyLink.value;
		return;
	}

	emit("copy-task", {
		id: props.taskId,
		courseId: props.courseId === "" ? undefined : props.courseId,
		type: CopyParamsTypeEnum.Task,
	});
};

const onShareTask = () => {
	if (shareTaskEnabled.value) {
		emit("share-task", props.taskId);
	}
};
</script>

<style lang="scss" scoped>
.task-action {
	min-height: 25px !important;
}

.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
}
</style>
