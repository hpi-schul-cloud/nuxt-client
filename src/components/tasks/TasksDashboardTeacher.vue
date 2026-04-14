<template>
	<section class="task-dashboard-teacher">
		<div class="header-section">
			<VSwitch
				v-if="showSubstituteFilter"
				v-model="substituteFilterEnabled"
				:label="t('components.organisms.TasksDashboardMain.filter.substitute')"
				:true-icon="mdiCheck"
			/>
			<VTabs v-model="activeTab" class="tabs-max-width" grow>
				<VTab v-for="tab in tabRoutes" :key="tab.value" :value="tab.value">
					<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
					<span class="d-sm-inline" :data-testid="`${tab.value}-tasks`">
						{{ tab.text }}
					</span>
				</VTab>
			</VTabs>
		</div>

		<div class="mx-auto mt-5">
			<VAutocomplete
				v-model="selectedCourseFilters"
				closable-chips
				multiple
				clearable
				variant="solo-filled"
				flat
				chips
				data-testid="courseFilter"
				item-title="text"
				item-value="value"
				:prepend-inner-icon="mdiMagnify"
				:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
				:items="sortedCourseFilters"
				:label="t('pages.tasks.labels.filter')"
				:aria-label="t('pages.tasks.labels.filter')"
				:no-data-text="t('pages.tasks.labels.noCoursesAvailable')"
				class="mb-4"
			/>

			<VWindow class="padding-bottom" :model-value="activeTab">
				<VWindowItem :value="tabRoutes[0].value">
					<TasksDashBoardPanels
						:panel-one-count="noDueDateTasks.length"
						:panel-two-count="withDueDateTasks.length + overdueTasks.length"
						:panel-one-title="t('pages.tasks.subtitleNoDue')"
						:panel-two-title="t('pages.tasks.subtitleWithDue')"
						:status="status"
						:is-empty="openTasksForTeacherIsEmpty"
						:expanded-default="1"
					>
						<template #panelOne>
							<TasksList
								:tasks="noDueDateTasks"
								:show-skeleton="isLoadingTasks"
								user-role="teacher"
								@copy-task="onCopyTask"
								@share-task="onShareTask"
							/>
						</template>
						<template #panelTwo>
							<TasksList
								:tasks="overdueTasks"
								:show-skeleton="isLoadingTasks"
								:title="t('pages.tasks.teacher.subtitleOverDue')"
								user-role="teacher"
								@copy-task="onCopyTask"
								@share-task="onShareTask"
							/>
							<TasksList
								:tasks="withDueDateTasks"
								:show-skeleton="isLoadingTasks"
								:title="t('pages.tasks.subtitleOpen')"
								user-role="teacher"
								@copy-task="onCopyTask"
								@share-task="onShareTask"
							/>
						</template>
					</TasksDashBoardPanels>
					<VContainer>
						<EmptyState v-if="openTasksForTeacherIsEmpty" :title="t('pages.tasks.open.emptyState.title')">
							<template #media> <TasksEmptyStateSvg /></template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="tabRoutes[1].value">
					<TasksList
						:tasks="drafts"
						user-role="teacher"
						:show-skeleton="isLoadingTasks"
						@copy-task="onCopyTask"
						@share-task="onShareTask"
					/>
					<VContainer>
						<EmptyState v-if="draftsForTeacherIsEmpty" :title="t('pages.tasks.teacher.drafts.emptyState.title')">
							<template #media> <TasksEmptyStateSvg /></template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="tabRoutes[2].value">
					<TasksList
						:tasks="finishedTasks"
						user-role="teacher"
						type="finished"
						:has-pagination="activeTab === tabRoutes[2].value"
						@copy-task="onCopyTask"
						@share-task="onShareTask"
					/>
					<VContainer>
						<EmptyState v-if="finishedTasksIsEmpty" :title="t('pages.tasks.finished.emptyState.title')">
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
import FinishedTasksModule from "@/store/finished-tasks";
import ShareModule from "@/store/share";
import TasksModule from "@/store/tasks";
import {
	COPY_MODULE_KEY,
	FINISHED_TASKS_MODULE_KEY,
	injectStrict,
	SHARE_MODULE_KEY,
	TASKS_MODULE_KEY,
} from "@/utils/inject";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useTasks } from "@data-tasks";
import { mdiArchiveOutline, mdiCheck, mdiFormatListChecks, mdiMagnify, mdiPlaylistEdit } from "@icons/material";
import { EmptyState, TasksEmptyStateSvg } from "@ui-empty-state";
import { useUrlSearchParams } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const tasksModule: TasksModule = injectStrict(TASKS_MODULE_KEY);
const finishedTasksModule: FinishedTasksModule = injectStrict(FINISHED_TASKS_MODULE_KEY);
const shareModule: ShareModule = injectStrict(SHARE_MODULE_KEY);
const copyModule = injectStrict(COPY_MODULE_KEY);

