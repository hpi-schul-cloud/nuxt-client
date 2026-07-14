<template>
	<VCard
		ref="fileContentElement"
		class="content-element-card board-file-element-card mb-4"
		:class="{ 'content-element-card-edit-mode': isEditMode }"
		data-testid="board-file-element"
		elevation="0"
		:variant="isOutlined ? 'outlined' : 'elevated'"
		:ripple="false"
		:aria-label="cardAriaLabel"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		v-on="cardInteractionListeners"
	>
		<FileContent
			v-if="fileProperties && isUploading !== true"
			:file-properties="fileProperties"
			:collabora-href="collaboraDescriptionHref"
			:is-edit-mode="isEditMode"
			:is-detail-view="isDetailView"
			@fetch:file="onFetchFile"
			@update:alternative-text="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
			@update:name="onUpdateName"
			@add:alert="onAddAlert"
			@activate="onCardInteraction"
		>
			<BoardMenu
				v-if="isEditMode"
				:scope="BoardMenuScope.FILE_ELEMENT"
				has-background
				:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete :name="fileProperties.name" @click="onDelete" />
			</BoardMenu>
		</FileContent>
		<FileUpload
			v-else-if="!alerts.includes(FileAlert.FILE_STORAGE_ERROR)"
			:element-id="element.id"
			:is-edit-mode="isEditMode"
			:is-uploading="isUploading"
			@upload:file="onUploadFile"
		>
			<BoardMenu :scope="BoardMenuScope.FILE_ELEMENT" has-background>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</FileUpload>
		<FileAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
	</VCard>
</template>

<script setup lang="ts">
import FileAlerts from "./content/alert/FileAlerts.vue";
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import FileContent from "./content/FileContent.vue";
import { FileAlert } from "./shared/types/FileAlert.enum";
import FileUpload from "./upload/FileUpload.vue";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import {
	convertDownloadToPreviewUrl,
	downloadFile,
	FileCardInteractionType,
	getFileCardInteractionType,
	isPreviewPossible,
	isScanStatusBlocked,
} from "@/utils/fileHelper";
import { FileRecordParentType, PreviewWidth } from "@api-file-storage";
import { FileElementResponse } from "@api-server";
import { useBoardAllowedOperations, useBoardFocusHandler, useContentElementState } from "@data-board";
import { useEnvConfig } from "@data-env";
import { useFileStorageApi } from "@data-file";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { LightBoxContentType, LightBoxOptions, useLightBox } from "@ui-light-box";
import { useDebounceFn } from "@vueuse/core";
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
	isDetailView?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const { allowedOperations } = useBoardAllowedOperations();

const { t } = useI18n();
const router = useRouter();

const fileContentElement = ref(null);
const isLoadingFileRecord = ref(true);

const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, fileContentElement);

const { modelValue } = useContentElementState(props);
const { fetchFiles, upload, getFileRecordsByParentId, rename } = useFileStorageApi();

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
		isDownloadAllowed: !isScanStatusBlocked(fileRecord.value.securityCheckStatus),
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
	await tryFetchFiles(element.value.id, FileRecordParentType.BOARDNODES);
	isLoadingFileRecord.value = false;
});

onMounted(async () => {
	await tryFetchFiles(element.value.id, FileRecordParentType.BOARDNODES);
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
	await tryFetchFiles(element.value.id, FileRecordParentType.BOARDNODES);
};

const tryFetchFiles = async (id: string, parentType: FileRecordParentType) => {
	try {
		await fetchFiles(id, parentType);
	} catch {
		addAlert(FileAlert.FILE_STORAGE_ERROR);
	}
};

const onUpdateAlternativeText = (value: string) => {
	modelValue.value.alternativeText = value;
};

const onUpdateCaption = (value: string) => {
	modelValue.value.caption = value;
};

const onUpdateName = useDebounceFn((value: string) => {
	rename(fileRecord.value.id, { fileName: value });
}, 300);

const onAddAlert = (alert: FileAlert) => {
	addAlert(alert);
};

const onDelete = async () => {
	const shouldDelete = await askDeletionForType("components.cardElement.fileElement");
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};

const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");

const isCollaboraEditable = computed(() => fileRecord.value?.isCollaboraEditable ?? false);

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);

const collaboraDescriptionHref = computed(() => {
	if (!isCollaboraEnabled.value || !isCollaboraEditable.value) {
		return undefined;
	}

	return router.resolve({
		name: "collabora",
		params: {
			id: fileRecord.value.id,
		},
		query: {
			edit: allowedOperations.value.createFileElement.toString(),
		},
	}).href;
});

const cardAriaLabel = computed(() => {
	if (isCollaboraEnabled.value && isCollaboraEditable.value) {
		return t("components.cardElement.fileElement.openOfficeDocument");
	}
	return undefined;
});

const onCardInteractionKeydown = (event: KeyboardEvent) => {
	const isEnterKey = event.key === "Enter" || event.code === "Enter" || event.keyCode === 13;

	if (isEnterKey) {
		onCardInteraction();
	}
};

const cardInteractionListeners = computed(() => {
	if (props.isEditMode) {
		return {};
	}

	return {
		click: onCardInteraction,
		keydown: onCardInteractionKeydown,
	};
});

const cardInteractionType = computed(() =>
	getFileCardInteractionType({
		hasFileRecord: !!fileRecord.value,
		isCollaboraEnabled: isCollaboraEnabled.value,
		isCollaboraEditable: isCollaboraEditable.value,
		mimeType: fileRecord.value?.mimeType,
		hasPreviewUrl: !!fileProperties.value?.previewUrl,
		isDownloadAllowed: !!fileProperties.value?.isDownloadAllowed,
	})
);

const onCardInteraction = () => {
	switch (cardInteractionType.value) {
		case FileCardInteractionType.Collabora:
			openCollabora();
			break;
		case FileCardInteractionType.Pdf:
			openPdf();
			break;
		case FileCardInteractionType.Image:
			openImageLightBox();
			break;
		case FileCardInteractionType.Download:
			onDownload();
			break;
		default:
			break;
	}
};

const onDownload = () => {
	downloadFile(fileRecord.value!.url, fileRecord.value!.name);
};

const openPdf = () => {
	window.open(fileRecord.value!.url, "_blank");
};

const openImageLightBox = () => {
	const altTranslation = t("components.cardElement.fileElement.emptyAlt");
	const altText = element.value.content.alternativeText
		? element.value.content.alternativeText
		: `${altTranslation} ${fileRecord.value!.name}`;

	const options: LightBoxOptions = {
		type: LightBoxContentType.IMAGE,
		downloadUrl: fileRecord.value!.url,
		previewUrl: convertDownloadToPreviewUrl(fileRecord.value!.url),
		alt: altText,
		name: fileRecord.value!.name,
	};

	const { open } = useLightBox();
	open(options);
};

const openCollabora = () => {
	window.open(collaboraDescriptionHref.value!, "_blank");
};
</script>
<style lang="scss" scoped>
/* show focus indicatator properly on all browsers */
.board-file-element-card:focus {
	outline-offset: 1px;
}
</style>
