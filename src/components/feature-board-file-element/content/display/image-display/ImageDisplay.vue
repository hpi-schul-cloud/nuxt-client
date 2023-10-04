<template>
	<v-hover v-model="isHovered">
		<div
			class="image-display-container"
			ref="containerRef"
			:tabindex="isDesktop ? 0 : -1"
			@click.stop.prevent="onClick"
			@keydown.enter.stop="onKeyDown"
			@keydown.space.stop="onKeyDown"
			@focusin="isFocused = true"
			@focusout="isFocused = false"
		>
			<div
				v-if="!isEditMode && isDesktop && (isFocused || isHovered)"
				class="image-display-overlay rounded-t-sm"
			></div>

			<img
				class="image-display-image rounded-t-sm"
				loading="lazy"
				:src="previewUrl"
				:alt="alternativeText"
			/>

			<v-app-bar flat color="transparent" class="menu">
				<v-spacer></v-spacer>
				<slot></slot>
			</v-app-bar>
		</div>
	</v-hover>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { useMediaQuery } from "@vueuse/core";
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
		const isFocused = ref(false);
		const isHovered = ref(false);

		const isDesktop = useMediaQuery(DeviceMediaQuery.Desktop);

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
				openLightBox();
			}
			if (isDesktop) {
				containerRef.value?.blur();
			}
		};

		const onKeyDown = () => {
			if (!props.isEditMode) {
				openLightBox();
			}
		};

		const openLightBox = () => {
			const previewUrl = convertDownloadToPreviewUrl(props.url);

			const options: LightBoxOptions = {
				downloadUrl: props.url,
				previewUrl: previewUrl,
				alt: alternativeText.value,
				name: props.name,
			};

			open(options);
		};

		return {
			alternativeText,
			containerRef,
			isFocused,
			isHovered,
			isDesktop,
			onClick,
			onKeyDown,
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

.menu {
	position: absolute;
	top: 0px;
}
</style>
