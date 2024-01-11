<template>
	<ColorOverlay
		:isOverlayDisabled="isEditMode"
		@on:action="openPdf"
		color="rgba(var(--v-theme-black))"
	>
		<PreviewImage
			:src="previewSrc"
			:alt="altText"
			:aspect-ratio="1.77777"
			position="top"
			class="rounded-t"
		/>

		<ContentElementBar class="menu">
			<template #menu><slot /></template>
		</ContentElementBar>
	</ColorOverlay>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { PropType, defineComponent } from "vue";
import { ColorOverlay } from "@ui-color-overlay";
import { PreviewImage } from "@ui-preview-image";
import { useI18n } from "vue-i18n";
import { ContentElementBar } from "@ui-board";

export default defineComponent({
	name: "PdfDisplay",
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
		name: { type: String, required: true },
		previewSrc: { type: String, required: true },
		src: { type: String, required: true },
	},
	components: { ContentElementBar, ColorOverlay, PreviewImage },
	setup(props) {
		const { t } = useI18n();

		const openPdf = () => {
			window.open(props.src, "_blank");
		};

		const altText = `${t("components.cardElement.fileElement.pdfAlt")} ${
			props.name
		}`;

		return {
			openPdf,
			altText,
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
