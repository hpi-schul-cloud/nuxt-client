<template>
	<KebabMenuAction :icon="mdiExport" data-testid="kebab-menu-action-export">
		{{ t("common.actions.move") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiExport } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
