<template>
	<v-card
		class="mb-4"
		data-testid="board-file-element"
		elevation="0"
		outlined
		dense
	>
		<div v-if="fileRecord">
			<FileContentElementDisplay
				:fileRecord="fileRecord"
				:isEditMode="isEditMode"
				@delete:element="onDeleteElement"
			/>
			<FileContentElementAlert v-if="isBlocked" />
		</div>
		<v-card-text v-else>
			<v-progress-linear
				data-testid="board-file-element-progress-bar"
				indeterminate
			></v-progress-linear>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import {
	FileRecordParentType,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { computed, defineComponent, onMounted, PropType } from "vue";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import { useSelectedFile } from "../shared/SelectedFile.composable";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementAlert,
		FileContentElementDisplay,
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

		const url = computed(() =>
			!isBlocked.value && fileRecord.value?.url ? fileRecord.value?.url : ""
		);

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
				setSelectedFile();
				await deleteFileElement();
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
