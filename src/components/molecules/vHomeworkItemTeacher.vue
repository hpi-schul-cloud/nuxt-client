<template>
	<v-list-item :key="homework.id" :href="homeworkGradingHref(homework.id)">
		<v-list-item-avatar>
			<img :src="taskIconSvg" role="presentation" />
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle class="d-inline-flex">
				<span class="text-truncate">{{ homework.courseName }}</span>
				{{
					`&nbsp;– ${computedDueDateLabel(
						homework.duedate,
						(shorten = $vuetify.breakpoint.xsOnly)
					)}`
				}}
			</v-list-item-subtitle>
			<v-list-item-title v-text="homework.name" />
			<v-list-item-subtitle class="hidden-sm-and-up text--primary text-wrap">
				<i18n path="components.molecules.VHomeworkItemTeacher.status">
					<template #submitted>{{ homework.status.submitted }}</template>
					<template #max>{{ homework.status.maxSubmissions }}</template>
					<template #graded>{{ homework.status.graded }}</template>
				</i18n>
			</v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-action class="hidden-xs-only ml-4">
			<v-list-item-subtitle>{{
				$t("components.molecules.VHomeworkItemTeacher.submitted")
			}}</v-list-item-subtitle>
			<v-list-item-title
				>{{ homework.status.submitted }}/{{
					homework.status.maxSubmissions
				}}</v-list-item-title
			>
		</v-list-item-action>
		<v-list-item-action class="hidden-xs-only">
			<v-list-item-subtitle>{{
				$t("components.molecules.VHomeworkItemTeacher.graded")
			}}</v-list-item-subtitle>
			<v-list-item-title>{{ homework.status.graded }}</v-list-item-title>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
import taskIconSvg from "@assets/img/courses/task-new.svg";
import { fromNow } from "@plugins/datetime";
import { printDateFromStringUTC } from "@plugins/datetime";

const homeworkRequiredKeys = [
	"courseName",
	"createdAt",
	"id",
	"name",
	"status",
];

export default {
	components: {},
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
		computedDueDateLabel(dueDate) {
			if (!dueDate) {
				return this.$t("pages.homeworks.labels.noDueDate");
			} else {
				return (
					this.$t("pages.homeworks.labels.due") +
					printDateFromStringUTC(dueDate)
				);
			}
		},
		homeworkGradingHref: (id) => {
			return `/homework/${id}#activetabid=submissions`;
		},
	},
};
</script>
