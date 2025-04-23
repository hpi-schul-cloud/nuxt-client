<template>
	<div>
		<v-img
			v-if="isPreviewPossible(filerecord.previewStatus)"
			:src="convertDownloadToPreviewUrl(filerecord.url, PreviewWidth._500)"
			:alt="filerecord.name"
			:aria-label="filerecord.name"
			:aspect-ratio="1 / 1"
			cover
			:width="24"
		/>
		<v-icon v-else-if="isAudioMimeType(filerecord.mimeType)">{{
			mdiFileMusicOutline
		}}</v-icon>
		<v-icon v-else-if="isVideoMimeType(filerecord.mimeType)">{{
			mdiFileVideoOutline
		}}</v-icon>
		<v-icon v-else>{{ mdiFileOutline }}</v-icon>
	</div>
</template>

<script setup lang="ts">
import { FileRecordResponse, PreviewWidth } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isAudioMimeType,
	isPreviewPossible,
	isVideoMimeType,
} from "@/utils/fileHelper";
import {
	mdiFileMusicOutline,
	mdiFileOutline,
	mdiFileVideoOutline,
} from "@icons/material";
import { defineProps, PropType } from "vue";

defineProps({
	filerecord: {
		type: Object as PropType<FileRecordResponse>,
		required: true,
	},
});
</script>
