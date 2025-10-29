<template>
	<InfoChip v-if="isScanStatusPending" class="ms-2" :icon="mdiClockTimeFour" data-testid="file-status-scan-pending">
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.awaitingScan.short") }}
	</InfoChip>
	<WarningChip
		v-if="isScanStatusWontCheck"
		class="ms-2"
		:icon="mdiEyeOffOutline"
		data-testid="file-status-scan-wont-check"
	>
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.scanWontCheck.short") }}
	</WarningChip>
	<WarningChip v-if="isScanStatusError" class="ms-2" :icon="mdiEyeOffOutline" data-testid="file-status-scan-error">
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.scanError.short") }}
	</WarningChip>
	<ErrorChip
		v-if="isScanStatusBlocked"
		class="ms-2"
		:prepend-icon="mdiAlertCircle"
		data-testid="file-status-scan-virus-detected"
	>
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.virusDetected.short") }}
	</ErrorChip>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import {
	isScanStatusBlocked as isScanStatusBlockedFn,
	isScanStatusError as isScanStatusErrorFn,
	isScanStatusPending as isScanStatusPendingFn,
	isScanStatusWontCheck as isScanStatusWontCheckFn,
} from "@/utils/fileHelper";
import { mdiAlertCircle, mdiClockTimeFour, mdiEyeOffOutline } from "@icons/material";
import { ErrorChip, InfoChip, WarningChip } from "@ui-chip";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
	fileRecord: {
		type: Object as PropType<FileRecord>,
		required: true,
	},
});

const isScanStatusPending = computed(() => isScanStatusPendingFn(props.fileRecord.previewStatus));
const isScanStatusWontCheck = computed(() => isScanStatusWontCheckFn(props.fileRecord.previewStatus));
const isScanStatusError = computed(() => isScanStatusErrorFn(props.fileRecord.previewStatus));
const isScanStatusBlocked = computed(() => isScanStatusBlockedFn(props.fileRecord.securityCheckStatus));
</script>
