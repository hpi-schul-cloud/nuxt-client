<template>
	<DefaultWireframe :headline="task?.name ?? t('common.words.task')" :breadcrumbs="breadcrumbs" max-width="short">
		<SvsLoading :loading-state="loadingState">
			<template #default>
				<div v-if="task" class="d-flex flex-column ga-6">
					<div>
						<div class="text-subtitle-1">{{ task.courseName }}</div>
						<div v-if="task.lessonName" class="text-subtitle-2">{{ task.lessonName }}</div>
					</div>
					<div v-if="task.description" v-dompurify-html="task.description.content" class="task-description" />
					<TaskFiles v-if="task" :task-id="task.id" />
					<div class="d-flex flex-wrap ga-2">
						<VChip v-if="task.availableDate">{{ formatDate(task.availableDate) }}</VChip>
						<VChip v-if="task.dueDate">{{ t('pages.tasks.labels.due') }} {{ formatDate(task.dueDate) }}</VChip>
					</div>
					<div class="d-flex flex-wrap ga-2">
						<VBtn v-if="canEdit" color="primary" :to="`/tasks/${task.id}/edit`">
							{{ t('common.actions.edit') }}
						</VBtn>
						<VBtn
							v-if="canManage"
							color="error"
							variant="outlined"
							:loading="isMutating"
							@click="onDelete"
						>
							{{ t('common.actions.delete') }}
						</VBtn>
						<VBtn
							v-if="canFinish"
							variant="outlined"
							:loading="isMutating"
							@click="onFinish"
						>
							{{ task.status.isFinished ? t('common.labels.restore') : t('components.molecules.TaskItemMenu.finish') }}
						</VBtn>
						<VBtn variant="outlined" to="/tasks">
							{{ t('common.actions.back') }}
						</VBtn>
					</div>
				</div>
			</template>
		</SvsLoading>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { getTask, useTaskActions } from "@data-tasks";
import { DefaultWireframe } from "@ui-layout";
import { SvsLoading } from "@ui-containers";
import TaskFiles from "@/components/tasks/TaskFiles.vue";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { formatUtc } from "@/utils/date-time.utils";
import type { TaskResponse } from "@api-server";
import { useAppStoreRefs } from "@data-app";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isTeacher } = useAppStoreRefs();
const task = ref<TaskResponse>();
const { execute, loadingState } = useSafeAxiosTask();
const { isMutating, deleteTask, finishTask, restoreFinishedTask } = useTaskActions();

const canManage = computed(() => isTeacher.value === true);
const canEdit = computed(() => canManage.value);
const canFinish = computed(() => task.value !== undefined);
const breadcrumbs = computed(() => [
	{ title: t('common.words.tasks'), to: '/tasks' },
	{ title: task.value?.name ?? t('common.words.task'), disabled: true },
]);
const formatDate = (value: string) => formatUtc(value, 'dateTimeYY');

onMounted(async () => {
	const result = await execute(() => getTask(route.params.taskId as string));
	if (result.success) task.value = result.result;
});

const onDelete = async () => {
	if (!task.value) return;
	const result = await deleteTask(task.value.id, task.value.name);
	if (result?.success) await router.push("/tasks");
};

const onFinish = async () => {
	if (!task.value) return;
	const result = task.value.status.isFinished
		? await restoreFinishedTask(task.value.id)
		: await finishTask(task.value.id);
	if (result?.success && result.result) task.value = result.result.data;
};
</script>

<style scoped>
.task-description {
	white-space: normal;
}
</style>
