<template>
	<BoardMenuAction :icon="mdiArrowCollapseUp" @click="onClick">
		{{ $t("components.board.action.moveUp") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { mdiArrowCollapseUp } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionMoveUp",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);
		return {
			onClick,
			mdiArrowCollapseUp,
		};
	},
});
</script>
