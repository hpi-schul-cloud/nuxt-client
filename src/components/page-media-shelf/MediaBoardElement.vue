<template>
	<div class="bg-white rounded">
		<VCard
			ref="card"
			class="element d-flex flex-column justify-end"
			variant="outlined"
			tabindex="0"
			:elevation="isHovered ? 4 : 2"
			:id="element.id"
			:ripple="false"
			:hover="isHovered"
		>
			<v-img
				v-if="element.thumbnail"
				:src="element.thumbnail"
				class="flex-fill"
				min-height="100px"
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
	</div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.element {
	min-width: 250px;
	max-width: 250px;
	min-height: 200px;
	max-height: 200px;
	background: transparent;
}

.placeholder {
	background-color: lightgray;
}
</style>
