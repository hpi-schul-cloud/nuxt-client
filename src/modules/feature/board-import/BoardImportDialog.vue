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
import {
	BoardImportJobFailureReason,
	BoardImportJobStatus,
	BoardImportNoteResponse,
	BoardImportNoteType,
	BoardImportTargetType,
} from "@api-board-import";
import { useBoardImportJob } from "@data-board-import";
import { ErrorAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	targetType: BoardImportTargetType;
	targetId: string;
}>();

const isOpen = defineModel({ type: Boolean, default: false });

const { t } = useI18n();
const { job, hasError, errorMessages, isStarting, startImport, reset } = useBoardImportJob();

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

// Other reasons are internal and get the general text with the reason code.
const failureReasonKeys: Partial<Record<BoardImportJobFailureReason, string>> = {
	[BoardImportJobFailureReason.SOURCE_NOT_READABLE]: "feature-board-import.dialog.failure.sourceNotReadable",
	[BoardImportJobFailureReason.SOURCE_BOARD_TYPE_NOT_SUPPORTED]:
		"feature-board-import.dialog.failure.sourceBoardTypeNotSupported",
	[BoardImportJobFailureReason.SOURCE_RESPONSE_TOO_LARGE]: "feature-board-import.dialog.failure.sourceTooLarge",
	[BoardImportJobFailureReason.BOARD_API_FORBIDDEN]: "feature-board-import.dialog.failure.forbidden",
	[BoardImportJobFailureReason.MAX_DURATION]: "feature-board-import.dialog.failure.maxDuration",
};

const failureMessage = computed(() => {
	const reason = job.value?.failureReason;
	const key = reason ? failureReasonKeys[reason] : undefined;
	if (key) return t(key);
	if (reason) return t("feature-board-import.dialog.failure.other", { reason });

	return t("feature-board-import.dialog.failure.unknown");
});

const elementKeys: Record<string, string> = {
	link: "components.cardElement.LinkElement",
	file: "components.cardElement.fileElement",
	"video-conference": "components.cardElement.videoConferenceElement",
};

const getElementName = (note: BoardImportNoteResponse): string => {
	const key = note.elementType ? elementKeys[note.elementType] : undefined;
	if (key) return t(key);

	const kind = note.elementKind || note.elementType || "";

	return t("feature-board-import.dialog.notes.element.other", { kind });
};

const getNoteMessage = (note: BoardImportNoteResponse): string => {
	if (note.type === BoardImportNoteType.BOARD_TITLE_SHORTENED) {
		return t("feature-board-import.dialog.notes.boardTitleShortened");
	}
	if (note.type === BoardImportNoteType.BOARD_DESCRIPTION_LEFT_OUT) {
		return t("feature-board-import.dialog.notes.boardDescriptionLeftOut");
	}

	const withoutTitle = t("feature-board-import.dialog.notes.withoutTitle");

	return t("feature-board-import.dialog.notes.elementLeftOut", {
		element: getElementName(note),
		section: note.sectionTitle || withoutTitle,
		card: note.cardTitle || withoutTitle,
	});
};

const noteMessages = computed(() => (job.value?.notes ?? []).map(getNoteMessage));

watch(isOpen, (open) => {
	if (!open) {
		link.value = "";
		reset();
	}
});
</script>
