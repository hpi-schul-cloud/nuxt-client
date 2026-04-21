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
				<VWindowItem class="content-grid" :value="TaskTab.OPEN">
					<TasksOverviewList :tasks="openForTeacher" :empty-title="t('pages.tasks.open.emptyState.title')">
						<template #default="{ task }">
							<TasksOverviewListItemTeacher :task @copy-task="onCopyTask" @share-task="onShareTask" />
						</template>
					</TasksOverviewList>
					<aside class="filter-sidebar">
						<TasksFilterOptions
							v-model:course-names="selectedCourseNames"
							v-model:substitute="includeSubstitute"
							:course-filters="countedCourseFilters"
						/>
					</aside>
				</VWindowItem>
				<VWindowItem :value="TaskTab.DRAFTS">
					<TasksOverviewList :tasks="drafts" :empty-title="t('pages.tasks.teacher.drafts.emptyState.title')">
						<template #default="{ task }">
							<TasksOverviewListItemTeacher :task @copy-task="onCopyTask" @share-task="onShareTask" />
						</template>
					</TasksOverviewList>
				</VWindowItem>
				<VWindowItem :value="TaskTab.FINISHED">
					<TasksOverviewList
						:tasks="finishedTasks"
						:empty-title="t('pages.tasks.finished.emptyState.title')"
						:is-loading-more-items="isLoadingFinishedTasks"
						has-pagination
						@load-more-tasks="loadMoreFinishedTasks"
					>
						<template #default="{ task }">
							<TasksOverviewListItemTeacher :task @copy-task="onCopyTask" @share-task="onShareTask" />
						</template>
					</TasksOverviewList>
				</VWindowItem>
			</VWindow>
		</div>

		<share-modal :type="ShareTokenBodyParamsParentType.TASKS" />
		<CopyResultModal
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@copy-dialog-closed="onCopyResultModalClosed"
		/>
	</section>
</template>

<script setup lang="ts">
import TasksOverviewList from "./TasksOverviewList.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import TasksFilterOptions from "@/components/tasks/task-controls/TasksFilterOptions.vue";
import TasksOverviewListItemTeacher from "@/components/tasks/TasksOverviewListItemTeacher.vue";
import { useCopy } from "@/composables/copy";
import { CopyParams } from "@/store/copy";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useTasksOfOverview } from "@data-tasks";
import { mdiArchiveOutline, mdiFormatListChecks, mdiPlaylistEdit } from "@icons/material";
import { useUrlSearchParams } from "@vueuse/core";
import { countBy } from "lodash-es";
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

const {
	draftsUnfiltered,
	publishedUnfiltered,
	drafts,
	openForTeacher,
	isLoadingFinishedTasks,
	includeSubstitute,
	fetchTasks,
	loadMoreFinishedTasks,
	finishedTasks,
	sortedCourseFilters,
	selectedCourseNames,
} = useTasksOfOverview();

const countedCourseFilters = computed(() => {
	const count = countBy(
		activeTab.value === TaskTab.DRAFTS ? draftsUnfiltered.value : publishedUnfiltered.value,
		(t) => t.courseName
	);

	return sortedCourseFilters.value.map((filter) => {
		const substitution = filter.isSubstitution ? `${t("common.words.substitute")} ` : "";
		return {
			...filter,
			text: `${substitution}${filter.text} (${count[filter.value] ?? 0})`,
		};
	});
});

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
@use "sass:map";
@use "@/styles/settings" as *;

.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 20vw, 160px);
}

.content-grid {
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-areas: "list sidebar";
	gap: 12px;
	align-items: start;

	@media #{map.get($display-breakpoints, 'sm-and-down')} {
		grid-template-columns: 1fr;
		grid-template-areas:
			"sidebar"
			"list";
	}
}

.task-list {
	grid-area: list;
}

.filter-sidebar {
	grid-area: sidebar;
	position: sticky;
	top: 80px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px;
	border-radius: 8px;
	background: rgb(var(--v-theme-surface));
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
