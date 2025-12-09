<template>
	<KebabMenu :aria-label="t('components.molecules.TaskItemMenu.ariaLabel')" data-testid="task-menu">
		<KebabMenuActionEdit v-if="isTeacher" :href="editLink" data-testId="task-edit" />
		<KebabMenuActionDuplicate v-if="isTeacher && copyServiceEnabled" data-testId="task-copy" @click="onCopyTask" />
		<KebabMenuActionShare v-if="isTeacher && shareTaskEnabled" data-testId="task-share" @click="onShareTask" />
		<KebabMenuAction
			v-if="isTeacher && taskIsPublished"
			:icon="mdiUndoVariant"
			data-testId="task-revert"
			@click="onRevertPublished"
		>
			{{ $t("pages.room.cards.label.revert") }}
		</KebabMenuAction>
		<KebabMenuAction
			data-testId="task-finish"
			:icon="taskIsFinished ? mdiUndoVariant : mdiArchiveOutline"
			@click="onFinish"
		>
			{{ taskIsFinished ? $t("common.labels.restore") : $t("components.molecules.TaskItemMenu.finish") }}
		</KebabMenuAction>
		<KebabMenuActionDelete v-if="isTeacher" scope-language-key="common.words.task" @click="onDelete" />
	</KebabMenu>
</template>

<script setup lang="ts">
import { CopyParamsTypeEnum } from "@/store/copy";
import { FINISHED_TASKS_MODULE_KEY, injectStrict, TASKS_MODULE_KEY } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
import { mdiArchiveOutline, mdiUndoVariant } from "@icons/material";
import {
	KebabMenu,
	KebabMenuAction,
	KebabMenuActionDelete,
	KebabMenuActionDuplicate,
	KebabMenuActionEdit,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	taskId: {
		type: String,
		required: true,
	},
	taskIsFinished: {
		type: Boolean,
		required: true,
	},
	taskIsPublished: {
		type: Boolean,
	},
	taskTitle: {
		type: String,
		required: false,
		default: "",
	},
	courseId: {
		type: String,
		default: "",
	},
	userRole: {
		type: String,
		required: true,
		validator: (role: string) => ["student", "teacher"].includes(role),
	},
});

const emit = defineEmits<{
	(e: "copy-task", payload: { id: string; courseId?: string; type: CopyParamsTypeEnum }): void;
	(e: "share-task", taskId: string): void;
}>();

const { t } = useI18n();
const tasksModule = injectStrict(TASKS_MODULE_KEY);
const finishedTasksModule = injectStrict(FINISHED_TASKS_MODULE_KEY);

const editLink = computed(() => `/homework/${props.taskId}/edit`);
const copyLink = computed(() => `/homework/${props.taskId}/copy?returnUrl=/tasks`);
const isTeacher = computed(() => props.userRole === "teacher");
const copyServiceEnabled = computed(() => useEnvConfig().value.FEATURE_COPY_SERVICE_ENABLED);
const shareTaskEnabled = computed(() => useEnvConfig().value.FEATURE_TASK_SHARE);

const onFinish = () => {
	if (props.taskIsFinished) {
		finishedTasksModule.restoreTask(props.taskId);
	} else {
		tasksModule.finishTask(props.taskId);
	}
};

const onRevertPublished = () => {
	tasksModule.revertPublishedTask(props.taskId);
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		tasksModule.deleteTask(props.taskId);
	}
};

const onCopyTask = () => {
	if (!copyServiceEnabled.value) {
		window.location.href = copyLink.value;
		return;
	}

	const payload = {
		id: props.taskId,
		courseId: props.courseId === "" ? undefined : props.courseId,
		type: CopyParamsTypeEnum.Task,
	};

	emit("copy-task", payload);
};

const onShareTask = () => {
	if (shareTaskEnabled.value) {
		emit("share-task", props.taskId);
	}
};
</script>
