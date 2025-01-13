<template>
	<KebabMenuAction
		:icon="mdiArrowRight"
		data-testid="board-menu-action-move-right"
	>
		{{ t("components.board.action.moveRight") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { KebabMenuAction } from "@ui-board";
import { mdiArrowRight } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
