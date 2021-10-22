<template>
	<v-list-item :key="task.id" :href="taskHref(task.id)">
		<v-list-item-avatar>
			<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle>
				{{ task.courseName }}
			</v-list-item-subtitle>
			<v-list-item-title v-text="task.name" />
			<v-list-item-subtitle>
				{{ topic }}
			</v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-action>
			<v-list-item-action-text
				class="subtitle-2"
				data-test-id="dueDateLabel"
				v-text="
					computedDueDateLabel(
						task.duedate,
						(shorten = $vuetify.breakpoint.xsOnly)
					)
				"
			/>
			<v-spacer />
			<v-custom-chip-time-remaining
				v-if="taskState === 'warning'"
				:type="taskState"
				:due-date="task.duedate"
				:shorten-date="$vuetify.breakpoint.xsOnly"
			/>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
import VCustomChipTimeRemaining from "@components/atoms/VCustomChipTimeRemaining";
import { fromNow, fromNowToFuture } from "@plugins/datetime";
import {
	printDateFromStringUTC,
	printDateTimeFromStringUTC,
} from "@plugins/datetime";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name"];

export default {
	components: { VCustomChipTimeRemaining },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
	},
	data() {
		return {
			fromNow,
		};
	},
	computed: {
		taskState() {
			const { duedate, status } = this.task;
			if (this.isCloseToDueDate(duedate)) return "warning";
			if (this.isGradedButMissed(duedate, status)) return "gradedOverdue";
			if (this.isOverDue(duedate)) return "overdue";
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
		iconColor() {
			return this.task.displayColor || this.defaultIconColor;
		},
		defaultIconColor() {
			return "#54616e";
		},
		hasTopic() {
			return !!this.task.description;
		},
		topic() {
			return `${this.$t("pages.tasks.subtitleTopic")} ${this.task.description}`;
		},
	},
	methods: {
		computedDueDateLabel(dueDate, shorten = false) {
			if (!dueDate) {
				return this.$t("pages.tasks.labels.noDueDate");
			} else if (shorten) {
				return (
					this.$t("pages.tasks.labels.due") + printDateFromStringUTC(dueDate)
				);
			} else {
				return (
					this.$t("pages.tasks.labels.due") +
					printDateTimeFromStringUTC(dueDate)
				);
			}
		},
		isCloseToDueDate(dueDate) {
			const timeDiff = fromNowToFuture(dueDate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
		},
		isOverDue(dueDate) {
			return dueDate && new Date(dueDate) < new Date();
		},
		isGradedButMissed(dueDate, status) {
			return this.isOverDue(dueDate) && !status.submitted && status.graded;
		},
		taskHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}
</style>
