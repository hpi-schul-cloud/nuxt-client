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
				:items="sortedCourseFilters"
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

		<div class="mx-auto mt-5 mb-14">
			<VWindow v-model="activeTab">
				<VWindowItem :value="TaskTab.OPEN">
					<TasksDashBoardPanels
						:panel-one-count="noDueDateTasks.length"
						:panel-two-count="withDueDateTasks.length + overdueTasks.length"
						:panel-one-title="t('pages.tasks.subtitleNoDue')"
						:panel-two-title="t('pages.tasks.subtitleWithDue')"
						:is-loading="isLoadingTasks"
						:is-empty="openForStudent.length === 0"
						:expanded-default="1"
					>
						<template #panelOne>
							<TasksList :tasks="noDueDateTasks" user-role="student" />
						</template>
						<template #panelTwo>
							<TasksList :tasks="withDueDateTasks" :title="t('pages.tasks.subtitleOpen')" user-role="student" />
							<TasksList :tasks="overdueTasks" :title="t('pages.tasks.student.subtitleOverDue')" user-role="student" />
						</template>
					</TasksDashBoardPanels>
					<VContainer>
						<EmptyState v-if="openForStudent.length === 0" :title="t('pages.tasks.student.open.emptyState.title')">
							<template #media>
								<TasksEmptyStateSvg />
							</template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="TaskTab.COMPLETED">
					<TasksDashBoardPanels
						:panel-one-count="gradedForStudent.length"
						:panel-two-count="submittedForStudent.length"
						:panel-one-title="t('pages.tasks.subtitleGraded')"
						:panel-two-title="t('pages.tasks.subtitleNotGraded')"
						:is-empty="gradedForStudent.length === 0"
						:is-loading="isLoadingTasks"
						:expanded-default="0"
					>
						<template #panelOne>
							<TasksList :tasks="gradedForStudent" user-role="student" />
						</template>
						<template #panelTwo>
							<TasksList :tasks="submittedForStudent" user-role="student" />
						</template>
					</TasksDashBoardPanels>
					<VContainer>
						<EmptyState
							v-if="gradedForStudent.length === 0"
							:title="t('pages.tasks.student.completed.emptyState.title')"
						>
							<template #media>
								<TasksEmptyStateSvg />
							</template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="TaskTab.COMPLETED">
					<TasksList :tasks="finishedTasks" user-role="student" type="finished" has-pagination />
					<VContainer>
						<EmptyState v-if="finishedTasksIsEmpty" :title="t('pages.tasks.finished.emptyState.title')">
							<template #media>
								<TasksEmptyStateSvg />
							</template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
			</VWindow>
		</div>
	</section>
</template>

<script setup lang="ts">
import TasksDashBoardPanels from "./TasksDashBoardPanels.vue";
import TasksList from "./TasksList.vue";
import FinishedTasksModule from "@/store/finished-tasks";
import { FINISHED_TASKS_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useTasks } from "@data-tasks";
import { mdiArchiveOutline, mdiCheckCircleOutline, mdiFormatListChecks } from "@icons/material";
import { mdiMagnify } from "@icons/material";
import { EmptyState, TasksEmptyStateSvg } from "@ui-empty-state";
import { useUrlSearchParams } from "@vueuse/core";
import { countBy } from "lodash-es";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

enum TaskTab {
	OPEN = "open",
	COMPLETED = "completed",
	FINISHED = "finished",
}

const finishedTasksModule: FinishedTasksModule = injectStrict(FINISHED_TASKS_MODULE_KEY);

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

onMounted(() => {
	finishedTasksModule.fetchFinishedTasks();
});

const finishedTasksIsEmpty = computed(() => finishedTasksModule.tasksIsEmpty);
const finishedTasks = computed(() => finishedTasksModule.getTasks);

const {
	openForStudent,
	splitByDueDate,
	isLoading: isLoadingTasks,
	sortedCourseFilters,
	selectedCourseNames,
	submittedForStudent,
	gradedForStudent,
	publishedUnfiltered,
} = useTasks({ includeSubstitute: false });

const openTasks = computed(() => splitByDueDate(openForStudent.value));

const countedCourseFilters = computed(() => {
	const count = countBy(
		activeTab.value === TaskTab.COMPLETED ? publishedUnfiltered.value : publishedUnfiltered.value,
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

const overdueTasks = computed(() => openTasks.value.overdue);
const noDueDateTasks = computed(() => openTasks.value.noDueDate);
const withDueDateTasks = computed(() => openTasks.value.withDueDate);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 20vw, 160px);
}
</style>
