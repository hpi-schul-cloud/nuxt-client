<template>
	<KebabMenu :aria-label="ariaLabel" data-testid="task-menu">
		<v-list-item
			v-if="isTeacher"
			id="task-action-edit"
			:href="editLink"
			class="task-action"
			data-testId="task-edit"
			role="menuitem"
			:draggable="false"
		>
			<v-list-item-title>
				<v-icon :icon="mdiPencilOutline" class="task-action-icon" />
				{{ $t("common.actions.edit") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher && copyServiceEnabled"
			id="task-action-copy"
			class="task-action"
			data-testId="task-copy"
			role="menuitem"
			@click="onCopyTask"
		>
			<v-list-item-title>
				<v-icon :icon="mdiContentCopy" class="task-action-icon" />
				{{ $t("common.actions.duplicate") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher && shareTaskEnabled"
			id="task-action-share"
			class="task-action"
			data-testId="task-share"
			role="menuitem"
			@click="onShareTask"
		>
			<v-list-item-title>
				<v-icon :icon="mdiShareVariantOutline" class="task-action-icon" />
				{{ $t("common.actions.shareCopy") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher && taskIsPublished"
			id="task-action-revert"
			class="task-action"
			data-testId="task-revert"
			role="menuitem"
			@click="handleRevertPublished"
		>
			<v-list-item-title>
				<v-icon :icon="mdiUndoVariant" class="task-action-icon" />
				{{ $t("pages.room.cards.label.revert") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			id="task-action-finish"
			class="task-action"
			data-testId="task-finish"
			role="menuitem"
			@click="handleFinish"
		>
			<v-list-item-title>
				<template v-if="taskIsFinished">
					<v-icon :icon="mdiUndoVariant" class="task-action-icon" />
					{{ $t("common.labels.restore") }}
				</template>
				<template v-else>
					<v-icon :icon="mdiArchiveOutline" class="task-action-icon" />
					{{ $t("components.molecules.TaskItemMenu.finish") }}
				</template>
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher"
			id="task-action-delete"
			class="task-action"
			data-testId="task-delete"
			role="menuitem"
			@click="() => (confirmDeleteDialogIsOpen = true)"
		>
			<v-list-item-title>
				<v-icon :icon="mdiTrashCanOutline" class="task-action-icon" />
				{{ $t("common.actions.delete") }}
			</v-list-item-title>
		</v-list-item>
	</KebabMenu>
	<v-custom-dialog
		v-model:is-open="confirmDeleteDialogIsOpen"
		:size="375"
		has-buttons
		confirm-btn-title-key="common.actions.delete"
		@dialog-confirmed="handleDelete"
	>
		<template #title>
			<h2 class="my-2">
				{{ $t("components.molecules.TaskItemMenu.confirmDelete.title") }}
			</h2>
		</template>
		<template #content>
			<p class="text-md mt-2">
				{{
					$t("components.molecules.TaskItemMenu.confirmDelete.text", {
						taskTitle,
					})
				}}
			</p>
		</template>
	</v-custom-dialog>
</template>

<script setup lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { CopyParamsTypeEnum } from "@/store/copy";
import { FINISHED_TASKS_MODULE_KEY, injectStrict, TASKS_MODULE_KEY } from "@/utils/inject";
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
import { computed, ref } from "vue";
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

const confirmDeleteDialogIsOpen = ref(false);

const editLink = computed(() => `/homework/${props.taskId}/edit`);
const copyLink = computed(() => `/homework/${props.taskId}/copy?returnUrl=/tasks`);
const isTeacher = computed(() => props.userRole === "teacher");
const copyServiceEnabled = computed(() => useEnvConfig().value.FEATURE_COPY_SERVICE_ENABLED);
const shareTaskEnabled = computed(() => useEnvConfig().value.FEATURE_TASK_SHARE);
const ariaLabel = computed(
	() =>
		// VUE3_UPGRADE we need a proper label here. was missing before.
		`${t("common.words.task")}`
);

const handleFinish = () => {
	if (props.taskIsFinished) {
		finishedTasksModule.restoreTask(props.taskId);
	} else {
		tasksModule.finishTask(props.taskId);
	}
};

const handleRevertPublished = () => {
	tasksModule.revertPublishedTask(props.taskId);
};

const handleDelete = () => {
	tasksModule.deleteTask(props.taskId);
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

<style scoped>
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
