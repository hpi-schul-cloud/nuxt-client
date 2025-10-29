<template>
	<PdfDisplay
		v-if="hasPdfMimeType && fileProperties.previewUrl"
		:src="fileProperties.url"
		:preview-src="fileProperties.url"
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
	<AudioDisplay v-else-if="hasAudioMimeType" :src="fileProperties.url" :show-menu="showMenu" @error="onAddAlert">
		<slot />
	</AudioDisplay>
	<CollaboraDisplay v-else-if="hasCollaboraMimeType && isCollaboraEnabled" :show-menu="showMenu">
		<slot />
	</CollaboraDisplay>
</template>

<script setup lang="ts">
import { FileProperties } from "../../shared/types/file-properties";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import CollaboraDisplay from "./collabora-display/CollaboraDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import PdfDisplay from "./pdf-display/PdfDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";
import { isAudioMimeType, isPdfMimeType, isVideoMimeType } from "@/utils/fileHelper";
import { useEnvConfig } from "@data-env";
import { computed, PropType } from "vue";

const props = defineProps({
	fileProperties: {
		type: Object as PropType<FileProperties>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
});

interface Emits {
	(e: "add:alert", alert: FileAlert): void;
}
const emit = defineEmits<Emits>();

const hasVideoMimeType = computed(() => isVideoMimeType(props.fileProperties.mimeType));
const hasPdfMimeType = computed(() => isPdfMimeType(props.fileProperties.mimeType));
const hasAudioMimeType = computed(() => isAudioMimeType(props.fileProperties.mimeType));
const hasCollaboraMimeType = computed(() => props.fileProperties.isCollaboraEditable);

const isCollaboraEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED);

const onAddAlert = (alert: FileAlert) => {
	emit("add:alert", alert);
};
</script>
