<template>
	<ColorOverlay @on:action="openPdf" color="var(--v-black-base)">
		<v-img
			ref="imageRef"
			class="image rounded-t-sm"
			loading="lazy"
			:src="previewSrc"
			:alt="altText"
			:aspect-ratio="1.77777"
			position="top"
			@load="setWidth"
			:max-width="imageWidth"
		>
			<template v-slot:placeholder>
				<v-row class="fill-height ma-0" align="center" justify="center">
					<VProgressCircular color="primary" indeterminate :size="36" />
				</v-row>
			</template>
		</v-img>
	</ColorOverlay>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { PropType, defineComponent } from "vue";
import { ColorOverlay } from "@ui-color-overlay";
import { useI18n } from "@/composables/i18n.composable";
import { useNaturalwidth } from "../../../composables/NaturalWidth.composable";

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
		const { t } = useI18n();
		const { imageRef, imageWidth, setWidth } = useNaturalwidth();

		const openPdf = () => {
			window.open(props.src, "_blank");
		};

		const altText = `${t("components.cardElement.fileElement.emptyAlt")} ${
			props.name
		}`;

		return {
			openPdf,
			altText,
			imageRef,
			imageWidth,
			setWidth,
		};
	},
});
</script>

<style scoped>
.image {
	left: 50%;
	transform: translateX(-50%);
}
</style>
