<template>
	<VChip
		v-if="isScanStatusPending(fileRecord.previewStatus)"
		color="info"
		class="ms-2"
		:prepend-icon="mdiClockTimeFour"
		data-testid="file-status-scan-pending"
	>
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.awaitingScan.short") }}
	</VChip>
	<VChip
		v-if="isScanStatusWontCheck(fileRecord.previewStatus)"
		color="warning"
		class="ms-2"
		:prepend-icon="mdiEyeOffOutline"
		data-testid="file-status-scan-wont-check"
	>
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.scanWontCheck.short") }}
	</VChip>
	<VChip
		v-if="isScanStatusError(fileRecord.previewStatus)"
		color="warning"
		class="ms-2"
		:prepend-icon="mdiEyeOffOutline"
		data-testid="file-status-scan-error"
	>
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.scanError.short") }}
	</VChip>
	<VChip
		v-if="!isScanStatusBlocked(fileRecord.securityCheckStatus)"
		color="error"
		class="ms-2"
		:prepend-icon="mdiAlertCircle"
		data-testid="file-status-scan-virus-detected"
	>
		<span class="d-sr-only">{{ t("common.labels.status") }}</span>
		{{ t("common.file.virusDetected.short") }}
	</VChip>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { isScanStatusBlocked, isScanStatusError, isScanStatusPending, isScanStatusWontCheck } from "@/utils/fileHelper";
import { mdiAlertCircle, mdiClockTimeFour, mdiEyeOffOutline } from "@icons/material";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
	fileRecord: {
		type: Object as PropType<FileRecord>,
		required: true,
	},
});
</script>
