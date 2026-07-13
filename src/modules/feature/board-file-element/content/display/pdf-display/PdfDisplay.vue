<template>
	<ContentElementBar>
		<template #display>
			<div
				:class="{
					'interactive-cursor': isEditMode,
					'content-element-display-activatable': isEditMode,
				}"
				@click="onActivate"
			>
				<PreviewImage :src="previewSrc" alt="" :aspect-ratio="1.77777" position="top" :cover="true" />
			</div>
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import { FileElementResponse } from "@api-server";
import { ContentElementBar } from "@ui-board";
import { PreviewImage } from "@ui-preview-image";

type Props = {
	element: FileElementResponse;
	isEditMode: boolean;
	name: string;
	previewSrc: string;
	src: string;
	showMenu: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "activate", event: Event): void;
}>();

const onActivate = (event: Event) => {
	if (!props.isEditMode) {
		return;
	}

	event.stopPropagation();
	emit("activate", event);
};
</script>

<style scoped>
.interactive-cursor {
	cursor: pointer;
}
</style>
