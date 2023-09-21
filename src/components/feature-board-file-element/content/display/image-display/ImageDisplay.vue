<template>
	<div class="image-display-container">
		<v-icon class="image-display-icon" size="44">{{ mdiMagnifyExpand }}</v-icon>
		<img
			class="image-display-image rounded-t-sm"
			loading="lazy"
			:src="previewUrl"
			:alt="name"
			@click="onClick"
		/>
	</div>
</template>

<script lang="ts">
import { PreviewOutputMimeTypes } from "@/fileStorageApi/v3";
import { mdiMagnifyExpand } from "@mdi/js";
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
			mdiMagnifyExpand,
			onClick,
		};
	},
});
</script>

<style scoped>
.image-display-container {
	position: relative;
}

.image-display-container:hover .image-display-icon {
	display: block;
}
.image-display-image {
	display: block;
	margin-right: auto;
	margin-left: auto;
}

.image-display-image:hover {
	border-radius: 3px 3px 0px 0px;
	opacity: 0.54;
	background: var(--shades-v-black-base, #1b1b1b);
}

.image-display-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: var(--layer-page);
	transform: translate(-50%, -50%);
	display: none;
	color: var(--shades-v-white-base, #fff);
}
</style>
