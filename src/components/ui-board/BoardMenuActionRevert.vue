<template>
	<BoardMenuAction
		:icon="mdiRestore"
		@click="onClick"
		data-testid="board-menu-action-revert"
	>
		{{ $t("pages.room.cards.label.revert") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { mdiRestore } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionRevert",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(_, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiRestore,
		};
	},
});
</script>
