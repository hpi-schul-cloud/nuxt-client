<template>
	<v-img
		v-if="isPreviewPossible(fileRecord.previewStatus)"
		:src="convertDownloadToPreviewUrl(fileRecord.url, FilePreviewWidth._500)"
		:alt="fileRecord.name"
		:aria-label="fileRecord.name"
		:aspect-ratio="1 / 1"
		cover
		:width="24"
	/>
	<v-icon v-else-if="isAudioMimeType(fileRecord.mimeType)">
		{{ mdiFileMusicOutline }}
	</v-icon>
	<v-icon v-else-if="isVideoMimeType(fileRecord.mimeType)">
		{{ mdiFileVideoOutline }}
	</v-icon>
	<v-icon v-else>{{ mdiFileDocumentOutline }}</v-icon>
</template>

<script setup lang="ts">
import { FilePreviewWidth } from "@/types/file/File";
import {
	convertDownloadToPreviewUrl,
	isAudioMimeType,
	isPreviewPossible,
	isVideoMimeType,
} from "@/utils/fileHelper";
import {
	mdiFileDocumentOutline,
	mdiFileMusicOutline,
	mdiFileVideoOutline,
} from "@icons/material";
import { defineProps, PropType } from "vue";
import { FileRecordItem } from "../types/filerecord-item";

defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
	fileRecord: {
		type: Object as PropType<FileRecordItem>,
		required: true,
	},
});
</script>
