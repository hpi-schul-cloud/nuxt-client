<template>
	<v-list subheader two-line>
		<v-subheader v-if="isListFilled">
			{{ title }}
		</v-subheader>
		<template v-if="loading">
			<v-skeleton-loader :type="'text'" :max-width="'15%'" />
			<v-skeleton-loader
				v-for="homework of 4"
				ref="skeleton"
				:key="homework"
				:type="'list-item-avatar-two-line'"
			/>
		</template>

		<template v-for="(homework, index) of homeworks" v-else>
			<v-list-item :key="homework._id" :href="homeworkHref(homework._id)">
				<v-list-item-avatar class="hidden-xs-only">
					<img :src="taskIconSvg" role="presentation" />
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-subtitle class="text-wrap">
						{{ homework.courseName }}
					</v-list-item-subtitle>
					<v-list-item-title
						class="text-wrap"
						v-text="homework.name"
					></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-list-item-action-text
						class="subtitle-2 hidden-xs-only"
						v-text="computedDueDateLabel(homework.duedate)"
					/>
					<v-list-item-action-text
						class="subtitle-2 hidden-sm-and-up"
						data-test-id="dueDateLabel"
						v-text="computedDueDateLabel(homework.duedate, (shorten = true))"
					/>
					<v-spacer />
					<v-chip
						v-if="isCloseToDueDate(homework.duedate)"
						color="orange lighten-3"
						small
						data-test-id="dueDateHintLabel"
					>
						<v-icon left small> $hourglassBottomBlack </v-icon>
						<span class="hidden-xs-only">{{
							hintDueDate(homework.duedate)
						}}</span>
						<span class="hidden-sm-and-up">{{
							hintDueDate(homework.duedate, (shorten = true))
						}}</span>
					</v-chip>
					<v-chip
						v-else-if="isOverDue(homework.duedate)"
						color="error lighten-5"
						text-color="black"
						small
						data-test-id="overDueDateLabel"
					>
						<v-icon left small> $hourglassDisabled </v-icon>
						{{ $t("pages.homeworks.labels.overdue") }}
					</v-chip>
				</v-list-item-action>
			</v-list-item>
			<v-divider v-if="index < homeworks.length - 1" :key="index"></v-divider>
		</template>
	</v-list>
</template>

<script>
import { fromNow, fromNowToFuture } from "@plugins/datetime";
import taskIconSvg from "@assets/img/courses/task-new.svg";
import {
	printDateFromStringUTC,
	printDateTimeFromStringUTC,
} from "@plugins/datetime";
import { mapGetters } from "vuex";

export default {
	components: {},
	props: {
		homeworks: {
			type: Array,
			required: false,
			default: () => [],
		},
		title: {
			type: String,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			fromNow,
			taskIconSvg,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			loading: "loading",
			isListEmpty: "isListEmpty",
			isListFilled: "isListFilled",
		}),
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
		hintDueDate(dueDate, shorten = false) {
			const diffHrs = fromNowToFuture(dueDate, "hours");
			if (diffHrs === 0) {
				const diffMins = fromNowToFuture(dueDate, "minutes");

				const label = shorten
					? this.$t("pages.homeworks.labels.hintMinShort")
					: this.$tc("pages.homeworks.labels.hintMinutes", diffMins);

				return `${this.$t(
					"pages.homeworks.labels.hintDueTime"
				)} ${diffMins} ${label}`;
			} else {
				const label = shorten
					? this.$t("pages.homeworks.labels.hintHoursShort")
					: this.$tc("pages.homeworks.labels.hintHours", diffHrs);
				return `${this.$t(
					"pages.homeworks.labels.hintDueTime"
				)} ${diffHrs} ${label}`;
			}
		},
		homeworkHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>
