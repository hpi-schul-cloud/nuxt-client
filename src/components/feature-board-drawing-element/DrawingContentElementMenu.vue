<template>
	<BoardMenu scope="element">
		<BoardMenuActionMoveUp @click="onMoveElementUp" />
		<BoardMenuActionMoveDown @click="onMoveElementDown" />
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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

export default defineComponent({
	name: "DrawingContentElementMenu",
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
		"open:element",
	],
	setup(_, { emit }) {
		const onEdit = () => {
			emit("edit:element");
		};
		const onOpenElement = () => {
			emit("open:element");
		};
		const onDelete = () => {
			emit("delete:element");
		};
		const onMoveElementDown = () => {
			emit("move-down:element");
		};
		const onMoveElementUp = () => {
			emit("move-up:element");
		};
		return {
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiCogOutline,
			onEdit,
			onOpenElement,
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
