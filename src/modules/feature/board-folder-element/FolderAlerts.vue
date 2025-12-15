<template>
	<div>
		<WarningAlert v-if="alerts.includes(FolderAlert.FILE_STORAGE_ERROR)">
			{{ t("Infos zum Dateiordner sind gerade nicht verfügbar. Lade den Bereich neu.") }}
		</WarningAlert>
	</div>
</template>

<script setup lang="ts">
import { FolderAlert } from "./FolderAlert.enum";
import { WarningAlert } from "@ui-alert";
import { useI18n } from "vue-i18n";

type Props = {
	alerts: FolderAlert[];
};

defineProps<Props>();

const { t } = useI18n();
</script>
