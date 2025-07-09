<template>
	<v-card
		ref="fileContentElement"
		class="board-file-element-card mb-4"
		data-testid="board-file-element"
		elevation="0"
		:variant="isOutlined ? 'outlined' : 'elevated'"
		:ripple="false"
		:tabindex="isEditMode ? 0 : undefined"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<FileContent
			v-if="fileProperties && isUploading !== true"
			:file-properties="fileProperties"
			:alerts="alerts"
			:is-edit-mode="isEditMode"
			@fetch:file="onFetchFile"
			@update:alternative-text="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
			@add:alert="onAddAlert"
		>
			<BoardMenu
				v-if="isEditMode"
				:scope="BoardMenuScope.FILE_ELEMENT"
				has-background
				:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					:name="fileProperties.name"
					scope-language-key="components.cardElement.fileElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</FileContent>
		<FileUpload
			v-else
			:element-id="element.id"
			:is-edit-mode="isEditMode"
			:is-uploading="isUploading"
			@upload:file="onUploadFile"
		>
			<BoardMenu :scope="BoardMenuScope.FILE_ELEMENT" has-background>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.fileElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</FileUpload>
	</v-card>
</template>

<script setup lang="ts">
import { FileRecordParentType, PreviewWidth } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
	isScanStatusBlocked,
} from "@/utils/fileHelper";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import FileContent from "./content/FileContent.vue";
import { FileAlert } from "./shared/types/FileAlert.enum";
import FileUpload from "./upload/FileUpload.vue";

type Props = {
	element: FileElementResponse;
	isEditMode: boolean;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const fileContentElement = ref(null);
const isLoadingFileRecord = ref(true);

const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, fileContentElement);

const { modelValue } = useContentElementState(props);
const { fetchFiles, upload, getFileRecordsByParentId } = useFileStorageApi();

const fileRecord = computed(
	() => getFileRecordsByParentId(element.value.id)[0]
);

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
		isDownloadAllowed: isScanStatusBlocked(
			fileRecord.value.securityCheckStatus
		),
		mimeType: fileRecord.value.mimeType,
		element: props.element,
	};
});

const isOutlined = computed(() => {
	const { isEditMode } = props;
	const isUploadingInViewMode =
		fileRecord.value?.id !== undefined && !isEditMode && !isUploading.value;

	return isUploadingInViewMode || isEditMode;
});

watch(element.value, async () => {
	isLoadingFileRecord.value = true;
	await fetchFiles(element.value.id, FileRecordParentType.BOARDNODES);
	isLoadingFileRecord.value = false;
});

onMounted(async () => {
	await fetchFiles(element.value.id, FileRecordParentType.BOARDNODES);
	isLoadingFileRecord.value = false;
});

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
	} catch {
		emit("delete:element", element.value.id);
	}
};

const onFetchFile = async (): Promise<void> => {
	await fetchFiles(element.value.id, FileRecordParentType.BOARDNODES);
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
</script>
<style lang="scss" scoped>
/* show focus indicatator properly on all browsers */
.board-file-element-card:focus {
	outline-offset: 1px;
}
</style>
