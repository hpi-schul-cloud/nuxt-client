<template>
	<button
		v-if="isInteractive"
		:aria-label="t('common.ariaLabel.openImageInLightBox')"
		class="interactive-area"
		@click="handleClick"
	>
		<slot />
	</button>
	<div v-else>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { FileRecordItem } from "../types/filerecord-item";
import {
	convertDownloadToPreviewUrl,
	isAudioMimeType,
	isPdfMimeType,
	isPreviewPossible,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { useBoardPermissions } from "@data-board";
import { useEnvConfig } from "@data-env";
import { LightBoxContentType, useLightBox } from "@ui-light-box";
import { mapEditBoardPermissionToEditorMode } from "@util-board";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { fileRecordItem } = defineProps({
	fileRecordItem: {
		type: Object as PropType<FileRecordItem>,
		required: true,
	},
});

const { t } = useI18n();
const router = useRouter();
const { hasEditPermission } = useBoardPermissions();

const isInteractive = computed(
	() =>
		fileRecordItem.isSelectable &&
		(isPreviewPossible(fileRecordItem.previewStatus) ||
			isAudioMimeType(fileRecordItem.mimeType) ||
			isVideoMimeType(fileRecordItem.mimeType) ||
			isPdfMimeType(fileRecordItem.mimeType) ||
			(isCollaboraEnabled.value && fileRecordItem.isCollaboraEditable))
);

const handleClick = () => {
	const hasPreview = isPreviewPossible(fileRecordItem.previewStatus);
	const isAudio = isAudioMimeType(fileRecordItem.mimeType);
	const isVideo = isVideoMimeType(fileRecordItem.mimeType);
	const isPdf = isPdfMimeType(fileRecordItem.mimeType);
	const isCollabora = fileRecordItem.isCollaboraEditable;

	if (isPdf) {
		window.open(fileRecordItem.url, "_blank");
	} else if (hasPreview) {
		openImageInLightbox();
	} else if (isAudio) {
		openAudioPlayerInLightbox();
	} else if (isVideo) {
		openVideoInLightbox();
	} else if (isCollabora) {
		openCollabora();
	}
};

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);

const openImageInLightbox = () => {
	const previewUrl = convertDownloadToPreviewUrl(fileRecordItem.url);

	const options = {
		type: LightBoxContentType.IMAGE,
		downloadUrl: fileRecordItem.url,
		previewUrl: previewUrl,
		alt: `${t("components.cardElement.fileElement.emptyAlt")} ${fileRecordItem.name}`,
		name: fileRecordItem.name,
	};

	const { open } = useLightBox();

	open(options);
};

const openAudioPlayerInLightbox = () => {
	const options = {
		type: LightBoxContentType.AUDIO,
		downloadUrl: fileRecordItem.url,
		name: fileRecordItem.name,
		alt: `${t("components.cardElement.fileElement.emptyAlt")} ${fileRecordItem.name}`,
	};

	const { open } = useLightBox();

	open(options);
};

const openVideoInLightbox = () => {
	const options = {
		type: LightBoxContentType.VIDEO,
		downloadUrl: fileRecordItem.url,
		name: fileRecordItem.name,
		alt: `${t("components.cardElement.fileElement.emptyAlt")} ${fileRecordItem.name}`,
	};

	const { open } = useLightBox();

	open(options);
};

const openCollabora = () => {
	const editorMode = mapEditBoardPermissionToEditorMode(hasEditPermission.value);

	const url = router.resolve({
		name: "collabora",
		params: {
			id: fileRecordItem.id,
		},
		query: {
			editorMode,
		},
	}).href;

	window.open(url, "_blank");
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.interactive-area {
	width: 100%;
	text-align: left;

	@media #{map.get($display-breakpoints, 'xs')} {
		width: initial;
	}
}
</style>
