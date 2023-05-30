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
	<div v-else>
		<v-progress-linear indeterminate></v-progress-linear>
	</div>
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
		const { files, newFile, fetchFiles } = useFileStorageApi();

		const fileRecordModel = ref<FileRecordResponse>();

		onMounted(async () => {
			const parentId = props.element.id;
			if (files.has(parentId)) {
				fileRecordModel.value = files.get(parentId);
			} else {
				await fetchFiles(parentId, FileRecordParamsParentType.BOARDNODES);
				fileRecordModel.value = files.get(parentId);
			}
		});

		watch(newFile, (newValue) => {
			if (newValue && props.element.id === newValue.parentId) {
				fileRecordModel.value = newValue;
			}
		});

		return { modelValue, isAutoFocus, fileRecordModel };
	},
});
</script>
