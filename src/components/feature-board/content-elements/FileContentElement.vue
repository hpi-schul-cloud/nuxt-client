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
				@delete:element="onDeleteElement"
			></FileContentElementEdit>
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
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";

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
		deleteElement: {
			type: Function as PropType<(elementId: string) => Promise<void>>,
			required: true,
		},
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { fetchFile, upload, fetchPendingFileRecursively, fileRecord } =
			useFileStorageApi(props.element.id, FileRecordParentType.BOARDNODES);
		const { setSelectedFile, getSelectedFile } = useSelectedFile();
		const { askDeleteBoardNodeConfirmation } = useDeleteBoardNodeConfirmation();

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
				await deleteFileElement();
				setSelectedFile();
			}
		};

		const getFileRecord = async () => {
			await fetchFile();
			await fetchPendingFileRecursively();
		};

		const onDeleteElement = async (): Promise<void> => {
			const shouldDelete = await askDeleteBoardNodeConfirmation(
				fileRecord.value?.name,
				"boardElement"
			);

			if (shouldDelete) {
				await deleteFileElement();
			}
		};

		const deleteFileElement = () => {
			return props.deleteElement(props.element.id);
		};

		return {
			onDeleteElement,
			isAutoFocus,
			isBlocked,
			fileRecord,
			modelValue,
			url,
		};
	},
});
</script>
