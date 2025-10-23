<template>
	<Sortable
		:list="boards"
		class="board-grid mt-8"
		item-key="id"
		:options="{
			delayOnTouchOnly: true,
			delay: 50,
			touchStartThreshold: 3, // needed for sensitive touch devices
			fallbackTolerance: 3, // specifies how far the mouse should move before it's considered a drag
			easing: 'cubic-bezier(1, 0, 0, 1)',
			dragoverBubble: true,
			animation: 250,
			forceFallback: true,
		}"
	>
		<template #item="{ element, index }">
			<BoardTile :board="element" :index="index" @keydown.up.down.left.right="onKeyUp($event, index)" />

			<!--			<BoardColumn-->
			<!--				:key="element.id"-->
			<!--				:data-column-id="element.id"-->
			<!--				:column="element"-->
			<!--				:index="index"-->
			<!--				:column-count="board.columns.length"-->
			<!--				:class="{ 'my-0': isListBoard, 'user-select-none': isDragging }"-->
			<!--				:is-list-board="isListBoard"-->
			<!--				:data-testid="`board-column-${index}`"-->
			<!--				@reload:board="onReloadBoard"-->
			<!--				@create:card="onCreateCard"-->
			<!--				@delete:card="onDeleteCard"-->
			<!--				@delete:column="onDeleteColumn"-->
			<!--				@update:column-title="onUpdateColumnTitle(element.id, $event)"-->
			<!--				@move:column-down="onMoveColumnForward(index, element.id)"-->
			<!--				@move:column-left="onMoveColumnBackward(index, element.id)"-->
			<!--				@move:column-right="onMoveColumnForward(index, element.id)"-->
			<!--				@move:column-up="onMoveColumnBackward(index, element.id)"-->
			<!--			/>-->
		</template>
	</Sortable>
</template>

<script setup lang="ts">
import BoardTile from "./BoardTile.vue";
import { useSafeTask, useSafeTaskRunner } from "@/composables/async-tasks.composable";
import { RoomBoardItem } from "@/types/room/Room";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { Sortable } from "sortablejs-vue3";
import { PropType, toRef } from "vue";

const props = defineProps({
	boards: { type: Array as PropType<RoomBoardItem[]>, required: true },
});

const boards = toRef(props, "boards");

const { updateRoom } = useRoomDetailsStore();
const { room } = storeToRefs(useRoomDetailsStore());

const { execute, error } = useSafeTask();

const onKeyUp = (e: KeyboardEvent, currentIndex: number) => {
	switch (e.key) {
		case "ArrowUp":
			break;
		case "ArrowDown":
			break;
		case "ArrowLeft":
			if (currentIndex > 0) {
        // execute()
				// await updateIndex(currentIndex, currentIndex - 1);
				// await fetchRoom()
				// updateRoom(room.value?.id, {});
			}
			break;
		case "ArrowRight":
			break;
	}
};
</script>
<style>
.board-grid {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	transition: all 0.5s ease;
}
</style>
