<template>
	<BoardMenuAction
		:icon="mdiArrowDown"
		data-testid="board-menu-action-move-down"
		@click="onClick"
	>
		{{ t("components.board.action.moveDown") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiArrowDown } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["click"]);
const onClick = ($event: Event) => emit("click", $event);
</script>
