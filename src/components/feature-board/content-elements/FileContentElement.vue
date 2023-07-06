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
				v-if="!isEditMode"
				:fileName="fileRecord.name"
				:url="url"
				:isDownloadAllowed="!isBlockedByVirusScan"
			/>
			<FileContentElementEdit
				v-if="isEditMode"
				:fileName="fileRecord.name"
				:fileId="$props.element.id"
				:url="url"
				:isDownloadAllowed="!isBlockedByVirusScan"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveFileEditDown"
				@move-up:element="onMoveFileEditUp"
				@move-keyboard:element="onMoveFileEditKeyboard"
				@delete:element="onDeleteElement"
			/>
			<FileContentElementChips
				:fileSize="fileRecord.size"
				:fileName="fileRecord.name"
			/>
			<FileContentElementAlert v-if="isBlockedByVirusScan" />
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
import { PropType, computed, defineComponent, onMounted } from "vue";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";
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
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
		deleteElement: {
			type: Function as PropType<(elementId: string) => Promise<void>>,
			required: true,
		},
	},
	emits: ["move-down:edit", "move-up:edit", "move-keyboard:edit"],
	setup(props, { emit }) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { fetchFile, upload, fetchPendingFileRecursively, fileRecord } =
			useFileStorageApi(props.element.id, FileRecordParentType.BOARDNODES);
		const { setSelectedFile, getSelectedFile } = useSelectedFile();
		const { askDeleteBoardNodeConfirmation } = useDeleteBoardNodeConfirmation();

		const isBlockedByVirusScan = computed(
			() =>
				fileRecord.value?.securityCheckStatus === FileRecordScanStatus.BLOCKED
		);

		const url = computed(() =>
			!isBlockedByVirusScan.value && fileRecord.value?.url
				? fileRecord.value?.url
				: ""
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

		const onMoveFileEditDown = () => {
			emit("move-down:edit");
		};

		const onMoveFileEditUp = () => {
			emit("move-up:edit");
		};
		const onMoveFileEditKeyboard = (event: KeyboardEvent) => {
			emit("move-keyboard:edit", event);
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
			isBlockedByVirusScan,
			fileRecord,
			modelValue,
			onMoveFileEditDown,
			onMoveFileEditUp,
			onMoveFileEditKeyboard,
			url,
		};
	},
});
</script>
