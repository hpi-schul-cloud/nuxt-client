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
			<div v-if="hover || focused" class="image-display-overlay rounded-t-sm">
				<v-icon class="image-display-icon" size="44">{{
					mdiMagnifyExpand
				}}</v-icon>
			</div>

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
import { mdiMagnifyExpand } from "@mdi/js";
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
			const previewUrl = convertDownloadToPreviewUrl(props.url);

			const options = {
				url: previewUrl,
				alt: props.name,
				name: props.name,
			};
			open(options);
		};

		return {
			alternativeText,
			containerRef,
			focused,
			mdiMagnifyExpand,
			onClick,
		};
	},
});
</script>

<style scoped>
.image-display-container {
	position: relative;
}

.image-display-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: var(--layer-page);
	background: rgba(27, 27, 27, 0.54);
}

.image-display-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--v-white-base);
}
.image-display-image {
	pointer-events: none;
	display: block;
	margin-right: auto;
	margin-left: auto;
}
</style>
