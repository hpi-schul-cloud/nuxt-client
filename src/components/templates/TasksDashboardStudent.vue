<template>
	<section class="task-dashboard-student">
		<v-window v-model="tab">
			<v-window-item :value="tabRoutes[0]">
				<v-custom-double-panels
					:panel-one-count="noDueDateTasks.length"
					:panel-two-count="withDueDateTasks.length + overdueTasks.length"
					:panel-one-title="$t('pages.tasks.subtitleNoDue')"
					:panel-two-title="$t('pages.tasks.subtitleWithDue')"
					:status="status"
					:is-empty="openTasksForStudentIsEmpty"
					:expanded-default="1"
				>
					<template #panelOne>
						<tasks-list :tasks="noDueDateTasks" user-role="student" />
					</template>
					<template #panelTwo>
						<tasks-list :tasks="withDueDateTasks" :title="$t('pages.tasks.subtitleOpen')" user-role="student" />
						<tasks-list :tasks="overdueTasks" :title="$t('pages.tasks.student.subtitleOverDue')" user-role="student" />
					</template>
				</v-custom-double-panels>
				<VContainer>
					<EmptyState v-if="openTasksForStudentIsEmpty" :title="$t('pages.tasks.student.open.emptyState.title')">
						<template #media>
							<TasksEmptyStateSvg />
						</template>
					</EmptyState>
				</VContainer>
			</v-window-item>
			<v-window-item :value="tabRoutes[1]">
				<v-custom-double-panels
					:panel-one-count="gradedTasks.length"
					:panel-two-count="submittedTasks.length"
					:panel-one-title="$t('pages.tasks.subtitleGraded')"
					:panel-two-title="$t('pages.tasks.subtitleNotGraded')"
					:status="status"
					:is-empty="completedTasksForStudentIsEmpty"
					:expanded-default="0"
				>
					<template #panelOne>
						<tasks-list :tasks="gradedTasks" user-role="student" />
					</template>
					<template #panelTwo>
						<tasks-list :tasks="submittedTasks" user-role="student" />
					</template>
				</v-custom-double-panels>
				<VContainer>
					<EmptyState
						v-if="completedTasksForStudentIsEmpty"
						:title="$t('pages.tasks.student.completed.emptyState.title')"
					>
						<template #media>
							<TasksEmptyStateSvg />
						</template>
					</EmptyState>
				</VContainer>
			</v-window-item>
			<v-window-item :value="tabRoutes[2]">
				<tasks-list :tasks="finishedTasks" user-role="student" type="finished" :has-pagination="tab === tabRoutes[2]" />
				<VContainer>
					<EmptyState v-if="finishedTasksIsEmpty" :title="$t('pages.tasks.finished.emptyState.title')">
						<template #media>
							<TasksEmptyStateSvg />
						</template>
					</EmptyState>
				</VContainer>
			</v-window-item>
		</v-window>
	</section>
</template>

<script>
import vCustomDoublePanels from "@/components/molecules/vCustomDoublePanels";
import TasksList from "@/components/organisms/TasksList";
import { EmptyState, TasksEmptyStateSvg } from "@ui-empty-state";

export default {
	components: {
		TasksList,
		vCustomDoublePanels,
		EmptyState,
		TasksEmptyStateSvg,
	},
	inject: ["tasksModule", "finishedTasksModule"],
	props: {
		tabRoutes: {
			type: Array,
			required: true,
		},
	},
	computed: {
		status() {
			return this.tasksModule.getStatus;
		},
		openTasks() {
			return this.tasksModule.getOpenTasksForStudent;
		},
		completedTasks() {
			return this.tasksModule.getCompletedTasksForStudent;
		},
		openTasksForStudentIsEmpty() {
			return this.tasksModule.openTasksForStudentIsEmpty;
		},
		completedTasksForStudentIsEmpty() {
			return this.tasksModule.completedTasksForStudentIsEmpty;
		},
		hasTasks() {
			return this.tasksModule.hasTasks;
		},
		finishedTasksIsEmpty() {
			return this.finishedTasksModule.tasksIsEmpty;
		},
		finishedTasks() {
			return this.finishedTasksModule.getTasks;
		},
		overdueTasks() {
			return this.openTasks.overdue;
		},
		noDueDateTasks() {
			return this.openTasks.noDueDate;
		},
		withDueDateTasks() {
			return this.openTasks.withDueDate;
		},
		submittedTasks() {
			return this.completedTasks.submitted;
		},
		gradedTasks() {
			return this.completedTasks.graded;
		},
		tab: {
			get() {
				return this.tasksModule.getActiveTab;
			},
			set(newTab) {
				this.tasksModule.setActiveTab(newTab);
			},
		},
	},
};
</script>
