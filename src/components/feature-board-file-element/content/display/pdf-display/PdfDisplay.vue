<template>
	<ColorOverlay @on:action="openPdf" color="var(--v-black-base)">
		<v-img
			class="rounded-t-sm"
			loading="lazy"
			:src="previewSrc"
			:alt="$t('components.cardElement.fileElement.pdfAlt') + name"
			:aspect-ratio="1.77777"
			position="top"
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

		return {
			openPdf,
		};
	},
});
</script>

<style scoped>
img {
	pointer-events: none;
}
</style>
