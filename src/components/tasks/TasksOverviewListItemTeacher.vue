<template>
	<VListItem v-bind="$attrs" :aria-label="ariaLabel" :ripple="false" role="article" @click="handleClick">
		<template #prepend>
			<VAvatar>
				<VIcon class="fill" :icon="avatarIcon" :class="{ 'opacity-0-5': isUnpublishedLesson }" :color="iconColor" />
			</VAvatar>
		</template>

		<div class="d-flex">
			<div :class="isUnpublishedLesson ? 'opacity-0-5' : ''" class="task-item__main-info align-self-center flex-grow-1">
				<VListItemSubtitle data-testId="task-label" class="d-inline-flex">
					<span class="text-truncate" data-testid="taskSubtitle">
						{{ taskLabel }}
					</span>
				</VListItemSubtitle>
				<VListItemTitle data-testid="taskTitle">
					{{ task.name }}
				</VListItemTitle>
				<VListItemSubtitle v-if="topic && currentBreakpoint !== 'xs'" data-testid="task-topic" class="d-inline-flex">
					<span class="text-truncate">{{ topic }}</span>
				</VListItemSubtitle>
				<VListItemSubtitle class="hidden-sm-and-up text--primary text-wrap">
					<VChip v-if="isUnpublishedLesson" size="x-small" data-testid="task-lesson-chip-small">
						{{ $t("components.molecules.TaskItemTeacher.lessonIsNotPublished") }}
					</VChip>
					<i18n-t
						v-else
						keypath="components.molecules.TaskItemTeacher.status"
						scope="global"
						data-testid="task-status-small"
					>
						<template #submitted>{{ task.status.submitted }}</template>
						<template #max>{{ task.status.maxSubmissions }}</template>
						<template #graded>{{ task.status.graded }}</template>
					</i18n-t>
				</VListItemSubtitle>
			</div>

			<!-- item additional info -->
			<section
				v-if="isUnpublishedLesson"
				data-testid="task-lesson-chip-large"
				class="hidden-xs mr-8 pl-4 align-self-center"
			>
				<VChip size="small">
					{{ $t("components.molecules.TaskItemTeacher.lessonIsNotPublished") }}
				</VChip>
			</section>
			<section v-else-if="showTaskStatus" data-testid="task-status" class="mr-4 d-flex align-self-center">
				<div class="hidden-xs px-4 mr-4 text-center task-stats">
					<VListItemSubtitle>
						{{ $t("components.molecules.TaskItemTeacher.submitted") }}
					</VListItemSubtitle>
					<VListItemTitle data-testid="taskSubmitted">
						{{ task.status.submitted }}/{{ task.status.maxSubmissions }}
					</VListItemTitle>
				</div>
				<div class="hidden-xs px-4 text-center task-stats">
					<VListItemSubtitle>
						{{ $t("components.molecules.TaskItemTeacher.graded") }}
					</VListItemSubtitle>
					<VListItemTitle data-testid="taskGraded">
						{{ task.status.graded }}
					</VListItemTitle>
				</div>
			</section>

			<VListItemAction :id="`task-menu-${task.id}`" data-testid="three-dot-task-option-menu">
				<TasksOverviewListItemMenu
					:task
					user-role="teacher"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
					@finish-task="onFinish"
					@delete-task="onDelete"
					@restore-task="onRestoreTask"
					@revert-task="onRevertPublishedTask"
				/>
			</VListItemAction>
			<VProgressCircular v-if="isMutating" class="position-absolute right-0" indeterminate size="16" />
		</div>
	</VListItem>
</template>

<script setup lang="ts">
import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import { CopyParams } from "@/store/copy";
import { formatUtc, isToday } from "@/utils/date-time.utils";
import { TaskResponse } from "@api-server";
import { isTaskDraft, isTaskUnpublished, useTaskActions, useTasksOfOverview } from "@data-tasks";
import TaskDraft from "@icons/custom/task-draft.vue";
import TaskOpenFilled from "@icons/custom/task-open-filled.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps<{ task: TaskResponse }>();
const { isMutating, finishTask, restoreFinishedTask, deleteTask, revertPublishedTask } = useTaskActions();
const { fetchTasks, fetchFinishedTasks } = useTasksOfOverview();

const onRestoreTask = async (taskId: string) => {
	await restoreFinishedTask(taskId);
	await Promise.all([fetchTasks(), fetchFinishedTasks()]);
};

const onRevertPublishedTask = async (taskId: string) => {
	await revertPublishedTask(taskId);
	await fetchTasks();
};

const onFinish = async (taskId: string) => {
	await finishTask(taskId);
	await Promise.all([fetchTasks(), fetchFinishedTasks()]);
};

const onDelete = async (taskId: string) => {
	await deleteTask(taskId);
	if (props.task.status.isFinished) {
		await fetchFinishedTasks();
	} else {
		await fetchTasks();
	}
};

const emit = defineEmits<{
	"copy-task": [payload: CopyParams];
	"share-task": [taskId: string];
}>();

const { t } = useI18n();
const { name: currentBreakpoint } = useDisplay();

const isDraft = computed(() => isTaskDraft(props.task));
const isPlanned = computed(() => new Date(props.task.availableDate!) > new Date());

const showTaskStatus = computed(() => !isDraft.value && !isPlanned.value);
const avatarIcon = computed(() => (isDraft.value ? TaskDraft : TaskOpenFilled));
const iconColor = computed(() => props.task.displayColor ?? "#54616e");

const courseName = computed(() => {
	const { isSubstitutionTeacher } = props.task.status;
	const baseName = props.task.courseName || t("pages.tasks.labels.noCourse");
	return isSubstitutionTeacher ? `${t("common.words.substitute")} ${baseName}` : baseName;
});

const taskLabel = computed(() => {
	const { createdAt, dueDate, availableDate } = props.task;
	const labelText = courseName.value;

	if (isDraft.value) {
		const suffix = isToday(createdAt)
			? `${t("components.molecules.TaskItemMenu.labels.createdAt")} ${formatUtc(createdAt, "time")}`
			: `${t("components.molecules.TaskItemMenu.labels.createdAt")} ${formatUtc(createdAt, "dateYY")}`;
		return `${labelText} - ${suffix}`;
	}

	if (isPlanned.value) {
		return `${labelText} - ${t("pages.tasks.labels.planned")} ${formatUtc(availableDate!, "dateYY")}`;
	}

	if (dueDate) {
		return `${labelText} - ${t("pages.tasks.labels.due")} ${formatUtc(dueDate, "dateYY")}`;
	}

	return labelText;
});

const topic = computed(() => (props.task.lessonName ? `${t("common.words.topic")} ${props.task.lessonName}` : ""));

const isUnpublishedLesson = computed(() => isTaskUnpublished(props.task));

const ariaLabel = computed(() => `${t("common.words.task")} ${props.task.name}`);

const handleClick = () => {
	window.location.href = `/homework/${props.task.id}`;
};

const onCopyTask = (payload: CopyParams) => {
	emit("copy-task", payload);
};

const onShareTask = (taskId: string) => {
	emit("share-task", taskId);
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

.opacity-0-5 {
	opacity: 0.5;
}

.task-item__main-info {
	overflow: hidden;
}

:deep(.v-list-item__prepend .v-icon) {
	width: inherit;
	height: inherit;
}

.task-stats {
	min-width: 7rem;
}
</style>
