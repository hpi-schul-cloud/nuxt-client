<template>
	<div class="d-flex flex-column flex-shrink-1">
		<div>
			<MediaBoardAvailableLine />
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
					/>
				</template>
			</Sortable>
			<MediaBoardLineGhost @create:line="onCreateLine" />
		</div>
	</div>
</template>

<script setup lang="ts">
// FIXME sortablejs-vue3 has a bug where the DOM is wrong when you modify the data array
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { PropType } from "vue";
import { useSharedMediaBoardState } from "./data/mediaBoardState.composable";
import { ElementMove, IMediaBoard, LineMove } from "./data/types";
import { useSharedEditMode } from "./editMode.composable";
import MediaBoardAvailableLine from "./MediaBoardAvailableLine.vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineGhost from "./MediaBoardLineGhost.vue";

defineProps({
	board: {
		type: Object as PropType<IMediaBoard>,
		required: true,
	},
});

const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);

const { updateLineTitle, createLine, moveLine, moveElement, deleteLine } =
	useSharedMediaBoardState();

const { isInEditMode } = useSharedEditMode();

const onUpdateLineTitle = (lineId: string, newTitle: string) => {
	updateLineTitle(lineId, newTitle);
};

const onCreateLine = async () => {
	await createLine();
};

const onDeleteLine = (lineId: string) => {
	deleteLine(lineId);
};

const onLineDragEnd = async (event: SortableEvent) => {
	const { newIndex, oldIndex, item } = event;

	const lineId: string | undefined = extractDataAttribute(item, "lineId");

	if (
		lineId !== undefined &&
		newIndex !== undefined &&
		oldIndex !== undefined
	) {
		const columnMove: LineMove = {
			newLineIndex: newIndex,
			oldLineIndex: oldIndex,
			lineId,
		};

		await moveLine(columnMove);
	}
};

const onUpdateElementPosition = async (cardMove: ElementMove) => {
	await moveElement(cardMove);
};
</script>

<style>
.sortable-drag-ghost {
	opacity: 0.6;
}

.sortable-chosen {
	background-color: rgba(var(--v-theme-on-background), 0.6) !important;
}
</style>
