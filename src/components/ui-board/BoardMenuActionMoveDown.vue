<template>
	<BoardMenuAction :icon="mdiArrowDown" @click="onClick" v-if="isVisible">
		{{ $t("components.board.action.moveDown") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowDown } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_LAST_ELEMENT,
} from "@util-board";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
	name: "BoardMenuActionMoveDown",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const hasMultipleElements = ref(
			injectStrict(BOARD_CARD_HAS_MULTIPLE_ELEMENTS)
		);
		const isLastElement = ref(injectStrict(BOARD_CARD_IS_LAST_ELEMENT));
		const isVisible = computed(
			() => hasMultipleElements.value && !isLastElement.value
		);

		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiArrowDown,
			isVisible,
		};
	},
});
</script>
