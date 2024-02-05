<template>
	<div
		class="line line-drag-handle px-4 py-2 ga-2 d-flex flex-column flex-shrink-1 rounded"
		style="position: relative"
	>
		<span class="text-h4">{{ line.title }}</span>
		<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
		<div class="menu">
			<VMenu location="bottom end" min-width="250">
				<template v-slot:activator="{ props }">
					<VBtn
						variant="text"
						:ripple="false"
						v-bind="props"
						icon
						@click.stop.prevent="() => {}"
						@dblclick.stop.prevent="() => {}"
						@keydown.enter.stop
						@keydown.left.right.up.down.stop="() => {}"
						size="small"
						style="height: 36px; width: 36px"
					>
						<VIcon class="text-grey-darken-2">
							{{ mdiDotsVertical }}
						</VIcon>
					</VBtn>
				</template>
				<VList>
					<VListItem @click="gridMode = !gridMode">
						<VListItemTitle>Toggle Grid Mode</VListItemTitle>
					</VListItem>
				</VList>
			</VMenu>
		</div>
		<Sortable
			:list="line.elements"
			item-key="id"
			tag="div"
			:options="{
				group: 'elements',
				direction: 'horizontal',
				delay: 300,
				delayOnTouchOnly: true,
				disabled: false,
				ghostClass: 'sortable-drag-ghost',
				easing: 'cubic-bezier(1, 0, 0, 1)',
				chosenClass: isMobile ? 'sortable-chosen' : '',
				dragoverBubble: true,
				draggable: '.draggable',
				animation: 250,
				scroll: !gridMode,
				forceFallback: true,
				bubbleScroll: true,
			}"
			:class="{ 'flex-wrap': gridMode, 'scrollable-line': !gridMode }"
			class="d-flex flex-grid flex-shrink-1 pa-2 ga-4 flex-1-1"
			@start="dragStart"
			@end="dragEnd"
		>
			<template #item="{ element, index }">
				<MediaBoardElement
					:index="index"
					:key="element.id"
					:element="element"
					class="draggable"
				/>
			</template>
		</Sortable>
	</div>
</template>

<script setup lang="ts">
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useDragAndDrop } from "@feature-board/shared/DragAndDrop.composable";
import { mdiDotsVertical } from "@mdi/js";
import { useMediaQuery } from "@vueuse/core";
import { Sortable } from "sortablejs-vue3";
import { PropType, ref } from "vue";
import MediaBoardElement from "./MediaBoardElement.vue";
import { IMediaBoardLine } from "./types";

defineProps({
	line: {
		type: Object as PropType<IMediaBoardLine>,
		required: true,
	},
});

const { dragStart, dragEnd } = useDragAndDrop();

const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);

const gridMode = ref(false);
</script>

<style scoped>
.line {
	background-color: white;
}

.sortable-drag-ghost {
	opacity: 0.6;
	background-color: rgba(var(--v-theme-secondary-lighten-1));
}

.sortable-chosen {
	background-color: rgba(var(--v-theme-secondary-lighten-1), 0.6) !important;
}

.scrollable-line {
	overflow: auto hidden;
}

/* Custom Scroll Bar*/
/* height */
.scrollable-line::-webkit-scrollbar {
	height: 6px;
}

/* Track */
.scrollable-line::-webkit-scrollbar-track {
	background: transparent;
	border: none;
}

/* Handle */
.scrollable-line::-webkit-scrollbar-thumb {
	background-color: transparent;
	border-radius: 5px;
}
.line-drag-handle:hover .scrollable-line::-webkit-scrollbar-thumb {
	background-color: rgba(var(--v-theme-secondary-lighten-1));
	border-radius: 5px;
}

/* Handle on hover */
.scrollable-line::-webkit-scrollbar-thumb:hover {
	background: rgba(var(--v-theme-secondary)) !important;
}

.menu {
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	z-index: 1;
}
</style>
