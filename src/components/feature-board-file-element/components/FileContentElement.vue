<template>
	<v-card
		class="mb-4"
		data-testid="board-file-element"
		dense
		elevation="0"
		:outlined="isOutlined"
		ref="fileContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<div v-if="isImage">
			<ImageFileDisplay
				:fileName="fileName"
				:fileSize="fileSize"
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
			<FileContentElementInit
				v-if="isEditMode && fileRecord === undefined"
				:fileName="fileName"
				:elementId="element.id"
				@upload:file="onUploadFile"
			/>
			<FileContentElementDisplay
				v-if="!isEditMode"
				:fileName="fileName"
				:fileSize="fileSize"
				:url="url"
				:isDownloadAllowed="!isBlockedByVirusScan"
			/>
			<FileContentElementEdit
				v-if="isEditMode && fileRecord"
				:fileName="fileName"
				:fileSize="fileSize"
				:elementId="element.id"
				:isDownloadAllowed="!isBlockedByVirusScan"
				:url="url"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				:needsFileUpload="needsFileUpload"
				@move-down:element="onMoveFileEditDown"
				@move-up:element="onMoveFileEditUp"
				@delete:element="onDeleteElement"
			/>
		</div>
		<FileContentElementAlert v-if="isBlockedByVirusScan" />
	</v-card>
</template>

<script lang="ts">
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import {
	computed,
	defineComponent,
	onMounted,
	PropType,
	ref,
	toRef,
} from "vue";
import { useFileRecord } from "../FileRecord.composable";
import { useFileStorageApi } from "../FileStorageApi.composable";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import FileContentElementInit from "./FileContentElementInit.vue";
import ImageFileDisplay from "./ImageFileDisplay.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementAlert,
		FileContentElementDisplay,
		FileContentElementEdit,
		FileContentElementInit,
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
		const isLoadingFileRecord = ref(true);
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, fileContentElement);

		const { modelValue } = useContentElementState(props);
		const { fetchFile, upload, fileRecord } = useFileStorageApi(
			element.value.id,
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

		const hasFileRecord = computed(() => {
			return fileRecord.value !== undefined;
		});

		const needsFileUpload = computed(() => {
			return (
				isLoadingFileRecord.value === false && hasFileRecord.value === false
			);
		});

		const isOutlined = computed(() => {
			return fileRecord.value !== undefined || props.isEditMode === true;
		});

		onMounted(() => {
			(async () => {
				await fetchFile();
				isLoadingFileRecord.value = false;
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

		const onDeleteElement = async (
			deleteDirectly: true | undefined
		): Promise<void> => {
			if (deleteDirectly === true) {
				emit("delete:element", element.value.id);
				return;
			}

			const shouldDelete = await askDeleteConfirmation(
				fileName.value,
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};

		const onUploadFile = async (file: File): Promise<void> => {
			try {
				await upload(file);
			} catch (error) {
				emit("delete:element", element.value.id);
			}
		};

		return {
			fileContentElement,
			fileSize,
			fileName,
			fileUrl,
			fileRecord,
			hasFileRecord,
			isBlockedByVirusScan,
			isImage,
			isOutlined,
			modelValue,
			needsFileUpload,
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
