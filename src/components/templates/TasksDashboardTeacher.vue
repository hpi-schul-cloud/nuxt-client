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
						<tasks-list
							:tasks="noDueDateTasks"
							user-role="teacher"
							@copy-task="onCopyTask"
						/>
					</template>
					<template #panelTwo>
						<tasks-list
							:tasks="overdueTasks"
							:title="$t('pages.tasks.teacher.subtitleOverDue')"
							user-role="teacher"
							@copy-task="onCopyTask"
						/>
						<tasks-list
							:tasks="withDueDateTasks"
							:title="$t('pages.tasks.subtitleOpen')"
							user-role="teacher"
							@copy-task="onCopyTask"
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
				<tasks-list
					:tasks="draftTasks"
					user-role="teacher"
					@copy-task="onCopyTask"
				/>
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
					@copy-task="onCopyTask"
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
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TasksList from "@components/organisms/TasksList";
import { defineComponent, inject } from "@vue/composition-api";
import { useCopy } from "../../composables/copy";
import { useLoadingState } from "../../composables/loadingState";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	setup() {
		const i18n = inject("i18n");
		const { isLoadingDialogOpen } = useLoadingState(
			i18n.t("components.molecules.copyResult.title.loading")
		);

		const { copy } = useCopy(isLoadingDialogOpen);

		return {
			copy,
		};
	},
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
	inject: ["tasksModule", "finishedTasksModule", "copyModule"],
	computed: {
		openTasks() {
			return this.tasksModule.getOpenTasksForTeacher;
		},
		draftTasks() {
			return this.tasksModule.getDraftTasksForTeacher;
		},
		status() {
			return this.tasksModule.getStatus;
		},
		hasTasks() {
			return this.tasksModule.hasTasks;
		},
		openTasksForTeacherIsEmpty() {
			return this.tasksModule.openTasksForTeacherIsEmpty;
		},
		draftsForTeacherIsEmpty() {
			return this.tasksModule.draftsForTeacherIsEmpty;
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
		tab: {
			get() {
				return this.tasksModule.getActiveTab;
			},
			set(newTab) {
				this.tasksModule.setActiveTab(newTab);
			},
		},
	},
	methods: {
		async onCopyTask(payload) {
			const loadingText = this.$t(
				"components.molecules.copyResult.title.loading"
			);
			await this.copy(payload, loadingText);

			this.tasksModule.setActiveTab("drafts");
			await this.tasksModule.fetchAllTasks();
		},
	},
});
</script>

<style lang="scss" scoped>
// stylelint-disable sh-waqar/declaration-use-variable
.padding-bottom {
	padding-bottom: 100px;
}
</style>
