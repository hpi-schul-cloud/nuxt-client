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
			max-width="100%"
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
						fileRecord.name
					}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<div
			class="d-flex flex-grow-0 flex-shrink-0 align-center grey lighten-3 pr-2 rounded-tr-sm"
			v-if="isEditMode"
		>
			<FileContentElementMenu
				:fileRecord="fileRecord"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@delete:element="onDelete"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@move-keyboard:element="onKeydownArrow"
			/>
		</div>
	</div>
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
import { defineComponent, ref } from "vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
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
		elementId: { type: String, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"update:caption",
		"move-keyboard:element",
		"move-down:element",
		"move-up:element",
	],
	setup(props, { emit }) {
		const fileContentElement = ref(undefined);
		useBoardFocusHandler(props.elementId, fileContentElement);
		const onDelete = () => {
			emit("delete:element");
		};
		const onDownload = async () => {
			await downloadFile(props.fileRecord.url, props.fileRecord.name);
		};

		const onKeydownArrow = (event: KeyboardEvent) => {
			emit("move-keyboard:element", event);
		};

		const onMoveElementDown = async () => {
			emit("move-down:element");
		};

		const onMoveElementUp = async () => {
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
			onKeydownArrow,
		};
	},
});
</script>
