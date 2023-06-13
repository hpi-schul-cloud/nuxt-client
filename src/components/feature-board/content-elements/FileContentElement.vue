<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecord">
			<FileContentElementDisplay
				v-if="!isEditMode"
				:caption="modelValue.caption"
				:fileRecord="fileRecord"
			></FileContentElementDisplay>
			<FileContentElementEdit
				v-if="isEditMode"
				:caption="modelValue.caption"
				:fileRecord="fileRecord"
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
import { defineComponent, PropType, ref, onMounted } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import { FileRecordParentType, FileRecordResponse } from "@/fileStorageApi/v3";
import { useSelectedFile } from "../shared/SelectedFile.composable";

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
		const { setSelectedFile, getSelectedFile } = useSelectedFile();
		const fileRecord = ref<FileRecordResponse>();

		onMounted(() => {
			(async () => {
				const file = getSelectedFile();

				if (file) {
					await tryUpload(file);
				} else {
					await getFileRecord();
				}
			})();
		});

		const tryUpload = async (file: File) => {
			try {
				const uploadedFileRecord = await upload(file);
				fileRecord.value = uploadedFileRecord;

				setSelectedFile();
			} catch (error) {
				//Remove element
				setSelectedFile();
			}
		};

		const getFileRecord = async () => {
			if (!fileRecord.value) {
				const fileRecords = await fetchFiles();

				if (fileRecords) {
					fileRecord.value = fileRecords[0];
				}
			}
		};

		return {
			modelValue,
			isAutoFocus,
			fileRecord,
		};
	},
});
</script>
