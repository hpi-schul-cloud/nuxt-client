<template>
	<v-list-item :key="homework._id" :href="homeworkHref(homework._id)">
		<v-list-item-avatar class="hidden-xs-only">
			<img :src="taskIconSvg" role="presentation" />
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle class="text-wrap">
				{{
					homework.courseName +
					" " +
					computedDueDateLabel(
						homework.duedate,
						(shorten = $vuetify.breakpoint.xsOnly)
					)
				}}
			</v-list-item-subtitle>
			<v-list-item-title
				class="text-wrap"
				v-text="homework.name"
			></v-list-item-title>
		</v-list-item-content>
		<v-list-item-action> </v-list-item-action>
	</v-list-item>
</template>

<script>
import taskIconSvg from "@assets/img/courses/task-new.svg";
import { fromNow } from "@plugins/datetime";
import { printDateTimeFromStringUTC } from "@plugins/datetime";

export default {
	components: {},
	props: {
		homework: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			fromNow,
			taskIconSvg,
		};
	},
	methods: {
		computedDueDateLabel(dueDate) {
			if (!dueDate) {
				return this.$t("pages.homeworks.labels.noDueDate");
			} else {
				return (
					this.$t("pages.homeworks.labels.due") +
					printDateTimeFromStringUTC(dueDate)
				);
			}
		},
		homeworkHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>
