<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
			:url="fileProperties.url"
			:preview-url="fileProperties.previewUrl"
			:name="fileProperties.name"
			:is-edit-mode="isEditMode"
			:element="fileProperties.element"
		>
			<slot></slot>
		</ImageDisplay>
		<VideoDisplay
			v-else-if="showVideoDisplay"
			:src="fileProperties.url"
			:name="fileProperties.name"
		>
			<slot></slot>
		</VideoDisplay>
		<FileDescription
			:name="fileProperties.name"
			:caption="fileProperties.element.content.caption"
			:show-title="!fileProperties.previewUrl"
			:is-edit-mode="isEditMode"
		>
			<slot></slot>
		</FileDescription>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import FileDescription from "./file-description/FileDescription.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";

export default defineComponent({
	name: "FileDisplay",
	components: { ImageDisplay, FileDescription, VideoDisplay },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const showVideoDisplay = computed(() => {
			const { mimeType } = props.fileProperties;
			const result =
				mimeType.startsWith("video/") ||
				mimeType === "application/x-mpegURL" ||
				mimeType === "application/vnd.ms-asf" ||
				mimeType === "application/ogg";

			return result;
		});

		return {
			showVideoDisplay,
		};
	},
});
</script>
