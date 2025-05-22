<template>
	<button v-if="isInteractive" @click="handleClick">
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

const { fileRecord } = defineProps({
	fileRecord: {
		type: Object as PropType<FileRecordItem>,
		required: true,
	},
});

const { t } = useI18n();

const isInteractive = computed(
	() => fileRecord.isSelectable && isPreviewPossible(fileRecord.previewStatus)
);

const handleClick = () => {
	openImageInLightbox();
};

const openImageInLightbox = () => {
	const previewUrl = convertDownloadToPreviewUrl(fileRecord.url);

	const options: LightBoxOptions = {
		downloadUrl: fileRecord.url,
		previewUrl: previewUrl,
		alt: `${t("components.cardElement.fileElement.emptyAlt")} ${fileRecord.name}`,
		name: fileRecord.name,
	};

	const { open } = useLightBox();

	open(options);
};
</script>
