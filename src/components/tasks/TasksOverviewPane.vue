<template>
	<VWindowItem :value class="content-grid">
		<TasksOverviewList
			:tasks="filteredTasks"
			:empty-title="emptyTitle"
			:is-loading-more-items="isLoadingMoreItems"
			:has-pagination="hasPagination"
			@load-more-tasks="$emit('load-more-tasks')"
		>
			<template #default="{ task }">
				<TasksOverviewListItemTeacher v-if="isTeacher" :task="task" />
				<TasksOverviewListItemStudent v-if="isStudent" :task="task" />
			</template>
		</TasksOverviewList>

		<aside class="filter-sidebar h-100 pa-4">
			<div class="filter-controls">
				<VAutocomplete
					v-model="selectedCourseNames"
					closable-chips
					multiple
					clearable
					hide-details="auto"
					variant="solo-filled"
					flat
					chips
					data-testid="courseFilter"
					item-title="text"
					item-value="value"
					:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
					:items="courseFilterOptionsWithCount"
					:label="t('pages.tasks.labels.filter')"
				/>

				<VAutocomplete
					v-model="gradeStatus"
					class="mt-2"
					clearable
					hide-details="auto"
					variant="solo-filled"
					flat
					data-testid="gradeStatusFilter"
					item-title="text"
					item-value="value"
					:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
					:items="gradeStatusOptions"
					label="Status"
				/>

				<VAutocomplete
					v-model="dueStatus"
					clearable
					class="mt-2"
					hide-details="auto"
					variant="solo-filled"
					flat
					data-testid="dueStatusFilter"
					item-title="text"
					item-value="value"
					:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
					:items="dueStatusOptions"
					label="Due status"
				/>

				<VSwitch
					v-model="includeSubstitute"
					:label="t('components.organisms.TasksDashboardMain.filter.substitute')"
					:true-icon="mdiCheck"
					hide-details
				/>
			</div>
		</aside>
	</VWindowItem>
</template>

<script setup lang="ts">
import TasksOverviewList from "./TasksOverviewList.vue";
import TasksOverviewListItemStudent from "@/components/tasks/TasksOverviewListItemStudent.vue";
import TasksOverviewListItemTeacher from "@/components/tasks/TasksOverviewListItemTeacher.vue";
import { TaskResponse } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useTasksFilter } from "@data-tasks";
import { mdiCheck } from "@icons/material";
import { computed, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	value: string;
	tasks: TaskResponse[];
	emptyTitle: string;
	hasPagination?: boolean;
	isLoadingMoreItems?: boolean;
}>();

const { isTeacher, isStudent } = useAppStoreRefs();

const {
	gradeStatus,
	dueStatus,
	courseFilterOptions,
	gradeStatusOptions,
	dueStatusOptions,
	includeSubstitute,
	filteredTasks,
	selectedCourseNames,
} = useTasksFilter(toRef(props, "tasks"));

// Format course options to show count in text
const courseFilterOptionsWithCount = computed(() =>
	courseFilterOptions.value.map((opt) => ({
		...opt,
		text: `${opt.text} (${opt.count})`,
	}))
);

defineEmits<{ "load-more-tasks": [] }>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.content-grid {
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-areas: "list sidebar";
	gap: 12px;
	align-items: start;
	border-top: 0.5px solid;

	@media #{map.get($display-breakpoints, 'sm-and-down')} {
		grid-template-columns: 1fr;
		grid-template-areas:
			"sidebar"
			"list";
	}
}

.filter-sidebar {
	grid-area: sidebar;
	border-left: 1px solid rgb(var(--v-border-color));
}
</style>
