<template>
	<VChip
		v-if="isScanStatusPending(fileRecord.previewStatus)"
		color="info"
		class="ms-2"
		:prepend-icon="mdiClockTimeFour"
		data-testid="file-status-scan-pending"
	>
		{{ t("common.file.awaitingScan") }}
	</VChip>
	<v-tooltip v-if="isScanStatusWontCheck(fileRecord.previewStatus)" location="top">
		<template #activator="{ props }">
			<v-icon v-bind="props" data-testid="file-status-scan-wont-check">
				{{ mdiImageOff }}
			</v-icon>
		</template>
		{{ t("common.file.scanWontCheck") }}
	</v-tooltip>
	<v-tooltip v-if="isScanStatusError(fileRecord.previewStatus)" location="top">
		<template #activator="{ props }">
			<v-icon v-bind="props" color="warning" data-testid="file-status-scan-error">
				{{ mdiAlert }}
			</v-icon>
		</template>
		{{ t("common.file.scanError") }}
	</v-tooltip>
	<VChip
		v-if="!isScanStatusBlocked(fileRecord.securityCheckStatus)"
		color="error"
		class="ms-2"
		:prepend-icon="mdiAlertCircle"
		data-testid="file-status-scan-virus-detected"
	>
		{{ t("common.file.virusDetected") }}
	</VChip>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { isScanStatusBlocked, isScanStatusError, isScanStatusPending, isScanStatusWontCheck } from "@/utils/fileHelper";
import { mdiAlert, mdiAlertCircle, mdiClockTimeFour, mdiImageOff } from "@icons/material";
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
