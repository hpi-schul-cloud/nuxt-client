<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
			:preview-url="fileProperties.previewUrl"
			:name="fileProperties.name"
			:is-edit-mode="isEditMode"
		/>
		<DefaultDisplay :name="fileProperties.name" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DefaultDisplay from "./DefaultDisplay.vue";
import ImageDisplay from "./ImageDisplay.vue";
import { FileProperties } from "./types/file-properties";

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
