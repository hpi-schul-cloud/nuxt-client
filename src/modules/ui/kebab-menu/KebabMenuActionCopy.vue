<template>
	<KebabMenuAction :icon="mdiContentCopy" data-testid="board-menu-action-copy">
		{{ t("common.actions.copy") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiContentCopy } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
