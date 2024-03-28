<template>
	<BoardMenuAction
		:icon="mdiArrowRight"
		@click="onClick"
		v-if="isVisible"
		data-testid="board-menu-action-move-right"
	>
		{{ $t("components.board.action.moveRight") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowRight } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_LAST_COLUMN } from "@util-board";
import { computed, ref } from "vue";

const emit = defineEmits(["click"]);
const hasMultipleColumns = ref(injectStrict(BOARD_HAS_MULTIPLE_COLUMNS));
const isLastColumn = ref(injectStrict(BOARD_IS_LAST_COLUMN));
const isVisible = computed(
	() => hasMultipleColumns.value && !isLastColumn.value
);

const onClick = ($event: Event) => emit("click", $event);
</script>
