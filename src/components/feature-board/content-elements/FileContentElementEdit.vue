<template>
	<v-list-item
		class="grey lighten-3 px-2 rounded-t-sm"
		data-testid="board-file-element-edit"
		inactive
		ref="fileContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<v-list-item-icon class="my-2 mr-2">
			<v-icon
				class="grey--text"
				data-testid="board-file-element-edit-file-icon"
				large
				>{{ mdiFileDocumentOutline }}</v-icon
			>
		</v-list-item-icon>

		<v-list-item-content>
			<span
				class="subtitle-1 d-inline-block text-truncate"
				data-testid="board-file-element-edit-file-name"
				>{{ fileName }}</span
			>
		</v-list-item-content>

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
				v-if="!isBlocked"
				data-testid="board-file-element-edit-menu-download"
				@click="onDownload"
			>
				<template #icon>
					<VIcon>
						{{ mdiTrayArrowDown }}
					</VIcon>
				</template>
				{{ $t("components.board.action.download") }}
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
	</v-list-item>
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
