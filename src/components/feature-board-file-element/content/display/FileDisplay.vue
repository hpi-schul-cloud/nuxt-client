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
			<slot></slot>
		</ImageDisplay>
		<VideoDisplay
			v-else-if="hasVideoMimeType"
			:src="fileProperties.url"
			:name="fileProperties.name"
			@error="onAddAlert"
		>
			<slot></slot>
		</VideoDisplay>
		<FileDescription
			:name="fileProperties.name"
			:caption="fileProperties.element.content.caption"
			:show-title="showTitle"
			:is-edit-mode="isEditMode"
			:src="pdfSrc"
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
import { isVideoMimeType } from "@/utils/fileHelper";
import { FileAlert } from "../../shared/types/FileAlert.enum";

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
	emits: ["video-error", "add:alert"],
	setup(props, { emit }) {
		const hasVideoMimeType = computed(() => {
			return isVideoMimeType(props.fileProperties.mimeType);
		});

		const pdfSrc = computed(() => {
			return props.fileProperties.mimeType === "application/pdf"
				? props.fileProperties.url
				: undefined;
		});

		const showTitle = computed(() => {
			return !props.fileProperties.previewUrl && !hasVideoMimeType.value;
		});

		const onAddAlert = (alert: FileAlert) => {
			emit("add:alert", alert);
		};

		return {
			hasVideoMimeType,
			pdfSrc,
			showTitle,
			onAddAlert,
		};
	},
});
</script>
