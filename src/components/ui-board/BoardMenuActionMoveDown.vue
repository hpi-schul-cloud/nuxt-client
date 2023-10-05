<template>
	<BoardMenuAction :icon="mdiArrowCollapseDown" @click="onClick">
		{{ $t("components.board.action.moveDown") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { mdiArrowCollapseDown } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionMoveDown",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);
		return {
			onClick,
			mdiArrowCollapseDown,
		};
	},
});
</script>
