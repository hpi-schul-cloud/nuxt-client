<template>
	<p data-testid="file-status-scan-pending">
		<v-icon>
			{{ mdiClockTimeFour }}
		</v-icon>
		{{ t("components.cardElement.fileElement.awaitingScan") }}
	</p>
	<p data-testid="file-status-scan-wont-check">
		<v-icon>
			{{ mdiCloseCircle }}
		</v-icon>
		{{ t("components.cardElement.fileElement.scanWontCheck") }}
	</p>
	<p data-testid="file-status-scan-error">
		<v-icon color="warning">
			{{ mdiAlert }}
		</v-icon>
		{{ t("components.cardElement.fileElement.scanError") }}
	</p>
	<p data-testid="file-status-scan-virus-detected">
		<v-icon color="error">
			{{ mdiAlertCircle }}
		</v-icon>
		{{ t("components.cardElement.fileElement.virusDetected") }}
	</p>
</template>

<script setup lang="ts">
import {
	mdiAlert,
	mdiAlertCircle,
	mdiClockTimeFour,
	mdiCloseCircle,
} from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
