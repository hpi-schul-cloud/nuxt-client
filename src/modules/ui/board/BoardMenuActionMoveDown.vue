<template>
	<BoardMenuAction
		:icon="mdiArrowDown"
		data-testid="board-menu-action-move-down"
	>
		{{ t("components.board.action.moveDown") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiArrowDown } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
