<template>
	<section class="task-dashboard-teacher">
		<v-window v-model="tab">
			<v-window-item :value="tabRoutes[0]" class="padding-bottom">
				<v-custom-double-panels
					:panel-one-count="noDueDateTasks.length"
					:panel-two-count="withDueDateTasks.length + overdueTasks.length"
					:panel-one-title="t('pages.tasks.subtitleNoDue')"
					:panel-two-title="t('pages.tasks.subtitleWithDue')"
					:status="status"
					:is-empty="openTasksForTeacherIsEmpty"
					:expanded-default="1"
				>
					<template #panelOne>
						<tasks-list :tasks="noDueDateTasks" user-role="teacher" @copy-task="onCopyTask" @share-task="onShareTask" />
					</template>
					<template #panelTwo>
						<tasks-list
							:tasks="overdueTasks"
							:title="t('pages.tasks.teacher.subtitleOverDue')"
							user-role="teacher"
							@copy-task="onCopyTask"
							@share-task="onShareTask"
						/>
						<tasks-list
							:tasks="withDueDateTasks"
							:title="t('pages.tasks.subtitleOpen')"
							user-role="teacher"
							@copy-task="onCopyTask"
							@share-task="onShareTask"
						/>
					</template>
				</v-custom-double-panels>
				<VContainer>
					<EmptyState v-if="openTasksForTeacherIsEmpty" :title="t('pages.tasks.teacher.open.emptyState.title')">
						<template #media> <TasksEmptyStateSvg /></template>
					</EmptyState>
				</VContainer>
			</v-window-item>
			<v-window-item :value="tabRoutes[1]" class="padding-bottom">
				<tasks-list :tasks="draftTasks" user-role="teacher" @copy-task="onCopyTask" @share-task="onShareTask" />
				<VContainer>
					<EmptyState v-if="draftsForTeacherIsEmpty" :title="t('pages.tasks.teacher.drafts.emptyState.title')">
						<template #media> <TasksEmptyStateSvg /></template>
					</EmptyState>
				</VContainer>
			</v-window-item>
			<v-window-item :value="tabRoutes[2]" class="padding-bottom">
				<tasks-list
					:tasks="finishedTasks"
					user-role="teacher"
					type="finished"
					:has-pagination="tab === tabRoutes[2]"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
				<VContainer>
					<EmptyState v-if="finishedTasksIsEmpty" :title="t('pages.tasks.finished.emptyState.title')">
						<template #media> <TasksEmptyStateSvg /></template>
					</EmptyState>
				</VContainer>
			</v-window-item>
		</v-window>
		<share-modal :type="ShareTokenBodyParamsParentTypeEnum.Tasks" />
	</section>
</template>

<script setup lang="ts">
import { useCopy } from "../../composables/copy";
import { useLoadingState } from "../../composables/loadingState";
import VCustomDoublePanels from "@/components/molecules/vCustomDoublePanels.vue";
import TasksList from "@/components/organisms/TasksList.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import { CopyParams } from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import ShareModule from "@/store/share";
import TasksModule from "@/store/tasks";
import { FINISHED_TASKS_MODULE_KEY, injectStrict, SHARE_MODULE_KEY, TASKS_MODULE_KEY } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
import { EmptyState, TasksEmptyStateSvg } from "@ui-empty-state";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const tasksModule: TasksModule = injectStrict(TASKS_MODULE_KEY);
const finishedTasksModule: FinishedTasksModule = injectStrict(FINISHED_TASKS_MODULE_KEY);
const shareModule: ShareModule = injectStrict(SHARE_MODULE_KEY);
defineProps({
	tabRoutes: {
		type: Array,
		required: true,
	},
});

const { t } = useI18n();
const { isLoadingDialogOpen } = useLoadingState(t("components.molecules.copyResult.title.loading"));

const { copy } = useCopy(isLoadingDialogOpen);

const openTasks = computed(() => tasksModule.getOpenTasksForTeacher);
const draftTasks = computed(() => tasksModule.getDraftTasksForTeacher);
const finishedTasks = computed(() => finishedTasksModule.getTasks);
const overdueTasks = computed(() => openTasks.value.overdue);
const noDueDateTasks = computed(() => openTasks.value.noDueDate);
const withDueDateTasks = computed(() => openTasks.value.withDueDate);

const status = computed(() => tasksModule.getStatus);

const openTasksForTeacherIsEmpty = computed(() => tasksModule.openTasksForTeacherIsEmpty);
const draftsForTeacherIsEmpty = computed(() => tasksModule.draftsForTeacherIsEmpty);
const finishedTasksIsEmpty = computed(() => finishedTasksModule.tasksIsEmpty);

const tab = computed({
	get() {
		return tasksModule.getActiveTab;
	},
	set(newTab) {
		tasksModule.setActiveTab(newTab);
	},
});

const onCopyTask = async (payload: CopyParams) => {
	await copy(payload);

	tasksModule.setActiveTab("drafts");
	await tasksModule.fetchAllTasks();
};

const onShareTask = (taskId: string) => {
	if (useEnvConfig().value.FEATURE_TASK_SHARE) {
		shareModule.startShareFlow({
			id: taskId,
			type: ShareTokenBodyParamsParentTypeEnum.Tasks,
		});
	}
};
</script>

<style lang="scss" scoped>
// stylelint-disable sh-waqar/declaration-use-variable
.padding-bottom {
	padding-bottom: 140px;
}
</style>
