<!-- DashboardTasksAssigned.vue -->
<template>
	<template v-if="!tasks || tasks.length === 0">
		<h2>{{ t("common.words.tasks") }}</h2>
		<EmptyState data-testid="empty-state-tasks" :title="emptyMsg">
			<template #media> <SvgTasksEmpty /></template>
		</EmptyState>
	</template>
	<DashboardTasksSection v-else data-testid="assigned-tasks" :title :tasks />
</template>
<script setup lang="ts">
import DashboardTasksSection from "./DashboardTasksSection.vue";
import SvgTasksEmpty from "@/assets/img/SvgTasksEmpty.vue";
import { TaskResponse } from "@api-server";
import { EmptyState } from "@ui-empty-state";
import { useI18n } from "vue-i18n";

defineProps<{
	title: string;
	emptyMsg: string;
	tasks: TaskResponse[];
}>();

const { t } = useI18n();
</script>
