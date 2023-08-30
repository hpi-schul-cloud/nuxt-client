<template>
	<BoardMenu scope="element">
		<BoardMenuAction
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="board-drawing-element-edit-menu-move-up"
			@click="onMoveElementUp"
		>
			<template #icon>
				<VIcon>$mdiArrowCollapseUp</VIcon>
			</template>
			{{ $t("components.board.action.moveUp") }}
		</BoardMenuAction>
		<BoardMenuAction
			v-if="hasMultipleElements && !isLastElement"
			data-testid="board-drawing-element-edit-menu-move-down"
			@click="onMoveElementDown"
		>
			<template #icon>
				<VIcon>$mdiArrowCollapseDown</VIcon>
			</template>
			{{ $t("components.board.action.moveDown") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-drawing-element-edit-menu-delete"
			@click="onDelete"
		>
			<template #icon>
				<VIcon>$mdiTrashCanOutline</VIcon>
			</template>
			{{ $t("components.board.action.delete") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-drawing-element-edit-menu-open"
			@click="onOpenElement"
		>
			<template #icon>
				<VIcon>$mdiOpenInNew</VIcon>
			</template>
			{{ $t("components.board.action.open") }}
		</BoardMenuAction>
	</BoardMenu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BoardMenu, BoardMenuAction } from "@ui-board";

export default defineComponent({
	name: "DrawingContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		elementId: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"open:element",
	],
	setup(_, { emit }) {
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
			onOpenElement,
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
