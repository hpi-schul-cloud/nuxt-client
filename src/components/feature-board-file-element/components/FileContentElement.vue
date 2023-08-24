<template>
	<v-card
		v-show="showElement"
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
		<template v-if="fileProperties && fileRecord">
			<div v-if="fileProperties.previewUrl">
				<ImageFileDisplay
					:fileProperties="fileProperties"
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
					:fileProperties="fileProperties"
				/>
				<FileContentElementEdit
					v-if="isEditMode && fileRecord"
					:fileProperties="fileProperties"
					:elementId="element.id"
					:isFirstElement="isFirstElement"
					:isLastElement="isLastElement"
					:hasMultipleElements="hasMultipleElements"
					:needsFileUpload="needsFileUpload"
					@move-down:element="onMoveFileEditDown"
					@move-up:element="onMoveFileEditUp"
					@delete:element="onDeleteElement"
				/>
			</div>
			<FileContentElementAlert :previewStatus="fileRecord.previewStatus" />
		</template>
		<template v-else>
			<FileContentElementInit
				v-if="isEditMode && fileRecord === undefined"
				:elementId="element.id"
				@upload:file="onUploadFile"
			/>
		</template>
	</v-card>
</template>

<script lang="ts">
import {
	FileRecordParentType,
	FileRecordScanStatus,
	PreviewStatus,
} from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
} from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
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

		useBoardFocusHandler(props.element.id, fileContentElement);

		const { hasEditPermission } = useBoardPermissions();
		const { modelValue } = useContentElementState(props);
		const { fetchFile, upload, fileRecord } = useFileStorageApi(
			props.element.id,
			FileRecordParentType.BOARDNODES
		);
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const { isBlockedByVirusScan, isImage, url } = useFileRecord(fileRecord);

		const fileProperties = computed(() => {
			if (fileRecord.value === undefined) {
				return;
			}

			const previewUrl =
				fileRecord.value?.previewStatus === PreviewStatus.PREVIEW_POSSIBLE
					? convertDownloadToPreviewUrl(fileRecord.value.url)
					: undefined;

			return {
				size: fileRecord.value.size,
				name: fileRecord.value.name,
				url: fileRecord.value.url,
				previewUrl,
				isDownloadAllowed: !isBlockedByVirusScan,
			};
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

		const showElement = computed(() => {
			return (
				hasEditPermission ||
				(!hasEditPermission &&
					fileRecord.value !== undefined &&
					fileRecord.value?.securityCheckStatus !==
						FileRecordScanStatus.BLOCKED)
			);
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
				emit("delete:element", props.element.id);
				return;
			}

			const shouldDelete = await askDeleteConfirmation(
				fileRecord.value?.name,
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
			fileProperties,
			fileRecord,
			hasFileRecord,
			isBlockedByVirusScan,
			isImage,
			isOutlined,
			modelValue,
			needsFileUpload,
			url,
			showElement,
			onDeleteElement,
			onKeydownArrow,
			onMoveFileEditDown,
			onMoveFileEditUp,
			onUploadFile,
		};
	},
});
</script>
