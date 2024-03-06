<template>
	<BoardMenuAction
		:icon="mdiPencilOutline"
		@click="onClick"
		dataTestId="board-menu-action-edit"
	>
		{{ $t("common.actions.edit") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { mdiPencilOutline } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionEdit",
	props: {
		name: { type: String, required: false },
		skipDeleteConfirmation: { type: Boolean, default: () => false },
	},
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiPencilOutline,
		};
	},
});
</script>
