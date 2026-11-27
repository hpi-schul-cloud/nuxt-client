<template>
	<SvsDialog
		v-model="isOpen"
		title="feature-board-import.title"
		data-testid="board-import-dialog"
		confirm-btn-lang-key="common.actions.import"
		cancel-btn-lang-key="common.labels.close"
		is-open-state-managed-externally
		:is-loading="isStarting"
		:no-confirm="!!job"
		:confirm-btn-disabled="!trimmedLink || isStarting"
		@confirm="startImport(trimmedLink, targetType, targetId)"
		@cancel="isOpen = false"
	>
		<template #content>
			<VTextField
				v-if="!job"
				v-model="link"
				:label="t('feature-board-import.dialog.link')"
				data-testid="board-import-link"
			/>
			<div v-else class="d-flex flex-column ga-4">
				<div class="d-flex align-center ga-3">
					<span>{{ t("common.labels.status") }}</span>
					<VChip :color="statusColor" variant="flat" size="small" data-testid="board-import-job-status">
						{{ job.status }}
					</VChip>
				</div>
				<VProgressLinear v-if="isPending" indeterminate color="primary" data-testid="board-import-progress" />
				<ErrorAlert v-if="job.status === BoardImportJobStatus.FAILED" data-testid="board-import-failure">
					{{ failureMessage }}
				</ErrorAlert>
				<div v-if="job.status === BoardImportJobStatus.FINISHED" data-testid="board-import-notes">
					<div class="font-weight-bold">{{ t("feature-board-import.dialog.notes.title") }}</div>
					<ul v-if="noteMessages.length" class="pl-6">
						<li v-for="(message, index) in noteMessages" :key="index" data-testid="board-import-note">
							{{ message }}
						</li>
					</ul>
					<div v-else data-testid="board-import-no-notes">{{ t("feature-board-import.dialog.notes.none") }}</div>
				</div>
				<div class="text-caption text-medium-emphasis">
					{{ t("feature-board-import.dialog.jobId") }}:
					<code data-testid="board-import-job-id">{{ job.id }}</code>
				</div>
			</div>
			<ErrorAlert v-if="hasError" class="mt-4" data-testid="board-import-error">
				<template v-if="errorMessages.length">
					<div v-for="(message, index) in errorMessages" :key="index">{{ message }}</div>
				</template>
				<template v-else>{{ t("feature-board-import.dialog.error") }}</template>
			</ErrorAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { useBoardImportMessages } from "./board-import-messages.composable";
import { BoardImportJobStatus, BoardImportTargetType } from "@api-board-import";
import { useBoardImportJob } from "@data-board-import";
import { ErrorAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	targetType: BoardImportTargetType;
	targetId: string;
}>();

const emit = defineEmits<{
	imported: [];
}>();

const isOpen = defineModel({ type: Boolean, default: false });

const { t } = useI18n();
const { job, hasError, errorMessages, isStarting, startImport, reset } = useBoardImportJob();
const { getFailureMessage, getNoteMessage } = useBoardImportMessages();

const link = ref("");
const trimmedLink = computed(() => link.value.trim());

const statusColors: Record<BoardImportJobStatus, string> = {
	[BoardImportJobStatus.WAITING]: "info",
	[BoardImportJobStatus.RUNNING]: "info",
	[BoardImportJobStatus.FINISHED]: "success",
	[BoardImportJobStatus.FAILED]: "error",
};

const statusColor = computed(() => (job.value ? statusColors[job.value.status] : undefined));

const isPending = computed(
	() =>
		!hasError.value &&
		(job.value?.status === BoardImportJobStatus.WAITING || job.value?.status === BoardImportJobStatus.RUNNING)
);

const failureMessage = computed(() => getFailureMessage(job.value?.failureReason));
const noteMessages = computed(() => (job.value?.notes ?? []).map(getNoteMessage));

watch(isOpen, (open) => {
	if (!open) {
		const isImported = job.value?.status === BoardImportJobStatus.FINISHED;
		link.value = "";
		reset();
		if (isImported) emit("imported");
	}
});
</script>
