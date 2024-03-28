<template>
	<ContentElementBar class="image-display menu">
		<template #display>
			<div
				class="d-flex align-center"
				style="min-height: 52px"
				@click="openLightBox"
			>
				<div class="w-100 h-100">
					<PreviewImage
						:src="previewSrc"
						:alt="alternativeText"
						:cover="true"
						@error="onImageError"
					/>
				</div>
			</div>
		</template>
		<template #menu>
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
.image-display:focus {
	outline: none;
}
</style>
