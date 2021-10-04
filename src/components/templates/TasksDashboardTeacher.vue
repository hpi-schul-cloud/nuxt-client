<template>
	<section class="task-dashboard-teacher">
		<v-custom-double-panels
			:panel-one-count="noDueDateTasks.length"
			:panel-two-count="withDueDateTasks.length + overdueTasks.length"
			:panel-one-title="$t('pages.tasks.subtitleNoDue')"
			:panel-two-title="$t('pages.tasks.subtitleWithDue')"
			:status="status"
			:is-empty="hasNoTasks"
			:expanded-default="1"
		>
			<template v-slot:panelOne>
				<tasks-list :tasks="noDueDateTasks" type="teacher" />
			</template>
			<template v-slot:panelTwo>
				<tasks-list
					:tasks="overdueTasks"
					:title="$t('pages.tasks.teacher.subtitleOverDue')"
					type="teacher"
				/>
				<tasks-list
					:tasks="withDueDateTasks"
					:title="$t('pages.tasks.subtitleOpen')"
					type="teacher"
				/>
			</template>
		</v-custom-double-panels>
		<v-custom-empty-state
			v-if="hasNoTasks"
			:image="emptyStateImage"
			:title="$t('pages.tasks.teacher.emptyState.title')"
			:subtitle="$t('pages.tasks.teacher.emptyState.subtitle')"
			class="mt-16"
		/>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TasksList from "@components/organisms/TasksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";

export default {
	components: { vCustomEmptyState, TasksList, vCustomDoublePanels },
	data() {
		return {
			emptyStateImage: tasksEmptyState,
		};
	},
	computed: {
		...mapGetters("tasks", {
			openTasks: "getOpenTasksForTeacher",
			status: "getStatus",
			hasNoTasks: "hasNoTasks",
		}),
		overdueTasks: function () {
			return this.openTasks.overdue;
		},
		noDueDateTasks: function () {
			return this.openTasks.noDueDate;
		},
		withDueDateTasks: function () {
			return this.openTasks.withDueDate;
		},
	},
};
</script>
