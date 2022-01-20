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
			<v-icon class="fill" :color="iconColor">{{ avatarIcon }}</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-subtitle class="d-inline-flex">
				<span class="text-truncate" data-testid="taskSubtitle">{{
					courseName
				}}</span>
				<template v-if="isPlanned">
					{{ `&nbsp;– ${plannedLabel}` }}
				</template>
				<template v-else>
					{{ `&nbsp;– ${dueDateLabel}` }}
				</template>
			</v-list-item-subtitle>
			<v-list-item-title data-testid="taskTitle" v-text="task.name" />
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
		<section v-if="showTaskStatus">
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
import { printDateFromStringUTC as dateFromUTC } from "@plugins/datetime";

// TODO - different requiredKeys for finished and other tasks?
// const taskRequiredKeys = ["courseName", "createdAt", "id", "name", "status"];
const taskRequiredKeys = ["createdAt", "id", "name"];

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
		href() {
			return `/homework/${this.task.id}`;
		},
		avatarIcon() {
			return this.isDraft ? "$taskDraft" : "$taskOpenFilled";
		},
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		isDraft() {
			return this.task.status.isDraft;
		},
		isPlanned() {
			return new Date(this.task.availableDate) > new Date();
		},
		showTaskStatus() {
			return !this.isDraft && !this.isPlanned;
		},
		dueDateLabel() {
			const dueDate = this.task.duedate;

			return !dueDate
				? this.$t("pages.tasks.labels.noDueDate")
				: `${this.$t("pages.tasks.labels.due")} ${dateFromUTC(dueDate)}`;
		},
		plannedLabel() {
			return `${this.$t("pages.tasks.labels.planned")} ${dateFromUTC(
				this.task.availableDate
			)}`;
		},
		courseName() {
			const { isSubstitutionTeacher } = this.task.status;
			const baseName =
				this.task.courseName || this.$t("pages.tasks.labels.noCourse");

			return isSubstitutionTeacher
				? `${this.$t("common.words.substitute")} ${baseName}`
				: baseName;
		},
		topic() {
			return this.task.description
				? `${this.$t("pages.tasks.subtitleTopic")} ${this.task.description}`
				: "";
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}
</style>
