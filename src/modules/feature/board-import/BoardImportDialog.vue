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
		:confirm-btn-disabled="!link || isStarting"
		@confirm="startImport(link, targetType, targetId)"
		@cancel="onClose"
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
				<div class="text-caption text-medium-emphasis">
					{{ t("feature-board-import.dialog.jobId") }}:
					<code data-testid="board-import-job-id">{{ job.id }}</code>
				</div>
			</div>
			<ErrorAlert v-if="hasError" class="mt-4" data-testid="board-import-error">
				{{ t("feature-board-import.dialog.error") }}
			</ErrorAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { BoardImportJobStatus, BoardImportTargetType } from "@api-board-import";
import { useBoardImportJob } from "@data-board-import";
import { ErrorAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	targetType: BoardImportTargetType;
	targetId: string;
}>();

const isOpen = defineModel({ type: Boolean, default: false });

const { t } = useI18n();
const { job, hasError, isStarting, startImport, reset } = useBoardImportJob();

const link = ref("");

const statusColors: Record<BoardImportJobStatus, string> = {
	[BoardImportJobStatus.WAITING]: "info",
	[BoardImportJobStatus.RUNNING]: "info",
	[BoardImportJobStatus.FINISHED]: "success",
	[BoardImportJobStatus.FAILED]: "error",
};

const statusColor = computed(() => (job.value ? statusColors[job.value.status] : undefined));

const isPending = computed(
	() => job.value?.status === BoardImportJobStatus.WAITING || job.value?.status === BoardImportJobStatus.RUNNING
);

const onClose = () => {
	isOpen.value = false;
	link.value = "";
	reset();
};
</script>
