<template>
	<v-hover v-slot="{ hover }">
		<div
			class="image-display-container"
			ref="containerRef"
			tabindex="0"
			@click="onClick"
			@keydown.enter.self="onClick"
			@keydown.space.prevent="onClick"
		>
			<div
				v-if="!isEditMode && (hover || focused)"
				class="image-display-overlay rounded-t-sm"
			></div>

			<img
				class="image-display-image rounded-t-sm"
				loading="lazy"
				:src="previewUrl"
				:alt="alternativeText"
			/>
		</div>
	</v-hover>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { useLightBox } from "@ui-light-box";
import { useFocus } from "@vueuse/core";
import { PropType, computed, defineComponent, ref } from "vue";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		url: { type: String, required: true },
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);

		const containerRef = ref<HTMLDivElement | undefined>();

		const { focused } = useFocus(containerRef);
		const { open } = useLightBox();

		const alternativeText = computed(() => {
			const altTranslation = i18n.t(
				"components.cardElement.fileElement.emptyAlt"
			);
			const altText = props.element.content.alternativeText
				? props.element.content.alternativeText
				: `${altTranslation} ${props.name}`;

			return altText;
		});

		const onClick = () => {
			if (!props.isEditMode) {
				const previewUrl = convertDownloadToPreviewUrl(props.url);

				const options = {
					url: props.url,
					previewUrl: previewUrl,
					alt: alternativeText.value,
					name: props.name,
				};
				open(options);
			}
		};

		return {
			alternativeText,
			containerRef,
			focused,
			onClick,
		};
	},
});
</script>

<style scoped>
.image-display-container {
	position: relative;
	min-height: 52px;
	display: flex;
	align-items: center;
}

.image-display-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--v-black-base);
	opacity: 0.2;
}

.image-display-image {
	pointer-events: none;
	display: block;
	margin-right: auto;
	margin-left: auto;
}
</style>
