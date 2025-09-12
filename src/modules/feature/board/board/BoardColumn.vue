<template>
	<div :key="renderKey" :class="columnClasses" class="d-flex flex-column">
		<BoardColumnHeader
			:column-id="column.id"
			:title="column.title"
			:index="index"
			:is-list-board="isListBoard"
			:is-not-first-column="isNotFirstColumn"
			:is-not-last-column="isNotLastColumn"
			@delete:column="onColumnDelete"
			@move:column-down="onMoveColumnDown"
			@move:column-left="onMoveColumnLeft"
			@move:column-right="onMoveColumnRight"
			@move:column-up="onMoveColumnUp"
			@update:title="onUpdateTitle"
		/>
		<div class="h-100 pt-3" :class="scrollableClasses">
			<Sortable
				:list="column.cards"
				item-key="cardId"
				tag="div"
				:options="{
					group: 'cards',
					animation: 250,
					bubbleScroll: true,
					direction: 'vertical',
					delayOnTouchOnly: true,
					delay: 300,
					touchStartThreshold: 3, // needed for sensitive touch devices
					fallbackTolerance: 3, // specifies how far the mouse should move before it's considered a drag
					disabled: !hasMovePermission,
					dragClass: 'elevation-10',
					dragoverBubble: false,
					draggable: '.draggable',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					filter: '.v-input, v-btn',
					preventOnFilter: false,
					forceFallback: true,
					ghostClass: sortableGhostClasses,
					scroll: true,
				}"
				:class="{
					'expanded-sortable': isDragging,
				}"
				@start="onDragStart"
				@end="onDragEnd"
			>
				<template #item="{ element, index: elementIndex }">
					<CardHost
						v-if="element"
						:data-card-id="element.cardId"
						class="draggable mb-3"
						:class="{
							'drag-disabled': !hasMovePermission,
							'mx-2': !isListBoard,
						}"
						:card-id="element.cardId"
						:height="element.height"
						:row-index="elementIndex"
						:column-index="reactiveIndex"
						@move:card-keyboard="
							onMoveCardKeyboard(elementIndex, element.cardId, $event)
						"
						@delete:card="onDeleteCard"
						@reload:board="onReloadBoard"
					/>
				</template>
			</Sortable>
			<BoardAddCardButton
				v-if="showAddButton"
				:data-testid="`column-${index}-add-card-btn`"
				@add-card="onCreateCard"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { BoardColumn } from "@/types/board/Board";
import { useBoardPermissions, useForceRender } from "@data-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useBoardStore } from "@/modules/data/board/Board.store"; // FIX_CIRCULAR_DEPENDENCY
import { extractDataAttribute, useDragAndDrop } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, toRef } from "vue";
import CardHost from "../card/CardHost.vue";
import BoardAddCardButton from "./BoardAddCardButton.vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";

type Props = {
	column: BoardColumn;
	columnCount: number;
	index: number;
	isListBoard: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "create:card", columnId: string): void;
	(e: "delete:card", cardId: string): void;
	(e: "delete:column", columnId: string): void;
	(e: "move:column-down"): void;
	(e: "move:column-left"): void;
	(e: "move:column-right"): void;
	(e: "move:column-up"): void;
	(e: "reload:board"): void;
	(e: "update:column-title", newTitle: string): void;
}>();

const boardStore = useBoardStore();
const reactiveIndex = toRef(props, "index");

const { hasEditPermission, hasMovePermission, hasCreateColumnPermission } =
	useBoardPermissions();

const columnClasses = computed(() => {
	const classes = ["column-drag-handle", "bg-white"];
	if (props.isListBoard) {
		classes.push("d-flex", "flex-column", "align-stretch");
	} else {
		classes.push("px-4", "multi-column-board-column");
	}
	return classes;
});

const { isDragging, dragStart, dragEnd } = useDragAndDrop();
const showAddButton = computed(
	() => hasCreateColumnPermission.value && isDragging.value === false
);

const isNotFirstColumn = computed(() => props.index !== 0);
const isNotLastColumn = computed(() => props.index !== props.columnCount - 1);

const onCreateCard = () => emit("create:card", props.column.id);

const onColumnDelete = (columnId: string): void => {
	emit("delete:column", columnId);
};

const onDeleteCard = (cardId: string): void => {
	emit("delete:card", cardId);
};

const onDragStart = (): void => {
	dragStart();
};

