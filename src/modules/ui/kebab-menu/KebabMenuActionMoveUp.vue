<template>
	<KebabMenuAction :icon="mdiArrowUp" data-testid="kebab-menu-action-move-up">
		{{ t("components.board.action.moveUp") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiArrowUp } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
