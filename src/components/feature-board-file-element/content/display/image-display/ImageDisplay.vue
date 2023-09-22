<template>
	<div
		class="image-display-container"
		tabindex="0"
		@click="onClick"
		@keydown.enter.self="onClick"
		@keydown.space.prevent="onClick"
	>
		<div class="image-display-overlay">
			<v-icon class="image-display-icon" size="44">{{
				mdiMagnifyExpand
			}}</v-icon>
		</div>

		<img
			class="image-display-image rounded-t-sm"
			loading="lazy"
			:src="previewUrl"
			:alt="name"
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

.image-display-container:hover .image-display-overlay,
.image-display-container:focus .image-display-overlay {
	display: block;
}

.image-display-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: var(--layer-page);
	display: none;
	background: rgba(27, 27, 27, 0.54);
}

.image-display-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--v-white-base);
}

.image-display-image {
	display: block;
	margin-right: auto;
	margin-left: auto;
}
</style>
