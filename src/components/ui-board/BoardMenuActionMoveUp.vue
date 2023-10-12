<template>
	<BoardMenuAction :icon="mdiArrowCollapseUp" @click="onClick" v-if="isVisible">
		{{ $t("components.board.action.moveUp") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowCollapseUp } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_FIRST_ELEMENT,
} from "@util-board";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionMoveUp",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(_, { emit }) {
		const hasMultipleElements = injectStrict(BOARD_CARD_HAS_MULTIPLE_ELEMENTS);
		const isFirstElement = injectStrict(BOARD_CARD_IS_FIRST_ELEMENT);
		const isVisible = computed(() => hasMultipleElements && !isFirstElement);

		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiArrowCollapseUp,
			isVisible,
		};
	},
});
</script>
