<template>
	<v-list flat class="py-0 rounded-b-0" data-testid="board-file-element-edit">
		<v-list-item class="px-2 grey lighten-3">
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
					fileRecord.name
				}}</v-list-item-title>
			</v-list-item-content>

			<v-list-item-icon class="my-2 ml-2" v-if="isEditMode">
				<FileContentElementMenu
					:file-record="fileRecord"
					@delete:element="onDelete"
				/>
			</v-list-item-icon>
		</v-list-item>
	</v-list>
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
import FileContentElementMenu from "./FileContentElementMenu.vue";

export default defineComponent({
	name: "DefaultFileDisplay",
	components: { FileContentElementMenu },
	props: {
		fileRecord: {
			type: Object as () => FileRecordResponse,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["delete:element", "update:caption"],
	setup(props, { emit }) {
		const onDelete = () => {
			emit("delete:element");
		};
		const onDownload = async () => {
			await downloadFile(props.fileRecord.url, props.fileRecord.name);
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
