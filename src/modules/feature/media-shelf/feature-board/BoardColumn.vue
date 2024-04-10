<template>
	<div
		:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
		class="column-drag-handle bg-white px-4"
	>
		<ColumnBoardColumnHeader
			:columnId="column.id"
			:title="column.title"
			:titlePlaceholder="titlePlaceholder"
			@delete:column="onColumnDelete"
			@move:column-left="onMoveColumnLeft"
			@move:column-right="onMoveColumnRight"
			@update:title="onUpdateTitle"
			class="pl-2"
		/>
		<div>
			<Sortable
				:list="column.cards"
				item-key="cardId"
				tag="div"
				:options="{
					group: 'cards',
					direction: 'vertical',
					delay: 300, // isDesktop ? 0 : 300
					delayOnTouchOnly: true,
					disabled: !hasMovePermission,
					ghostClass: 'sortable-drag-ghost',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					dragClass: 'sortable-drag-board-card',
					dragoverBubble: true,
					draggable: '.draggable',
					animation: 250,
					scroll: true,
					forceFallback: true,
					bubbleScroll: true,
				}"
				:class="{ 'expanded-column': isDragging }"
				class="scrollable-column"
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
				v-if="hasCreateColumnPermission && !isDragging"
				@add-card="onCreateCard"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { useBoardPermissions } from "@data-board";
import {
	BOARD_HAS_MULTIPLE_COLUMNS,
	BOARD_IS_FIRST_COLUMN,
	BOARD_IS_LAST_COLUMN,
	extractDataAttribute,
} from "@util-board";
import { useDebounceFn, useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";

import { Sortable } from "sortablejs-vue3";
import { computed, defineComponent, PropType, provide, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { BoardColumn, BoardSkeletonCard } from "../../../../types/board/Board";
import {
	cardDropPlaceholderOptions,
	CardMove,
	DragAndDropKey,
	horizontalCursorKeys,
	verticalCursorKeys,
} from "../../../../types/board/DragAndDrop";
import { DeviceMediaQuery } from "../../../../types/enum/device-media-query.enum";
import CardHost from "../card/CardHost.vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import BoardAddCardButton from "./BoardAddCardButton.vue";
import ColumnBoardColumnHeader from "./ColumnBoardColumnHeader.vue";

export default defineComponent({
	name: "BoardColumn",
	components: {
		ColumnBoardColumnHeader,
		CardHost,
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
	},
	emits: [
		"create:card",
		"delete:card",
		"delete:column",
		"move:column-left",
		"move:column-right",
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

		const { isDragging, dragStart, dragEnd } = useDragAndDrop();

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

		const onMoveColumnLeft = () => {
			emit("move:column-left");
		};

		const onMoveColumnRight = () => {
			emit("move:column-right");
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

		const titlePlaceholder = computed(
			() => `${t("components.boardColumn").toString()} ${props.index + 1}`
		);

		return {
			cardDropPlaceholderOptions,
			colWidth,
			hasCreateColumnPermission,
			hasMovePermission,
			isDragging,
			isDesktop,
			titlePlaceholder,
			onCreateCard,
			onDeleteCard,
			onColumnDelete,
			onDragStart,
			onDragEnd,
			onMoveCardKeyboard,
			onMoveColumnLeft,
			onMoveColumnRight,
			onReloadBoard,
			onUpdateTitle,
			getChildPayload,
			reactiveIndex,
		};
	},
});
</script>

<style>
.sortable-drag-ghost .v-card {
	opacity: 0.6;
	background-color: rgba(var(--v-theme-secondary-lighten-1));
}
.sortable-drag-ghost .v-card .v-btn.v-btn--icon {
	background-color: rgba(var(--v-theme-secondary-lighten-1)) !important;
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
	background-color: rgba(var(--v-theme-secondary-lighten-1));
	border-radius: 5px;
}

/* Handle on hover */
.scrollable-column::-webkit-scrollbar-thumb:hover {
	background: rgba(var(--v-theme-secondary)) !important;
}
</style>
