<template>
	<BoardMenuAction
		:icon="mdiEyeOutline"
		@click="onClick"
		data-testid="board-menu-action-publish"
	>
		{{ $t("common.action.publish") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { mdiEyeOutline } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionPublish",
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(_, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiEyeOutline,
		};
	},
});
</script>
