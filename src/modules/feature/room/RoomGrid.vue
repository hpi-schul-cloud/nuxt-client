<template>
	<Sortable
		ref="gridRef"
		:role="readonly || isGrouped ? undefined : 'application'"
		:aria-labelledby="labelledBy"
		:list="rooms"
		class="room-grid"
		:class="{ 'mt-8': !isGrouped, 'room-grid--grouped': isGrouped }"
		item-key="id"
		:options="sortableOptions"
		:data-section-key="sectionKey"
		:data-testid="isGrouped ? 'room-group-grid' : undefined"
		@focusin.once="onFirstFocus"
		@focusout="onFocusOut"
		@start="onDragStart"
		@end="onDropEnd"
	>
		<template #item="{ element, index }">
			<RoomGridItem
				class="user-select-none room-grid-item"
				:class="{ 'draggable cursor-grab': isRoomDraggable(element) }"
				:room="element"
				:index="indexOffset + index"
				:show-arrange-menu="isGrouped && !readonly && !selectable"
				:selectable="isGrouped && selectable"
				:selected="selectedRoomIds.includes(element.id)"
				:can-move-to-group
				:can-move-earlier="!disabled && index > 0"
				:can-move-later="!disabled && index < rooms.length - 1"
				:arrange-disabled="disabled"
				:title-tag="titleTag ?? (isGrouped ? 'h3' : 'h2')"
				@contextmenu.prevent
				@click.capture="onItemClick"
				@focusin="onItemFocusIn"
				@keydown.up.down.left.right="onArrowKeyDown($event, index)"
				@move-to-group="emit('move-to-group', element)"
				@move-earlier="emitReorder(element, index, index - 1)"
				@move-later="emitReorder(element, index, index + 1)"
				@select="emit('select-room', element.id, $event)"
			/>
		</template>
	</Sortable>
</template>

<script setup lang="ts">
import {
	rememberDomPosition,
	restoreDomPosition,
	ROOM_SORTABLE_GROUP,
	RoomDrop,
	toRoomDrop,
} from "./room-arrangement-drop";
import RoomGridItem from "./RoomGridItem.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";
import { useSafeTask } from "@/composables/async-tasks.composable";
import { RoomItem } from "@/types/room/Room";
import { useRoomStore } from "@data-room";
import { getGridContainerColumnsCount } from "@util-browser";
import { getSortableOptions } from "@util-sorting";
import { usePreferredReducedMotion } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		rooms: RoomItem[];
		/** Enables the grouped mode: moves are emitted as intents instead of being saved via the legacy flat API. */
		sectionKey?: string;
		/** Offset of the first room so index based test ids stay unique across all sections. */
		indexOffset?: number;
		/** Grouped mode only: arranging is temporarily not possible (e.g. while a change is being saved). */
		disabled?: boolean;
		readonly?: boolean;
		/** Heading level of the room titles; defaults to h2 (flat) or h3 (below a section heading). */
		titleTag?: "h2" | "h3";
		/** Id of the section heading that names this grid. */
		labelledBy?: string;
		/** Grouped mode only: another section exists that rooms can be moved to. */
		canMoveToGroup?: boolean;
		/** Grouped mode only: rooms are selected for a bulk move; dragging is off meanwhile. */
		selectable?: boolean;
		selectedRoomIds?: string[];
	}>(),
	{
		selectable: false,
		selectedRoomIds: () => [],
		canMoveToGroup: true,
		sectionKey: undefined,
		indexOffset: 0,
		disabled: false,
		readonly: false,
		titleTag: undefined,
		labelledBy: undefined,
	}
);

const emit = defineEmits<{
	drop: [drop: RoomDrop];
	"drag-start": [];
	"drag-end": [];
	"move-to-group": [room: RoomItem];
	"select-room": [roomId: string, selected: boolean];
}>();

const { notifyOnScreenReader } = useAriaLiveNotifier();
const focusedRoom = ref<HTMLElement>();
const gridRef = useTemplateRef("gridRef");

const { t } = useI18n();

const { execute } = useSafeTask();
const { fetchRooms, moveRoom } = useRoomStore();

