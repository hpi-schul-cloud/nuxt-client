<template>
	<section class="task-dashboard-teacher">
		<v-tabs-items v-model="currentTab">
			<v-tab-item>
				<v-custom-double-panels
					:panel-one-count="noDueDateTasks.length"
					:panel-two-count="withDueDateTasks.length + overdueTasks.length"
					:panel-one-title="$t('pages.tasks.subtitleNoDue')"
					:panel-two-title="$t('pages.tasks.subtitleWithDue')"
					:status="status"
					:is-empty="openTasksForTeacherIsEmpty"
					:expanded-default="1"
				>
					<template v-slot:panelOne>
						<tasks-list :tasks="noDueDateTasks" user-role="teacher" />
					</template>
					<template v-slot:panelTwo>
						<tasks-list
							:tasks="overdueTasks"
							:title="$t('pages.tasks.teacher.subtitleOverDue')"
							user-role="teacher"
						/>
						<tasks-list
							:tasks="withDueDateTasks"
							:title="$t('pages.tasks.subtitleOpen')"
							user-role="teacher"
						/>
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="openTasksForTeacherIsEmpty"
					:image="emptyState.image"
					:title="emptyState.title"
					:subtitle="emptyState.subtitle"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<tasks-list :tasks="draftTasks" user-role="teacher" />
				<v-custom-empty-state
					v-if="draftsForTeacherIsEmpty"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<tasks-list
					:tasks="finishedTasks"
					user-role="teacher"
					:has-pagination="tab === 2"
					type="finished"
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
	components: { vCustomEmptyState, TasksList, vCustomDoublePanels },
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
		openTasks: () => TaskModule.getOpenTasksForTeacher,
		draftTasks: () => TaskModule.getDraftTasksForTeacher,
		status: () => TaskModule.getStatus,
		hasTasks: () => TaskModule.hasTasks,
		openTasksForTeacherIsEmpty: () => TaskModule.openTasksForTeacherIsEmpty,
		draftsForTeacherIsEmpty: () => TaskModule.draftsForTeacherIsEmpty,
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
