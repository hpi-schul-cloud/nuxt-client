<template>
	<div class="d-flex flex-row flex-wrap" style="gap: 6px">
		<template v-if="!isTaskDraft(task)">
			<InfoChip
				v-if="task.status?.graded > 0 && task.status?.submitted > 0 && task.status?.graded === task.status?.submitted"
				:icon="mdiCheckCircleOutline"
				size="small"
				variant="tonal"
				data-testid="task-done-teacher"
			>
				{{ t("pages.room.taskCard.student.label.submitted") }}
			</InfoChip>

			<InfoChip v-if="task.status?.maxSubmissions" size="small" variant="tonal" data-testid="task-submitted-teacher">
				{{ task.status.submitted }}/{{ task.status?.maxSubmissions }}
				{{ t("pages.room.taskCard.teacher.label.submitted") }}
			</InfoChip>

			<InfoChip v-if="task.status.submitted > 0" size="small" variant="tonal" data-testid="task-graded-teacher">
				{{ task.status.graded }}/{{ task.status.submitted }}
				{{ t("pages.room.taskCard.label.graded") }}
			</InfoChip>
		</template>

		<WarningChip
			v-if="isTaskOverdue(task)"
			:prepend-icon="mdiClockAlertOutline"
			size="small"
			variant="tonal"
			data-testid="task-overdue-teacher"
		>
			{{ t("pages.room.taskCard.teacher.label.overdue") }}
		</WarningChip>

		<WarningChip v-if="isUnpublishedLesson" data-testid="task-lesson-chip-large">
			{{ t("components.molecules.TaskItemTeacher.lessonIsNotPublished") }}
		</WarningChip>
	</div>
</template>

<script setup lang="ts">
import { TaskResponse } from "@api-server";
import { isTaskDraft, isTaskOverdue, isTaskUnpublished } from "@data-tasks";
import { mdiCheckCircleOutline, mdiClockAlertOutline } from "@icons/material";
import { InfoChip, WarningChip } from "@ui-chip";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{ task: TaskResponse }>();

const { t } = useI18n();

const isUnpublishedLesson = computed(() => isTaskUnpublished(props.task));
</script>

<style scoped lang="scss"></style>
