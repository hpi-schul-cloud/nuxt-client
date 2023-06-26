<template>
	<div
		class="d-flex align-stretch rounded-t-sm"
		data-testid="board-file-element-edit"
	>
		<v-list
			flat
			class="grey lighten-3 px-0 py-0 rounded-tl-sm"
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
		<div class="d-flex align-center grey lighten-3 pr-2 rounded-tr-sm">
			<BoardMenu scope="element">
				<BoardMenuAction data-testid="board-file-element-edit-menu-move-up">
					<VIcon>
						{{ mdiArrowCollapseUp }}
					</VIcon>
					{{ $t("components.board.action.moveUp") }}
				</BoardMenuAction>
				<BoardMenuAction data-testid="board-file-element-edit-menu-move-down">
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
	name: "FileContentElementEdit",
	components: { BoardMenu, BoardMenuAction },
	props: {
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
	},
	emits: ["delete:element", "update:caption"],
	setup(props, { emit }) {
		const onDelete = () => {
			emit("delete:element");
		};
		const onDownload = async () => {
			await downloadFile(props.url, props.fileName);
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
		};
	},
});
</script>

<style scoped>
.board-menu {
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	z-index: 1;
}
</style>
