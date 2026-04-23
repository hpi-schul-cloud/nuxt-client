<template>
	<VWindowItem :value class="content-grid">
		<aside class="filter-sidebar mt-2 pa-6">
			<div class="filter-controls">
				<VAutocomplete
					v-model="selectedCourseNames"
					closable-chips
					multiple
					clearable
					flat
					chips
					:density="filterDensity"
					data-testid="course-filter"
					:items="courseFilterOptionsWithCount"
					:label="t('common.labels.course')"
				/>

				<VAutocomplete
					v-model="gradeStatus"
					clearable
					flat
					:density="filterDensity"
					data-testid="grade-status-filter"
					:items="gradeStatusOptions"
					:label="t('pages.tasks.rating')"
				/>

				<VAutocomplete
					v-model="dueStatus"
					clearable
					flat
					:density="filterDensity"
					data-testid="due-status-filter"
					:items="dueStatusOptions"
					:label="t('common.labels.status')"
				/>

				<VSwitch
					v-model="includeSubstitute"
					:label="t('components.organisms.TasksDashboardMain.filter.substitute')"
					:true-icon="mdiCheck"
					hide-details
					:density="filterDensity"
				/>

				<SvsTransition variant="expand">
					<VBtn
						v-if="hasActiveFilters"
						variant="outlined"
						class="mt-3"
						:text="t('common.actions.reset.filter')"
						@click="clearFilters"
					/>
				</SvsTransition>
			</div>
		</aside>

		<div class="list-container">
			<TasksOverviewList
				:tasks="filteredTasks"
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
		</div>
	</VWindowItem>
</template>

<script setup lang="ts">
import TasksOverviewList from "./TasksOverviewList.vue";
import TasksOverviewListItemStudent from "@/components/tasks/TasksOverviewListItemStudent.vue";
import TasksOverviewListItemTeacher from "@/components/tasks/TasksOverviewListItemTeacher.vue";
import SvsTransition from "@/modules/ui/appearance/SvsTransition.vue";
import { CopyParams } from "@/store/copy";
import { TaskResponse } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useTasksFilter } from "@data-tasks";
import { mdiCheck } from "@icons/material";
import { computed, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps<{
	value: string;
	tasks: TaskResponse[];
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
	clearFilters,
} = useTasksFilter(toRef(props, "tasks"));

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
const { smAndDown } = useDisplay();

const filterDensity = computed(() => (smAndDown.value ? "compact" : "default"));

const hasActiveFilters = computed(
	() =>
		selectedCourseNames.value.length > 0 ||
		gradeStatus.value !== undefined ||
		dueStatus.value !== undefined ||
		includeSubstitute.value
);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.content-grid {
	display: grid;
	grid-template-columns: 5fr 2fr;
	grid-template-areas: "list sidebar";
	gap: 12px;
	align-items: start;
	border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

	@media #{map.get($display-breakpoints, 'sm-and-down')} {
		grid-template-columns: 1fr;
		grid-template-areas:
			"sidebar"
			"list";
	}
}

.list-container {
	grid-area: list;
}

.filter-sidebar {
	grid-area: sidebar;
	background-color: rgb(var(--v-theme-surface-light));
}
</style>
