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
import {
	convertDownloadToPreviewUrl,
	isAudioMimeType,
	isPreviewPossible,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { LightBoxContentType, useLightBox } from "@ui-light-box";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { FileRecordItem } from "../types/filerecord-item";

const { fileRecordItem } = defineProps({
	fileRecordItem: {
		type: Object as PropType<FileRecordItem>,
		required: true,
	},
});

const { t } = useI18n();

const isInteractive = computed(
	() =>
		fileRecordItem.isSelectable &&
		(isPreviewPossible(fileRecordItem.previewStatus) ||
			isAudioMimeType(fileRecordItem.mimeType) ||
			isVideoMimeType(fileRecordItem.mimeType))
);

const handleClick = () => {
	if (isPreviewPossible(fileRecordItem.previewStatus)) {
		openImageInLightbox();
	} else if (isAudioMimeType(fileRecordItem.mimeType)) {
		openAudioPlayerInLightbox();
	} else if (isVideoMimeType(fileRecordItem.mimeType)) {
		openVideoInLightbox();
	} else {
		// do nothing
	}
};

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
