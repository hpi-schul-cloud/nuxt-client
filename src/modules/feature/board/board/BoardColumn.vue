<template>
	<div :style="columnStyle" :class="columnClasses">
		<BoardColumnHeader
			:columnId="column.id"
			:title="column.title"
			:titlePlaceholder="titlePlaceholder"
			:index="index"
			:isListBoard="isListBoard"
			@delete:column="onColumnDelete"
			@move:column-down="onMoveColumnDown"
			@move:column-left="onMoveColumnLeft"
			@move:column-right="onMoveColumnRight"
			@move:column-up="onMoveColumnUp"
			@update:title="onUpdateTitle"
			:class="{ 'pl-2': !isListBoard }"
		/>
		<div>
			<Sortable
				:list="column.cards"
				item-key="cardId"
				tag="div"
				:options="{
					group: 'cards',
					animation: 250,
					bubbleScroll: true,
					direction: 'vertical',
					delay: isDesktop ? 2 : 300,
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
				:class="sortableClasses"
				@start="onDragStart"
				@end="onDragEnd"
			>
				<template #item="{ element, index }">
					<CardHost
						:data-card-id="element.cardId"
						class="draggable my-3 mx-2"
						:class="hasMovePermission ? '' : 'drag-disabled'"
						:card-id="element.cardId"
						:height="element.height"
						@move:card-keyboard="
							onMoveCardKeyboard(index, element.cardId, $event)
						"
						@delete:card="onDeleteCard"
						@reload:board="onReloadBoard"
					/>
				</template>
			</Sortable>
			<BoardAddCardButton
				v-if="showAddButton"
				@add-card="onCreateCard"
				:data-testid="`column-${index}-add-card-btn`"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useDebounceFn, useMediaQuery } from "@vueuse/core";
import { PropType, computed, defineComponent, provide, ref, toRef } from "vue";
import CardHost from "../card/CardHost.vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import { useBoardPermissions } from "@data-board";
import { BoardColumn, BoardSkeletonCard } from "@/types/board/Board";
import {
	CardMove,
	DragAndDropKey,
	cardDropPlaceholderOptions,
	horizontalCursorKeys,
	verticalCursorKeys,
} from "@/types/board/DragAndDrop";
import BoardAddCardButton from "./BoardAddCardButton.vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import { useI18n } from "vue-i18n";
import {
	BOARD_HAS_MULTIPLE_COLUMNS,
	BOARD_IS_FIRST_COLUMN,
	BOARD_IS_LAST_COLUMN,
	extractDataAttribute,
} from "@util-board";

