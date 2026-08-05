<template>
	<DefaultWireframe :breadcrumbs="breadcrumbs" max-width="limited">
		<template #header>
			<div class="task-page-header">
				<h1>{{ task?.name ?? t('common.words.task') }}</h1>
				<VChip
					v-if="task"
					class="task-status-chip"
					:color="task.status.isDraft ? 'warning' : 'success'"
					variant="tonal"
				>
					{{ task.status.isDraft ? 'Draft' : 'Published' }}
				</VChip>
				<KebabMenu v-if="task" :aria-label="t('common.words.task')" data-testid="task-menu">
					<VListItem
						v-if="canManage"
						:prepend-icon="mdiFormatListChecks"
						:title="t('pages.tasks.submissions')"
						:href="`/homework/${task.id}?tab=submissions#activetabid=submissions`"
						data-testid="task-submissions"
						role="menuitem"
					/>
					<VListItem
						v-if="canEdit"
						:prepend-icon="mdiPencilOutline"
						:title="t('common.actions.edit')"
						:href="`/tasks/${task.id}/edit`"
						data-testid="task-edit"
						role="menuitem"
					/>
					<VListItem
						v-if="canManage"
						:prepend-icon="mdiTrashCanOutline"
						:title="t('common.actions.delete')"
						:disabled="isMutating"
						data-testid="task-delete"
						role="menuitem"
						@click="onDelete"
					/>
					<VListItem
						v-if="canFinish"
						:prepend-icon="task.status.isFinished ? mdiUndoVariant : mdiArchiveOutline"
						:title="task.status.isFinished ? t('common.labels.restore') : t('components.molecules.TaskItemMenu.finish')"
						:disabled="isMutating"
						data-testid="task-finish"
						role="menuitem"
						@click="onFinish"
					/>
				</KebabMenu>
			</div>
		</template>
		<SvsLoading :loading-state="loadingState">
			<template #default>
				<div v-if="task" class="task-detail d-flex flex-column ga-5">
					<VCard v-if="task.description" class="task-description-card" elevation="1">
						<VCardTitle>Task definition</VCardTitle>
						<VCardText v-dompurify-html="task.description.content" class="task-description" />
					</VCard>

					<VCard class="task-schedule-card" elevation="1">
						<VCardTitle>Schedule</VCardTitle>
						<VCardText class="d-flex flex-wrap ga-2">
							<VChip v-if="task.availableDate">{{ formatDate(task.availableDate) }}</VChip>
							<VChip v-if="task.dueDate">{{ t('pages.tasks.labels.due') }} {{ formatDate(task.dueDate) }}</VChip>
						</VCardText>
					</VCard>

					<VCard class="task-attachments-card" elevation="1">
						<VCardTitle>Attachments</VCardTitle>
						<VCardText>
							<TaskFiles :task-id="task.id" />
						</VCardText>
					</VCard>

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
import { mdiArchiveOutline, mdiFormatListChecks, mdiPencilOutline, mdiTrashCanOutline, mdiUndoVariant } from "@icons/material";
import { KebabMenu } from "@ui-kebab-menu";

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
	...(task.value?.courseName
		? [{ title: task.value.courseName, to: `/courses/${task.value.courseId}` }]
		: []),
	...(task.value?.lessonName ? [{ title: task.value.lessonName, disabled: true }] : []),
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
.task-detail :deep(.v-card-title) {
	font-size: 1.1rem;
	font-weight: 600;
	padding-bottom: 0;
}

.task-detail {
	display: grid !important;
	grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
	gap: 20px;
}

.task-attachments-card {
	grid-column: 1 / -1;
}

.task-page-header {
	display: flex;
	align-items: center;
	gap: 12px;
	padding-bottom: 16px;
}

.task-page-header h1 {
	margin-bottom: 0 !important;
}

.task-status-chip {
	margin-bottom: 0;
}

.task-description-card {
	grid-column: 1;
}

.task-schedule-card {
	grid-column: 2;
}

.task-attachments-card :deep(.v-card-text) {
	padding: 0 16px 16px;
}

.task-attachments-card :deep(.mt-2) {
	margin-top: 0 !important;
}

.task-attachments-card :deep(.table-title-header) {
	min-height: 0 !important;
	margin-bottom: 0 !important;
	padding-top: 0 !important;
	padding-bottom: 0 !important;
}

.task-description {
	white-space: normal;
	line-height: 1.6;
}

@media (max-width: 900px) {
	.task-detail {
		display: flex !important;
		flex-direction: column;
	}
}
</style>
