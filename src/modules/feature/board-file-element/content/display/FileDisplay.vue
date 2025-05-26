<template>
	<PdfDisplay
		v-if="hasPdfMimeType && fileProperties.previewUrl"
		:src="fileProperties.url"
		:preview-src="fileProperties.previewUrl"
		:name="fileProperties.name"
		:is-edit-mode="isEditMode"
		:element="fileProperties.element"
		:show-menu="showMenu"
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
		:show-menu="showMenu"
	>
		<slot />
	</ImageDisplay>
	<VideoDisplay
		v-else-if="hasVideoMimeType"
		:src="fileProperties.url"
		:name="fileProperties.name"
		:show-menu="showMenu"
		@error="onAddAlert"
	>
		<slot />
	</VideoDisplay>
	<AudioDisplay
		v-else-if="hasAudioMimeType"
		:src="fileProperties.url"
		:show-menu="showMenu"
		@error="onAddAlert"
	>
		<slot />
	</AudioDisplay>
</template>

<script setup lang="ts">
import { FileAlert } from "@/types/file/FileAlert.enum";
import {
	isAudioMimeType,
	isPdfMimeType,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { computed, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import PdfDisplay from "./pdf-display/PdfDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<FileProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
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
