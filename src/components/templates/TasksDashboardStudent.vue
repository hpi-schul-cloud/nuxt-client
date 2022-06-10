<template>
	<section class="task-dashboard-student">
		<v-tabs-items v-model="currentTab">
			<v-tab-item :value="tabRoutes[0]">
				<v-custom-double-panels
					class="pb-16"
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
			<v-tab-item :value="tabRoutes[1]">
				<v-custom-double-panels
					class="pb-16"
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
				<v-custom-empty-state
					v-if="completedTasksForStudentIsEmpty"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item :value="tabRoutes[2]">
				<tasks-list
					class="pb-16"
					:tasks="finishedTasks"
					user-role="student"
					type="finished"
					:has-pagination="tab === tabRoutes[2]"
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
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TasksList from "@components/organisms/TasksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";

export default {
	components: { TasksList, vCustomDoublePanels, vCustomEmptyState },
	props: {
		tab: {
			type: String,
			required: true,
		},
		emptyState: {
			type: Object,
			required: true,
		},
		tabRoutes: {
			type: Array,
			required: true,
		},
	},
	inject: ["taskModule", "finishedTaskModule"],
	computed: {
		status() {
			return this.taskModule.getStatus;
		},
		openTasks() {
			return this.taskModule.getOpenTasksForStudent;
		},
		completedTasks() {
			return this.taskModule.getCompletedTasksForStudent;
		},
		openTasksForStudentIsEmpty() {
			return this.taskModule.openTasksForStudentIsEmpty;
		},
		completedTasksForStudentIsEmpty() {
			return this.taskModule.completedTasksForStudentIsEmpty;
		},
		hasTasks() {
			return this.taskModule.hasTasks;
		},
		finishedTasksIsEmpty() {
			return this.finishedTaskModule.tasksIsEmpty;
		},
		finishedTasks() {
			return this.finishedTaskModule.getTasks;
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
