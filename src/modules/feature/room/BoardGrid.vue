<template>
	<Sortable
		ref="gridRef"
		:list="boards"
		class="board-grid mt-8"
		item-key="id"
		:options="{
			disabled: !canEditRoomContent,
			delayOnTouchOnly: true,
			delay: 100,
			ghostClass: 'opacity-50',
			touchStartThreshold: 3, // needed for sensitive touch devices
			fallbackTolerance: 3, // specifies how far the mouse should move before it's considered a drag
			easing: 'cubic-bezier(1, 0, 0, 1)',
			draggable: '.draggable',
			animation: 250,
			forceFallback: true,
		}"
		@start="isDragging = true"
		@end="onDropEnd"
	>
		<template #item="{ element, index }">
			<!-- the board tile is an a tag, which natively has draggable=true, which we need to suppress here -->
			<BoardGridItem
				class="draggable user-select-none board-item"
				draggable="false"
				:board="element"
				:index
				@click.capture="onItemClick"
				@contextmenu.prevent
				@focusin="focusedBoard = $event.target"
				@keydown.up.down.left.right="onArrowKeyDown($event, index)"
			/>
		</template>

		{{ focusedBoard }}
	</Sortable>
</template>

<script setup lang="ts">
import BoardGridItem from "./BoardGridItem.vue";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useSafeTask } from "@/composables/async-tasks.composable";
import { RoomBoardItem } from "@/types/room/Room";
import { notifyError } from "@data-app";
import { useRoomAuthorization, useRoomDetailsStore } from "@data-room";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick, PropType, ref, useTemplateRef, watch } from "vue";

const props = defineProps({
	roomId: { type: String, required: true },
	boards: { type: Array as PropType<RoomBoardItem[]>, required: true },
});
const { execute, error: reorderError } = useSafeTask();

const { fetchRoomAndBoards, moveBoard } = useRoomDetailsStore();
const { generateErrorText } = useErrorHandler();
const { canEditRoomContent } = useRoomAuthorization();

const gridRef = useTemplateRef("gridRef");
const focusedBoard = ref();
const isDragging = ref(false);

const getColumnsCount = () => {
	if (!gridRef.value?.containerRef) return 1;
	const style = window.getComputedStyle(gridRef.value.containerRef);
	return style.gridTemplateColumns.split(" ").length;
};

const reorderRoom = (boardId: string, newIndex: number) => {
	execute(async () => {
		if (document.startViewTransition) {
			await document.startViewTransition(async () => {
				await moveBoard(props.roomId, boardId, newIndex);
				await fetchRoomAndBoards(props.roomId);
			}).finished;
		} else {
			await moveBoard(props.roomId, boardId, newIndex);
			await fetchRoomAndBoards(props.roomId);
		}
	});
};

const updateBoardIndex = (newIndex: number | undefined, oldIndex: number | undefined) => {
	if (newIndex !== oldIndex && newIndex !== undefined && oldIndex !== undefined) {
		reorderRoom(props.boards[oldIndex]?.id, newIndex);
	}
};

const onDropEnd = async ({ newIndex, oldIndex }: SortableEvent) => {
	isDragging.value = false;
	updateBoardIndex(newIndex, oldIndex);
};

const onItemClick = (evt: Event) => {
	if (isDragging.value) {
		evt.preventDefault();
	}
};

const onArrowKeyDown = (e: KeyboardEvent, oldIndex: number) => {
	let newIndex = 0;
	const cols = getColumnsCount();

	switch (e.key) {
		case "ArrowUp":
			newIndex = Math.max(0, oldIndex - cols);
			break;
		case "ArrowDown":
			newIndex = Math.min(props.boards.length - 1, oldIndex + cols);
			break;
		case "ArrowLeft":
			newIndex = Math.max(0, oldIndex - 1);
			break;
		case "ArrowRight":
			newIndex = Math.min(props.boards.length - 1, oldIndex + 1);
			break;
	}
	updateBoardIndex(newIndex, oldIndex);
};

watch(reorderError, (newError) => {
	if (newError) {
		notifyError(generateErrorText("notMoved", "board"));
	}
});

watch(
	() => props.boards,
	async () => {
		await nextTick();
		focusedBoard.value?.focus();
	}
);
</script>
<style scoped>
.board-grid {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.board-item {
	view-transition-name: match-element;
}

::view-transition-group(*) {
	animation-duration: 250ms;
	animation-timing-function: cubic-bezier(1, 0, 0, 1);
}
</style>
