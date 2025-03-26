<template>
	<v-hover v-model="isHovering" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			v-outside-click="() => handleFocus(false)"
			class="px-xxl-4 px-xl-4 px-lg-4 px-md-4 px-sm-4 px-0"
			v-bind="$attrs"
			:aria-label="ariaLabel"
			role="article"
			:ripple="false"
			@click="handleClick"
			@focus="handleFocus(true)"
			@keydown.tab.shift="handleFocus(false)"
		>
			<!-- item avatar -->
			<template #prepend>
				<v-avatar>
					<v-icon
						class="fill"
						:class="hasUnpublishedLesson ? 'opacity-0-5' : ''"
						:color="iconColor"
					>
						{{ avatarIcon }}
					</v-icon>
				</v-avatar>
			</template>

			<!-- item main info -->
			<div class="d-flex">
				<!-- item title -->
				<div
					:class="hasUnpublishedLesson ? 'opacity-0-5' : ''"
					class="task-item__main-info align-self-center flex-grow-1"
				>
					<v-list-item-subtitle data-testId="task-label" class="d-inline-flex">
						<span class="text-truncate" data-testid="taskSubtitle">
							{{ taskLabel }}
						</span>
					</v-list-item-subtitle>
					<v-list-item-title data-testid="taskTitle">
						{{ task.name }}
					</v-list-item-title>
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
							size="x-small"
							data-testid="task-lesson-chip-small"
						>
							{{
								$t("components.molecules.TaskItemTeacher.lessonIsNotPublished")
							}}
						</v-chip>
						<i18n-t
							v-else
							keypath="components.molecules.TaskItemTeacher.status"
							scope="global"
							data-testid="task-status-small"
						>
							<template #submitted>{{ task.status.submitted }}</template>
							<template #max>{{ task.status.maxSubmissions }}</template>
							<template #graded>{{ task.status.graded }}</template>
						</i18n-t>
					</v-list-item-subtitle>
				</div>

				<!-- item additional info -->
				<section
					v-if="hasUnpublishedLesson"
					data-testid="task-lesson-chip-large"
					class="hidden-xs mr-8 pl-4 align-self-center"
				>
					<v-chip size="small">
						{{
							$t("components.molecules.TaskItemTeacher.lessonIsNotPublished")
						}}
					</v-chip>
				</section>
				<section
					v-else-if="showTaskStatus"
					data-testid="task-status"
					class="mr-4 d-flex align-self-center"
				>
					<div class="hidden-xs px-4 mr-4 text-center task-stats">
						<v-list-item-subtitle>
							{{ $t("components.molecules.TaskItemTeacher.submitted") }}
						</v-list-item-subtitle>
						<v-list-item-title data-testid="taskSubmitted">
							{{ task.status.submitted }}/{{ task.status.maxSubmissions }}
						</v-list-item-title>
					</div>
					<div class="hidden-xs px-4 text-center task-stats">
						<v-list-item-subtitle>
							{{ $t("components.molecules.TaskItemTeacher.graded") }}
						</v-list-item-subtitle>
						<v-list-item-title data-testid="taskGraded">
							{{ task.status.graded }}
						</v-list-item-title>
					</div>
				</section>

				<v-list-item-action
					:id="`task-menu-${task.id}`"
					class="context-menu-min-width"
					data-testid="three-dot-task-option-menu"
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
			</div>
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
import { vOnClickOutside } from "@vueuse/components";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name", "status"];
const finishedTaskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { TaskItemMenu },
	directives: {
		outsideClick: vOnClickOutside,
	},
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
		isPlanned() {
			return new Date(this.task.availableDate) > new Date();
		},
		showTaskStatus() {
			return !this.isDraft && !this.isPlanned;
		},
		avatarIcon() {
			return this.isDraft ? "$taskDraft" : "$taskOpenFilled";
		},
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		taskLabel() {
			const { createdAt, dueDate, availableDate } = this.task;

			const labelText = `${this.courseName}`;

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
			return this.$vuetify.display.name;
		},
		ariaLabel() {
			return `${this.$t("common.words.task")} ${this.task.name}`;
		},
	},
	methods: {
		toggleMenu(value) {
			this.isMenuActive = value;
			this.isHovering = value;
		},
		handleClick() {
			this.redirectAction(`/homework/${this.task.id}`);
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

.task-item__main-info {
	overflow: hidden;
}

:deep(.v-list-item__prepend .v-icon) {
	width: inherit;
	height: inherit;
}

.task-stats {
	min-width: 7rem;
}
</style>
