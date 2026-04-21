<template>
	<section class="task-dashboard-student">
		<div class="header-section">
			<VAutocomplete
				v-model="selectedCourseNames"
				closable-chips
				multiple
				clearable
				variant="solo-filled"
				flat
				chips
				hide-details="auto"
				data-testid="courseFilter"
				item-title="text"
				item-value="value"
				:prepend-inner-icon="mdiMagnify"
				:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
				:items="countedCourseFilters"
				:label="t('pages.tasks.labels.filter')"
				:aria-label="t('pages.tasks.labels.filter')"
				class="mb-4"
			/>

			<VTabs v-model="activeTab" align-tabs="center">
				<VTab v-for="tab in tabRoutes" :key="tab.value" class="tab-item" :value="tab.value">
					<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
					<span class="d-none d-sm-inline" :data-testid="`${tab.value}-tasks`"> {{ tab.text }} </span>
				</VTab>
			</VTabs>
		</div>

		<div class="mx-auto mt-5">
			<VWindow v-model="activeTab">
				<VWindowItem :value="TaskTab.OPEN">
					<TasksOverviewList :tasks="openForStudent" :empty-title="t('pages.tasks.student.open.emptyState.title')">
						<template #default="{ task }">
							<TasksOverviewListItemStudent :task />
						</template>
					</TasksOverviewList>
				</VWindowItem>
				<VWindowItem :value="TaskTab.COMPLETED">
					<TasksOverviewList
						:tasks="submittedForStudent"
						:empty-title="t('pages.tasks.student.completed.emptyState.title')"
					>
						<template #default="{ task }">
							<TasksOverviewListItemStudent :task />
						</template>
					</TasksOverviewList>
				</VWindowItem>
				<VWindowItem :value="TaskTab.FINISHED">
					<TasksOverviewList
						:tasks="finishedTasks"
						:is-loading-more-items="isLoadingFinishedTasks"
						has-pagination
						:empty-title="t('pages.tasks.finished.emptyState.title')"
						@load-more-tasks="loadMoreFinishedTasks"
					>
						<template #default="{ task }">
							<TasksOverviewListItemStudent :task />
						</template>
					</TasksOverviewList>
				</VWindowItem>
			</VWindow>
		</div>
	</section>
</template>

<script setup lang="ts">
import TasksOverviewList from "./TasksOverviewList.vue";
import TasksOverviewListItemStudent from "@/components/tasks/TasksOverviewListItemStudent.vue";
import { useTasksOfOverview } from "@data-tasks";
import { mdiArchiveOutline, mdiCheckCircleOutline, mdiFormatListChecks } from "@icons/material";
import { mdiMagnify } from "@icons/material";
import { useUrlSearchParams } from "@vueuse/core";
import { countBy } from "lodash-es";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

enum TaskTab {
	OPEN = "open",
	COMPLETED = "completed",
	FINISHED = "finished",
}

const { t } = useI18n();
const params = useUrlSearchParams("history");

const tabRoutes = [
	{ value: TaskTab.OPEN, icon: mdiFormatListChecks, text: t("components.organisms.TasksDashboardMain.tab.open") },
	{
		value: TaskTab.COMPLETED,
		icon: mdiCheckCircleOutline,
		text: t("components.organisms.TasksDashboardMain.tab.completed"),
	},
	{ value: TaskTab.FINISHED, icon: mdiArchiveOutline, text: t("components.organisms.TasksDashboardMain.tab.finished") },
];

const activeTab = computed({
	get: () => (params.tab as string) || TaskTab.OPEN,
	set: (value: string) => {
		params.tab = value;
	},
});

const {
	openForStudent,
	sortedCourseFilters,
	finishedTasks,
	isLoadingFinishedTasks,
	loadMoreFinishedTasks,
	fetchFinishedTasks,
	selectedCourseNames,
	submittedForStudent,
	openForStudentUnfiltered,
	submittedForStudentUnfiltered,
	gradedForStudentUnfiltered,
} = useTasksOfOverview();

onMounted(async () => {
	await fetchFinishedTasks();
});

const completedForStudentUnfiltered = computed(() => [
	...submittedForStudentUnfiltered.value,
	...gradedForStudentUnfiltered.value,
]);

const countedCourseFilters = computed(() => {
	const count = countBy(
		activeTab.value === TaskTab.OPEN ? openForStudentUnfiltered.value : completedForStudentUnfiltered.value,
		(t) => t.courseName
	);

	return sortedCourseFilters.value.map((filter) => ({
		...filter,
		text: `${filter.text} (${count[filter.value] ?? 0})`,
	}));
});
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 20vw, 160px);
}
</style>
