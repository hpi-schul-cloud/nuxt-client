<template>
	<KebabMenuAction :icon="mdiArrowLeft" data-testid="kebab-menu-action-move-left">
		{{ t("components.board.action.moveLeft") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiArrowLeft } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
