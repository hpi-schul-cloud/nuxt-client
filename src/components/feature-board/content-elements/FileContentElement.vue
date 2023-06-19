<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecord">
			<FileContentElementDisplay
				v-if="!isEditMode"
				:fileName="fileRecord.name"
				:url="url"
			></FileContentElementDisplay>
			<FileContentElementEdit
				v-if="isEditMode"
				:fileName="fileRecord.name"
				:url="url"
			></FileContentElementEdit>
			<FileContentElementChips
				:fileSize="fileRecord.size"
				:fileName="fileRecord.name"
			/>
			<FileContentElementAlert v-if="isBlocked" />
		</div>
		<v-card-text v-else>
			<v-progress-linear indeterminate></v-progress-linear>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import {
	FileRecordParentType,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { PropType, computed, defineComponent, onMounted } from "vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import { useSelectedFile } from "../shared/SelectedFile.composable";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementAlert,
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
		const { fetchFile, upload, fetchPendingFileRecursively, fileRecord } =
			useFileStorageApi(props.element.id, FileRecordParentType.BOARDNODES);
		const { setSelectedFile, getSelectedFile } = useSelectedFile();

		const isBlocked = computed(
			() =>
				fileRecord.value?.securityCheckStatus === FileRecordScanStatus.BLOCKED
		);

		const url = computed(() => (!isBlocked.value ? fileRecord.value?.url : ""));

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
				await upload(file);

				setSelectedFile();
				await fetchPendingFileRecursively();
			} catch (error) {
				//Remove element
				setSelectedFile();
			}
		};

		const getFileRecord = async () => {
			await fetchFile();
			await fetchPendingFileRecursively();
		};

		return {
			isAutoFocus,
			isBlocked,
			fileRecord,
			modelValue,
			url,
		};
	},
});
</script>
