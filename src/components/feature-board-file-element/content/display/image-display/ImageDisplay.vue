<template>
	<div
		class="image-display-container"
		ref="containerRef"
		:tabindex="addTabIndex ? 0 : -1"
		@click.stop.prevent="onClick"
		@focusin.stop.prevent="onFocusIn"
		@focusout.stop.prevent="onFocusOut"
		@keydown.enter.stop.prevent="onKeyDown"
		@keydown.space.stop.prevent="onKeyDown"
		@mouseenter.stop.prevent="onMouseEnter"
		@mouseleave.stop.prevent="onMouseLeave"
	>
		<div v-if="showOverlay" class="image-display-overlay rounded-t-sm"></div>

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
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { detectMobile } from "@/utils/helpers";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
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
		const isMobile = ref(detectMobile());

		const addTabIndex = computed(() => !props.isEditMode && !isMobile.value);

		const alternativeText = computed(() => {
			const altTranslation = i18n.t(
				"components.cardElement.fileElement.emptyAlt"
			);
			const altText = props.element.content.alternativeText
				? props.element.content.alternativeText
				: `${altTranslation} ${props.name}`;

			return altText;
		});

		const showOverlay = computed(
			() =>
				!props.isEditMode &&
				!isMobile.value &&
				(isFocused.value || isHovered.value)
		);

		const onClick = () => {
			if (!props.isEditMode) {
				openLightBox();
			}
			if (!props.isEditMode && !isMobile.value) {
				containerRef.value?.blur();
			}
		};

		const onFocusIn = () => {
			if (!props.isEditMode && !isMobile.value) {
				isFocused.value = true;
			}
		};

		const onFocusOut = () => {
			if (!props.isEditMode && !isMobile.value) {
				isFocused.value = false;
			}
		};

		const onKeyDown = () => {
			if (!props.isEditMode && !isMobile.value) {
				openLightBox();
			}
		};

		const onMouseEnter = () => {
			if (!props.isEditMode && !isMobile.value) {
				isHovered.value = true;
			}
		};

		const onMouseLeave = () => {
			if (!props.isEditMode && !isMobile.value) {
				isHovered.value = false;
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

			const { open } = useLightBox();

			open(options);
		};

		return {
			addTabIndex,
			alternativeText,
			containerRef,
			showOverlay,
			onClick,
			onFocusIn,
			onFocusOut,
			onKeyDown,
			onMouseEnter,
			onMouseLeave,
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
