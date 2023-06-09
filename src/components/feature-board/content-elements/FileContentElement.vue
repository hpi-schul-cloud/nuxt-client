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
import {
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
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

		const refreshFileState = async () => {
			await fetchFiles(parentId.value, FileRecordParentType.BOARDNODES);
			fileRecordModel.value = getFile(parentId.value);

			if (
				fileRecordModel.value?.securityCheckStatus ===
				FileRecordScanStatus.PENDING
			) {
				setTimeout(refreshFileState, 10000);
			}
		};

		onMounted(() => {
			(async () => {
				parentId.value = props.element.id;
				fileRecordModel.value = getFile(parentId.value);

				await refreshFileState();
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
