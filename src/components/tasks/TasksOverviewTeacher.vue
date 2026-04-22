<template>
	<section class="task-dashboard-teacher">
		<div class="header-section">
			<VTabs v-model="activeTab" align-tabs="center">
				<VTab v-for="tab in tabRoutes" :key="tab.value" :value="tab.value" class="tab-item">
					<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
					<span class="d-none d-sm-inline" :data-testid="`${tab.value}-tasks`"> {{ tab.text }} </span>
				</VTab>
			</VTabs>
		</div>

		<div class="mx-auto mt-5">
			<VWindow :model-value="activeTab">
				<TasksOverviewPane
					:value="TaskTab.OPEN"
					:tasks="openForTeacher"
					:empty-title="t('pages.tasks.open.emptyState.title')"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
				<TasksOverviewPane
					:value="TaskTab.DRAFTS"
					:tasks="drafts"
					:empty-title="t('pages.tasks.teacher.drafts.emptyState.title')"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
				<TasksOverviewPane
					:value="TaskTab.FINISHED"
					:tasks="finishedTasks"
					:empty-title="t('pages.tasks.finished.emptyState.title')"
					:is-loading-more-items="isLoadingFinishedTasks"
					has-pagination
					@load-more-tasks="loadMoreFinishedTasks"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
			</VWindow>
		</div>

		<ShareModal :type="ShareTokenBodyParamsParentType.TASKS" />
		<CopyResultModal
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@copy-dialog-closed="onCopyResultModalClosed"
		/>
	</section>
</template>

<script setup lang="ts">
import TasksOverviewPane from "./TasksOverviewPane.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { useCopy } from "@/composables/copy";
import { CopyParams } from "@/store/copy";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useTasksOfOverview } from "@data-tasks";
import { mdiArchiveOutline, mdiFormatListChecks, mdiPlaylistEdit } from "@icons/material";
import { useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const shareModule: ShareModule = injectStrict(SHARE_MODULE_KEY);
const copyModule = injectStrict(COPY_MODULE_KEY);

const { t } = useI18n();
const { copy } = useCopy();
const params = useUrlSearchParams("history");

enum TaskTab {
	OPEN = "open",
	DRAFTS = "drafts",
	FINISHED = "finished",
}

const tabRoutes = [
	{ value: TaskTab.OPEN, icon: mdiFormatListChecks, text: t("components.organisms.TasksDashboardMain.tab.current") },
	{ value: TaskTab.DRAFTS, icon: mdiPlaylistEdit, text: t("components.organisms.TasksDashboardMain.tab.drafts") },
	{ value: TaskTab.FINISHED, icon: mdiArchiveOutline, text: t("components.organisms.TasksDashboardMain.tab.finished") },
];

const activeTab = computed({
	get: () => (params.tab as string) || TaskTab.OPEN,
	set: (value: string) => {
		params.tab = value;
	},
});

const { drafts, openForTeacher, isLoadingFinishedTasks, fetchTasks, loadMoreFinishedTasks, finishedTasks } =
	useTasksOfOverview();

const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);
const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);
const isCopyModalOpen = computed(() => copyModule.getIsResultModalOpen);

const onCopyResultModalClosed = () => {
	copyModule.reset();
};

const onCopyTask = async (payload: CopyParams) => {
	await copy(payload);
	activeTab.value = TaskTab.DRAFTS;
	await fetchTasks();
};

const onShareTask = (taskId: string) => {
	if (useEnvConfig().value.FEATURE_TASK_SHARE) {
		shareModule.startShareFlow({
			id: taskId,
			type: ShareTokenBodyParamsParentType.TASKS,
		});
	}
};
</script>

<style lang="scss" scoped>
.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 20vw, 160px);
}
</style>
