<template>
	<section class="task-dashboard-student">
		<v-tabs-items v-model="currentTab">
			<v-tab-item>
				<v-custom-double-panels
					:panel-one-count="noDueDateTasks.length"
					:panel-two-count="withDueDateTasks.length + overdueTasks.length"
					:panel-one-title="$t('pages.tasks.subtitleNoDue')"
					:panel-two-title="$t('pages.tasks.subtitleWithDue')"
					:status="status"
					:is-empty="openTasksForStudentIsEmpty"
					:expanded-default="1"
				>
					<template v-slot:panelOne>
						<tasks-list :tasks="noDueDateTasks" user-role="student" />
					</template>
					<template v-slot:panelTwo>
						<tasks-list
							:tasks="withDueDateTasks"
							:title="$t('pages.tasks.subtitleOpen')"
							user-role="student"
						/>
						<tasks-list
							:tasks="overdueTasks"
							:title="$t('pages.tasks.student.subtitleOverDue')"
							user-role="student"
						/>
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="openTasksForStudentIsEmpty"
					:image="emptyState.image"
					:title="emptyState.title"
					:subtitle="emptyState.subtitle"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<v-custom-double-panels
					:panel-one-count="gradedTasks.length"
					:panel-two-count="submittedTasks.length"
					:panel-one-title="$t('pages.tasks.subtitleGraded')"
					:panel-two-title="$t('pages.tasks.subtitleNotGraded')"
					:status="status"
					:is-empty="completedTasksForStudentIsEmpty"
					:expanded-default="0"
				>
					<template v-slot:panelOne>
						<tasks-list :tasks="gradedTasks" user-role="student" />
					</template>
					<template v-slot:panelTwo>
						<tasks-list :tasks="submittedTasks" user-role="student" />
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="completedTasksForStudentIsEmpty === true"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<tasks-list
					:tasks="finishedTasks"
					user-role="student"
					type="finished"
					:has-pagination="tab === 2"
				/>
				<v-custom-empty-state
					v-if="finishedTasksIsEmpty"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
		</v-tabs-items>
	</section>
</template>

<script>
import TaskModule from "@/store/tasks";
import FinishedTaskModule from "@/store/finished-tasks";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TasksList from "@components/organisms/TasksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";

export default {
	components: { TasksList, vCustomDoublePanels, vCustomEmptyState },
	props: {
		tab: {
			type: Number,
			required: true,
		},
		emptyState: {
			type: Object,
			required: true,
		},
	},
	computed: {
		status: () => TaskModule.getStatus,
		openTasks: () => TaskModule.getOpenTasksForStudent,
		completedTasks: () => TaskModule.getCompletedTasksForStudent,
		openTasksForStudentIsEmpty: () => TaskModule.openTasksForStudentIsEmpty,
		completedTasksForStudentIsEmpty: () =>
			TaskModule.completedTasksForStudentIsEmpty,
		hasTasks: () => TaskModule.hasTasks,
		finishedTasksIsEmpty: () => FinishedTaskModule.tasksIsEmpty,
		finishedTasks: () => FinishedTaskModule.getTasks,
		overdueTasks: function () {
			return this.openTasks.overdue;
		},
		noDueDateTasks: function () {
			return this.openTasks.noDueDate;
		},
		withDueDateTasks: function () {
			return this.openTasks.withDueDate;
		},
		submittedTasks: function () {
			return this.completedTasks.submitted;
		},
		gradedTasks: function () {
			return this.completedTasks.graded;
		},
		currentTab: {
			get() {
				return this.tab;
			},
			set(newTab) {
				this.$emit("update:tab", newTab);
			},
		},
	},
};
</script>
