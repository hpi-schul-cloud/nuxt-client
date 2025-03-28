<template>
	<ContentElementBar class="image-display menu">
		<template #display>
			<div
				class="d-flex align-center focusable-container"
				style="min-height: 52px"
				tabindex="0"
				role="button"
				data-testid="image-thumbnail-in-card"
				@click="openLightBox"
				@keydown.enter.space="openLightBox"
			>
				<div class="w-100 h-100 image-container">
					<PreviewImage
						:src="previewSrc"
						:alt="alternativeText"
						:cover="false"
						@error="onImageError"
						:max-height="336"
					/>
				</div>
			</div>
		</template>
		<template v-if="showMenu" #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { ContentElementBar } from "@ui-board";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { PreviewImage } from "@ui-preview-image";
import { PropType, computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		src: { type: String, required: true },
		previewSrc: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
		showMenu: { type: Boolean, required: true },
	},
	components: {
		ContentElementBar,
		PreviewImage,
	},
	setup(props) {
		const { t } = useI18n();
		const hasImageError = ref(false);

		const alternativeText = computed(() => {
			const altTranslation = t("components.cardElement.fileElement.emptyAlt");
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

		const onImageError = () => {
			hasImageError.value = true;
		};

		return {
			alternativeText,
			openLightBox,
			onImageError,
			hasImageError,
		};
	},
});
</script>
<style scoped lang="scss">
/* show focus indicator in Safari properly */
.focusable-container:focus {
	outline: 2px solid -webkit-focus-ring-color;
	outline-offset: -2px;
}

/* Ensure the focus indicator is visible and not obscured by the image */
.image-container {
	position: relative;
	z-index: -1;
}
</style>
