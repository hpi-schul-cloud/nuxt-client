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
					:is-empty="!hasOpenTasksTeacher"
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
					v-if="!hasOpenTasksTeacher"
					:image="emptyStateImage"
					:title="emptyStateText.title"
					:subtitle="emptyStateText.subtitle"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<tasks-list :tasks="draftTasks" type="teacher" />
				<v-custom-empty-state
					v-if="!hasDrafts"
					:image="emptyStateImage"
					:title="emptyStateText.title"
					class="mt-16"
				/>
			</v-tab-item>
		</v-tabs-items>
	</section>
</template>

<script>
import TaskModule from "@/store/tasks";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TasksList from "@components/organisms/TasksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";

export default {
	components: { vCustomEmptyState, TasksList, vCustomDoublePanels },
	props: {
		tab: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			emptyStateImage: tasksEmptyState,
		};
	},
	computed: {
		openTasks: () => TaskModule.getOpenTasksForTeacher,
		draftTasks: () => TaskModule.getDraftTasksForTeacher,
		status: () => TaskModule.getStatus,
		hasTasks: () => TaskModule.hasTasks,
		hasOpenTasksTeacher: () => TaskModule.hasOpenTasksTeacher,
		hasDrafts: () => TaskModule.hasDrafts,
		hasFilterSelected: () => TaskModule.hasFilterSelected,
		overdueTasks: function () {
			return this.openTasks.overdue;
		},
		noDueDateTasks: function () {
			return this.openTasks.noDueDate;
		},
		withDueDateTasks: function () {
			return this.openTasks.withDueDate;
		},
		emptyStateText: function () {
			if (this.hasFilterSelected) {
				return {
					title: this.$t("pages.tasks.emptyStateOnFilter.title"),
					subtitle: undefined,
				};
			} else {
				if (this.tab === 0) {
					return {
						title: this.$t("pages.tasks.teacher.emptyState.title"),
						subtitle: this.$t("pages.tasks.teacher.emptyState.subtitle"),
					};
				} else {
					return {
						title: this.$t("pages.tasks.teacher.drafts.emptyState.title"),
						subtitle: undefined,
					};
				}
			}
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
