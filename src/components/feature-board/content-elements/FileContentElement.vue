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
			<FileContentElementAlert v-if="isBlocked" />
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
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import {
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { useSelectedFile } from "../shared/SelectedFile.composable";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementAlert,
		FileContentElementDisplay,
		FileContentElementEdit,
	},
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { fetchFiles, upload, fetchFileRecursively } = useFileStorageApi(
			props.element.id,
			FileRecordParentType.BOARDNODES
		);
		const { setSelectedFile, getSelectedFile } = useSelectedFile();
		const fileRecord = ref<FileRecordResponse>();

		const isBlocked = computed(
			() =>
				fileRecord.value?.securityCheckStatus === FileRecordScanStatus.BLOCKED
		);

		const isPending = computed(
			() =>
				fileRecord.value?.securityCheckStatus === FileRecordScanStatus.PENDING
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
				const uploadedFileRecord = await upload(file);
				if (uploadedFileRecord) {
					fileRecord.value = uploadedFileRecord;
					setSelectedFile();
					await checkSecurityStatus();
				}
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
					await checkSecurityStatus();
				}
			}
		};

		const checkSecurityStatus = async () => {
			if (isPending.value) {
				fileRecord.value = await fetchFileRecursively();
			}
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
