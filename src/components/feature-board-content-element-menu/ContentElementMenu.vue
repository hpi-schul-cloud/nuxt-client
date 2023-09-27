<template>
	<div class="menu">
		<BoardMenu scope="element">
			<BoardMenuAction
				v-if="hasMultipleElements && !isFirstElement"
				data-testid="board-file-element-edit-menu-move-up"
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
				data-testid="board-file-element-edit-menu-move-down"
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
				data-testid="board-file-element-edit-menu-delete"
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
	</div>
</template>

<script lang="ts">
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { BoardMenu, BoardMenuAction } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		elementId: { type: String, required: true },
		name: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(props, { emit }) {
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const onDelete = async (): Promise<void> => {
			const shouldDelete = await askDeleteConfirmation(
				props.name,
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", props.elementId);
			}
		};
		const onMoveElementDown = () => {
			emit("move-down:element");
		};
		const onMoveElementUp = () => {
			emit("move-up:element");
		};
		return {
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>

<style scoped>
.menu {
	position: absolute;
	top: 8px;
	right: 16px;
}
</style>
