<template>
	<VSheet>
		<h2 data-testid="dashboard-tasks-title">{{ title }}</h2>

		<div class="d-flex flex-column" data-testid="task-courses">
			<VCard
				v-for="task in tasks"
				:key="task.id"
				class="mb-4"
				:style="`border-left: 4px solid ${task.displayColor};`"
				:href="`/homework/${task.id}`"
				@dragstart.prevent
			>
				<VCardText>
					<VIcon size="14" class="mr-1" :icon="mdiFormatListChecks" />
					<span v-if="task.courseId" data-testid="task-course-name"> {{ task.courseName }} | </span>
					<span>{{ task.dueDate ? fromNowUtc(task.dueDate) : t("pages.dashboard.no.due.date") }}</span>

					<div class="d-flex flex-wrap ga-4">
						<h3 class="text-h4 my-1" data-testid="task-name">
							{{ task.name }}
						</h3>
						<div class="d-flex ga-2 mt-2">
							<VChip v-if="task.status?.maxSubmissions" size="small" variant="tonal" data-testid="task-submitted">
								{{ t("pages.room.taskCard.teacher.label.submitted") }} {{ task.status.submitted }}/{{
									task.status?.maxSubmissions
								}}
							</VChip>
							<VChip
								v-if="task.status?.maxSubmissions && task.status.submitted"
								size="small"
								variant="tonal"
								data-testid="task-graded"
							>
								{{ t("pages.room.taskCard.label.graded") }}
								{{ task.status.graded }}/{{ task.status.submitted }}
							</VChip>
							<VChip
								v-if="isTaskOverdue(task)"
								:prepend-icon="mdiClockAlertOutline"
								size="small"
								variant="tonal"
								data-testid="task-overdue"
							>
								{{ t("pages.room.taskCard.teacher.label.overdue") }}
							</VChip>
						</div>
					</div>
				</VCardText>
			</VCard>
		</div>
	</VSheet>
</template>
<script setup lang="ts">
import { fromNowUtc } from "@/utils/date-time.utils";
import { TaskResponse } from "@api-server";
import { isTaskOverdue } from "@data-tasks";
import { mdiClockAlertOutline, mdiFormatListChecks } from "@icons/material";
import { useI18n } from "vue-i18n";

defineProps<{
	title: string;
	tasks: TaskResponse[];
}>();

const { t } = useI18n();
</script>
