<template>
	<v-list-item :key="homework.id" :href="homeworkHref(homework.id)">
		<v-list-item-avatar class="hidden-xs-only">
			<img :src="taskIconSvg" role="presentation" />
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
				v-if="isCloseToDueDate(homework.duedate)"
				type="warning"
				:due-date="homework.duedate"
				:shorten-date="$vuetify.breakpoint.xsOnly"
			/>
			<v-custom-chip-time-remaining
				v-else-if="isOverDue(homework.duedate)"
				type="overdue"
				:due-date="homework.duedate"
				:shorten-date="$vuetify.breakpoint.xsOnly"
			/>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
import VCustomChipTimeRemaining from "@components/molecules/VCustomChipTimeRemaining";
import taskIconSvg from "@assets/img/courses/task-new.svg";
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
			taskIconSvg,
		};
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
		homeworkHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>