import { Sortable } from "sortablejs-vue3";
import { SortableEvent } from "sortablejs";

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
		"update:card-position",
		"update:column-title",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		const reactiveIndex = toRef(props, "index");
		const colWidth = ref<number>(400);
		const { hasMovePermission, hasCreateColumnPermission } =
			useBoardPermissions();

		const columnClasses = computed(() => {
			const classes = ["column-drag-handle", "bg-white", "px-4"];
			if (props.isListBoard) {
				classes.push("d-flex", "flex-column", "align-stretch");
			}
			return classes;
		});

		const columnStyle = computed(() => {
			if (props.isListBoard) {
				return;
			}
			const columnLayout = {
				"min-width": `${colWidth.value}px`,
				"max-width": `${colWidth.value}px`,
			};
			return columnLayout;
		});

		const { isDragging, dragStart, dragEnd } = useDragAndDrop();
		const showAddButton = computed(
			() => hasCreateColumnPermission && isDragging.value === false
		);

		const hasManyColumns = computed(() => props.columnCount > 1);
		const isFirstColumn = computed(
			() => hasManyColumns.value && props.index === 0
		);
		const lastIndex = computed(() => props.columnCount - 1);
		const isLastColumn = computed(
			() => hasManyColumns.value && props.index === lastIndex.value
		);

		provide(BOARD_HAS_MULTIPLE_COLUMNS, hasManyColumns);
		provide(BOARD_IS_FIRST_COLUMN, isFirstColumn);
		provide(BOARD_IS_LAST_COLUMN, isLastColumn);

		const onCreateCard = () => emit("create:card", props.column.id);

		const onColumnDelete = (columnId: string): void => {
			emit("delete:column", columnId);
		};

		const onDeleteCard = (cardId: string): void => {
			emit("delete:card", cardId);
		};
		const isDesktop = useMediaQuery(DeviceMediaQuery.Desktop);

		const onDragStart = (): void => {
			dragStart();
		};

		const onDragEnd = async (event: SortableEvent) => {
			dragEnd();
			const { newIndex, oldIndex, to, from, item } = event;
			const toColumnId = extractDataAttribute(to, "columnId");
			const fromColumnId = extractDataAttribute(from, "columnId") as string;
			const cardId = extractDataAttribute(event.item, "cardId") as string;

			if (toColumnId !== fromColumnId) {
				item?.parentNode?.removeChild(item);
			}

			if (newIndex !== undefined && oldIndex !== undefined) {
				const cardMove: CardMove = {
					cardId,
					newIndex,
					oldIndex,
					fromColumnId,
					toColumnId,
				};

				emit("update:card-position", cardMove);
			}
		};

		const onMoveCardKeyboard = (
			cardIndex: number,
			cardId: string,
			keyString: DragAndDropKey
		) => {
			const cardMove: CardMove = {
				oldIndex: cardIndex,
				newIndex: -1,
				cardId,
				fromColumnId: props.column.id,
				toColumnId: props.column.id,
			};

			if (verticalCursorKeys.includes(keyString)) {
				const change = keyString === "ArrowUp" ? -1 : +1;
				if (change === 1 && cardIndex === props.column.cards.length - 1) return;
				if (change === -1 && cardIndex === 0) return;
				if (keyString === "ArrowUp") cardMove.forceNextTick = true;
				cardMove.newIndex = cardIndex + change;
			}

			if (horizontalCursorKeys.includes(keyString)) {
				cardMove.columnDelta = keyString === "ArrowLeft" ? -1 : +1;
				cardMove.newIndex = 0;
			}

			emit("update:card-position", cardMove);
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

		const titlePlaceholder = computed(() => {
			const type = props.isListBoard
				? t("components.boardSection")
				: t("components.boardColumn");

			return `${type} ${props.index + 1}`;
		});

		const sortableClasses = computed(() => {
			const classes = [];
			if (!props.isListBoard) {
				classes.push("scrollable-column");
				if (isDragging.value) {
					classes.push("expanded-column");
				}
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

		return {
			cardDropPlaceholderOptions,
			columnClasses,
			columnStyle,
			colWidth,
			hasCreateColumnPermission,
			hasMovePermission,
			isDragging,
			isDesktop,
			sortableClasses,
			titlePlaceholder,
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
</style>
<style scoped>
.elevate-transition {
	transition: box-shadow 150ms all;
}
</style>
<style>
.expanded-column {
	min-height: 75vh;
}
.draggable,
.sortable-drag-board-card {
	opacity: 1;
}
.scrollable-column {
	overflow: auto;
	max-height: 75vh;
}

/* width */
.scrollable-column::-webkit-scrollbar {
	width: 6px;
}

/* Track */
.scrollable-column::-webkit-scrollbar-track {
	background: white;
	border: none;
}

/* Handle */
.scrollable-column::-webkit-scrollbar-thumb {
	background-color: transparent;
	border-radius: 5px;
}
.column-drag-handle:hover .scrollable-column::-webkit-scrollbar-thumb {
	background-color: rgba(var(--v-theme-on-surface), 0.6);
	border-radius: 5px;
}

/* Handle on hover */
.scrollable-column::-webkit-scrollbar-thumb:hover {
	background: rgba(var(--v-theme-on-surface), 0.8) !important;
}
</style>
