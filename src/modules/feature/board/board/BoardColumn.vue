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
		<div class="h-100 overflow-y-auto pt-3" :class="scrollableClasses">
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

<script lang="ts">
import { BoardColumn, BoardSkeletonCard } from "@/types/board/Board";
import {
	cardDropPlaceholderOptions,
	DragAndDropKey,
} from "@/types/board/DragAndDrop";
import {
	useBoardPermissions,
	useBoardStore,
	useForceRender,
} from "@data-board";
import { extractDataAttribute, useDragAndDrop } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, defineComponent, PropType, ref, toRef } from "vue";
import CardHost from "../card/CardHost.vue";
import BoardAddCardButton from "./BoardAddCardButton.vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";

export default defineComponent({
	name: "BoardColumn",
	components: {
		CardHost,
		BoardColumnHeader,
		BoardAddCardButton,
		Sortable,
	},
	props: {
		column: {
			type: Object as PropType<BoardColumn>,
			required: true,
		},
		columnCount: {
			type: Number,
			required: true,
		},
		index: { type: Number, required: true },
		isListBoard: { type: Boolean, required: true },
	},
	emits: [
		"create:card",
		"delete:card",
		"delete:column",
		"move:column-down",
		"move:column-left",
		"move:column-right",
		"move:column-up",
		"reload:board",
		"update:column-title",
	],
	setup(props, { emit }) {
		const boardStore = useBoardStore();
		const reactiveIndex = toRef(props, "index");

		const colWidth = ref<number>(400);
		const {
			hasEditPermission,
			hasMovePermission,
			hasCreateColumnPermission,
			hasCreateCardPermission,
		} = useBoardPermissions();

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
		const isNotLastColumn = computed(
			() => props.index !== props.columnCount - 1
		);

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

		const onDragEnd = async (event: SortableEvent) => {
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

			boardStore.moveCardRequest({
				cardId,
				oldIndex: oldIndex!,
				newIndex: newIndex!,
				fromColumnId,
				fromColumnIndex: boardStore.getColumnIndex(fromColumnId),
				toColumnId,
				toColumnIndex,
			});
		};

		const onMoveCardKeyboard = (
			cardIndex: number,
			cardId: string | undefined,
			keyString: DragAndDropKey
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

		const getChildPayload = (index: number): BoardSkeletonCard => {
			return props.column.cards[index];
		};

		const scrollableClasses = computed(() => {
			const classes = [];
			if (!props.isListBoard) {
				classes.push("scrollable");
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

		return {
			cardDropPlaceholderOptions,
			columnClasses,
			colWidth,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			hasMovePermission,
			isDragging,
			isNotFirstColumn,
			isNotLastColumn,
			scrollableClasses,
			onCreateCard,
			onDeleteCard,
			onColumnDelete,
			onDragStart,
			onDragEnd,
			onMoveCardKeyboard,
			onMoveColumnDown,
			onMoveColumnLeft,
			onMoveColumnRight,
			onMoveColumnUp,
			onReloadBoard,
			onUpdateTitle,
			getChildPayload,
			reactiveIndex,
			renderKey,
			showAddButton,
			sortableGhostClasses,
		};
	},
});
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
	/* The last subtracted height of 10x is the height of the scrollbar. */
	height: calc(
		100vh - var(--topbar-height) - var(--breadcrumbs-height) -
			var(--board-header-height) - 10px
	);
	width: 400px;
}

.expanded-sortable {
	min-height: 100%;
}

@supports selector(::-webkit-scrollbar) {
	.scrollable::-webkit-scrollbar {
		width: 6px;
	}

	.scrollable::-webkit-scrollbar-track {
		background: white;
		border: none;
	}

	.scrollable::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-radius: 5px;
	}

	.column-drag-handle:hover .scrollable::-webkit-scrollbar-thumb {
		background-color: rgba(var(--v-theme-on-surface), 0.6);
		border-radius: 5px;
	}

	.column-drag-handle:hover .scrollable::-webkit-scrollbar-thumb:hover {
		background: rgba(var(--v-theme-on-surface), 0.8);
	}
}

@supports not selector(::-webkit-scrollbar) {
	.scrollable {
		scrollbar-width: thin;
		scrollbar-color: transparent transparent;
	}

	.column-drag-handle:hover .scrollable {
		scrollbar-color: initial;
	}
}
</style>
