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
import { FileRecordParentType } from "@/fileStorageApi/v3";

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
		const { fetchFiles, fileRecords } = useFileStorageApi();

		const parentId = ref<string>(props.element.id);

		const fileRecordModel = computed(() => {
			const fileRecord = fileRecords.value[parentId.value];

			return fileRecord;
		});

		onMounted(() => {
			(async () => {
				if (!fileRecordModel.value) {
					await fetchFiles(parentId.value, FileRecordParentType.BOARDNODES);
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
