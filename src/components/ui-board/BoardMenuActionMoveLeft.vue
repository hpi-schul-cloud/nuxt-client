<template>
	<BoardMenuAction
		:icon="mdiArrowLeft"
		@click="onClick"
		v-if="isVisible"
		data-testid="board-menu-action-move-left"
	>
		{{ $t("components.board.action.moveLeft") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiArrowLeft } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_FIRST_COLUMN } from "@util-board";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
	name: "BoardMenuActionMoveLeft",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(_, { emit }) {
		const hasMultipleColumns = ref(injectStrict(BOARD_HAS_MULTIPLE_COLUMNS));
		const isFirstColumn = ref(injectStrict(BOARD_IS_FIRST_COLUMN));
		const isVisible = computed(
			() => hasMultipleColumns.value && !isFirstColumn.value
		);

		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiArrowLeft,
			isVisible,
		};
	},
});
</script>
