<template>
	<div>
		<v-img
			v-if="isPreviewPossible(fileRecord.previewStatus)"
			:src="convertDownloadToPreviewUrl(fileRecord.url, FilePreviewWidth._500)"
			:alt="fileRecord.name"
			:aria-label="fileRecord.name"
			:aspect-ratio="1 / 1"
			cover
			:width="24"
		/>
		<v-icon v-else-if="isAudioMimeType(fileRecord.mimeType)">{{
			mdiFileMusicOutline
		}}</v-icon>
		<v-icon v-else-if="isVideoMimeType(fileRecord.mimeType)">{{
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
	fileRecord: {
		type: Object as PropType<FileRecord>,
		required: true,
	},
});
</script>
