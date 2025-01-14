<template>
	<KebabMenuAction :icon="mdiRestore" data-testid="board-menu-action-revert">
		{{ t("pages.room.cards.label.revert") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiRestore } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
