<template>
	<VListItem v-bind="$attrs" :aria-label="ariaLabel" role="article" :ripple="false" @click="handleClick">
		<!-- item avatar -->
		<template #prepend>
			<VAvatar>
				<VIcon class="fill" :color="iconColor">{{ taskIcon }}</VIcon>
			</VAvatar>
		</template>

		<!-- item main info -->
		<div class="d-flex align-center justify-space-between flex-wrap flex-sm-nowrap">
			<!-- item title -->
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
					v-if="taskState === 'warning'"
					class="ml-2 ml-sm-0 float-sm-right"
					:type="taskState"
					:due-date="task.dueDate"
				/>
			</div>
		</div>

		<template #append>
			<div :id="`task-menu-${task.id}`" class="context-menu-btn">
				<TasksOverviewListItemMenu :task-id="task.id" :task-is-finished="task.status.isFinished" user-role="student" />
			</div>
		</template>
	</VListItem>
</template>

<script setup lang="ts">
import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import { formatUtc, isDueWithin24h } from "@/utils/date-time.utils";
import { TaskResponse } from "@api-server";
import { mdiCheckCircleOutline } from "@icons/material";
import { ChipTimeRemaining } from "@ui-chip";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps<{ task: TaskResponse }>();

const { t } = useI18n();
const { xs } = useDisplay();

const iconColor = computed(() => props.task.displayColor ?? "#54616e");

const isCloseToDueDate = computed(() => !!props.task.dueDate && isDueWithin24h(props.task.dueDate));

const isOverDue = computed(() => !!props.task.dueDate && new Date(props.task.dueDate) < new Date());

const isGradedButMissed = computed(() => {
	const { status } = props.task;
	return isOverDue.value && !status.submitted && status.graded;
});

const taskState = computed<TaskState>(() => {
	const { status } = props.task;

	if (isCloseToDueDate.value && !status.submitted) return "warning";
	if (isGradedButMissed.value) return "gradedOverdue";
	if (isOverDue.value && !status.submitted) return "overdue";
	if (status.submitted && !status.graded) return "submitted";
	if (status.graded) return "graded";
	return undefined;
});

const taskIcon = computed(() => {
	const stateIcons: Record<string, string> = {
		warning: "$taskOpenFilled",
		overdue: "$taskMissed",
		submitted: mdiCheckCircleOutline,
		graded: mdiCheckCircleOutline,
		gradedOverdue: "$taskMissedFilled",
		open: "$taskOpenFilled",
	};
	return stateIcons[taskState.value ?? "open"] ?? stateIcons["open"];
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
