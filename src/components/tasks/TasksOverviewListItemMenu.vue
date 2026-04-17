<template>
	<KebabMenu :aria-label="t('common.words.task')" data-testid="task-menu">
		<template v-if="isTeacher">
			<VListItem
				id="task-action-edit"
				:href="editLink"
				class="task-action"
				data-testId="task-edit"
				role="menuitem"
				:draggable="false"
			>
				<VListItemTitle>
					<VIcon :icon="mdiPencilOutline" class="task-action-icon" />
					{{ t("common.actions.edit") }}
				</VListItemTitle>
			</VListItem>
			<VListItem
				v-if="copyServiceEnabled"
				id="task-action-copy"
				class="task-action"
				data-testId="task-copy"
				role="menuitem"
				@click="onCopyTask"
			>
				<VListItemTitle>
					<VIcon :icon="mdiContentCopy" class="task-action-icon" />
					{{ t("common.actions.duplicate") }}
				</VListItemTitle>
			</VListItem>
			<VListItem
				v-if="shareTaskEnabled"
				id="task-action-share"
				class="task-action"
				data-testId="task-share"
				role="menuitem"
				@click="onShareTask"
			>
				<VListItemTitle>
					<VIcon :icon="mdiShareVariantOutline" class="task-action-icon" />
					{{ t("common.actions.shareCopy") }}
				</VListItemTitle>
			</VListItem>
			<VListItem
				v-if="!task.status.isDraft && !task.status.isFinished"
				id="task-action-revert"
				class="task-action"
				data-testId="task-revert"
				role="menuitem"
				@click="emit('revert-task', task.id)"
			>
				<VListItemTitle>
					<VIcon :icon="mdiUndoVariant" class="task-action-icon" />
					{{ t("pages.room.cards.label.revert") }}
				</VListItemTitle>
			</VListItem>
		</template>

		<VListItem v-if="task.status.isFinished" data-testId="task-finish" @click="emit('restore-task', task.id)">
			<VListItemTitle>
				<VIcon :icon="mdiUndoVariant" class="task-action-icon" />
				{{ t("common.labels.restore") }}
			</VListItemTitle>
		</VListItem>
		<VListItem v-else data-testId="task-finish" @click="emit('finish-task', task.id)">
			<VListItemTitle>
				<VIcon :icon="mdiArchiveOutline" class="task-action-icon" />
				{{ t("components.molecules.TaskItemMenu.finish") }}
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
				{{ t("common.actions.delete") }}
			</VListItemTitle>
		</VListItem>
	</KebabMenu>
</template>

<script setup lang="ts">
import { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import { askDeletion } from "@/utils/confirmation-dialog.utils";
import { TaskResponse } from "@api-server";
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
		userRole: "student" | "teacher";
	}>(),
	{}
);

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

const isTeacher = computed(() => props.userRole === "teacher");
const editLink = computed(() => `/homework/${props.task.id}/edit`);
const copyLink = computed(() => `/homework/${props.task.id}/copy?returnUrl=/tasks`);
const copyServiceEnabled = computed(() => envConfig.value.FEATURE_COPY_SERVICE_ENABLED);
const shareTaskEnabled = computed(() => envConfig.value.FEATURE_TASK_SHARE);

const onDelete = async () => {
	const confirmed = await askDeletion(
		"components.molecules.TaskItemMenu.confirmDelete.title",
		t("components.molecules.TaskItemMenu.confirmDelete.text", { taskTitle: props.task.name }),
		"warning"
	);

	if (confirmed) {
		emit("delete-task", props.task.id);
	}
};

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
