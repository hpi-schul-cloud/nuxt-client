<template>
	<div class="d-flex flex-column flex-shrink-1">
		<div>
			<MediaBoardAvailableLine
				:line="availableMediaLine"
				:layout="board.layout"
				@create:element="createElement"
				@update:line-background-color="updateAvailableLineBackgroundColor"
				@update:line-collapsed="updateAvailableLineCollapsed"
			/>
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
					chosenClass: isDesktop ? '' : 'sortable-chosen',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					dragoverBubble: true,
					animation: 250,
					scroll: true,
					forceFallback: true,
					bubbleScroll: true,
				}"
				class="d-flex flex-column flex-shrink-1 ga-4 mb-4"
				@end="onLineDragEnd"
			>
				<template #item="{ element, index }">
					<MediaBoardLine
						:data-testid="'media-board-line-' + index"
						:data-line-id="element.id"
						:index="index"
						:key="element.id"
						:line="element"
						:layout="board.layout"
						@update:line-background-color="
							updateLineBackgroundColor(element.id, $event)
						"
						@update:line-collapsed="updateLineCollapsed(element.id, $event)"
						@update:line-title="updateLineTitle(element.id, $event)"
						@update:element-position="moveElement"
						@delete:line="deleteLine"
						@delete:element="deleteElement"
					/>
				</template>
			</Sortable>
			<MediaBoardLineGhost
				v-if="board.lines.length < lineLimit"
				@create:line="createLine"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MediaAvailableLineResponse, MediaBoardResponse } from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute, useSharedEditMode } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { PropType } from "vue";
import { lineLimit, LineMove, useSharedMediaBoardState } from "./data";
import MediaBoardAvailableLine from "./MediaBoardAvailableLine.vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineGhost from "./MediaBoardLineGhost.vue";

defineProps({
	board: {
		type: Object as PropType<MediaBoardResponse>,
		required: true,
	},
	availableMediaLine: {
		type: Object as PropType<MediaAvailableLineResponse>,
		required: true,
	},
});

const isDesktop = useMediaQuery(DeviceMediaQuery.Desktop);

const {
	updateLineTitle,
	updateLineBackgroundColor,
	updateAvailableLineBackgroundColor,
	updateLineCollapsed,
	updateAvailableLineCollapsed,
	createLine,
	moveLine,
	moveElement,
	deleteLine,
	deleteElement,
	createElement,
} = useSharedMediaBoardState();

const { isInEditMode } = useSharedEditMode();

const onLineDragEnd = async (event: SortableEvent) => {
	const { newIndex, oldIndex, item } = event;

	const lineId: string | undefined = extractDataAttribute(item, "lineId");

	const isOutOfBounds =
		lineId !== undefined && newIndex !== undefined && oldIndex !== undefined;

	if (isOutOfBounds) {
		const lineMove: LineMove = {
			newLineIndex: newIndex,
			oldLineIndex: oldIndex,
			lineId,
		};

		await moveLine(lineMove);
	}
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

.scrollable-line::-webkit-scrollbar-track {
	background: transparent;
}

.scrollable-line::-webkit-scrollbar-thumb {
	background-color: transparent;
}

.line-drag-handle:hover .scrollable-line::-webkit-scrollbar-thumb {
	background-color: rgba(var(--v-theme-on-surface), 0.6);
}

.line-drag-handle:hover .scrollable-line::-webkit-scrollbar-thumb:hover {
	background: rgba(var(--v-theme-on-surface), 0.8);
}
</style>
