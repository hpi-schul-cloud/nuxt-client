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
import { FileRecordResponse, FileRecordScanStatus } from "@/fileStorageApi/v3";
import { downloadFile } from "@/utils/fileHelper";
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { computed, defineComponent } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";

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
		const onDownload = async () => {
			await downloadFile(props.fileRecord.url, props.fileRecord.name);
		};
		const isBlocked = computed(
			() =>
				props.fileRecord.securityCheckStatus === FileRecordScanStatus.BLOCKED
		);

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
