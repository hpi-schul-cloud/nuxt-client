<template>
	<ContentElementBar>
		<template #display>
			<div @click="openPdf">
				<PreviewImage
					:src="previewSrc"
					alt=""
					:aspect-ratio="1.77777"
					position="top"
					:cover="true"
				/>
			</div>
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
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

const openPdf = () => {
	window.open(props.src, "_blank");
};
</script>
