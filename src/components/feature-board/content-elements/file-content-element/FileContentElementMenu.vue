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
			v-if="isDownloadAllowed"
			data-testid="board-file-element-edit-menu-download"
			@click="onDownload"
		>
			<template #icon>
				<VIcon> $mdiTrayArrowDown </VIcon>
			</template>
			{{ $t("components.board.action.download") }}
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
import { downloadFile } from "@/utils/fileHelper";
import BoardMenu from "@boardShared/BoardMenu.vue";
import BoardMenuAction from "@boardShared/BoardMenuAction.vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		fileName: { type: String, required: true },
		isDownloadAllowed: { type: Boolean, required: true },
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
		const onDownload = async () => {
			await downloadFile(props.url, props.fileName);
		};
		const onMoveElementDown = () => {
			emit("move-down:element");
		};
		const onMoveElementUp = () => {
			emit("move-up:element");
		};
		return {
			onDelete,
			onDownload,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
