<template>
	<ColorOverlay
		:isOverlayDisabled="isEditMode"
		@on:action="openLightBox"
		color="var(--v-black-base)"
	>
		<PreviewImage
			:src="previewSrc"
			:alt="alternativeText"
			:contain="true"
			class="rounded-t"
		/>

		<ContentElementBar class="menu">
			<template #menu><slot /></template>
		</ContentElementBar>
	</ColorOverlay>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { PropType, computed, defineComponent } from "vue";
import { ContentElementBar } from "@ui-board";
import { ColorOverlay } from "@ui-color-overlay";
import { PreviewImage } from "@ui-preview-image";
import { useI18n } from "@/composables/i18n.composable";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		src: { type: String, required: true },
		previewSrc: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	components: { ContentElementBar, ColorOverlay, PreviewImage },
	setup(props) {
		const { t } = useI18n();

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

		return {
			alternativeText,
			openLightBox,
		};
	},
});
</script>

<style scoped>
.menu {
	position: absolute;
	top: 0px;
	right: 0px;
}
</style>
