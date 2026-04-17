<template>
	<VListItem
		class="px-xxl-4 px-xl-4 px-lg-4 px-md-4 px-sm-4 px-0"
		v-bind="$attrs"
		:aria-label="ariaLabel"
		role="article"
		:ripple="false"
		@click="handleClick"
	>
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

<script>
import TasksOverviewListItemMenu from "./TasksOverviewListItemMenu.vue";
import { formatUtc, isDueWithin24h } from "@/utils/date-time.utils.ts";
import { mdiCheckCircleOutline } from "@icons/material";
import { ChipTimeRemaining } from "@ui-chip";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name"];

export default {
	components: {
		ChipTimeRemaining,
		TasksOverviewListItemMenu,
	},
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
	},
	computed: {
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		isCloseToDueDate() {
			return this.task.dueDate && isDueWithin24h(this.task.dueDate);
		},
		isOverDue() {
			const dueDate = this.task.dueDate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isGradedButMissed() {
			const { status } = this.task;
			return this.isOverDue && !status.submitted && status.graded;
		},
		taskState() {
			const { status } = this.task;

			if (this.isCloseToDueDate && !status.submitted) return "warning";
			if (this.isGradedButMissed) return "gradedOverdue";
			if (this.isOverDue && !status.submitted) return "overdue";
			if (status.submitted && !status.graded) return "submitted";
			if (status.graded) return "graded";
			return undefined;
		},
		taskIcon() {
			const stateIcons = {
				warning: "$taskOpenFilled",
				overdue: "$taskMissed",
				submitted: mdiCheckCircleOutline,
				graded: mdiCheckCircleOutline,
				gradedOverdue: "$taskMissedFilled",
				open: "$taskOpenFilled",
			};
			return stateIcons[this.taskState] || stateIcons["open"];
		},
		topic() {
			return this.task.lessonName ? `${this.$t("common.words.topic")} ${this.task.lessonName}` : "";
		},
		dueDateLabel() {
			const dueDate = this.task.dueDate;
			const convertedDueDate = this.$vuetify.display.xs
				? formatUtc(dueDate, "dateYY")
				: formatUtc(dueDate, "dateTimeYY");

			return !dueDate ? undefined : `${this.$t("pages.tasks.labels.due")} ${convertedDueDate}`;
		},
		taskLabel() {
			return `${this.task.courseName}`;
		},
		ariaLabel() {
			return `${this.$t("common.words.task")} ${this.task.name}`;
		},
		conditionalWidth() {
			if (this.$vuetify.display.xs) {
				return "width: 96%";
			}
			return "width: 65%";
		},
	},
	methods: {
		handleClick() {
			this.redirectAction(`/homework/${this.task.id}`);
		},
		redirectAction(value) {
			window.location = value;
		},
	},
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
