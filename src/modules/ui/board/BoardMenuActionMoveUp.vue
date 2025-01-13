<template>
	<BoardMenuAction :icon="mdiArrowUp" data-testid="board-menu-action-move-up">
		{{ t("components.board.action.moveUp") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiArrowUp } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
