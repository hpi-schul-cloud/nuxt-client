<template>
	<div>
		<v-img
			v-if="isPreviewPossible(filerecord.previewStatus)"
			:src="convertDownloadToPreviewUrl(filerecord.url, FilePreviewWidth._500)"
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
		<v-icon v-else>{{ mdiFileDocumentOutline }}</v-icon>
	</div>
</template>

<script setup lang="ts">
import { FilePreviewWidth, FileRecord } from "@/types/file/File";
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

defineProps({
	filerecord: {
		type: Object as PropType<FileRecord>,
		required: true,
	},
});
</script>
