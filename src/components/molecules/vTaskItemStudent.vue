<template>
	<v-list-item
		:key="task.id"
		:href="href"
		class="mx-n4 mx-sm-0"
		v-bind="$attrs"
		:aria-label="`${$t('common.words.task')} ${task.name}`"
		role="article"
	>
		<v-list-item-avatar>
			<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle data-testid="taskSubtitle">
				{{ task.courseName }}
				<template v-if="isPlanned">
					{{ `&nbsp;– ${plannedLabel}` }}
				</template>
			</v-list-item-subtitle>
			<v-list-item-title data-testid="taskTitle" v-text="task.name" />
			<v-list-item-subtitle>
				{{ topic }}
			</v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-action v-if="!isPlanned">
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
				:shorten-date="$vuetify.breakpoint.xsOnly"
			/>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
import VCustomChipTimeRemaining from "@components/atoms/VCustomChipTimeRemaining";
import { fromNow, fromNowToFuture } from "@plugins/datetime";
import {
	printDateFromStringUTC as dateFromUTC,
	printDateTimeFromStringUTC as dateTimeFromUTC,
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
		href() {
			return `/homework/${this.task.id}`;
		},
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		isPlanned() {
			return new Date(this.task.availableDate) > new Date();
		},
		plannedLabel() {
			return `${this.$t("pages.tasks.labels.planned")} ${dateFromUTC(
				this.task.availableDate
			)}`;
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

			if (this.isCloseToDueDate) return "warning";
			if (this.isGradedButMissed) return "gradedOverdue";
			if (this.isOverDue) return "overdue";
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
				? `${this.$t("pages.tasks.subtitleTopic")} ${this.task.description}`
				: "";
		},
		dueDateLabel() {
			const dueDate = this.task.duedate;
			const convertedDueDate = this.$vuetify.breakpoint.xsOnly
				? dateFromUTC(dueDate)
				: dateTimeFromUTC(dueDate);

			return !dueDate
				? this.$t("pages.tasks.labels.noDueDate")
				: `${this.$t("pages.tasks.labels.due")} ${convertedDueDate}`;
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}
</style>
