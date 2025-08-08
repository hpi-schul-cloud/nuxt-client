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
	<CollaboraDisplay
		v-else-if="hasCollaboraMimeType && isCollaboraEnabled"
		:show-menu="showMenu"
	>
		<slot />
	</CollaboraDisplay>
</template>

<script setup lang="ts">
import {
	isAudioMimeType,
	isCollaboraMimeType,
	isPdfMimeType,
	isVideoMimeType,
} from "@/utils/fileHelper";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import CollaboraDisplay from "./collabora-display/CollaboraDisplay.vue";
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

interface Emits {
	(e: "add:alert", alert: FileAlert): void;
}
const emit = defineEmits<Emits>();

const envConfig = injectStrict(ENV_CONFIG_MODULE_KEY);

const hasVideoMimeType = computed(() => {
	return isVideoMimeType(props.fileProperties.mimeType);
});
const hasPdfMimeType = computed(() =>
	isPdfMimeType(props.fileProperties.mimeType)
);
const hasAudioMimeType = computed(() => {
	return isAudioMimeType(props.fileProperties.mimeType);
});
const hasCollaboraMimeType = computed(() => {
	return isCollaboraMimeType(props.fileProperties.mimeType);
});

const isCollaboraEnabled = computed(() => {
	return envConfig.getEnv.FEATURE_COLUMN_BOARD_COLLABORA_ENABLED;
});

const onAddAlert = (alert: FileAlert) => {
	emit("add:alert", alert);
};
</script>