const onDragEnd = (event: SortableEvent) => {
	dragEnd();
	const { newIndex, oldIndex, to, from, item } = event;
	const cardId = extractDataAttribute(item, "cardId") as string;
	const fromColumnId = extractDataAttribute(from, "columnId") as string;
	const toColumnId = extractDataAttribute(to, "columnId");
	const toColumnIndex = toColumnId
		? boardStore.getColumnIndex(toColumnId)
		: undefined;

	if (toColumnId !== fromColumnId) {
		item?.parentNode?.removeChild(item);
	}

	if (toColumnId === fromColumnId && props.column.cards.length === 1) {
		return;
	}

	if (toColumnId === undefined) {
		boardStore.moveCardToNewColumn(cardId);
	} else {
		boardStore.moveCardRequest({
			cardId,
			oldIndex: oldIndex!,
			newIndex: newIndex!,
			fromColumnId,
			fromColumnIndex: boardStore.getColumnIndex(fromColumnId),
			toColumnId,
			toColumnIndex,
		});
	}
};

const onMoveCardKeyboard = (
	cardIndex: number,
	cardId: string | undefined,
	keyString: string
) => {
	if (cardId === undefined) return;
	if (!hasEditPermission.value) return;

	const fromColumnId = props.column.id;
	const fromColumnIndex = boardStore.getColumnIndex(fromColumnId);

	if (
		keyString === "ArrowRight" &&
		fromColumnIndex === boardStore.getLastColumnIndex()
	) {
		boardStore.moveCardToNewColumn(cardId);
		return;
	}

	const oldIndex = cardIndex;
	let toColumnId: string | undefined = fromColumnId;
	let toColumnIndex = fromColumnIndex;
	let newIndex = 0;
	let forceNextTick = false;

	if (keyString === "ArrowUp") {
		if (cardIndex === 0) return;
		forceNextTick = true;
		newIndex = oldIndex - 1;
	} else if (keyString === "ArrowDown") {
		if (cardIndex === props.column.cards.length - 1) return;
		newIndex = oldIndex + 1;
	} else if (keyString === "ArrowLeft") {
		if (fromColumnIndex === 0) return;
		toColumnIndex = fromColumnIndex - 1;
		toColumnId = boardStore.getColumnId(toColumnIndex);
	} else if (keyString === "ArrowRight") {
		toColumnIndex = fromColumnIndex + 1;
		toColumnId = boardStore.getColumnId(toColumnIndex);
	}

	boardStore.moveCardRequest({
		cardId,
		oldIndex,
		newIndex,
		fromColumnId,
		fromColumnIndex,
		toColumnId,
		toColumnIndex,
		forceNextTick,
	});
};

const onMoveColumnDown = () => {
	emit("move:column-down");
};

const onMoveColumnLeft = () => {
	emit("move:column-left");
};

const onMoveColumnRight = () => {
	emit("move:column-right");
};

const onMoveColumnUp = () => {
	emit("move:column-up");
};

const onReloadBoard = () => {
	emit("reload:board");
};

const onUpdateTitle = useDebounceFn((newTitle: string) => {
	emit("update:column-title", newTitle);
}, 1000);

const scrollableClasses = computed(() => {
	const classes = [];
	if (!props.isListBoard) {
		classes.push("scrollable", "overflow-y-auto");
	}
	return classes;
});

const sortableGhostClasses = computed(() => {
	const classes = ["sortable-drag-ghost"];
	if (!props.isListBoard) {
		classes.push("column-layout");
	}
	return classes;
});

const columnId = toRef(props, "column").value.id;
const { getRenderKey } = useForceRender(columnId);
const renderKey = computed(() => getRenderKey());
</script>

<style>
.sortable-drag-ghost .v-card {
	opacity: 0.6;
}

.column-layout {
	width: 346px; /* size of the card - column has 400px width and some paddings and margins */
}

.draggable,
.sortable-drag-board-card {
	opacity: 1;
}
</style>

<style scoped>
.elevate-transition {
	transition: box-shadow 150ms all;
}

.multi-column-board-column {
	width: 400px;
}

.expanded-sortable {
	min-height: 100%;
}

@supports (scrollbar-color: auto) {
	.scrollable {
		scrollbar-color: transparent transparent;
	}

	.scrollable:hover {
		scrollbar-color: initial;
	}
}

@supports selector(::-webkit-scrollbar) {
	.scrollable::-webkit-scrollbar-thumb {
		background-color: transparent;
	}

	.scrollable:hover::-webkit-scrollbar-thumb {
		background-color: rgba(var(--v-theme-on-surface), 0.6);
	}

	.scrollable::-webkit-scrollbar-thumb:hover {
		background-color: rgba(var(--v-theme-on-surface), 0.8);
	}
}
</style>
