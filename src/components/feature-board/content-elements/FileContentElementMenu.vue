<template>
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
</template>

<script lang="ts">
import { FileRecordResponse } from "@/fileStorageApi/v3";
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
import { useFileRecord } from "./FileRecord.composable";

export default defineComponent({
	name: "FileContentElementMenu",
	components: { BoardMenu, BoardMenuAction },
	props: {
		fileRecord: {
			type: Object as () => FileRecordResponse,
			required: true,
		},
	},
	emits: ["delete:element"],
	setup(props, { emit }) {
		const onDelete = () => {
			emit("delete:element");
		};
		const { url, isBlocked } = useFileRecord(props.fileRecord);
		const onDownload = async () => {
			await downloadFile(url.value, props.fileRecord.name);
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
			isBlocked,
		};
	},
});
</script>
