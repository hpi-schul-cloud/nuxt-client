<template>
	<BoardMenu scope="element">
		<BoardMenuActionMoveUp
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="board-external-tool-element-edit-menu-move-up"
			@click="onMoveElementUp"
		>
		</BoardMenuActionMoveUp>
		<BoardMenuActionMoveDown
			v-if="hasMultipleElements && !isLastElement"
			data-testid="board-external-tool-element-edit-menu-move-down"
			@click="onMoveElementDown"
		>
		</BoardMenuActionMoveDown>
		<BoardMenuAction
			data-testid="board-external-tool-element-edit-menu-edit"
			@click="onEdit"
			:icon="mdiCogOutline"
		>
			{{ $t("common.labels.settings") }}
		</BoardMenuAction>
		<BoardMenuActionDelete
			data-testid="board-external-tool-element-edit-menu-delete"
			@click="onDelete"
		>
		</BoardMenuActionDelete>
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
	BoardMenuAction,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		BoardMenu,
		BoardMenuAction,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
		BoardMenuActionDelete,
	},
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
