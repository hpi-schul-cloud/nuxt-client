<template>
	<ColorOverlay
		:isOverlayDisabled="isEditMode"
		@on:action="openPdf"
		color="var(--v-black-base)"
	>
		<img
			class="image-display-image rounded-t-sm"
			loading="lazy"
			:src="previewSrc"
			:alt="alternativeText"
		/>
	</ColorOverlay>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { PropType, computed, defineComponent } from "vue";
import { ColorOverlay } from "@ui-color-overlay";

export default defineComponent({
	name: "PdfDisplay",
	props: {
		src: { type: String, required: true },
		previewSrc: { type: String, required: false },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	components: { ColorOverlay },
	setup(props) {
		const i18n = injectStrict(I18N_KEY);

		const alternativeText = computed(() => {
			const altTranslation = i18n.t(
				"components.cardElement.fileElement.emptyAlt"
			);
			const altText = props.element.content.alternativeText
				? props.element.content.alternativeText
				: `${altTranslation} ${props.name}`;

			return altText;
		});

		const openPdf = () => {
			window.open(props.src, "_blank");
		};

		return {
			alternativeText,
			openPdf,
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
	max-height: 185px;
	width: 100%;
	object-fit: cover;
	object-position: top;
}

.menu {
	position: absolute;
	top: 0px;
	right: 0px;
}
</style>
