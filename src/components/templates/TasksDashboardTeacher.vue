<template>
	<section class="task-dashboard-teacher">
		<v-tabs-items v-model="tab">
			<v-tab-item :value="tabRoutes[0]" class="padding-bottom">
				<v-custom-double-panels
					:panel-one-count="noDueDateTasks.length"
					:panel-two-count="withDueDateTasks.length + overdueTasks.length"
					:panel-one-title="$t('pages.tasks.subtitleNoDue')"
					:panel-two-title="$t('pages.tasks.subtitleWithDue')"
					:status="status"
					:is-empty="openTasksForTeacherIsEmpty"
					:expanded-default="1"
				>
					<template #panelOne>
						<tasks-list :tasks="noDueDateTasks" user-role="teacher" />
					</template>
					<template #panelTwo>
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
			<v-tab-item :value="tabRoutes[1]" class="padding-bottom">
				<tasks-list :tasks="draftTasks" user-role="teacher" />
				<v-custom-empty-state
					v-if="draftsForTeacherIsEmpty"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item :value="tabRoutes[2]" class="padding-bottom">
				<tasks-list
					:tasks="finishedTasks"
					user-role="teacher"
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
	components: { vCustomEmptyState, TasksList, vCustomDoublePanels },
	props: {
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
		openTasks() {
			return this.taskModule.getOpenTasksForTeacher;
		},
		draftTasks() {
			return this.taskModule.getDraftTasksForTeacher;
		},
		status() {
			return this.taskModule.getStatus;
		},
		hasTasks() {
			return this.taskModule.hasTasks;
		},
		openTasksForTeacherIsEmpty() {
			return this.taskModule.openTasksForTeacherIsEmpty;
		},
		draftsForTeacherIsEmpty() {
			return this.taskModule.draftsForTeacherIsEmpty;
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
		tab: {
			get() {
				return this.taskModule.getActiveTab;
			},
			set(newTab) {
				this.taskModule.setActiveTab(newTab);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
// stylelint-disable scale-unlimited/declaration-strict-value
.padding-bottom {
	padding-bottom: 100px;
}
</style>
