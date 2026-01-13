<template>
	<WarningAlert v-if="alerts.includes(FolderAlert.FILE_STORAGE_ERROR)">
		{{ t("components.cardElement.folderElement.storage.error") }}
	</WarningAlert>
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
