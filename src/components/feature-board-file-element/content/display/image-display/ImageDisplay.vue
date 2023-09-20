<template>
	<div>
		<img
			class="rounded-t-sm image"
			loading="lazy"
			:src="previewUrl"
			:alt="name"
			@click="onClick"
		/>
	</div>
</template>

<script lang="ts">
import { PreviewOutputMimeTypes } from "@/fileStorageApi/v3";
import { useLightBox } from "@ui-light-box";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		url: { type: String, required: true },
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { open } = useLightBox();

		const onClick = () => {
			const previewUrl =
				props.url.replace("download", "preview") +
				`?outputFormat=${PreviewOutputMimeTypes.IMAGE_WEBP}`;

			const options = {
				url: previewUrl,
				alt: props.name,
				name: props.name,
			};
			open(options);
		};

		return {
			onClick,
		};
	},
});
</script>

<style scoped>
.image {
	display: block;
	margin-right: auto;
	margin-left: auto;
}
</style>
