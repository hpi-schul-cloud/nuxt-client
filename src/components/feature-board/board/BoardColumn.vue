<template>
	<div
		:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
		class="column-drag-handle white px-4"
	>
		<BoardColumnHeader
			:columnId="column.id"
			:title="column.title"
			:titlePlaceholder="titlePlaceholder"
			@delete:column="onColumnDelete"
			@move:column-keyboard="onMoveColumnKeyboard"
			@update:title="onUpdateTitle"
			class="pl-2"
		></BoardColumnHeader>
		<Container
			group-name="cards"
			drag-class="elevation-12"
			drop-class="elevation-0"
			:drop-placeholder="cardDropPlaceholderOptions"
			:get-child-payload="getChildPayload"
			:drag-begin-delay="isDesktop ? 0 : 300"
			non-drag-area-selector=".drag-disabled"
			@drag-start="onDragStart"
			@drop="onDragEnd"
			class="scrollable-column pr-1 -mt-3"
			:class="{ 'expanded-column': isDragging }"
		>
			<Draggable v-for="(card, index) in column.cards" :key="card.cardId">
				<CardHost
					class="my-3 mx-2"
					:card-id="card.cardId"
					:height="card.height"
					:class="{ 'drag-disabled': !hasMovePermission }"
					@move:card-keyboard="onMoveCardKeyboard(index, card, $event)"
					@delete:card="onDeleteCard"
				/>
			</Draggable>
		</Container>
		<BoardAddCardButton
			v-if="hasCreateColumnPermission && !isDragging"
			@add-card="onCreateCard"
		></BoardAddCardButton>
	</div>
</template>

<script lang="ts">
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { useDebounceFn, useMediaQuery } from "@vueuse/core";
import { PropType, computed, defineComponent, ref } from "vue";
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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Container, Draggable } = require("vue-dndrop");

export default defineComponent({
	name: "BoardColumn",
	components: {
		CardHost,
		Container,
		Draggable,
		BoardColumnHeader,
		BoardAddCardButton,
	},
	props: {
		column: {
			type: Object as PropType<BoardColumn>,
			required: true,
		},
		index: { type: Number, required: true },
	},
	emits: [
		"create:card",
		"delete:card",
		"delete:column",
		"move:column-keyboard",
		"update:card-position",
		"update:column-title",
	],
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const colWidth = ref<number>(400);
		const { hasMovePermission, hasCreateColumnPermission } =
			useBoardPermissions();

		const { isDragging, dragStart, dragEnd } = useDragAndDrop();

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

		const onDragEnd = (dropResult: CardMove): void => {
			dragEnd();
			const { removedIndex, addedIndex } = dropResult;
			if (removedIndex === null && addedIndex === null) return;
			emit("update:card-position", {
				...dropResult,
				columnId: props.column.id,
			});
		};

		const onMoveCardKeyboard = (
			cardIndex: number,
			card: BoardSkeletonCard,
			keyString: DragAndDropKey
		) => {
			const cardMove: CardMove = {
				removedIndex: cardIndex,
				addedIndex: -1,
				payload: card,
				columnIndex: props.index,
			};

			if (verticalCursorKeys.includes(keyString)) {
				const change = keyString === "ArrowUp" ? -1 : +1;
				cardMove.addedIndex = cardIndex + change;
			}

			if (horizontalCursorKeys.includes(keyString)) {
				const change = keyString === "ArrowLeft" ? -1 : +1;
				cardMove.columnIndex = props.index + change;
				cardMove.addedIndex = 0;
			}

			emit("update:card-position", cardMove);
		};

		const onMoveColumnKeyboard = (event: KeyboardEvent) => {
			emit("move:column-keyboard", event);
		};

		const onUpdateTitle = useDebounceFn((newTitle: string) => {
			emit("update:column-title", newTitle);
		}, 1000);

		const getChildPayload = (index: number): BoardSkeletonCard => {
			return props.column.cards[index];
		};

		const titlePlaceholder = computed(
			() => `${i18n.t("components.boardColumn").toString()} ${props.index + 1}`
		);

		return {
			cardDropPlaceholderOptions,
			colWidth,
			hasCreateColumnPermission,
			hasMovePermission,
			isDragging,
			titlePlaceholder,
			onCreateCard,
			onDeleteCard,
			onColumnDelete,
			onDragStart,
			onDragEnd,
			onMoveCardKeyboard,
			onMoveColumnKeyboard,
			onUpdateTitle,
			getChildPayload,
			isDesktop,
		};
	},
});
</script>

<style>
.elevate-transition {
	transition: box-shadow 150ms all;
}
</style>
<style scoped>
.scrollable-column.expanded-column {
	min-height: 75vh;
}
.scrollable-column {
	overflow-y: auto;
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
.column-drag-handle:hover > .scrollable-column::-webkit-scrollbar-thumb {
	background-color: var(--v-secondary-lighten1);
	border-radius: 5px;
}

/* Handle on hover */
.scrollable-column::-webkit-scrollbar-thumb:hover {
	background: var(--v-secondary-base) !important;
}
</style>
@data-board";
