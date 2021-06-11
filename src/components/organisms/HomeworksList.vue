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
			<v-divider v-if="index < homeworks.length - 1" :key="index"></v-divider>
		</template>
	</v-list>
</template>

<script>
import VCustomChipTimeRemaining from "@components/molecules/VCustomChipTimeRemaining";
import { fromNow, fromNowToFuture } from "@plugins/datetime";
import taskIconSvg from "@assets/img/courses/task-new.svg";
import {
	printDateFromStringUTC,
	printDateTimeFromStringUTC,
} from "@plugins/datetime";
import { mapGetters } from "vuex";

export default {
	components: { VCustomChipTimeRemaining },
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
		homeworkHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>
