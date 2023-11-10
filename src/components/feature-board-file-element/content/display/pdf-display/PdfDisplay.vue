<template>
	<ColorOverlay @on:action="openPdf" color="var(--v-black-base)">
		<div v-if="isImageLoading" class="d-flex justify-center align-center w-100">
			<VProgressCircular color="primary" indeterminate :size="36" />
		</div>

		<img
			v-if="!isImageLoading"
			class="rounded-t-sm"
			loading="lazy"
			:src="previewSrc"
			:alt="$t('components.cardElement.fileElement.pdfAlt') + name"
		/>
	</ColorOverlay>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { PropType, defineComponent, computed } from "vue";
import { ColorOverlay } from "@ui-color-overlay";
import { usePreloadedImage } from "../../../composables/preloadedImage.composable";

export default defineComponent({
	name: "PdfDisplay",
	props: {
		src: { type: String, required: true },
		previewSrc: { type: String, required: true },
		name: { type: String, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	components: { ColorOverlay },
	setup(props) {
		const openPdf = () => {
			window.open(props.src, "_blank");
		};
		const previewSrc = computed(() => {
			return props.previewSrc;
		});
		const { isImageLoading } = usePreloadedImage(previewSrc.value);

		return {
			openPdf,
			isImageLoading,
		};
	},
});
</script>

<style scoped>
img {
	pointer-events: none;
	display: block;
	margin-right: auto;
	margin-left: auto;
	width: 100%;
	object-fit: cover;
	object-position: top;
	aspect-ratio: 16/9;
}
</style>
