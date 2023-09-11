<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
			:preview-url="fileProperties.previewUrl"
			:name="fileProperties.name"
			:is-edit-mode="isEditMode"
		/>
		<DefaultDisplay v-else :name="fileProperties.name" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import DefaultDisplay from "./default-display/DefaultDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";

export default defineComponent({
	name: "FileDisplay",
	components: { ImageDisplay, DefaultDisplay },
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
});
</script>
