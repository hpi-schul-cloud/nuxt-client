<template>
	<PdfDisplay
		v-if="hasPdfMimeType && fileProperties.previewUrl"
		:src="fileProperties.url"
		:preview-src="fileProperties.previewUrl"
		:name="fileProperties.name"
		:is-edit-mode="isEditMode"
		:element="fileProperties.element"
	>
		<slot />
	</PdfDisplay>
	<ImageDisplay
		v-else-if="fileProperties.previewUrl"
		:src="fileProperties.url"
		:preview-src="fileProperties.previewUrl"
		:name="fileProperties.name"
		:is-edit-mode="isEditMode"
		:element="fileProperties.element"
	>
		<slot />
	</ImageDisplay>
	<VideoDisplay
		v-else-if="hasVideoMimeType"
		:src="fileProperties.url"
		:name="fileProperties.name"
		@error="onAddAlert"
	>
		<slot />
	</VideoDisplay>
	<AudioDisplay
		v-else-if="hasAudioMimeType"
		:src="fileProperties.url"
		@error="onAddAlert"
	>
		<slot />
	</AudioDisplay>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";
import PdfDisplay from "./pdf-display/PdfDisplay.vue";
import {
	isAudioMimeType,
	isPdfMimeType,
	isVideoMimeType,
} from "@/utils/fileHelper";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<FileProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});
const emit = defineEmits(["video-error", "add:alert"]);

const hasVideoMimeType = computed(() => {
	return isVideoMimeType(props.fileProperties.mimeType);
});
const hasPdfMimeType = computed(() =>
	isPdfMimeType(props.fileProperties.mimeType)
);
const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.fileProperties.mimeType);
});

const onAddAlert = (alert: FileAlert) => {
	emit("add:alert", alert);
};
</script>
