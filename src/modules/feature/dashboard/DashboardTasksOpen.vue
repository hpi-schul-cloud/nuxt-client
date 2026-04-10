<template>
	<template v-if="!tasks || tasks.length === 0">
		<EmptyState data-testid="empty-state-tasks" :title="emptyMsg">
			<template #media> <SvgTasksEmpty /></template>
		</EmptyState>
	</template>
	<DashboardTasksSection v-else v-bind="$attrs" :title :tasks />
</template>

<script setup lang="ts">
import DashboardTasksSection from "./DashboardTasksSection.vue";
import SvgTasksEmpty from "@/assets/img/SvgTasksEmpty.vue";
import { TaskResponse } from "@api-server";
import { EmptyState } from "@ui-empty-state";

defineProps<{
	title: string;
	emptyMsg: string;
	tasks: TaskResponse[];
}>();

defineOptions({ inheritAttrs: false });
</script>
