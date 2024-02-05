<template>
	<div class="ml-1">
		<h3 aria-level="1" class="mt-0">Media-Shelf</h3>
	</div>
	<div class="d-flex flex-column flex-shrink-1">
		<div>
			<Sortable
				:list="board.lines"
				item-key="id"
				tag="div"
				:options="{
					direction: 'vertical',
					group: 'lines',
					delay: 300,
					delayOnTouchOnly: true,
					ghostClass: 'sortable-drag-ghost',
					chosenClass: isMobile ? 'sortable-chosen' : '',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					dragoverBubble: true,
					animation: 250,
					scroll: true,
					forceFallback: true,
					bubbleScroll: true,
				}"
				class="d-flex flex-column flex-shrink-1 ml-n4 ga-2"
				@start="console.log(new Date())"
			>
				<template #item="{ element, index }">
					<MediaBoardLine :index="index" :key="element.id" :line="element" />
				</template>
			</Sortable>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useMediaQuery } from "@vueuse/core";
import { Sortable } from "sortablejs-vue3";
import { PropType } from "vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import { IMediaBoard } from "./types";

defineProps({
	board: {
		type: Object as PropType<IMediaBoard>,
		required: true,
	},
});

const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);
</script>

<style scoped>
.sortable-drag-ghost {
	opacity: 0.6;
	background-color: rgba(var(--v-theme-secondary-lighten-1));
}

.sortable-chosen {
	background-color: rgba(var(--v-theme-secondary-lighten-1), 0.6);
}
</style>
