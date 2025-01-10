<template>
	<BoardMenuAction
		:icon="mdiArrowUp"
		data-testid="board-menu-action-move-up"
		@click="onClick"
	>
		{{ t("components.board.action.moveUp") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiArrowUp } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
