<template>
	<v-list flat class="py-0" data-testid="board-file-element-edit">
		<v-list-item class="grey lighten-2">
			<v-list-item-icon class="mr-2">
				<v-icon data-testid="board-file-element-edit-file-icon" x-large>{{
					mdiFileDocumentOutline
				}}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title data-testid="board-file-element-edit-file-name">{{
					fileName
				}}</v-list-item-title>
			</v-list-item-content>

			<v-list-item-icon>
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
			</v-list-item-icon>
		</v-list-item>
	</v-list>
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
