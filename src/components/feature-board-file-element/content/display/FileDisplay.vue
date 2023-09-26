<template>
	<div>
		<ImageDisplay
			v-if="fileProperties.previewUrl"
			:preview-url="fileProperties.previewUrl"
			:name="fileProperties.name"
			:is-edit-mode="isEditMode"
			:element="fileProperties.element"
		/>
		<FileDescription
			:name="name"
			:caption="fileProperties.element.content.caption"
			:is-edit-mode="isEditMode"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
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
	setup(props) {
		const name = computed(() => {
			const result = props.fileProperties.previewUrl
				? undefined
				: props.fileProperties.name;

			return result;
		});

		return {
			name,
		};
	},
});
</script>
