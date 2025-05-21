<template>
	<button v-if="isInteractive" @click="handleClick">
		<FilePreview :file-record="fileRecord" />
	</button>
	<div v-else :class="{ 'text-disabled': disabled }">
		<FilePreview :file-record="fileRecord" />
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { FileRecordItem } from "../types/filerecord-item";
import { isPreviewPossible } from "@/utils/fileHelper";
import FilePreview from "./FilePreview.vue";
import { openImageInLightbox } from "@util-files";
import { useI18n } from "vue-i18n";

const { fileRecord } = defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
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
	const altText = `${t("components.cardElement.fileElement.emptyAlt")} ${fileRecord.name}`;
	openImageInLightbox(fileRecord, altText);
};
</script>
