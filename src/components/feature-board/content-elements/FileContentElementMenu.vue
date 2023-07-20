<template>
	<BoardMenu scope="element">
		<BoardMenuAction
			v-if="hasMultipleElements && !isFirstElement"
			data-testid="board-file-element-edit-menu-move-up"
			@click="onMoveElementUp"
		>
			<VIcon>
				{{ mdiArrowCollapseUp }}
			</VIcon>
			{{ $t("components.board.action.moveUp") }}
		</BoardMenuAction>
		<BoardMenuAction
			v-if="hasMultipleElements && !isLastElement"
			data-testid="board-file-element-edit-menu-move-down"
			@click="onMoveElementDown"
		>
			<VIcon>
				{{ mdiArrowCollapseDown }}
			</VIcon>
			{{ $t("components.board.action.moveDown") }}
		</BoardMenuAction>
		<BoardMenuAction
			v-if="isDownloadAllowed"
			data-testid="board-file-element-edit-menu-download"
			@click="onDownload"
		>
			<VIcon>
				{{ mdiTrayArrowDown }}
			</VIcon>
			{{ $t("components.board.action.download") }}
		</BoardMenuAction>
		<BoardMenuAction
			data-testid="board-file-element-edit-menu-delete"
			@click="onDelete"
		>
			<VIcon>
				{{ mdiTrashCanOutline }}
			</VIcon>
			{{ $t("components.board.action.delete") }}
		</BoardMenuAction>
	</BoardMenu>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";

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
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onDelete,
			onDownload,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
