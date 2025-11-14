<template>
	<v-img
		v-if="isPreviewPossible(fileRecord.previewStatus)"
		:src="convertDownloadToPreviewUrl(fileRecord.url, srcWidth)"
		:alt="fileRecord.name"
		:aria-label="fileRecord.name"
		:aspect-ratio="aspectRatio"
		cover
		:width="previewWidth"
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
import { PreviewWidth } from "@/fileStorageApi/v3";
import { FileRecord } from "@/types/file/File";
import { convertDownloadToPreviewUrl, isAudioMimeType, isPreviewPossible, isVideoMimeType } from "@/utils/fileHelper";
import { mdiFileDocumentOutline, mdiFileMusicOutline, mdiFileVideoOutline } from "@icons/material";
import { computed, PropType, ref, watch } from "vue";
import { useDisplay } from "vuetify";

defineProps({
	fileRecord: {
		type: Object as PropType<FileRecord>,
		required: true,
	},
});

const { xs } = useDisplay();

const previewWidth = computed(() => (xs.value ? 96 : 24));
const aspectRatio = computed(() => (xs.value ? undefined : 1));

const srcWidth = ref(xs.value ? PreviewWidth._150 : PreviewWidth._50);

watch(xs, (newValue, oldValue) => {
	if (!oldValue && newValue) {
		srcWidth.value = PreviewWidth._150;
	}
});
</script>
