<template>
	<v-list subheader two-line>
		<v-subheader v-if="isListFilled">
			{{ title }}
		</v-subheader>

		<template v-if="loading">
			<h1>
				<v-skeleton-loader :type="'text'" :max-width="'30%'" />
			</h1>
			<v-skeleton-loader :type="'text'" :max-width="'15%'" />
			<v-skeleton-loader
				v-for="homework of 7"
				ref="skeleton"
				:key="homework"
				:type="'list-item-avatar-two-line'"
			/>
		</template>

		<template v-for="(homework, index) of homeworks" v-else>
			<v-list-item :key="homework._id" :href="homeworkHref(homework._id)">
				<v-list-item-avatar>
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
						data-test-id="dueDateLabel"
						v-text="computedDueDateLabel(homework.duedate)"
					/>
					<v-spacer />
					<v-list-item-action-text
						v-if="isCloseToDueDate(homework.duedate)"
						data-test-id="dueDateHintLabel"
						v-text="hintDueDate(homework.duedate)"
					/>
					<v-list-item-action-text
						v-else-if="isOverDue(homework.duedate)"
						data-test-id="overDueDateLabel"
						v-text="$t('pages.homeworks.labels.overdue')"
					/>

					<v-badge v-if="false" color="error" dot inline></v-badge>
				</v-list-item-action>
			</v-list-item>
			<v-divider v-if="index < homeworks.length - 1" :key="index"></v-divider>
		</template>
	</v-list>
</template>

<script>
import { fromNow, fromNowToFuture } from "@plugins/datetime";
import taskIconSvg from "@assets/img/courses/task-new.svg";
import { printDateTimeFromStringUTC } from "@plugins/datetime";
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
		computedDueDateLabel(dueDate) {
			return !dueDate
				? this.$t("pages.homeworks.labels.noDueDate")
				: this.$t("pages.homeworks.labels.due") +
						printDateTimeFromStringUTC(dueDate);
		},
		isCloseToDueDate(dueDate) {
			const timeDiff = fromNowToFuture(dueDate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
		},
		isOverDue(dueDate) {
			return new Date(dueDate) < new Date();
		},
		hintDueDate(dueDateString) {
			const diffHrs = fromNowToFuture(dueDateString, "hours");
			if (diffHrs === 0) {
				const diffMins = fromNowToFuture(dueDateString, "minutes");
				return `Abgabe in ${diffMins} Minuten`;
			} else {
				return `Abgabe in ${diffHrs}h`;
			}
		},
		homeworkHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>