const isDragging = ref(false);
const isGrouped = computed(() => props.sectionKey !== undefined);
const reducedMotion = usePreferredReducedMotion();

const sortableOptions = computed(() => {
	if (!isGrouped.value) {
		return props.readonly ? getSortableOptions({ disabled: true }) : getSortableOptions();
	}
	return getSortableOptions({
		group: ROOM_SORTABLE_GROUP,
		disabled: props.readonly || props.disabled || props.selectable,
		animation: reducedMotion.value === "reduce" ? 0 : 250,
	});
});

const isRoomDraggable = (room: RoomItem) => {
	if (props.readonly) return false;
	if (!isGrouped.value) return true;
	return !props.disabled && !props.selectable && room.allowedOperations?.arrangeRooms === true;
};

const onItemFocusIn = (event: FocusEvent) => {
	if (event.target instanceof HTMLElement) {
		focusedRoom.value = event.target;
	}
};

// Grouped mode reorders via the card menu only, so there is no arrow key instruction there.
const onFirstFocus = () => {
	if (!props.readonly && !isGrouped.value) {
		notifyOnScreenReader(t("common.instructions.orderBy.arrowKeys"));
	}
};

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

const emitReorder = (room: RoomItem, oldIndex: number, newIndex: number) => {
	if (props.sectionKey === undefined || props.disabled || props.readonly || props.selectable) return;
	if (newIndex < 0 || newIndex >= props.rooms.length || newIndex === oldIndex) return;

	emit("drop", { roomId: room.id, fromKey: props.sectionKey, toKey: props.sectionKey, oldIndex, newIndex });
};

let dragOrigin: ReturnType<typeof rememberDomPosition>;

const onDragStart = (event: SortableEvent) => {
	isDragging.value = true;
	if (isGrouped.value) {
		dragOrigin = rememberDomPosition(event.item);
		emit("drag-start");
	}
};

const onGroupedDropEnd = (event: SortableEvent) => {
	restoreDomPosition(event.item, dragOrigin);
	dragOrigin = undefined;
	emit("drag-end");

	const drop = toRoomDrop(event);
	if (drop) {
		emit("drop", drop);
	}
};

const onDropEnd = async (event: SortableEvent) => {
	isDragging.value = false;

	if (isGrouped.value) {
		onGroupedDropEnd(event);
		return;
	}

	const { newIndex, oldIndex } = event;
	if (newIndex !== undefined && oldIndex !== undefined) {
		reorderRoom(newIndex, oldIndex);
	}
};

// Legacy flat grid only: in grouped mode arrow keys must not save moves by accident.
const onArrowKeyDown = (e: KeyboardEvent, oldIndex: number) => {
	if (props.readonly || isGrouped.value) return;

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

const containsElement = (element: EventTarget | Element | null) =>
	element instanceof Node && (gridRef.value?.containerRef?.contains(element) ?? false);

// Only remember focus while it is inside this grid, so other grids never steal it back.
const onFocusOut = (event: FocusEvent) => {
	if (event.relatedTarget !== null && !containsElement(event.relatedTarget)) {
		focusedRoom.value = undefined;
	}
};

const isFocusRestorable = () => {
	const active = document.activeElement;
	return active === null || active === document.body || containsElement(active);
};

// Re-rendering a moved card can drop focus; restore it only when this grid's order changed.
watch(
	() => props.rooms.map((room) => room.id).join(","),
	async () => {
		await nextTick();
		const target = focusedRoom.value;
		if (!target || !target.isConnected || !containsElement(target) || !isFocusRestorable()) return;
		target.focus();
	}
);
</script>

<style scoped>
.room-grid {
	display: grid;
	grid-gap: 16px;
	grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
}

.room-grid--grouped {
	min-height: 48px;
}

.room-grid-item {
	view-transition-name: match-element;
}

::view-transition-group(*) {
	animation-duration: 250ms;
	animation-timing-function: cubic-bezier(1, 0, 0, 1);
}

@media (prefers-reduced-motion: reduce) {
	::view-transition-group(*) {
		animation-duration: 0s;
	}
}
</style>
