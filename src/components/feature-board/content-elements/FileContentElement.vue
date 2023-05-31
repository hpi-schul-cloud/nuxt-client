<template>
	<div v-if="fileRecordModel">
		<FileContentElementDisplay
			v-if="!isEditMode"
			:caption="modelValue.caption"
		></FileContentElementDisplay>
		<FileContentElementEdit
			v-if="isEditMode"
			:autofocus="isAutoFocus"
			:caption="modelValue.caption"
			@update:caption="($event) => (modelValue.caption = $event)"
		></FileContentElementEdit>
	</div>
	<v-sheet v-else class="pa-4 mb-2" outlined rounded>
		<v-progress-linear indeterminate></v-progress-linear>
	</v-sheet>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { defineComponent, PropType, watch, ref, onMounted } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import {
	FileRecordParamsParentType,
	FileRecordResponse,
} from "@/fileStorageApi/v3";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementDisplay,
		FileContentElementEdit,
	},
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { fetchFiles, getFile, newFileForParent } = useFileStorageApi();

		const fileRecordModel = ref<FileRecordResponse>();
		const parentId = ref<string>("");

		onMounted(async () => {
			parentId.value = props.element.id;
			fileRecordModel.value = getFile(parentId.value);

			if (!fileRecordModel.value) {
				await fetchFiles(parentId.value, FileRecordParamsParentType.BOARDNODES);
				fileRecordModel.value = getFile(parentId.value);
			}
		});

		watch(newFileForParent, (newValue) => {
			if (newValue === parentId.value) {
				fileRecordModel.value = getFile(parentId.value);
			}
		});

		return { modelValue, isAutoFocus, fileRecordModel };
	},
});
</script>
