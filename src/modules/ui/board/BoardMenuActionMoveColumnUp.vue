<template>
	<BoardMenuAction
		:icon="mdiArrowUp"
		@click="onClick"
		v-if="isVisible"
		data-testid="board-menu-action-move-column-up"
	>
		{{ $t("components.board.action.moveUp") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowUp } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_FIRST_COLUMN } from "@util-board";
import { computed, ref } from "vue";

const emit = defineEmits(["click"]);
const hasMultipleColumns = ref(injectStrict(BOARD_HAS_MULTIPLE_COLUMNS));
const isFirstColumn = ref(injectStrict(BOARD_IS_FIRST_COLUMN));
const isVisible = computed(
	() => hasMultipleColumns.value && !isFirstColumn.value
);

const onClick = ($event: Event) => emit("click", $event);
</script>
