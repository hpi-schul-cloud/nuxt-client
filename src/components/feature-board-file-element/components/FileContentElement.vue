<template>
	<v-card
		class="mb-4"
		data-testid="board-file-element"
		dense
		elevation="0"
		outlined
		ref="fileContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<div v-if="fileRecord && isImage">
			<ImageFileDisplay
				:fileName="fileRecord.name"
				:isDownloadAllowed="!isBlockedByVirusScan"
				:url="fileRecord.url"
				:isEditMode="isEditMode"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveFileEditDown"
				@move-up:element="onMoveFileEditUp"
				@delete:element="onDeleteElement"
			/>
		</div>
		<div v-else>
			<FileContentElementDisplay
				v-if="!isEditMode"
				:fileName="fileRecord?.name ?? ''"
				:url="url"
				:isDownloadAllowed="!isBlockedByVirusScan"
			/>
			<FileContentElementEdit
				v-if="isEditMode"
				:fileName="fileRecord?.name ?? ''"
				:isDownloadAllowed="!isBlockedByVirusScan"
				:url="url"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveFileEditDown"
				@move-up:element="onMoveFileEditUp"
				@delete:element="onDeleteElement"
				@upload:file="onUploadFile"
			/>
		</div>
		<FileContentElementChips
			:fileSize="fileRecord?.size ?? 0"
			:fileName="fileRecord?.name ?? ''"
		/>
		<FileContentElementAlert v-if="isBlockedByVirusScan" />
	</v-card>
</template>

<script lang="ts">
import { useBoardFocusHandler, useContentElementState } from "@feature-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useFileRecord } from "../FileRecord.composable";
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { useFileStorageApi } from "../FileStorageApi.composable";
import { PropType, defineComponent, onMounted, ref } from "vue";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import ImageFileDisplay from "./ImageFileDisplay.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementAlert,
		FileContentElementDisplay,
		FileContentElementEdit,
		FileContentElementChips,
		ImageFileDisplay,
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
		const fileContentElement = ref(null);
		useBoardFocusHandler(props.element.id, fileContentElement);

		const { modelValue } = useContentElementState(props);
		const { fetchFile, upload, fileRecord } = useFileStorageApi(
			props.element.id,
			FileRecordParentType.BOARDNODES
		);
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const { isBlockedByVirusScan, isImage, url } = useFileRecord(fileRecord);

		onMounted(() => {
			(async () => {
				await fetchFile();
			})();
		});

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveFileEditDown = () => {
			emit("move-down:edit");
		};

		const onMoveFileEditUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = async (): Promise<void> => {
			const shouldDelete = await askDeleteConfirmation(
				fileRecord.value?.name,
				"boardElement"
			);

			if (shouldDelete) {
				await deleteFileElement();
			}
		};

		const onUploadFile = async (file: File, event: Event): Promise<void> => {
			try {
				await upload(file);
			} catch (error) {
				deleteFileElement();
			}
		};

		const deleteFileElement = () => {
			return props.deleteElement(props.element.id); // WIP: can not be a parameter
		};

		return {
			fileContentElement,
			fileRecord,
			isBlockedByVirusScan,
			isImage,
			modelValue,
			url,
			onDeleteElement,
			onKeydownArrow,
			onMoveFileEditDown,
			onMoveFileEditUp,
			onUploadFile,
		};
	},
});
</script>
