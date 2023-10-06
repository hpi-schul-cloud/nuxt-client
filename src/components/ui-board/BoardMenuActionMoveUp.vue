<template>
	<BoardMenuAction :icon="mdiArrowCollapseUp" @click="onClick">
		{{ $t("components.board.action.moveUp") }} {{ hasMultipleElements }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowCollapseUp } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { BOARD_CARD_HAS_MULTIPLE_ELEMENTS } from "@util-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionMoveUp",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const hasMultipleElements = injectStrict(BOARD_CARD_HAS_MULTIPLE_ELEMENTS);
		const onClick = ($event: Event) => emit("click", $event);
		return {
			hasMultipleElements,
			onClick,
			mdiArrowCollapseUp,
		};
	},
});
</script>
