<template>
	<section class="task-dashboard-student">
		<div class="header-section">
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<VTabs v-model="activeTab" class="tabs-max-width" grow>
					<VTab v-for="tab in tabRoutes" :key="tab.value" :value="tab.value">
						<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
						<span class="d-sm-inline" :data-testid="`${tab.value}-tasks`">
							{{ tab.text }}
						</span>
					</VTab>
				</VTabs>
			</div>
		</div>

		<div class="content-max-width mx-auto mt-5 mb-14">
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

			<VWindow v-model="activeTab">
				<VWindowItem :value="tabRoutes[0].value">
					<TasksDashBoardPanels
						:panel-one-count="noDueDateTasks.length"
						:panel-two-count="withDueDateTasks.length + overdueTasks.length"
						:panel-one-title="t('pages.tasks.subtitleNoDue')"
						:panel-two-title="t('pages.tasks.subtitleWithDue')"
						:status="status"
						:is-empty="openTasksForStudentIsEmpty"
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
						<EmptyState v-if="openTasksForStudentIsEmpty" :title="t('pages.tasks.student.open.emptyState.title')">
							<template #media>
								<TasksEmptyStateSvg />
							</template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="tabRoutes[1].value">
					<TasksDashBoardPanels
						:panel-one-count="gradedTasks.length"
						:panel-two-count="submittedTasks.length"
						:panel-one-title="t('pages.tasks.subtitleGraded')"
						:panel-two-title="t('pages.tasks.subtitleNotGraded')"
						:status="status"
						:is-empty="completedTasksForStudentIsEmpty"
						:expanded-default="0"
					>
						<template #panelOne>
							<TasksList :tasks="gradedTasks" user-role="student" />
						</template>
						<template #panelTwo>
							<TasksList :tasks="submittedTasks" user-role="student" />
						</template>
					</TasksDashBoardPanels>
					<VContainer>
						<EmptyState
							v-if="completedTasksForStudentIsEmpty"
							:title="t('pages.tasks.student.completed.emptyState.title')"
						>
							<template #media>
								<TasksEmptyStateSvg />
							</template>
						</EmptyState>
					</VContainer>
				</VWindowItem>
				<VWindowItem :value="tabRoutes[2].value">
					<TasksList
						:tasks="finishedTasks"
						user-role="student"
						type="finished"
						:has-pagination="activeTab === tabRoutes[2].value"
					/>
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
import TasksModule from "@/store/tasks";
import { FINISHED_TASKS_MODULE_KEY, injectStrict, TASKS_MODULE_KEY } from "@/utils/inject";
import { mdiArchiveOutline, mdiCheckCircleOutline, mdiFormatListChecks, mdiMagnify } from "@icons/material";
import { EmptyState, TasksEmptyStateSvg } from "@ui-empty-state";
import { useUrlSearchParams } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const tasksModule: TasksModule = injectStrict(TASKS_MODULE_KEY);
const finishedTasksModule: FinishedTasksModule = injectStrict(FINISHED_TASKS_MODULE_KEY);

const { t } = useI18n();
const params = useUrlSearchParams("history");

const tabRoutes = [
	{ value: "open", icon: mdiFormatListChecks, text: t("components.organisms.TasksDashboardMain.tab.open") },
	{ value: "completed", icon: mdiCheckCircleOutline, text: t("components.organisms.TasksDashboardMain.tab.completed") },
	{ value: "finished", icon: mdiArchiveOutline, text: t("components.organisms.TasksDashboardMain.tab.finished") },
];

const activeTab = computed({
	get: () => (params.tab as string) || tabRoutes[0].value,
	set: (value: string) => {
		params.tab = value;
	},
});

const selectedCourseFilters = computed({
	get: () => tasksModule.getSelectedCourseFilters,
	set: (courseNames: string[]) => tasksModule.setCourseFilters(courseNames),
});

const courseFilters = computed(() => tasksModule.getCourseFilters);
const tasksCountStudent = computed(() => tasksModule.getTasksCountPerCourseStudent);

const getTaskCount = (courseName: string) => {
	if (activeTab.value === tabRoutes[0].value) {
		return tasksCountStudent.value.open[courseName];
	}
	if (activeTab.value === tabRoutes[1].value) {
		return tasksCountStudent.value.completed[courseName];
	}
	return 0;
};

const sortedCourseFilters = computed(() => {
	const filters = courseFilters.value.map((filter) => {
		const count = getTaskCount(filter.value);
		const name = filter.value || t("pages.tasks.labels.noCourse");
		return {
			...filter,
			text: `${name} (${count})`,
		};
	});

	return filters.sort((a, b) => (a.text < b.text ? -1 : 1));
});

onMounted(() => {
	finishedTasksModule.fetchFinishedTasks();
});

const status = computed(() => tasksModule.getStatus);
const openTasks = computed(() => tasksModule.getOpenTasksForStudent);
const completedTasks = computed(() => tasksModule.getCompletedTasksForStudent);

const openTasksForStudentIsEmpty = computed(() => tasksModule.openTasksForStudentIsEmpty);
const completedTasksForStudentIsEmpty = computed(() => tasksModule.completedTasksForStudentIsEmpty);
const finishedTasksIsEmpty = computed(() => finishedTasksModule.tasksIsEmpty);
const finishedTasks = computed(() => finishedTasksModule.getTasks);

const overdueTasks = computed(() => openTasks.value.overdue);
const noDueDateTasks = computed(() => openTasks.value.noDueDate);
const withDueDateTasks = computed(() => openTasks.value.withDueDate);
const submittedTasks = computed(() => completedTasks.value.submitted);
const gradedTasks = computed(() => completedTasks.value.graded);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.content-max-width {
	max-width: var(--content-max-width);
}

@media #{map.get($display-breakpoints, 'md-and-up')} {
	.tabs-max-width {
		max-width: var(--content-max-width);
	}
}
</style>
