<template>
	<v-card
		ref="fileContentElement"
		class="board-file-element-card mb-4"
		data-testid="board-file-element"
		elevation="0"
		:variant="isOutlined ? 'outlined' : 'elevated'"
		:ripple="false"
		:aria-label="cardAriaLabel"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		@click="onCardInteraction"
		@keydown.enter="onCardInteraction"
	>
		<FileContent
			v-if="fileProperties && isUploading !== true"
			:file-properties="fileProperties"
			:alerts="alerts"
			:is-edit-mode="isEditMode"
			@fetch:file="onFetchFile"
			@update:alternative-text="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
			@update:name="onUpdateName"
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
				<KebabMenuActionDelete scope-language-key="components.cardElement.fileElement" @click="onDelete" />
			</BoardMenu>
		</FileUpload>
	</v-card>
</template>

<script setup lang="ts">
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import FileContent from "./content/FileContent.vue";
import { mapEditBoardPermissionToEditorMode } from "./mapper";
import { FileAlert } from "./shared/types/FileAlert.enum";
import FileUpload from "./upload/FileUpload.vue";
import { FileRecordParentType, PreviewWidth } from "@/fileStorageApi/v3";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl, isPreviewPossible, isScanStatusBlocked } from "@/utils/fileHelper";
import { useBoardFocusHandler, useBoardPermissions, useContentElementState } from "@data-board";
import { useEnvConfig } from "@data-env";
import { useFileStorageApi } from "@data-file";
import { BoardMenuScope } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

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

const { t } = useI18n();
const router = useRouter();

const fileContentElement = ref(null);
const isLoadingFileRecord = ref(true);

const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, fileContentElement);

const { modelValue } = useContentElementState(props);
const { fetchFiles, upload, getFileRecordsByParentId, rename } = useFileStorageApi();
const { hasEditPermission } = useBoardPermissions();

const fileRecord = computed(() => getFileRecordsByParentId(element.value.id)[0]);

const { alerts, addAlert } = useFileAlerts(fileRecord);

const isUploading = computed(() => fileRecord.value?.isUploading);

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
		isDownloadAllowed: isScanStatusBlocked(fileRecord.value.securityCheckStatus),
		mimeType: fileRecord.value.mimeType,
		element: props.element,
		isCollaboraEditable: fileRecord.value.isCollaboraEditable,
	};
});

const isOutlined = computed(() => {
	const { isEditMode } = props;
	const isUploadingInViewMode = fileRecord.value?.id !== undefined && !isEditMode && !isUploading.value;

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

const onUpdateName = (value: string) => {
	rename(fileRecord.value.id, { fileName: value });
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

const isCollaboraEditable = computed(() => {
	if (!fileRecord.value) return false;

	return fileRecord.value.isCollaboraEditable;
});

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);
const cardAriaLabel = computed(() => {
	if (isCollaboraEnabled.value && isCollaboraEditable.value) {
		return t("components.cardElement.fileElement.openOfficeDocument");
	}
	return undefined;
});
const onCardInteraction = () => {
	if (isCollaboraEnabled.value && isCollaboraEditable.value) openCollabora();
};
const openCollabora = () => {
	const editorMode = mapEditBoardPermissionToEditorMode(hasEditPermission.value);

	const url = router.resolve({
		name: "collabora",
		params: {
			id: fileRecord.value.id,
		},
		query: {
			editorMode,
		},
	}).href;

	window.open(url, "_blank");
};
</script>
<style lang="scss" scoped>
/* show focus indicatator properly on all browsers */
.board-file-element-card:focus {
	outline-offset: 1px;
}
</style>
