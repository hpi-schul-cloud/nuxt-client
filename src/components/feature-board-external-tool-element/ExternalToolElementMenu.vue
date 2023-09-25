<template>
	<BoardMenu scope="element">
		<BoardMenuAction
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="board-external-tool-element-edit-menu-move-up"
			@click="onMoveElementUp"
		>
			<template #icon>
				<VIcon>
					{{ mdiArrowCollapseUp }}
				</VIcon>
			</template>

			{{ $t("components.board.action.moveUp") }}
		</BoardMenuAction>
		<BoardMenuAction
			v-if="hasMultipleElements && !isLastElement"
			data-testid="board-external-tool-element-edit-menu-move-down"
			@click="onMoveElementDown"
		>
			<template #icon>
				<VIcon>
					{{ mdiArrowCollapseDown }}
				</VIcon>
			</template>
			{{ $t("components.board.action.moveDown") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-external-tool-element-edit-menu-edit"
			@click="onEdit"
		>
			<template #icon>
				<VIcon>
					{{ mdiCogOutline }}
				</VIcon>
			</template>
			{{ $t("common.labels.settings") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-external-tool-element-edit-menu-delete"
			@click="onDelete"
		>
			<template #icon>
				<VIcon>
					{{ mdiTrashCanOutline }}
				</VIcon>
			</template>
			{{ $t("components.board.action.delete") }}
		</BoardMenuAction>
	</BoardMenu>
</template>

<script lang="ts">
import {
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiCogOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import { BoardMenu, BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	components: { BoardMenu, BoardMenuAction },
	props: {
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"edit:element",
		"delete:element",
		"move-down:element",
		"move-up:element",
	],
	setup(_, { emit }) {
		const onEdit = () => {
			emit("edit:element");
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
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
