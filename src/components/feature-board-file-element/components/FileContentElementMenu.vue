<template>
	<BoardMenu scope="element">
		<BoardMenuAction
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="board-file-element-edit-menu-move-up"
			@click="onMoveElementUp"
		>
			<template #icon>
				<VIcon> $mdiArrowCollapseUp </VIcon>
			</template>
			{{ $t("components.board.action.moveUp") }}
		</BoardMenuAction>
		<BoardMenuAction
			v-if="hasMultipleElements && !isLastElement"
			data-testid="board-file-element-edit-menu-move-down"
			@click="onMoveElementDown"
		>
			<template #icon>
				<VIcon> $mdiArrowCollapseDown </VIcon>
			</template>
			{{ $t("components.board.action.moveDown") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-file-element-edit-menu-delete"
			@click="onDelete"
		>
			<template #icon>
				<VIcon> $mdiTrashCanOutline </VIcon>
			</template>
			{{ $t("components.board.action.delete") }}
		</BoardMenuAction>
	</BoardMenu>
</template>

<script lang="ts">
import { BoardMenu, BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		fileName: { type: String, required: true },
		url: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(props, { emit }) {
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
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
