<template>
	<BoardMenu
		:scope="BoardMenuScope.COLLABORATIVE_TEXT_EDITOR_ELEMENT"
		has-background
	>
		<BoardMenuActionMoveUp @click="onMoveUp" />
		<BoardMenuActionMoveDown @click="onMoveDown" />
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script lang="ts">
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		BoardMenu,
		BoardMenuActionDelete,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(_, { emit }) {
		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element");
			}
		};

		const onMoveDown = () => emit("move-down:element");

		const onMoveUp = () => emit("move-up:element");

		return {
			onDelete,
			onMoveDown,
			onMoveUp,
		};
	},
});
</script>
