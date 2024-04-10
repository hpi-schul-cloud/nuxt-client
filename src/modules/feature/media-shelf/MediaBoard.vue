<template>
	<div class="ml-1">
		<h3 aria-level="1" class="mt-0">
			{{ $t("feature.media-board.title") }}
		</h3>
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
				class="d-flex flex-column flex-shrink-1 ml-n4 ga-2"
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
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { PropType } from "vue";
import { useSharedEditMode } from "./editMode.composable";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineGhost from "./MediaBoardLineGhost.vue";
import { useSharedMediaBoardState } from "./sharedState";
import { IMediaBoard } from "./types";

defineProps({
	board: {
		type: Object as PropType<IMediaBoard>,
		required: true,
	},
});

const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);

const { updateLineTitle, addLine, moveLine, moveElement, deleteLine } =
	useSharedMediaBoardState();

const { isInEditMode } = useSharedEditMode();

const onUpdateLineTitle = (lineId: string, newTitle: string) => {
	updateLineTitle(lineId, newTitle);
};

const onCreateLine = async () => {
	await addLine();
};

const onDeleteLine = (lineId: string) => {
	deleteLine(lineId);
};

const onLineDragEnd = async (linePayload: SortableEvent) => {
	const lineId: string | undefined = extractDataAttribute(
		linePayload.item,
		"lineId"
	);

	if (
		lineId &&
		linePayload.newIndex !== undefined &&
		linePayload.oldIndex !== undefined
	) {
		const columnMove: ColumnMove = {
			addedIndex: linePayload.newIndex,
			removedIndex: linePayload.oldIndex,
			columnId: lineId,
		};

		await moveLine(columnMove);
	}
};

const onUpdateElementPosition = async (cardMove: CardMove) => {
	await moveElement(cardMove);
};
</script>

<style>
.sortable-drag-ghost {
	opacity: 0.6;
	background-color: rgba(var(--v-theme-secondary-lighten-1)) !important;
}

.sortable-chosen {
	background-color: rgba(var(--v-theme-secondary-lighten-1), 0.6) !important;
}
</style>
