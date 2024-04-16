<template>
	<div class="d-flex flex-column flex-shrink-1">
		<div>
			<MediaBoardAvailableLine @create:element="onCreateElement" />
			<Sortable
				:list="board.lines"
				item-key="id"
				tag="div"
				:options="{
					direction: 'vertical',
					group: 'lines',
					delay: 300,
					delayOnTouchOnly: true,
					disabled: isInEditMode,
					ghostClass: 'sortable-drag-ghost',
					chosenClass: isMobile ? 'sortable-chosen' : '',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					dragoverBubble: true,
					animation: 250,
					scroll: true,
					forceFallback: true,
					bubbleScroll: true,
				}"
				class="d-flex flex-column flex-shrink-1 ga-2"
				@end="onLineDragEnd"
			>
				<template #item="{ element, index }">
					<MediaBoardLine
						:data-line-id="element.id"
						:index="index"
						:key="element.id"
						:line="element"
						@update:line-title="onUpdateLineTitle(element.id, $event)"
						@update:element-position="onUpdateElementPosition"
						@delete:line="onDeleteLine"
						@delete:element="onDeleteElement"
					/>
				</template>
			</Sortable>
			<MediaBoardLineGhost @create:line="onCreateLine" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { MediaBoardResponse } from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { PropType } from "vue";
import { useSharedMediaBoardState } from "./data/mediaBoardState.composable";
import { ElementCreate, ElementMove, LineMove } from "./data/types";
import { useSharedEditMode } from "./editMode.composable";
import MediaBoardAvailableLine from "./MediaBoardAvailableLine.vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineGhost from "./MediaBoardLineGhost.vue";

defineProps({
	board: {
		type: Object as PropType<MediaBoardResponse>,
		required: true,
	},
});

const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);

const {
	updateLineTitle,
	createLine,
	moveLine,
	moveElement,
	deleteLine,
	deleteElement,
	createElement,
} = useSharedMediaBoardState();

const { isInEditMode } = useSharedEditMode();

const onUpdateLineTitle = (lineId: string, newTitle: string) => {
	updateLineTitle(lineId, newTitle);
};

const onCreateLine = async () => {
	await createLine();
};

const onCreateElement = async (createOptions: ElementCreate) => {
	await createElement(createOptions);
};

const onDeleteLine = (lineId: string) => {
	deleteLine(lineId);
};

const onDeleteElement = (elementId: string) => {
	deleteElement(elementId);
};

const onLineDragEnd = async (event: SortableEvent) => {
	const { newIndex, oldIndex, item } = event;

	const lineId: string | undefined = extractDataAttribute(item, "lineId");

	if (
		lineId !== undefined &&
		newIndex !== undefined &&
		oldIndex !== undefined
	) {
		const lineMove: LineMove = {
			newLineIndex: newIndex,
			oldLineIndex: oldIndex,
			lineId,
		};

		await moveLine(lineMove);
	}
};

const onUpdateElementPosition = async (cardMove: ElementMove) => {
	await moveElement(cardMove);
};
</script>

<style>
.no-inner-padding > * {
	padding: 0;
}

.sortable-drag-ghost {
	opacity: 0.6;
}

.sortable-chosen {
	background-color: rgba(var(--v-theme-on-background), 0.6) !important;
}

/* Custom Scroll Bar */
.scrollable-line {
	overflow: auto hidden;
}

/* height */
.scrollable-line::-webkit-scrollbar {
	height: 8px;
}

/* Track */
.scrollable-line::-webkit-scrollbar-track {
	background: white;
	border: none;
}

/* Handle */
.scrollable-line::-webkit-scrollbar-thumb {
	background-color: transparent;
	border-radius: 5px;
}
.line-drag-handle:hover .scrollable-line::-webkit-scrollbar-thumb {
	background-color: rgba(var(--v-theme-on-surface), 0.6);
	border-radius: 5px;
}

/* Handle on hover */
.scrollable-line::-webkit-scrollbar-thumb:hover {
	background: rgba(var(--v-theme-on-surface), 0.8) !important;
}
</style>
