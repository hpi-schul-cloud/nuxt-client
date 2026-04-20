<template>
	<VListItem v-bind="$attrs" :aria-label="ariaLabel" role="article" :ripple="false" @click="handleClick">
		<template #prepend>
			<VAvatar>
				<VIcon class="fill" :icon="taskIcon" :color="iconColor" />
			</VAvatar>
		</template>

		<template #default>
			<div class="task-item__main-info w-65" :style="conditionalWidth">
				<VListItemSubtitle data-testid="taskSubtitle">
					{{ taskLabel }}
				</VListItemSubtitle>
				<VListItemTitle data-testid="taskTitle" class="text-truncate">
					{{ task.name }}
				</VListItemTitle>
				<VListItemSubtitle>{{ topic }}</VListItemSubtitle>
			</div>
			<div class="d-sm-block mr-sm-4 d-flex">
				<div class="text-subtitle-2 due-date-label" data-test-id="dueDateLabel">
					{{ dueDateLabel }}
				</div>
				<ChipTimeRemaining
					v-if="task.dueDate && taskState === 'warning'"
					class="ml-2 ml-sm-0 float-sm-right"
					:type="taskState"
					:due-date="task.dueDate"
				/>
			</div>
		</template>

		<template #append>
			<div :data-testid="`three-dot-task-option-menu-${task.id}`">
				<TasksOverviewListItemMenu :task @finish-task="onFinish" @restore-task="onRestoreTask" />
				<VProgressCircular v-if="isMutating" class="position-absolute right-0" indeterminate size="16" />
			</div>
		</template>
	</VListItem>
</template>

<script setup lang="ts">
import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import { formatUtc, isDueWithin24h } from "@/utils/date-time.utils";
import { TaskResponse } from "@api-server";
import { useTaskActions, useTasksOfOverview } from "@data-tasks";
import { TaskMissed, TaskMissedFilled, TaskOpenFilled } from "@icons/custom";
import { mdiCheckCircleOutline } from "@icons/material";
import { ChipTimeRemaining } from "@ui-chip";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps<{ task: TaskResponse }>();

const { fetchTasks, fetchFinishedTasks } = useTasksOfOverview();
const { isMutating, finishTask, restoreFinishedTask } = useTaskActions();

const { t } = useI18n();
const { xs } = useDisplay();

const iconColor = computed(() => props.task.displayColor ?? "#54616e");

const isCloseToDueDate = computed(() => !!props.task.dueDate && isDueWithin24h(props.task.dueDate));

const isOverDue = computed(() => !!props.task.dueDate && new Date(props.task.dueDate) < new Date());

const isGradedButMissed = computed(() => {
	const { status } = props.task;
	return isOverDue.value && !status.submitted && status.graded;
});

const taskState = computed(() => {
	const { status } = props.task;

	if (isCloseToDueDate.value && !status.submitted) return "warning";
	if (isGradedButMissed.value) return "gradedOverdue";
	if (isOverDue.value && !status.submitted) return "overdue";
	if (status.submitted && !status.graded) return "submitted";
	if (status.graded) return "graded";
	return undefined;
});

const taskIcon = computed(() => {
	switch (taskState.value) {
		case "warning":
			return TaskOpenFilled;
		case "overdue":
			return TaskMissed;
		case "gradedOverdue":
			return TaskMissedFilled;
		case "submitted":
		case "graded":
			return mdiCheckCircleOutline;
		default:
			return TaskOpenFilled;
	}
});

const topic = computed(() => (props.task.lessonName ? `${t("common.words.topic")} ${props.task.lessonName}` : ""));

const dueDateLabel = computed(() => {
	const { dueDate } = props.task;
	if (!dueDate) return undefined;

	const formatted = xs.value ? formatUtc(dueDate, "dateYY") : formatUtc(dueDate, "dateTimeYY");
	return `${t("pages.tasks.labels.due")} ${formatted}`;
});

const taskLabel = computed(() => props.task.courseName);

const ariaLabel = computed(() => `${t("common.words.task")} ${props.task.name}`);

const conditionalWidth = computed(() => (xs.value ? "width: 96%" : "width: 65%"));

const onFinish = async (taskId: string) => {
	await finishTask(taskId);
	await Promise.all([fetchTasks(), fetchFinishedTasks()]);
};
const onRestoreTask = async (taskId: string) => {
	await restoreFinishedTask(taskId);
	await Promise.all([fetchTasks(), fetchFinishedTasks()]);
};

const handleClick = () => {
	window.location.href = `/homework/${props.task.id}`;
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

:deep(.v-list-item__prepend .v-icon) {
	width: inherit;
	height: inherit;
}

:deep(.due-date-label) {
	opacity: var(--v-medium-emphasis-opacity);
}
</style>
