<template>
	<v-list-item :key="task.id" :href="taskGradingHref(task.id)">
		<v-list-item-avatar>
			<v-icon class="fill" :color="iconColor">{{ avatarIcon }}</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle class="d-inline-flex">
				<span class="text-truncate" data-testid="taskSubtitle">{{
					courseName
				}}</span>
				{{
					`&nbsp;– ${computedDueDateLabel(
						task.duedate,
						(shorten = $vuetify.breakpoint.xsOnly)
					)}`
				}}
			</v-list-item-subtitle>
			<v-list-item-title data-testid="taskName" v-text="task.name" />
			<v-list-item-subtitle class="d-inline-flex">
				<span class="text-truncate">{{ topic }}</span>
			</v-list-item-subtitle>
			<v-list-item-subtitle class="hidden-sm-and-up text--primary text-wrap">
				<i18n path="components.molecules.VTaskItemTeacher.status">
					<template #submitted>{{ task.status.submitted }}</template>
					<template #max>{{ task.status.maxSubmissions }}</template>
					<template #graded>{{ task.status.graded }}</template>
				</i18n>
			</v-list-item-subtitle>
		</v-list-item-content>
		<section v-if="!isDraft">
			<v-list-item-action class="hidden-xs-only ml-4">
				<v-list-item-subtitle>{{
					$t("components.molecules.VTaskItemTeacher.submitted")
				}}</v-list-item-subtitle>
				<v-list-item-title data-testid="taskSubmitted"
					>{{ task.status.submitted }}/{{
						task.status.maxSubmissions
					}}</v-list-item-title
				>
			</v-list-item-action>
			<v-list-item-action class="hidden-xs-only">
				<v-list-item-subtitle>{{
					$t("components.molecules.VTaskItemTeacher.graded")
				}}</v-list-item-subtitle>
				<v-list-item-title data-testid="taskGraded">{{
					task.status.graded
				}}</v-list-item-title>
			</v-list-item-action>
		</section>
	</v-list-item>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { printDateFromStringUTC } from "@plugins/datetime";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name", "status"];

export default {
	components: {},
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
		avatarIcon() {
			return this.isDraft ? "$taskDraft" : "$taskOpenFilled";
		},
		iconColor() {
			return this.task.displayColor || this.defaultIconColor;
		},
		defaultIconColor() {
			return "#54616e";
		},
		isDraft() {
			return this.task.status.isDraft;
		},
		courseName() {
			return this.task.courseName || this.$t("pages.tasks.labels.noCourse");
		},
		topic() {
			return this.task.description
				? `${this.$t("pages.tasks.subtitleTopic")} ${this.task.description}`
				: "";
		},
	},
	methods: {
		computedDueDateLabel(dueDate) {
			if (!dueDate) {
				return this.$t("pages.tasks.labels.noDueDate");
			} else {
				return (
					this.$t("pages.tasks.labels.due") + printDateFromStringUTC(dueDate)
				);
			}
		},
		taskGradingHref: (id) => {
			return `/homework/${id}#activetabid=submissions`;
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}
</style>
