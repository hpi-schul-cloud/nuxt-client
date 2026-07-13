<template>
	<ContentElementBar class="image-display menu">
		<template #display>
			<div
				class="d-flex align-center focusable-container"
				:class="{
					'interactive-cursor': isEditMode,
					'content-element-display-activatable': isEditMode,
				}"
				style="min-height: 52px"
				tabindex="0"
				role="button"
				data-testid="image-thumbnail-in-card"
				@click="onActivate"
				@keydown.enter.space="onActivate"
			>
				<div class="w-100 h-100 image-container">
					<PreviewImage :src="previewSrc" :alt="alternativeText" :max-height="336" />
				</div>
			</div>
		</template>
		<template v-if="showMenu" #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import { FileElementResponse } from "@api-server";
import { ContentElementBar } from "@ui-board";
import { PreviewImage } from "@ui-preview-image";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	src: string;
	previewSrc: string;
	name: string;
	isEditMode: boolean;
	element: FileElementResponse;
	showMenu: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "activate", event: Event): void;
}>();

const { t } = useI18n();

const alternativeText = computed(() => {
	const altTranslation = t("components.cardElement.fileElement.emptyAlt");
	const altText = props.element.content.alternativeText
		? props.element.content.alternativeText
		: `${altTranslation} ${props.name}`;

	return altText;
});

const onActivate = (event: Event) => {
	if (!props.isEditMode) {
		return;
	}

	event.stopPropagation();
	emit("activate", event);
};
</script>
<style scoped lang="scss">
/* show focus indicator in Safari properly */
.focusable-container:focus {
	outline: 2px solid -webkit-focus-ring-color;
	outline-offset: -2px;
}

/* Ensure the focus indicator is visible and not obscured by the image */
.image-container {
	position: relative;
}

.interactive-cursor {
	cursor: pointer;
}
</style>
