<template>
	<v-hover v-model="isHovering" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			v-click-outside="() => handleFocus(false)"
			class="mx-n4 mx-sm-0"
			v-bind="$attrs"
			:ripple="false"
			:href="href"
			:aria-label="`${$t('common.words.task')} ${task.name}`"
			role="article"
			@focus="handleFocus(true)"
			@keydown.tab.shift="handleFocus(false)"
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
			<section v-if="showTaskStatus" class="mr-8">
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
			<v-list-item-action :id="`task-menu-${task.id}`" class="context-menu-btn">
				<v-menu
					bottom
					left
					offset-y
					attach
					@update:return-value="toggleMenu(false)"
				>
					<template v-slot:activator="{ on, attrs, value }">
						<v-btn
							v-show="showMenu"
							id="task-menu-btn"
							v-bind="attrs"
							icon
							:data-testId="`task-menu-${task.name}`"
							v-on="on"
							@click.prevent="toggleMenu(!value)"
							@keydown.space.stop="toggleMenu(!value)"
							@focus="handleFocus(true)"
							@blur="handleFocus(false)"
						>
							<v-icon>{{ mdiDotsVertical }}</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							:href="`${href}/edit`"
							class="task-action"
							:data-testId="`task-edit-${task.name}`"
						>
							<v-list-item-title>
								<v-icon class="task-action-icon">
									{{ mdiPencilOutline }}
								</v-icon>
								{{ $t("common.actions.edit") }}
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							class="task-action"
							:data-testId="`task-finish-${task.name}`"
							@click.stop.prevent="handleFinish"
						>
							<v-list-item-title>
								<template v-if="task.status.isFinished">
									<v-icon class="task-action-icon">{{ mdiUndo }}</v-icon>
									Wiederherstellen
								</template>
								<template v-else>
									<v-icon class="task-action-icon"> $taskFinished </v-icon>
									Abschließen
								</template>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-list-item-action>
		</v-list-item>
	</v-hover>
</template>

<script>
import { printDateFromStringUTC as dateFromUTC } from "@plugins/datetime";
import { mdiDotsVertical, mdiPencilOutline, mdiUndo } from "@mdi/js";
import FinishedTaskModule from "@/store/finished-tasks";

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
			mdiDotsVertical,
			mdiPencilOutline,
			mdiUndo,
			isMenuActive: false,
			isHovering: false,
			isActive: false,
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
		showMenu() {
			return (
				this.$vuetify.breakpoint.mobile ||
				this.isHovering ||
				this.isActive ||
				this.isMenuActive
			);
		},
	},
	methods: {
		toggleMenu(stateValue) {
			this.isMenuActive = stateValue;
			this.isHovering = stateValue;
		},
		handleFocus(value) {
			this.isActive = value;
		},
		handleFinish() {
			if (this.task.status.isFinished) {
				FinishedTaskModule.restoreTask(this.task.id);
			} else {
				TaskModule.finishTask(this.task.id);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

// stylelint-disable sh-waqar/declaration-use-variable
.context-menu-btn {
	min-width: 45px;
}

.task-action {
	min-height: 25px;
}

.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
	color: rgba(0, 0, 0, 0.87);
}
</style>
