<template>
	<v-hover v-model="isHovering" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			v-outside-click="() => handleFocus(false)"
			class="mx-n4 mx-sm-0"
			v-bind="$attrs"
			:aria-label="ariaLabel"
			role="article"
			@click="handleClick"
			@focus="handleFocus(true)"
			@keydown.tab.shift="handleFocus(false)"
		>
			<template v-slot:prepend>
				<v-avatar>
					<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
				</v-avatar>
			</template>
			<div>
				<v-list-item-subtitle data-testid="taskSubtitle">
					{{ taskLabel }}
				</v-list-item-subtitle>
				<v-list-item-title data-testid="taskTitle">
					{{ task.name }}
				</v-list-item-title>
				<v-list-item-subtitle>{{ topic }}</v-list-item-subtitle>
			</div>
			<v-list-item-action>
				<div class="text-subtitle-2" data-test-id="dueDateLabel">
					{{ dueDateLabel }}
				</div>
				<v-spacer />
				<v-custom-chip-time-remaining
					v-if="taskState === 'warning'"
					:type="taskState"
					:due-date="task.dueDate"
					:shorten-unit="$vuetify.display.xsOnly"
				/>
			</v-list-item-action>
			<template v-slot:append>
				<div :id="`task-menu-${task.id}`" class="context-menu-btn">
					<task-item-menu
						:task-id="task.id"
						:task-is-finished="task.status.isFinished"
						user-role="student"
						@toggled-menu="toggleMenu"
						@focus-changed="handleFocus"
					/>
				</div>
			</template>
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
import { vOnClickOutside } from "@vueuse/components";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name"];

export default {
	components: { VCustomChipTimeRemaining, TaskItemMenu },
	directives: {
		outsideClick: vOnClickOutside,
	},
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
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		isCloseToDueDate() {
			const timeDiff = fromNowToFuture(this.task.dueDate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
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
				submitted: "$taskDone",
				graded: "$taskDoneFilled",
				gradedOverdue: "$taskMissedFilled",
				open: "$taskOpenFilled",
			};
			return stateIcons[this.taskState] || stateIcons["open"];
		},
		topic() {
			return this.task.lessonName
				? `${this.$t("common.words.topic")} ${this.task.lessonName}`
				: "";
		},
		dueDateLabel() {
			const dueDate = this.task.dueDate;
			const convertedDueDate = this.$vuetify.display.xsOnly
				? dateFromUTC(dueDate)
				: dateTimeFromUTC(dueDate);

			return !dueDate
				? undefined
				: `${this.$t("pages.tasks.labels.due")} ${convertedDueDate}`;
		},
		taskLabel() {
			return `${this.task.courseName}`;
		},
		ariaLabel() {
			return `${this.$t("common.words.task")} ${this.task.name}`;
		},
	},
	methods: {
		toggleMenu(stateValue) {
			this.isMenuActive = stateValue;
			this.isHovering = stateValue;
		},
		handleClick() {
			this.redirectAction(`/homework/${this.task.id}`);
		},
		handleFocus(value) {
			this.isActive = value;
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
</style>
