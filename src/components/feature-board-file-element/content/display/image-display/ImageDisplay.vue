<template>
	<ColorOverlay
		:isOverlayDisabled="isEditMode"
		@on:action="openLightBox"
		color="var(--v-black-base)"
	>
		<div v-if="isImageLoading" class="d-flex justify-center align-center w-100">
			<VProgressCircular color="primary" indeterminate :size="36" />
		</div>

		<img
			v-if="!isImageLoading"
			class="image-display-image rounded-t-sm"
			loading="lazy"
			:src="previewSrc"
			:alt="alternativeText"
		/>

		<ContentElementBar class="menu">
			<template #menu><slot /></template>
		</ContentElementBar>
	</ColorOverlay>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { PropType, computed, defineComponent, ref, onMounted } from "vue";
import { ContentElementBar } from "@ui-board";
import { ColorOverlay } from "@ui-color-overlay";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		src: { type: String, required: true },
		previewSrc: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	components: { ContentElementBar, ColorOverlay },
	setup(props) {
		const isImageLoading = ref(true);
		const i18n = injectStrict(I18N_KEY);

		onMounted(() => {
			const img = new Image();
			img.src = props.previewSrc;
			img.onload = () => {
				isImageLoading.value = false;
			};
		});

		const alternativeText = computed(() => {
			const altTranslation = i18n.t(
				"components.cardElement.fileElement.emptyAlt"
			);
			const altText = props.element.content.alternativeText
				? props.element.content.alternativeText
				: `${altTranslation} ${props.name}`;

			return altText;
		});

		const openLightBox = () => {
			const previewUrl = convertDownloadToPreviewUrl(props.src);

			const options: LightBoxOptions = {
				downloadUrl: props.src,
				previewUrl: previewUrl,
				alt: alternativeText.value,
				name: props.name,
			};

			const { open } = useLightBox();

			open(options);
		};

		return {
			alternativeText,
			openLightBox,
			isImageLoading,
		};
	},
});
</script>

<style scoped>
.image-display-image {
	pointer-events: none;
	display: block;
	margin-right: auto;
	margin-left: auto;
}

.menu {
	position: absolute;
	top: 0px;
	right: 0px;
}
</style>
