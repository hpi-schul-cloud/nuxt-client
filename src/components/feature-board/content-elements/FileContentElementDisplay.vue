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
		@delete:element="onDeleteElement"
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
	name: "FileDisplay",
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
	},
	emits: ["delete:element", "update:caption"],
	setup(props, { emit }) {
		const onDeleteElement = () => {
			emit("delete:element");
		};

		const { isImage } = useFileRecord(props.fileRecord);

		return {
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onDeleteElement,
			isImage,
		};
	},
});
</script>
