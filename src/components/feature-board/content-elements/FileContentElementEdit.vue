<template>
	<div
		ref="fileContentElement"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
		class="d-flex align-stretch rounded-t-sm"
		data-testid="board-file-element-edit"
	>
		<v-list
			flat
			class="flex-grow-1 flex-shrink-0 grey lighten-3 px-0 py-0 rounded-tl-sm"
			max-width="calc(100% - 44px)"
		>
			<v-list-item class="pr-2">
				<v-list-item-icon class="my-2 mr-2">
					<v-icon
						class="deco-icon--text"
						data-testid="board-file-element-edit-file-icon"
						large
						>{{ mdiFileDocumentOutline }}</v-icon
					>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title data-testid="board-file-element-edit-file-name">{{
						fileName
					}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<div
			class="d-flex flex-grow-0 flex-shrink-0 align-center grey lighten-3 pr-2 rounded-tr-sm"
		>
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
					v-if="!isBlocked"
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
		</div>
	</div>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import {
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent, ref } from "vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { BoardMenu, BoardMenuAction },
	props: {
		fileId: {
			type: String,
			required: true,
		},
		fileName: {
			type: String,
			required: true,
		},
		isBlocked: {
			type: Boolean,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"update:caption",
		"move-down:element",
		"move-up:element",
		"move-keyboard:element",
	],
	setup(props, { emit }) {
		const fileContentElement = ref(undefined);
		useBoardFocusHandler(props.fileId, fileContentElement);
		const onKeydownArrow = (event: KeyboardEvent) => {
			event.preventDefault();
			emit("move-keyboard:element", event);
		};

		const onMoveElementDown = async () => {
			emit("move-down:element");
		};

		const onMoveElementUp = async () => {
			emit("move-up:element");
		};

		const onDelete = () => {
			emit("delete:element");
		};
		const onDownload = async () => {
			await downloadFile(props.url, props.fileName);
		};

		return {
			fileContentElement,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onKeydownArrow,
			onMoveElementDown,
			onMoveElementUp,
			onDelete,
			onDownload,
		};
	},
});
</script>
