<template>
	<BoardMenu scope="element">
		<BoardMenuAction
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="content-element-menu-move-up"
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
			data-testid="content-element-menu-move-down"
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
			data-testid="content-element-menu-delete"
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
	mdiTrashCanOutline,
} from "@mdi/js";
import { BoardMenu, BoardMenuAction } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		elementId: { type: String, required: true },
		name: { type: String, required: false },
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
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
