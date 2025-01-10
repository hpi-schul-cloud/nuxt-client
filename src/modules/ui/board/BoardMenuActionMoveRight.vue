<template>
	<BoardMenuAction
		:icon="mdiArrowRight"
		data-testid="board-menu-action-move-right"
		@click="onClick"
	>
		{{ t("components.board.action.moveRight") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiArrowRight } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
