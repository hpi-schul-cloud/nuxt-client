<template>
	<v-hover v-model="isHovering" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			v-click-outside="() => handleFocus(false)"
			class="mx-n4 mx-sm-0"
			:class="{ 'beta-task-background': isBetaTask }"
			v-bind="$attrs"
			:aria-label="ariaLabel"
			role="article"
			@click="handleClick"
			@focus="handleFocus(true)"
			@keydown.tab.shift="handleFocus(false)"
		>
			<template v-if="isBetaTask">
				<v-list-item-avatar>
					<v-icon class="fill" :color="iconColor">{{ avatarIcon }}</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-subtitle data-testId="task-label" class="d-inline-flex">
						<span class="text-truncate" data-testid="taskSubtitle">{{
							taskLabel
						}}</span>
					</v-list-item-subtitle>
					<v-list-item-title data-testid="taskTitle" v-text="task.name" />
					<v-list-item-subtitle
						class="hidden-sm-and-up text--primary text-wrap"
					>
						<i18n
							path="components.molecules.TaskItemTeacher.betaTask.status"
							data-testid="task-status-small"
						>
							<template #submitted>{{ task.status.submitted }}</template>
							<template #max>{{ task.status.maxSubmissions }}</template>
						</i18n>
					</v-list-item-subtitle>
				</v-list-item-content>

				<section v-if="showTaskStatus" data-testid="task-status">
					<v-list-item-action class="hidden-xs-only">
						<v-list-item-subtitle>{{
							$t("components.molecules.TaskItemTeacher.betaTask.completed")
						}}</v-list-item-subtitle>
						<v-list-item-title data-testid="taskSubmitted">
							{{ task.status.submitted }}/{{ task.status.maxSubmissions }}
						</v-list-item-title>
					</v-list-item-action>
				</section>
			</template>
			<template v-else>
				<v-list-item-avatar>
					<v-icon
						class="fill"
						:class="hasUnpublishedLesson ? 'opacity-0-5' : ''"
						:color="iconColor"
						>{{ avatarIcon }}</v-icon
					>
				</v-list-item-avatar>
				<v-list-item-content :class="hasUnpublishedLesson ? 'opacity-0-5' : ''">
					<v-list-item-subtitle data-testId="task-label" class="d-inline-flex">
						<span class="text-truncate" data-testid="taskSubtitle">{{
							taskLabel
						}}</span>
					</v-list-item-subtitle>
					<v-list-item-title data-testid="taskTitle" v-text="task.name" />
					<v-list-item-subtitle
						v-if="topic && currentBreakpoint !== 'xs'"
						data-testid="task-topic"
						class="d-inline-flex"
					>
						<span class="text-truncate">{{ topic }}</span>
					</v-list-item-subtitle>
					<v-list-item-subtitle
						class="hidden-sm-and-up text--primary text-wrap"
					>
						<v-chip
							v-if="hasUnpublishedLesson"
							x-small
							data-testid="task-lesson-chip-small"
						>
							{{
								$t("components.molecules.TaskItemTeacher.lessonIsNotPublished")
							}}
						</v-chip>
						<i18n
							v-else
							path="components.molecules.TaskItemTeacher.status"
							data-testid="task-status-small"
						>
							<template #submitted>{{ task.status.submitted }}</template>
							<template #max>{{ task.status.maxSubmissions }}</template>
							<template #graded>{{ task.status.graded }}</template>
						</i18n>
					</v-list-item-subtitle>
				</v-list-item-content>

				<section
					v-if="hasUnpublishedLesson"
					data-testid="task-lesson-chip-large"
					class="hidden-xs-only mr-8 pl-4"
				>
					<v-chip small>{{
						$t("components.molecules.TaskItemTeacher.lessonIsNotPublished")
					}}</v-chip>
				</section>
				<section
					v-else-if="showTaskStatus"
					data-testid="task-status"
					class="mr-8"
				>
					<v-list-item-action class="hidden-xs-only pl-4">
						<v-list-item-subtitle>{{
							$t("components.molecules.TaskItemTeacher.submitted")
						}}</v-list-item-subtitle>
						<v-list-item-title data-testid="taskSubmitted">
							{{ task.status.submitted }}/{{ task.status.maxSubmissions }}
						</v-list-item-title>
					</v-list-item-action>
					<v-list-item-action class="hidden-xs-only">
						<v-list-item-subtitle>{{
							$t("components.molecules.TaskItemTeacher.graded")
						}}</v-list-item-subtitle>
						<v-list-item-title data-testid="taskGraded"
							>{{ task.status.graded }}
						</v-list-item-title>
					</v-list-item-action>
				</section>
				<v-list-item-action
					:id="`task-menu-${task.id}`"
					class="context-menu-min-width"
				>
					<task-item-menu
						:task-id="task.id"
						:task-is-finished="task.status.isFinished"
						:task-is-published="!task.status.isDraft && !task.status.isFinished"
						:task-title="task.name"
						:course-id="task.courseId"
						user-role="teacher"
						@toggled-menu="toggleMenu"
						@focus-changed="handleFocus"
						@copy-task="onCopyTask"
						@share-task="onShareTask"
					/>
				</v-list-item-action>
			</template>
		</v-list-item>
	</v-hover>
