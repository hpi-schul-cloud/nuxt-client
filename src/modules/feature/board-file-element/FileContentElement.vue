<template>
	<v-card
		class="mb-4"
		data-testid="board-file-element"
		elevation="0"
		:variant="isOutlined ? 'outlined' : 'elevated'"
		ref="fileContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<FileContent
			v-if="fileProperties && isUploading !== true"
			:file-properties="fileProperties"
			:alerts="alerts"
			:is-edit-mode="isEditMode"
			@fetch:file="onFetchFile"
			@update:alternativeText="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
			@add:alert="onAddAlert"
		>
			<BoardMenu scope="element" v-if="isEditMode">
				<BoardMenuActionMoveUp @click="onMoveUp" />
				<BoardMenuActionMoveDown @click="onMoveDown" />
				<BoardMenuActionDelete :name="fileProperties.name" @click="onDelete" />
			</BoardMenu>
		</FileContent>
		<ImageDisplay
			v-else-if="hasError"
			src="error-src"
			previewSrc="error-preview-src"
			:name="t('components.cardElement.fileElement.previewError')"
			:element="element"
			:is-edit-mode="false"
		/>
		<FileUpload
			v-else
			:elementId="element.id"
			:isEditMode="isEditMode"
			@upload:file="onUploadFile"
			:isUploading="isUploading"
		>
			<BoardMenu scope="element">
				<BoardMenuActionMoveUp @click="onMoveUp" />
				<BoardMenuActionMoveDown @click="onMoveDown" />
				<BoardMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</FileUpload>
	</v-card>
</template>

<script lang="ts">
import { FileRecordParentType, PreviewWidth } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import {
	convertDownloadToPreviewUrl,
	isDownloadAllowed,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import {
	computed,
	defineComponent,
	onMounted,
	PropType,
	ref,
	toRef,
	watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import ImageDisplay from "./content/display/image-display/ImageDisplay.vue";
import FileContent from "./content/FileContent.vue";
import { useFileStorageApi } from "./shared/composables/FileStorageApi.composable";
import { FileAlert } from "./shared/types/FileAlert.enum";
import FileUpload from "./upload/FileUpload.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileUpload,
		FileContent,
		BoardMenu,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
		BoardMenuActionDelete,
		ImageDisplay,
	},
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		const fileContentElement = ref(null);
		const isLoadingFileRecord = ref(true);
		const element = toRef(props, "element");
		const hasError = ref(false);
		useBoardFocusHandler(element.value.id, fileContentElement);

		const { modelValue } = useContentElementState(props);
		const { fetchFile, upload, getFileRecord } = useFileStorageApi();

		const fileRecord = getFileRecord(element.value.id);

		const { alerts, addAlert } = useFileAlerts(fileRecord);

		const isUploading = computed(() => {
			return fileRecord.value?.isUploading;
		});

		const fileProperties = computed(() => {
			if (fileRecord.value === undefined) {
				return;
			}

			const previewUrl = isPreviewPossible(fileRecord.value.previewStatus)
				? convertDownloadToPreviewUrl(fileRecord.value.url, PreviewWidth._500)
				: undefined;

			return {
				size: fileRecord.value.size,
				name: fileRecord.value.name,
				url: fileRecord.value.url,
				previewUrl,
				previewStatus: fileRecord.value.previewStatus,
				isDownloadAllowed: isDownloadAllowed(
					fileRecord.value.securityCheckStatus
				),
				mimeType: fileRecord.value.mimeType,
				element: props.element,
			};
		});

		const hasFileRecord = computed(() => {
			return fileRecord.value !== undefined;
		});

		const isOutlined = computed(() => {
			const { isEditMode } = props;
			const isUploadingInViewMode =
				fileRecord.value?.id !== undefined && !isEditMode && !isUploading.value;

			return isUploadingInViewMode || isEditMode;
		});

		watch(element.value, async () => {
			handleFetchFile();
		});

		onMounted(async () => {
			handleFetchFile();
		});

		const handleFetchFile = async (): Promise<void> => {
			isLoadingFileRecord.value = true;
			await tryFetchFile();
			isLoadingFileRecord.value = false;
		};

		const tryFetchFile = async () => {
			try {
				await fetchFile(element.value.id, FileRecordParentType.BOARDNODES);
				hasError.value = false;
			} catch (error) {
				hasError.value = true;
			}
		};

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onUploadFile = async (file: File): Promise<void> => {
			try {
				await upload(file, element.value.id, FileRecordParentType.BOARDNODES);
				element.value.content.caption = " ";
			} catch (error) {
				emit("delete:element", element.value.id);
			}
		};

		const onUpdateAlternativeText = (value: string) => {
			modelValue.value.alternativeText = value;
		};

		const onUpdateCaption = (value: string) => {
			modelValue.value.caption = value;
		};

		const onAddAlert = (alert: FileAlert) => {
			addAlert(alert);
		};

		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};

		const onMoveUp = () => emit("move-up:edit");
		const onMoveDown = () => emit("move-down:edit");

		return {
			fileContentElement,
			fileProperties,
			fileRecord,
			hasFileRecord,
			isOutlined,
			modelValue,
			alerts,
			isUploading,
			hasError,
			onKeydownArrow,
			onUploadFile,
			onFetchFile: handleFetchFile,
			onUpdateAlternativeText,
			onUpdateCaption,
			onAddAlert,
			onDelete,
			onMoveUp,
			onMoveDown,
			t,
		};
	},
});
</script>
