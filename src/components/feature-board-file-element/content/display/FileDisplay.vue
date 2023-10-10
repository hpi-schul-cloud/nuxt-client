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
			v-else-if="hasVideoMimeType"
			:src="fileProperties.url"
			:name="fileProperties.name"
		>
			<slot></slot>
		</VideoDisplay>
		<FileDescription
			:name="fileProperties.name"
			:caption="fileProperties.element.content.caption"
			:show-title="showTitle"
			:is-edit-mode="isEditMode"
		>
			<slot></slot>
		</FileDescription>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import FileDescription from "./file-description/FileDescription.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";
import VideoDisplay from "./video-display/VideoDisplay.vue";
import { isVideoMimeType } from "../../../../utils/fileHelper";

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
		const hasVideoMimeType = computed(() => {
			return isVideoMimeType(props.fileProperties.mimeType);
		});

		const showTitle = computed(() => {
			return !props.fileProperties.previewUrl && !hasVideoMimeType.value;
		});

		return {
			hasVideoMimeType,
			showTitle,
		};
	},
});
</script>
