<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecordModel">
			<FileContentElementDisplay
				v-if="!isEditMode"
				:caption="modelValue.caption"
				:fileRecord="fileRecordModel"
			></FileContentElementDisplay>
			<FileContentElementEdit
				v-if="isEditMode"
				:caption="modelValue.caption"
				:fileRecord="fileRecordModel"
				@update:caption="($event) => (modelValue.caption = $event)"
			></FileContentElementEdit>
			<FileContentElementChips :fileRecord="fileRecordModel" />
		</div>
		<v-card-text v-else>
			<v-progress-linear indeterminate></v-progress-linear>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { defineComponent, PropType, watch, ref, onMounted } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import { FileRecordParentType, FileRecordResponse } from "@/fileStorageApi/v3";
import FileContentElementChips from "./FileContentElementChips.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementDisplay,
		FileContentElementEdit,
		FileContentElementChips,
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

		onMounted(() => {
			(async () => {
				parentId.value = props.element.id;
				fileRecordModel.value = getFile(parentId.value);

				if (!fileRecordModel.value) {
					await fetchFiles(parentId.value, FileRecordParentType.BOARDNODES);
					fileRecordModel.value = getFile(parentId.value);
				}
			})();
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
