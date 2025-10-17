<template>
	<p data-testid="legend-file-status-scan-pending">
		<v-icon>
			{{ mdiClockTimeFour }}
		</v-icon>
		{{ t("common.file.awaitingScan") }}
	</p>
	<p data-testid="legend-file-status-scan-wont-check">
		<v-icon>
			{{ mdiImageOff }}
		</v-icon>
		{{ t("common.file.scanWontCheck") }}
	</p>
	<p data-testid="legend-file-status-scan-error">
		<v-icon color="warning">
			{{ mdiAlert }}
		</v-icon>
		{{ t("common.file.scanError") }}
	</p>
	<p data-testid="legend-file-status-scan-virus-detected">
		<v-icon color="error">
			{{ mdiAlertCircle }}
		</v-icon>
		{{ t("common.file.virusDetected") }}
	</p>
</template>

<script setup lang="ts">
import { mdiAlert, mdiAlertCircle, mdiClockTimeFour, mdiImageOff } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
