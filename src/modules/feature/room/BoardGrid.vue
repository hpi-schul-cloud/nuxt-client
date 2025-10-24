<template>
	<Sortable
		ref="gridRef"
		:list="boards"
		class="board-grid mt-8"
		item-key="id"
		:options="{
			disabled: !hasMovePermission,
			delayOnTouchOnly: true,
			delay: 200,
			ghostClass: 'opacity-50',
			touchStartThreshold: 3, // needed for sensitive touch devices
			fallbackTolerance: 3, // specifies how far the mouse should move before it's considered a drag
			easing: 'cubic-bezier(1, 0, 0, 1)',
			draggable: '.draggable',
			animation: 250,
			forceFallback: true,
		}"
		@end="onDropEnd"
	>
		<template #item="{ element, index }">
			<!-- the board tile is an a tag, which natively has draggable=true, which we need to suppress here -->
			<BoardGridItem
				class="draggable"
				draggable="false"
				:board="element"
				:index="index"
				:style="{ viewTransitionName: `board-${element.id}` }"
				@keydown.up.down.left.right="onKeyDown($event, index)"
			/>
		</template>
	</Sortable>
</template>

<script setup lang="ts">
import BoardGridItem from "./BoardGridItem.vue";
import { RoomBoardItem } from "@/types/room/Room";
import { useRoomAuthorization } from "@data-room";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, PropType, useTemplateRef } from "vue";

const props = defineProps({
	boards: { type: Array as PropType<RoomBoardItem[]>, required: true },
});

const emit = defineEmits<{
	(e: "reorder-room", boardId: string, newIndex: number): void;
}>();

const gridRef = useTemplateRef("gridRef");

const getColumnsCount = () => {
	if (!gridRef.value) return 1;
	const style = window.getComputedStyle(gridRef.value.$el);
	return style.gridTemplateColumns.split(" ").length;
};

const { canEditRoomContent, canChangeOwner } = useRoomAuthorization();
const hasMovePermission = computed(() => canEditRoomContent.value || canChangeOwner.value);

const updateBoardIndex = (newIndex: number | undefined, oldIndex: number | undefined) => {
	if (newIndex !== oldIndex && newIndex !== undefined && oldIndex !== undefined) {
		emit("reorder-room", props.boards[oldIndex]?.id, newIndex);
	}
};

const onDropEnd = async ({ newIndex, oldIndex }: SortableEvent) => {
	updateBoardIndex(newIndex, oldIndex);
};

const onKeyDown = (e: KeyboardEvent, oldIndex: number) => {
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

// watch(
// 	() => props.boards,
// 	(newValue, oldValue) => {
// 		if (newValue !== oldValue) {
// 			document.startViewTransition?.(() => {}).finished.catch(logger.error);
// 		}
// 	}
// );

// Permission
// transition when using arrows
// opacity style franz
</script>
<style>
.board-grid {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}
</style>
