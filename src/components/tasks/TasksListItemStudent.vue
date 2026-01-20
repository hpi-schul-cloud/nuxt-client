<template>
	<v-list-item
		:key="task.id"
		class="px-xxl-4 px-xl-4 px-lg-4 px-md-4 px-sm-4 px-0"
		v-bind="$attrs"
		:aria-label="ariaLabel"
		:ripple="false"
		@click="handleClick"
	>
		<template #prepend>
			<v-avatar>
				<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
			</v-avatar>
		</template>
		<div class="d-flex align-center justify-space-between flex-wrap flex-sm-nowrap">
			<div class="task-item__main-info w-65" :style="conditionalWidth">
				<v-list-item-subtitle data-testid="taskSubtitle">
					{{ taskLabel }}
				</v-list-item-subtitle>
				<v-list-item-title data-testid="taskTitle" class="text-truncate">
					{{ task.name }}
				</v-list-item-title>
				<v-list-item-subtitle>{{ topic }}</v-list-item-subtitle>
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
		</div>
		<template #append>
			<div :id="`task-menu-${task.id}`" class="context-menu-btn">
				<TasksListItemMenu :task-id="task.id" :task-is-finished="task.status.isFinished" user-role="student" />
			</div>
		</template>
	</v-list-item>
</template>

<script setup lang="ts">
import TasksListItemMenu from "./TasksListItemMenu.vue";
import {
	fromNowToFuture,
	printDateFromStringUTC as dateFromUTC,
	printDateTimeFromStringUTC as dateTimeFromUTC,
} from "@/plugins/datetime.js";
import { TaskResponse } from "@/serverApi/v3";
import { ChipTimeRemaining } from "@ui-chip";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps({
	task: {
		type: Object as PropType<TaskResponse>,
		required: true,
	},
});

const { t } = useI18n();
const { xs } = useDisplay();

const iconColor = computed(() => {
	const defaultColor = "#54616e";
	return props.task.displayColor || defaultColor;
});

const isCloseToDueDate = computed(() => {
	if (!props.task.dueDate) return false;

	const timeDiff = fromNowToFuture(props.task.dueDate, "hours");
	if (timeDiff === null) {
		return false;
	} else return timeDiff <= 24;
});

const isOverDue = computed(() => {
	const dueDate = props.task.dueDate;
	return dueDate && new Date(dueDate) < new Date();
});

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
	const stateIcons = {
		warning: "$taskOpenFilled",
		overdue: "$taskMissed",
		submitted: "$taskDone",
		graded: "$taskDoneFilled",
		gradedOverdue: "$taskMissedFilled",
		open: "$taskOpenFilled",
	};

	if (!taskState.value) return stateIcons["open"];

	return stateIcons[taskState.value] || stateIcons["open"];
});

const topic = computed(() => (props.task.lessonName ? `${t("common.words.topic")} ${props.task.lessonName}` : ""));

const dueDateLabel = computed(() => {
	const dueDate = props.task.dueDate;
	const convertedDueDate = xs.value ? dateFromUTC(dueDate) : dateTimeFromUTC(dueDate);

	return !dueDate ? undefined : `${t("pages.tasks.labels.due")} ${convertedDueDate}`;
});

const taskLabel = computed(() => `${props.task.courseName}`);

const ariaLabel = computed(() => `${t("common.words.task")} ${props.task.name}`);

const conditionalWidth = computed(() => {
	if (xs.value) {
		return "width: 96%";
	}
	return "width: 65%";
});

const handleClick = () => {
	redirectAction(`/homework/${props.task.id}`);
};

const redirectAction = (value: string) => {
	window.location.href = value;
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
