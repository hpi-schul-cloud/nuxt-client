<template>
	<Sortable
		ref="gridRef"
		role="application"
		:list="boards"
		class="room-content-grid mt-8"
		item-key="id"
		:options="getSortableOptions({ disabled: !canEditRoomContent })"
		@start="isDragging = true"
		@end="onDropEnd"
		@focusin.once="notifyOnScreenReader(t('common.instructions.orderBy.arrowKeys'))"
	>
		<template #item="{ element, index }">
			<!-- the board grid item is an a tag, which natively has draggable=true, which we need to suppress here -->
			<RoomContentGridItem
				class="draggable user-select-none room-content-grid-item"
				draggable="false"
				:board="element"
				:index
				@click.capture="onItemClick"
				@contextmenu.prevent
				@focusin="focusedBoard = $event.target"
				@keydown.up.down.left.right="onArrowKeyDown($event, index)"
			/>
		</template>
	</Sortable>
</template>

<script setup lang="ts">
import RoomContentGridItem from "./RoomContentGridItem.vue";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { useSafeTask } from "@/composables/async-tasks.composable";
import { RoomBoardItem } from "@/types/room/Room";
import { notifyError } from "@data-app";
import { useRoomAuthorization, useRoomDetailsStore } from "@data-room";
import { getGridContainerColumnsCount } from "@util-browser";
import { getSortableOptions } from "@util-sorting";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick, PropType, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	roomId: { type: String, required: true },
	boards: { type: Array as PropType<RoomBoardItem[]>, required: true },
});
const { t } = useI18n();
const { execute, error: reorderError } = useSafeTask();

const { fetchRoomAndBoards, moveBoard } = useRoomDetailsStore();
const { generateErrorText } = useErrorHandler();
const { canEditRoomContent } = useRoomAuthorization();

const gridRef = useTemplateRef("gridRef");
const focusedBoard = ref();
const isDragging = ref(false);
const { notifyOnScreenReader } = useAriaLiveNotifier();

const reorderRoom = (newIndex: number, oldIndex: number) => {
	if (newIndex !== oldIndex) {
		const board = props.boards[oldIndex];
		execute(async () => {
			if (document.startViewTransition) {
				await document.startViewTransition(async () => {
					await moveBoard(props.roomId, board.id, newIndex);
					await fetchRoomAndBoards(props.roomId);
				}).finished;
			} else {
				await moveBoard(props.roomId, board.id, newIndex);
				await fetchRoomAndBoards(props.roomId);
			}

			notifyOnScreenReader(t("common.actions.moved", { elementName: board.title, position: newIndex + 1 }));
		});
	}
};

const onDropEnd = async ({ newIndex, oldIndex }: SortableEvent) => {
	isDragging.value = false;
	if (newIndex !== undefined && oldIndex !== undefined) {
		reorderRoom(newIndex, oldIndex);
	}
};

const onItemClick = (evt: Event) => {
	if (isDragging.value) {
		evt.preventDefault();
	}
};

const onArrowKeyDown = (e: KeyboardEvent, oldIndex: number) => {
	if (!canEditRoomContent.value) return;

	let newIndex = 0;
	const cols = getGridContainerColumnsCount(gridRef.value?.containerRef);

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
	reorderRoom(newIndex, oldIndex);
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
.room-content-grid {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.room-content-grid-item {
	view-transition-name: match-element;
}

::view-transition-group(*) {
	animation-duration: 250ms;
	animation-timing-function: cubic-bezier(1, 0, 0, 1);
}
</style>
