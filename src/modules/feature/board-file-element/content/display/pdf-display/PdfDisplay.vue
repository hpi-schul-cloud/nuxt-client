<template>
	<ContentElementBar class="pdf-display">
		<template #display>
			<div @click="openPdf">
				<PreviewImage
					:src="previewSrc"
					:alt="altText"
					:aspect-ratio="1.77777"
					position="top"
					:cover="true"
				/>
			</div>
		</template>
		<template #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { ContentElementBar } from "@ui-board";
import { PreviewImage } from "@ui-preview-image";
import { PropType, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "PdfDisplay",
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
		name: { type: String, required: true },
		previewSrc: { type: String, required: true },
		src: { type: String, required: true },
	},
	components: { ContentElementBar, PreviewImage },
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
<style scoped lang="scss">
.pdf-display:focus {
	outline: none;
}
</style>