</template>

<script>
import TaskItemMenu from "@/components/molecules/TaskItemMenu.vue";
import {
	isToday,
	printDateFromStringUTC as dateFromUTC,
	printTimeFromStringUTC,
} from "@/plugins/datetime";

// TODO - different requiredKeys for finished and other tasks?
const taskRequiredKeys = ["courseName", "createdAt", "id", "name", "status"];
const finishedTaskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { TaskItemMenu },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => {
				return task.status.isFinished
					? finishedTaskRequiredKeys.every((key) => key in task)
					: taskRequiredKeys.every((key) => key in task);
			},
		},
	},
	data() {
		return {
			isMenuActive: false,
			isHovering: false,
			isActive: false,
		};
	},
	computed: {
		isDraft() {
			return this.task.status.isDraft;
		},
		isBetaTask() {
			return !!this.task.taskCardId;
		},
		isPlanned() {
			return new Date(this.task.availableDate) > new Date();
		},
		showTaskStatus() {
			return !this.isDraft && !this.isPlanned;
		},
		avatarIcon() {
			if (this.isBetaTask) {
				return "$taskDoneFilled";
			}
			return this.isDraft ? "$taskDraft" : "$taskOpenFilled";
		},
		iconColor() {
			if (this.isBetaTask) {
				return "beta-task";
			}
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		taskLabel() {
			const { createdAt, dueDate, availableDate } = this.task;

			const labelText = this.isBetaTask
				? `${this.courseName} - ${this.$t(
						"pages.room.taskCard.label.betaTask"
				  )}`
				: `${this.courseName}`;

			if (this.isDraft) {
				if (isToday(createdAt)) {
					return labelText.concat(
						` - ${this.$t(
							"components.molecules.TaskItemMenu.labels.createdAt"
						)} ${printTimeFromStringUTC(createdAt)}`
					);
				}

				return labelText.concat(
					` - ${this.$t(
						"components.molecules.TaskItemMenu.labels.createdAt"
					)} ${dateFromUTC(createdAt)}`
				);
			}

			if (this.isPlanned) {
				return labelText.concat(
					` - ${this.$t("pages.tasks.labels.planned")} ${dateFromUTC(
						availableDate
					)}`
				);
			}

			if (dueDate) {
				return labelText.concat(
					` - ${this.$t("pages.tasks.labels.due")} ${dateFromUTC(dueDate)}`
				);
			}

			return labelText;
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
			return this.task.lessonName
				? `${this.$t("common.words.topic")} ${this.task.lessonName}`
				: "";
		},
		hasUnpublishedLesson() {
			return this.task.lessonHidden && !this.isDraft;
		},
		currentBreakpoint() {
			return this.$vuetify.breakpoint.name;
		},
		ariaLabel() {
			return this.isBetaTask
				? `${this.$t("pages.room.taskCard.label.betaTask")} ${this.task.name}`
				: `${this.$t("common.words.task")} ${this.task.name}`;
		},
		taskEditRoute() {
			return this.isBetaTask
				? {
						name: "beta-task-view-edit",
						params: { id: this.task.taskCardId },
				  }
				: `/homework/${this.task.id}`;
		},
	},
	methods: {
		toggleMenu(value) {
			this.isMenuActive = value;
			this.isHovering = value;
		},
		handleClick() {
			this.isBetaTask
				? this.$router.push(this.taskEditRoute)
				: this.redirectAction(this.taskEditRoute);
		},
		handleFocus(value) {
			this.isActive = value;
		},
		onCopyTask(payload) {
			this.$emit("copy-task", payload);
		},
		onShareTask(taskId) {
			this.$emit("share-task", taskId);
		},
		redirectAction(value) {
			window.location = value;
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

.opacity-0-5 {
	opacity: 0.5;
}

// stylelint-disable sh-waqar/declaration-use-variable
.context-menu-min-width {
	min-width: 45px;
}

.beta-task-background {
	// based on beta-task color #196c9e
	background-color: rgba(25, 108, 158, 0.05);
}
</style>
