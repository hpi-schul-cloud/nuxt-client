<template>
	<VCard
		ref="card"
		class="element d-flex flex-column justify-end"
		variant="outlined"
		tabindex="0"
		:elevation="isHovered || isDragging ? 4 : 2"
		:id="element.id"
		:ripple="false"
		:hover="isHovered || isDragging"
	>
		<v-img
			v-if="element.thumbnailUrl"
			:src="element.thumbnailUrl"
			class="flex-fill"
			cover
		/>
		<div v-else class="flex-fill placeholder" />
		<ContentElementBar :has-grey-background="false" :tabindex="undefined">
			<template #title>
				{{ element.title }}
			</template>
			<template #description>
				{{ element.description }}
			</template>
		</ContentElementBar>
	</VCard>
</template>

<script setup lang="ts">
import { useDragAndDrop } from "@feature-board/shared/DragAndDrop.composable";
import ContentElementBar from "@ui-board/content-element/ContentElementBar.vue";
import { useElementHover } from "@vueuse/core";
import { PropType, ref } from "vue";
import { IMediaBoardElement } from "./types";

defineProps({
	element: {
		type: Object as PropType<IMediaBoardElement>,
		required: true,
	},
});

const card = ref(null);
const isHovered = useElementHover(card);
const { isDragging } = useDragAndDrop();
</script>

<style scoped>
.element {
	min-width: 250px;
	max-width: 250px;
	min-height: 200px;
	max-height: 200px;
	background-color: white;
}

.placeholder {
	background-color: lightgray;
}
</style>
