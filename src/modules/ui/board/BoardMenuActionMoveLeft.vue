<template>
	<BoardMenuAction
		:icon="mdiArrowLeft"
		data-testid="board-menu-action-move-left"
		@click="onClick"
	>
		{{ t("components.board.action.moveLeft") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
