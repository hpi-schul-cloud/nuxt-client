<template>
	<v-hover v-model="isHovering" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			v-click-outside="() => handleFocus(false)"
			:href="href"
			class="mx-n4 mx-sm-0"
			v-bind="$attrs"
			:aria-label="`${$t('common.words.task')} ${task.name}`"
			role="article"
			@focus="handleFocus(true)"
			@keydown.tab.shift="handleFocus(false)"
		>
			<v-list-item-avatar>
				<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-subtitle data-testid="taskSubtitle">
					{{ task.courseName }}
				</v-list-item-subtitle>
				<v-list-item-title data-testid="taskTitle" v-text="task.name" />
				<v-list-item-subtitle>
					{{ topic }}
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-list-item-action-text
					class="subtitle-2"
					data-test-id="dueDateLabel"
					v-text="dueDateLabel"
				/>
				<v-spacer />
				<v-custom-chip-time-remaining
					v-if="taskState === 'warning'"
					:type="taskState"
					:due-date="task.duedate"
					:shorten-unit="$vuetify.breakpoint.xsOnly"
				/>
			</v-list-item-action>
			<v-list-item-action :id="`task-menu-${task.id}`" class="context-menu-btn">
				<task-item-menu
					:task-id="task.id"
					:task-is-finished="task.status.isFinished"
					user-role="student"
					@toggled-menu="toggleMenu"
					@focus-changed="handleFocus"
				/>
			</v-list-item-action>
		</v-list-item>
	</v-hover>
</template>

<script>
import VCustomChipTimeRemaining from "@/components/atoms/VCustomChipTimeRemaining";
import {
	printDateFromStringUTC as dateFromUTC,
	printDateTimeFromStringUTC as dateTimeFromUTC,
	fromNowToFuture,
} from "@/plugins/datetime";
import TaskItemMenu from "@/components/molecules/TaskItemMenu.vue";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name"];

export default {
	components: { VCustomChipTimeRemaining, TaskItemMenu },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
	},
	data() {
		return {
			isMenuActive: false,
			isHovering: false,
			isActive: false,
		};
	},
	computed: {
		href() {
			return `/homework/${this.task.id}`;
		},
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		isCloseToDueDate() {
			const timeDiff = fromNowToFuture(this.task.duedate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
		},
		isOverDue() {
			const dueDate = this.task.duedate;
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
				submitted: "$taskDone",
				graded: "$taskDoneFilled",
				gradedOverdue: "$taskMissedFilled",
				open: "$taskOpenFilled",
			};
			return stateIcons[this.taskState] || stateIcons["open"];
		},
		topic() {
			return this.task.description
				? `${this.$t("common.words.topic")} ${this.task.description}`
				: "";
		},
		dueDateLabel() {
			const dueDate = this.task.duedate;
			const convertedDueDate = this.$vuetify.breakpoint.xsOnly
				? dateFromUTC(dueDate)
				: dateTimeFromUTC(dueDate);

			return !dueDate
				? undefined
				: `${this.$t("pages.tasks.labels.due")} ${convertedDueDate}`;
		},
	},
	methods: {
		toggleMenu(stateValue) {
			this.isMenuActive = stateValue;
			this.isHovering = stateValue;
		},
		handleFocus(value) {
			this.isActive = value;
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

// stylelint-disable sh-waqar/declaration-use-variable
.context-menu-btn {
	min-width: 45px;
}
</style>
