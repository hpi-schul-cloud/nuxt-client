<template>
	<BoardMenuAction
		v-if="isVisible"
		:icon="mdiArrowDown"
		data-testid="board-menu-action-move-down"
		@click="onClick"
	>
		{{ $t("components.board.action.moveDown") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowDown } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_LAST_ELEMENT,
} from "@util-board";
import { computed, ref } from "vue";

const emit = defineEmits(["click"]);

const hasMultipleElements = ref(injectStrict(BOARD_CARD_HAS_MULTIPLE_ELEMENTS));
const isLastElement = ref(injectStrict(BOARD_CARD_IS_LAST_ELEMENT));
const isVisible = computed(
	() => hasMultipleElements.value && !isLastElement.value
);

const onClick = ($event: Event) => emit("click", $event);
</script>
