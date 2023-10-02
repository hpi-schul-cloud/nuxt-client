<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
			:preview-url="fileProperties.previewUrl"
			:name="fileProperties.name"
			:is-edit-mode="isEditMode"
			:element="fileProperties.element"
		>
			<slot></slot>
		</ImageDisplay>
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
import { defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import FileDescription from "./file-description/FileDescription.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";

export default defineComponent({
	name: "FileDisplay",
	components: { ImageDisplay, FileDescription },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
});
</script>
