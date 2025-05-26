<template>
	<button
		v-if="isInteractive"
		:aria-label="t('common.ariaLabel.openImageInLightBox')"
		class="interactive-area"
		@click="openImageInLightbox"
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
	isPreviewPossible,
} from "@/utils/fileHelper";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
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
		isPreviewPossible(fileRecordItem.previewStatus)
);

const openImageInLightbox = () => {
	const previewUrl = convertDownloadToPreviewUrl(fileRecordItem.url);

	const options: LightBoxOptions = {
		downloadUrl: fileRecordItem.url,
		previewUrl: previewUrl,
		alt: `${t("components.cardElement.fileElement.emptyAlt")} ${fileRecordItem.name}`,
		name: fileRecordItem.name,
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
