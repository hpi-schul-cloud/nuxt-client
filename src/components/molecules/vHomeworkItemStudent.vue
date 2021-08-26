<template>
	<v-list-item :key="homework.id" :href="homeworkHref(homework.id)">
		<v-list-item-avatar>
			<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle>
				{{ homework.courseName }}
			</v-list-item-subtitle>
			<v-list-item-title v-text="homework.name" />
		</v-list-item-content>
		<v-list-item-action>
			<v-list-item-action-text
				class="subtitle-2"
				data-test-id="dueDateLabel"
				v-text="
					computedDueDateLabel(
						homework.duedate,
						(shorten = $vuetify.breakpoint.xsOnly)
					)
				"
			/>
			<v-spacer />
			<v-custom-chip-time-remaining
				v-if="taskState === 'warning'"
				:type="taskState"
				:due-date="homework.duedate"
				:shorten-date="$vuetify.breakpoint.xsOnly"
			/>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
import VCustomChipTimeRemaining from "@components/molecules/VCustomChipTimeRemaining";
import { fromNow, fromNowToFuture } from "@plugins/datetime";
import {
	printDateFromStringUTC,
	printDateTimeFromStringUTC,
} from "@plugins/datetime";

const homeworkRequiredKeys = ["courseName", "createdAt", "id", "name"];

export default {
	components: { VCustomChipTimeRemaining },
	props: {
		homework: {
			type: Object,
			required: true,
			validator: (homework) =>
				homeworkRequiredKeys.every((key) => key in homework),
		},
	},
	data() {
		return {
			fromNow,
		};
	},
	computed: {
		taskState() {
			const { duedate, status } = this.homework;
			if (this.isCloseToDueDate(duedate)) return "warning";
			if (this.isGradedButMissed(duedate, status)) return "gradedOverdue";
			if (this.isOverDue(duedate)) return "overdue";
			if (status.submitted && !status.graded) return "submitted";
			if (status.graded) return "graded";
			return undefined;
		},
		taskIcon() {
			switch (this.taskState) {
				case "warning":
					return "$taskOpenFilled";
				case "overdue":
					return "$taskMissed";
				case "submitted":
					return "$taskDone";
				case "graded":
					return "$taskDoneFilled";
				case "gradedOverdue":
					return "$taskMissedFilled";
				default:
					return "$taskOpenFilled";
			}
		},
		iconColor() {
			return this.homework.displayColor || this.defaultIconColor;
		},
		defaultIconColor() {
			return "#455B6A";
		},
	},
	methods: {
		computedDueDateLabel(dueDate, shorten = false) {
			if (!dueDate) {
				return this.$t("pages.homeworks.labels.noDueDate");
			} else if (shorten) {
				return (
					this.$t("pages.homeworks.labels.due") +
					printDateFromStringUTC(dueDate)
				);
			} else {
				return (
					this.$t("pages.homeworks.labels.due") +
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
		homeworkHref: (id) => {
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
