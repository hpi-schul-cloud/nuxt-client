<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
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
			<slot></slot>
		</AudioDisplay>
		<FileDescription
			:name="fileProperties.name"
			:caption="fileProperties.element.content.caption"
			:show-title="showTitle"
			:is-edit-mode="isEditMode"
		>
			<slot />
		</FileDescription>
	</div>
</template>

<script lang="ts">
import { isAudioMimeType, isVideoMimeType } from "@/utils/fileHelper";
import { computed, defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import AudioDisplay from "./audio-display/AudioDisplay.vue";
import FileDescription from "./file-description/FileDescription.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";

export default defineComponent({
	name: "FileDisplay",
	components: { ImageDisplay, FileDescription, VideoDisplay, AudioDisplay },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["video-error", "add:alert"],
	setup(props, { emit }) {
		const hasVideoMimeType = computed(() => {
			return isVideoMimeType(props.fileProperties.mimeType);
		});

		const hasAudioMimeType = computed(() => {
			return isAudioMimeType(props.fileProperties.mimeType);
		});

		const showTitle = computed(() => {
			return (
				!props.fileProperties.previewUrl &&
				!hasVideoMimeType.value &&
				!hasAudioMimeType.value
			);
		});

		const onAddAlert = (alert: FileAlert) => {
			emit("add:alert", alert);
		};

		return {
			hasVideoMimeType,
			hasAudioMimeType,
			showTitle,
			onAddAlert,
		};
	},
});
</script>
