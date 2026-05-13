<template>
	<section class="task-dashboard-teacher">
		<div class="header-section mt-4">
			<VTabs v-model="activeTab" align-tabs="center">
				<VTab v-for="tab in tabRoutes" :key="tab.value" :value="tab.value" class="tab-item">
					<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
					<span class="d-none d-sm-inline" :data-testid="`${tab.value}-tasks`"> {{ tab.text }} </span>
				</VTab>
			</VTabs>
		</div>
		<div class="mx-auto">
			<VWindow :model-value="activeTab">
				<TasksOverviewPane
					:value="TaskTab.OPEN"
					:tasks="openForTeacher"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
				<TasksOverviewPane :value="TaskTab.DRAFTS" :tasks="drafts" @copy-task="onCopyTask" @share-task="onShareTask" />
				<TasksOverviewPane
					:value="TaskTab.FINISHED"
					:tasks="finishedTasks"
					:is-loading-more-items="isLoadingFinishedTasks"
					has-pagination
					@load-more-tasks="loadMoreFinishedTasks"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
			</VWindow>
		</div>
		<ShareDialog
			v-if="shareItemType"
			:is-open="isShareDialogOpen"
			:share-item-type="shareItemType"
			:share-url="shareUrl"
			@confirm="onConfirmShare"
			@cancel="onCancelShare"
			@done="onDone"
		/>
		<CopyDialog
			:is-open="isCopyDialogOpen"
			:copy-item-type="copyItemType"
			@confirm="onConfirmCopy"
			@cancel="onCancelCopy"
		/>
	</section>
</template>

<script setup lang="ts">
import TasksOverviewPane from "./TasksOverviewPane.vue";
import { CopyParams } from "@/types/copy/CopyParams";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { useTasksOfOverview } from "@data-tasks";
import { CopyDialog, useCopyFlow } from "@feature-copy";
import { ShareDialog, useShareFlow } from "@feature-share";
import { mdiArchiveOutline, mdiFormatListChecks, mdiPlaylistEdit } from "@icons/material";
import { useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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

const {
	isDialogOpen: isCopyDialogOpen,
	copyItemType,
	executeCopyTask,
	onConfirm: onConfirmCopy,
	onCancel: onCancelCopy,
} = useCopyFlow();

const onCopyTask = async ({ id, courseId }: CopyParams) => {
	const { success } = await executeCopyTask(id, courseId!);

	if (success) {
		activeTab.value = TaskTab.DRAFTS;
		await fetchTasks();
	}
};

const {
	isDialogOpen: isShareDialogOpen,
	shareItemType,
	shareUrl,
	executeShare,
	onConfirm: onConfirmShare,
	onCancel: onCancelShare,
	onDone,
} = useShareFlow();

const onShareTask = (taskId: string) => {
	executeShare({
		id: taskId,
		type: ShareTokenBodyParamsParentType.TASKS,
	});
};
</script>

<style lang="scss" scoped>
.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 30vw, 230px);
}
</style>
