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
					:is-empty="!hasOpenTasksStudent"
					:expanded-default="1"
				>
					<template v-slot:panelOne>
						<tasks-list :tasks="noDueDateTasks" type="student" />
					</template>
					<template v-slot:panelTwo>
						<tasks-list
							:tasks="withDueDateTasks"
							:title="$t('pages.tasks.subtitleOpen')"
							type="student"
						/>
						<tasks-list
							:tasks="overdueTasks"
							:title="$t('pages.tasks.student.subtitleOverDue')"
							type="student"
						/>
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="!hasOpenTasksStudent"
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
					:is-empty="!hasCompletedTasks"
					:expanded-default="0"
				>
					<template v-slot:panelOne>
						<tasks-list :tasks="gradedTasks" type="student" />
					</template>
					<template v-slot:panelTwo>
						<tasks-list :tasks="submittedTasks" type="student" />
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="!hasCompletedTasks"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<tasks-list :tasks="finishedTasks" type="student" />
				<v-custom-empty-state
					v-if="!hasFinishedTasks"
					:image="emptyState.image"
					:title="emptyState.title"
					class="mt-16"
				/>
			</v-tab-item>
		</v-tabs-items>
	</section>
</template>

<script>
import FinishedTaskModule from "@/store/finished-tasks";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TasksList from "@components/organisms/TasksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import { mapGetters } from "vuex";

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
		}
	},
	computed: {
		...mapGetters("tasks", {
			status: "getStatus",
			openTasks: "getOpenTasksForStudent",
			completedTasks: "getCompletedTasksForStudent",
			hasOpenTasksStudent: "hasOpenTasksStudent",
			hasCompletedTasks: "hasCompletedTasks",
			hasTasks: "hasTasks",
		}),
		hasFinishedTasks: () => FinishedTaskModule.hasTasks,
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
