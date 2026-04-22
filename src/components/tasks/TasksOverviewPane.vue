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
				<TasksOverviewListItemTeacher
					v-if="isTeacher"
					:task="task"
					@share-task="$emit('share-task', task.id)"
					@copy-task="$emit('copy-task', $event)"
				/>
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
					flat
					chips
					data-testid="course-filter"
					:items="courseFilterOptionsWithCount"
					:label="t('pages.tasks.labels.filter')"
				/>

				<VAutocomplete
					v-model="gradeStatus"
					clearable
					flat
					data-testid="grade-status-filter"
					:items="gradeStatusOptions"
					label="Status"
				/>

				<VAutocomplete
					v-model="dueStatus"
					clearable
					flat
					data-testid="due-status-filter"
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
import { CopyParams } from "@/store/copy";
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
		title: `${opt.title} (${opt.count})`,
	}))
);

defineEmits<{
	"load-more-tasks": [];
	"copy-task": [payload: CopyParams];
	"share-task": [taskId: string];
}>();

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
