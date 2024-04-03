<template>
	<BoardMenuAction
		:icon="mdiArrowUp"
		@click="onClick"
		v-if="isVisible"
		data-testid="board-menu-action-move-up"
	>
		{{ $t("components.board.action.moveUp") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowUp } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_FIRST_ELEMENT,
} from "@util-board";
import { computed, ref } from "vue";

const emit = defineEmits(["click"]);
const hasMultipleElements = ref(injectStrict(BOARD_CARD_HAS_MULTIPLE_ELEMENTS));
const isFirstElement = ref(injectStrict(BOARD_CARD_IS_FIRST_ELEMENT));
const isVisible = computed(
	() => hasMultipleElements.value && !isFirstElement.value
);

const onClick = ($event: Event) => emit("click", $event);
</script>
