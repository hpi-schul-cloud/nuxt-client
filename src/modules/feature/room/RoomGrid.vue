<template>
	<Sortable
		ref="gridRef"
		role="application"
		:list="rooms"
		class="room-grid mt-8"
		item-key="id"
		:options="getSortableOptions()"
		@focusin.once="notifyOnScreenReader(t('common.instructions.orderBy.arrowKeys'))"
		@start="isDragging = true"
		@end="onDropEnd"
	>
		<template #item="{ element, index }">
			<RoomGridItem
				class="draggable user-select-none room-grid-item cursor-grab"
				:room="element"
				:index
				@contextmenu.prevent
				@click.capture="onItemClick"
				@focusin="focusedRoom = $event.target"
				@keydown.up.down.left.right="onArrowKeyDown($event, index)"
			/>
		</template>
	</Sortable>
</template>

<script setup lang="ts">
import RoomGridItem from "./RoomGridItem.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { useSafeTask } from "@/composables/async-tasks.composable";
import { RoomItem } from "@/types/room/Room";
import { useRoomStore } from "@data-room";
import { getGridContainerColumnsCount } from "@util-browser";
import { getSortableOptions } from "@util-sorting";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const { notifyOnScreenReader } = useAriaLiveNotifier();
const focusedRoom = ref();
const gridRef = useTemplateRef("gridRef");

const { t } = useI18n();

const { execute } = useSafeTask();
const { fetchRooms, moveRoom } = useRoomStore();

const props = defineProps({
	rooms: { type: Array<RoomItem>, required: true },
});
const isDragging = ref(false);

// Fix for firefox
const onItemClick = (evt: Event) => {
	if (isDragging.value) {
		evt.preventDefault();
	}
};

const reorderRoom = (newIndex: number, oldIndex: number) => {
	if (newIndex === oldIndex) return;

	const room = props.rooms[oldIndex];
	execute(async () => {
		if (document.startViewTransition) {
			await document.startViewTransition(async () => {
				await moveRoom({ id: room.id, toPosition: newIndex });
				await fetchRooms();
			}).finished;
		} else {
			await moveRoom({ id: room.id, toPosition: newIndex });
			await fetchRooms();
		}

		notifyOnScreenReader(
			t("common.actions.moved", {
				elementName: room.name,
				position: newIndex + 1,
			})
		);
	});
};

const onDropEnd = async ({ newIndex, oldIndex }: SortableEvent) => {
	isDragging.value = false;

	if (newIndex !== undefined && oldIndex !== undefined) {
		reorderRoom(newIndex, oldIndex);
	}
};

const onArrowKeyDown = (e: KeyboardEvent, oldIndex: number) => {
	let newIndex = 0;
	const cols = getGridContainerColumnsCount(gridRef.value?.containerRef);

	switch (e.key) {
		case "ArrowUp":
			newIndex = Math.max(0, oldIndex - cols);
			break;
		case "ArrowDown":
			newIndex = Math.min(props.rooms.length - 1, oldIndex + cols);
			break;
		case "ArrowLeft":
			newIndex = Math.max(0, oldIndex - 1);
			break;
		case "ArrowRight":
			newIndex = Math.min(props.rooms.length - 1, oldIndex + 1);
			break;
	}
	reorderRoom(newIndex, oldIndex);
};

watch(
	() => props.rooms,
	async () => {
		await nextTick();
		focusedRoom.value?.focus();
	}
);
</script>

<style scoped>
.room-grid {
	display: grid;
	grid-gap: 16px;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.room-grid-item {
	view-transition-name: match-element;
}

::view-transition-group(*) {
	animation-duration: 250ms;
	animation-timing-function: cubic-bezier(1, 0, 0, 1);
}
</style>
