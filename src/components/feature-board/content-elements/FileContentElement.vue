<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecordModel?.id">
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
		</div>
		<v-card-text v-else>
			<v-progress-linear indeterminate></v-progress-linear>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { defineComponent, PropType, ref, onMounted, computed } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import { FileRecordParentType, FileRecordResponse } from "@/fileStorageApi/v3";
import { useFilePicker } from "../shared/FilePicker.composable";

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
		const { fetchFiles, upload } = useFileStorageApi(
			props.element.id,
			FileRecordParentType.BOARDNODES
		);
		const { setSelectedFiles } = useFilePicker();
		const fileRecordModel = ref<FileRecordResponse>();

		onMounted(() => {
			(async () => {
				const { getSelectedFiles } = useFilePicker();
				const filesToUpload = getSelectedFiles();

				if (filesToUpload) {
					try {
						fileRecordModel.value = await upload(filesToUpload);

						setSelectedFiles();
					} catch (error) {
						//Remove element
					}
				} else {
					if (!fileRecordModel.value) {
						const fileRecords = await fetchFiles();

						if (fileRecords) {
							fileRecordModel.value = fileRecords[0];
						}
					}
				}
			})();
		});

		return {
			modelValue,
			isAutoFocus,
			fileRecordModel,
		};
	},
});
</script>
