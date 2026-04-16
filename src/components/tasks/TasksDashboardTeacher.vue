<template>
	<section class="task-dashboard-teacher">
		<div class="header-section">
			<div class="filter-section d-flex flex-wrap align-center mb-4">
				<VAutocomplete
					v-model="selectedCourseNames"
					closable-chips
					multiple
					clearable
					hide-details="auto"
					variant="solo-filled"
					style="min-width: 200px"
					flat
					chips
					data-testid="courseFilter"
					item-title="text"
					item-value="value"
					:prepend-inner-icon="mdiMagnify"
					:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
					:items="countedCourseFilters"
					:label="t('pages.tasks.labels.filter')"
					:aria-label="t('pages.tasks.labels.filter')"
					class="flex-grow-1"
				/>
				<VSwitch
					v-model="includeSubstitute"
					:label="t('components.organisms.TasksDashboardMain.filter.substitute')"
					:true-icon="mdiCheck"
					class="flex-shrink-0"
					hide-details
				/>
			</div>
			<VTabs v-model="activeTab" align-tabs="center">
				<VTab v-for="tab in tabRoutes" :key="tab.value" :value="tab.value" class="tab-item">
					<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
					<span class="d-none d-sm-inline" :data-testid="`${tab.value}-tasks`"> {{ tab.text }} </span>
				</VTab>
			</VTabs>
		</div>

		<div class="mx-auto mt-5">
			<VWindow class="padding-bottom" :model-value="activeTab">
				<VWindowItem :value="TaskTab.OPEN">
					<TasksDashBoardPanels
						:panel-one-count="noDueDateTasks.length"
						:panel-two-count="withDueDateTasks.length + overdueTasks.length"
						:panel-one-title="t('pages.tasks.subtitleNoDue')"
						:panel-two-title="t('pages.tasks.subtitleWithDue')"
						:is-loading="isLoading"
						:is-empty="openForTeacher.length === 0"
						:expanded-default="1"
					>
						<template #panelOne>
							<TasksList
								:tasks="noDueDateTasks"
								:show-skeleton="isLoading"
								user-role="teacher"
								@copy-task="onCopyTask"
								@share-task="onShareTask"
							/>
						</template>
						<template #panelTwo>
							<TasksList
								:tasks="overdueTasks"
								:show-skeleton="isLoading"
								:title="t('pages.tasks.teacher.subtitleOverDue')"
								user-role="teacher"
								@copy-task="onCopyTask"
								@share-task="onShareTask"
							/>
							<TasksList
								:tasks="withDueDateTasks"
								:show-skeleton="isLoading"
								:title="t('pages.tasks.subtitleOpen')"
								user-role="teacher"
								@copy-task="onCopyTask"
								@share-task="onShareTask"
							/>
						</template>
					</TasksDashBoardPanels>
					<VContainer>
						<EmptyState v-if="openForTeacher.length === 0" :title="t('pages.tasks.open.emptyState.title')">
							<template #media> <TasksEmptyStateSvg /></template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="TaskTab.DRAFTS">
					<TasksList
						:tasks="drafts"
						user-role="teacher"
						:show-skeleton="isLoading"
						@copy-task="onCopyTask"
						@share-task="onShareTask"
					/>
					<VContainer>
						<EmptyState v-if="drafts.length === 0" :title="t('pages.tasks.teacher.drafts.emptyState.title')">
							<template #media> <TasksEmptyStateSvg /></template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="TaskTab.FINISHED">
					<TasksList
						:tasks="finishedTasks"
						user-role="teacher"
						has-pagination
						:is-loading-more-items="isLoadingFinished"
						@copy-task="onCopyTask"
						@share-task="onShareTask"
						@load-more-tasks="fetchFinishedTasks"
					/>
					<VContainer>
						<EmptyState v-if="finishedTasks.length === 0" :title="t('pages.tasks.finished.emptyState.title')">
							<template #media> <TasksEmptyStateSvg /></template>
						</EmptyState>
					</VContainer>
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
import TasksDashBoardPanels from "./TasksDashBoardPanels.vue";
import TasksList from "./TasksList.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { useCopy } from "@/composables/copy";
import { CopyParams } from "@/store/copy";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useTasksOfOverview } from "@data-tasks";
import { mdiArchiveOutline, mdiCheck, mdiFormatListChecks, mdiMagnify, mdiPlaylistEdit } from "@icons/material";
import { EmptyState, TasksEmptyStateSvg } from "@ui-empty-state";
import { useUrlSearchParams } from "@vueuse/core";
import { countBy } from "lodash-es";
import { computed, onMounted } from "vue";
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
	splitByDueDate,
	isLoading,
	isLoadingFinished,
	includeSubstitute,
	fetchTasks,
	fetchFinishedTasks,
	finishedTasks,
	sortedCourseFilters,
	selectedCourseNames,
} = useTasksOfOverview({ includeSubstitute: false });

onMounted(async () => {
	await fetchFinishedTasks();
});

const openTasks = computed(() => splitByDueDate(openForTeacher.value));
const overdueTasks = computed(() => openTasks.value.overdue);
const noDueDateTasks = computed(() => openTasks.value.noDueDate);
const withDueDateTasks = computed(() => openTasks.value.withDueDate);

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

.padding-bottom {
	padding-bottom: 140px;
}

.filter-section {
	gap: 16px;
}

.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 20vw, 160px);
}
</style>
