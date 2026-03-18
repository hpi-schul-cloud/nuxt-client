<!-- DashboardAssignedTasks.vue -->
<template>
	<template v-if="!assignedTasks || assignedTasks.length === 0">
		<h2>{{ t("common.words.tasks") }}</h2>
		<EmptyState data-testid="empty-state-tasks" :title="t('pages.dashboard.no.tasks')">
			<template #media>
				<VImg height="160" src="@/assets/img/tasks-empty.svg" />
			</template>
		</EmptyState>
	</template>
	<DashboardTasksSection
		v-else
		data-testid="assigned-tasks"
		:title="t('common.labels.tasks.assigned')"
		:tasks="assignedTasks"
	/>
</template>
<script setup lang="ts">
import { DashBoardTask } from "./dashboard.types";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { EmptyState } from "@ui-empty-state";
import { useI18n } from "vue-i18n";

defineProps<{
	assignedTasks?: DashBoardTask[];
}>();

const { t } = useI18n();
</script>
