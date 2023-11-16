<template>
	<ColorOverlay
		:isOverlayDisabled="isEditMode"
		@on:action="openLightBox"
		color="var(--v-black-base)"
	>
		<v-img
			class="rounded-t-sm"
			loading="lazy"
			:src="previewSrc"
			:alt="alternativeText"
			:aspect-ratio="1"
			contain
		>
			<template v-slot:placeholder>
				<v-row class="fill-height ma-0" align="center" justify="center">
					<VProgressCircular color="primary" indeterminate :size="36" />
				</v-row>
			</template>
		</v-img>

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
	components: { ContentElementBar, ColorOverlay },
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
