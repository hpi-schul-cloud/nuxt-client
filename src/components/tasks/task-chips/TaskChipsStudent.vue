<template>
	<div class="d-flex flex-row flex-wrap" style="gap: 6px">
		<ChipTimeRemaining v-if="isDueSoon" type="warning" :due-date="task.dueDate!" />

		<InfoChip
			v-if="task.status?.submitted"
			:icon="mdiCheckCircleOutline"
			size="small"
			variant="tonal"
			data-testid="task-submitted-student"
		>
			{{ t("pages.room.taskCard.student.label.submitted") }}
		</InfoChip>
		<InfoChip
			v-if="task.status?.graded"
			:icon="mdiTextBoxCheckOutline"
			size="small"
			variant="tonal"
			data-testid="task-graded-student"
		>
			{{ t("pages.room.taskCard.label.graded") }}
		</InfoChip>

		<WarningChip
			v-if="isMissingSubmission"
			:icon="mdiClockAlertOutline"
			size="small"
			variant="tonal"
			data-testid="task-overdue-student"
		>
			{{ t("pages.room.taskCard.student.label.overdue") }}
		</WarningChip>
	</div>
</template>

<script setup lang="ts">
import { isDueWithin24h } from "@/utils/date-time.utils";
import { TaskResponse } from "@api-server";
import { isTaskOverdue } from "@data-tasks";
import { mdiCheckCircleOutline, mdiClockAlertOutline, mdiTextBoxCheckOutline } from "@icons/material";
import { ChipTimeRemaining, InfoChip, WarningChip } from "@ui-chip";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{ task: TaskResponse }>();

const { t } = useI18n();

const isSubmitted = computed(() => props.task.status?.submitted);
const isDueSoon = computed(() => props.task.dueDate && !isSubmitted.value && isDueWithin24h(props.task.dueDate));
const isMissingSubmission = computed(() => isTaskOverdue(props.task) && !isSubmitted.value);
</script>

<style scoped lang="scss"></style>
