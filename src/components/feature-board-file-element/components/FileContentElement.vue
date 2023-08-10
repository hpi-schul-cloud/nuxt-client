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
		<div v-if="isImage">
			<ImageFileDisplay
				:fileName="fileName"
				:isDownloadAllowed="!isBlockedByVirusScan"
				:url="fileUrl"
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
				:fileName="fileName"
				:url="url"
				:isDownloadAllowed="!isBlockedByVirusScan"
			/>
			<FileContentElementEdit
				v-if="isEditMode"
				:fileName="fileName"
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
		<FileContentElementChips :fileSize="fileSize" :fileName="fileName" />
		<FileContentElementAlert v-if="isBlockedByVirusScan" />
	</v-card>
</template>

<script lang="ts">
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { useFileRecord } from "../FileRecord.composable";
import { useFileStorageApi } from "../FileStorageApi.composable";
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
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
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

		const fileName = computed(() => {
			return fileRecord.value === undefined ? "" : fileRecord.value.name;
		});

		const fileSize = computed(() => {
			return fileRecord.value === undefined ? 0 : fileRecord.value.size;
		});

		const fileUrl = computed(() => {
			return fileRecord.value === undefined ? "" : fileRecord.value.url;
		});

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
				fileName.value,
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", props.element.id);
			}
		};

		const onUploadFile = async (file: File): Promise<void> => {
			try {
				await upload(file);
			} catch (error) {
				emit("delete:element", props.element.id);
			}
		};

		return {
			fileContentElement,
			fileSize,
			fileName,
			fileUrl,
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
