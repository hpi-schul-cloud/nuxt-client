<template>
	<BoardMenu scope="element">
		<BoardMenuActionMoveUp @click="onMoveUp" />
		<BoardMenuActionMoveDown @click="onMoveDown" />
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script lang="ts">
import {
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiCogOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
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
	emits: [
		"edit:element",
		"delete:element",
		"move-down:element",
		"move-up:element",
	],
	setup(_, { emit }) {
		const onEdit = () => emit("edit:element");

		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element");
			}
		};

		const onMoveDown = () => emit("move-down:element");

		const onMoveUp = () => emit("move-up:element");

		return {
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiCogOutline,
			onEdit,
			onDelete,
			onMoveDown,
			onMoveUp,
		};
	},
});
</script>
