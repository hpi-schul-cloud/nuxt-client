<template>
	<section class="task-dashboard-student">
		<div class="header-section">
			<VTabs v-model="activeTab" align-tabs="center">
				<VTab v-for="tab in tabRoutes" :key="tab.value" class="tab-item" :value="tab.value">
					<VIcon size="large" :icon="tab.icon" class="tab-icon mr-sm-3" />
					<span class="d-none d-sm-inline" :data-testid="`${tab.value}-tasks`"> {{ tab.text }} </span>
				</VTab>
			</VTabs>
		</div>

		<div class="mx-auto mt-5">
			<VWindow v-model="activeTab">
				<TasksOverviewPane :value="TaskTab.OPEN" :tasks="openForStudent" />
				<TasksOverviewPane :value="TaskTab.COMPLETED" :tasks="submittedForStudent" />
				<TasksOverviewPane
					:value="TaskTab.FINISHED"
					:tasks="finishedTasks"
					:is-loading-more-items="isLoadingFinishedTasks"
					has-pagination
					@load-more-tasks="loadMoreFinishedTasks"
				/>
			</VWindow>
		</div>
	</section>
</template>

<script setup lang="ts">
import TasksOverviewPane from "./TasksOverviewPane.vue";
import { useTasksOfOverview } from "@data-tasks";
import { mdiArchiveOutline, mdiCheckCircleOutline, mdiFormatListChecks } from "@icons/material";
import { useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
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

const { openForStudent, finishedTasks, isLoadingFinishedTasks, loadMoreFinishedTasks, submittedForStudent } =
	useTasksOfOverview();
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.tab-item {
	min-width: 0 !important;
	width: clamp(90px, 20vw, 160px);
}
</style>
