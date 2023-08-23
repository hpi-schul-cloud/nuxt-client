<template>
	<BoardMenu scope="element">
		<BoardMenuAction
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="board-submission-element-edit-menu-move-up"
			@click="onMoveElementUp"
		>
			<template #icon>
				<VIcon> $mdiArrowCollapseUp </VIcon>
			</template>

			{{ $t("components.board.action.moveUp") }}
		</BoardMenuAction>
		<BoardMenuAction
			v-if="hasMultipleElements && !isLastElement"
			data-testid="board-submission-element-edit-menu-move-down"
			@click="onMoveElementDown"
		>
			<template #icon>
				<VIcon> $mdiArrowCollapseDown </VIcon>
			</template>
			{{ $t("components.board.action.moveDown") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-submission-element-edit-menu-delete"
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
import { defineComponent } from "vue";
import { BoardMenu, BoardMenuAction } from "@ui-board";

export default defineComponent({
	name: "SubmissionContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(_, { emit }) {
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
