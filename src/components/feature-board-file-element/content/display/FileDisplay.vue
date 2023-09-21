<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
			:preview-url="fileProperties.previewUrl"
			:name="fileProperties.name"
			:is-edit-mode="isEditMode"
		/>
		<VideoDisplay
			v-else-if="canPlayVideo"
			:src="fileProperties.url"
			:name="fileProperties.name"
		/>
		<DefaultDisplay v-else :name="fileProperties.name" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import DefaultDisplay from "./default-display/DefaultDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";

export default defineComponent({
	name: "FileDisplay",
	components: { ImageDisplay, DefaultDisplay, VideoDisplay },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const canPlayVideo = computed(() => {
			const videoElement = document.createElement("video");
			const canPlayMimeType =
				videoElement.canPlayType(props.fileProperties.mimeType) === "maybe";

			return canPlayMimeType;
		});

		return {
			canPlayVideo,
		};
	},
});
</script>
