<template>
	<ImageDisplay
		v-if="isImage"
		:fileRecord="fileRecord"
		:isEditMode="isEditMode"
		@delete:element="onDeleteElement"
	/>
	<DefaultFileDisplay
		v-else
		:fileRecord="fileRecord"
		:isEditMode="isEditMode"
		:elementId="elementId"
		:isFirstElement="isFirstElement"
		:isLastElement="isLastElement"
		:hasMultipleElements="hasMultipleElements"
		@delete:element="onDeleteElement"
		@move-down:element="onMoveElementDown"
		@move-up:element="onMoveElementUp"
		@move-keyboard:element="onKeydownArrow"
	/>
</template>

<script lang="ts">
import { FileRecordResponse } from "@/fileStorageApi/v3";
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent } from "vue";
import DefaultFileDisplay from "./DefaultFileDisplay.vue";
import { useFileRecord } from "./FileRecord.composable";
import ImageDisplay from "./ImageFileDisplay.vue";

export default defineComponent({
	name: "FileContentElementDisplay",
	components: { DefaultFileDisplay, ImageDisplay },
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
		"move-down:element",
		"move-up:element",
		"move-keyboard:element",
	],
	setup(props, { emit }) {
		const { isImage } = useFileRecord(props.fileRecord);

		const onDeleteElement = () => {
			emit("delete:element");
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
			onDeleteElement,
			isImage,
			onKeydownArrow,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