const { t } = useI18n();
const { copy } = useCopy();
const params = useUrlSearchParams("history");

const tabRoutes = [
	{ value: "open", icon: mdiFormatListChecks, text: t("components.organisms.TasksDashboardMain.tab.current") },
	{ value: "drafts", icon: mdiPlaylistEdit, text: t("components.organisms.TasksDashboardMain.tab.drafts") },
	{ value: "finished", icon: mdiArchiveOutline, text: t("components.organisms.TasksDashboardMain.tab.finished") },
];

const activeTab = computed({
	get: () => (params.tab as string) || tabRoutes[0].value,
	set: (value: string) => {
		params.tab = value;
	},
});

const showSubstituteFilter = computed(() => activeTab.value !== tabRoutes[2].value);

const substituteFilterEnabled = computed({
	get: () => tasksModule.isSubstituteFilterEnabled,
	set: (value: boolean) => tasksModule.setSubstituteFilter(value),
});

const selectedCourseFilters = computed({
	get: () => tasksModule.getSelectedCourseFilters,
	set: (courseNames: string[]) => tasksModule.setCourseFilters(courseNames),
});

const courseFilters = computed(() => tasksModule.getCourseFilters);
const tasksCountTeacher = computed(() => tasksModule.getTasksCountPerCourseForTeacher);

const getTaskCount = (courseName: string) => {
	if (activeTab.value === tabRoutes[0].value) {
		return tasksCountTeacher.value.open[courseName];
	}
	if (activeTab.value === tabRoutes[1].value) {
		return tasksCountTeacher.value.drafts[courseName];
	}
	return 0;
};

const sortedCourseFilters = computed(() => {
	const filters = courseFilters.value.map((filter) => {
		const count = getTaskCount(filter.value);
		const name = filter.value || t("pages.tasks.labels.noCourse");
		const substitution = filter.isSubstitution ? `${t("common.words.substitute")} ` : "";
		return {
			...filter,
			text: `${substitution}${name} (${count})`,
		};
	});

	return filters.sort((a, b) => (a.text < b.text ? -1 : 1));
});

onMounted(() => {
	finishedTasksModule.fetchFinishedTasks();
});

const { drafts, openForTeacher, splitByDueDate, isLoading: isLoadingTasks } = useTasks({ includeSubstitute: false });
const openTasks = computed(() => splitByDueDate(openForTeacher.value));
const overdueTasks = computed(() => openTasks.value.overdue);
const noDueDateTasks = computed(() => openTasks.value.noDueDate);
const withDueDateTasks = computed(() => openTasks.value.withDueDate);

const finishedTasks = computed(() => finishedTasksModule.getTasks);

const status = computed(() => tasksModule.getStatus);

const openTasksForTeacherIsEmpty = computed(() => tasksModule.openTasksForTeacherIsEmpty);
const draftsForTeacherIsEmpty = computed(() => tasksModule.draftsForTeacherIsEmpty);
const finishedTasksIsEmpty = computed(() => finishedTasksModule.tasksIsEmpty);

const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);
const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);
const isCopyModalOpen = computed(() => copyModule.getIsResultModalOpen);

const onCopyResultModalClosed = () => {
	copyModule.reset();
};

const onCopyTask = async (payload: CopyParams) => {
	await copy(payload);

	tasksModule.setActiveTab("drafts");
	await tasksModule.fetchAllTasks();
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

.substitute-filter-placeholder {
	min-height: 78px;
}

.content-max-width {
	max-width: var(--content-max-width);
}

@media #{map.get($display-breakpoints, 'md-and-up')} {
	.tabs-max-width {
		max-width: var(--content-max-width);
	}
}

// even out border
.v-tabs {
	margin-bottom: -2px;
}

.padding-bottom {
	padding-bottom: 140px;
}
</style>
