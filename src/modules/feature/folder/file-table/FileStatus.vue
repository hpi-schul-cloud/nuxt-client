<template>
	<v-tooltip
		v-if="isScanStatusPending(fileRecord.previewStatus)"
		location="top"
	>
		<template #activator="{ props }">
			<v-icon v-bind="props" data-testid="file-status-scan-pending">
				{{ mdiClockTimeFour }}
			</v-icon>
		</template>
		{{ t("components.cardElement.fileElement.awaitingScan") }}
	</v-tooltip>
	<v-tooltip
		v-if="isScanStatusWontCheck(fileRecord.previewStatus)"
		location="top"
	>
		<template #activator="{ props }">
			<v-icon v-bind="props" data-testid="file-status-scan-wont-check">
				{{ mdiCloseCircle }}
			</v-icon>
		</template>
		{{ t("components.cardElement.fileElement.scanWontCheck") }}
	</v-tooltip>
	<v-tooltip v-if="isScanStatusError(fileRecord.previewStatus)" location="top">
		<template #activator="{ props }">
			<v-icon
				v-bind="props"
				color="warning"
				data-testid="file-status-scan-error"
			>
				{{ mdiAlert }}
			</v-icon>
		</template>
		{{ t("components.cardElement.fileElement.scanError") }}
	</v-tooltip>
	<v-tooltip
		v-if="!isDownloadAllowed(fileRecord.securityCheckStatus)"
		location="top"
	>
		<template #activator="{ props }">
			<v-icon
				v-bind="props"
				color="error"
				data-testid="file-status-scan-virus-detected"
			>
				{{ mdiAlertCircle }}
			</v-icon>
		</template>
		{{ t("components.cardElement.fileElement.virusDetected") }}
	</v-tooltip>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import {
	isDownloadAllowed,
	isScanStatusError,
	isScanStatusPending,
	isScanStatusWontCheck,
} from "@/utils/fileHelper";
import {
	mdiAlert,
	mdiAlertCircle,
	mdiClockTimeFour,
	mdiCloseCircle,
} from "@icons/material";
import { defineProps, PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
	fileRecord: {
		type: Object as PropType<FileRecord>,
		required: true,
	},
});
</script>
