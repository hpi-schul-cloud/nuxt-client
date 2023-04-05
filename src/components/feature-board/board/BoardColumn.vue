<template>
	<div
		:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
		class="column-drag-handle white px-4"
	>
		<BoardColumnHeader
			:title="column.title"
			@update:title="onUpdateTitle"
		></BoardColumnHeader>
		<div class="d-flex flex-column flex-grow-1">
			<Container
				group-name="cards"
				:drag-begin-delay="200"
				:drop-placeholder="cardDropPlaceholderOptions"
				:get-child-payload="getChildPayload"
				@drop="onMoveCard"
				@drag-start="onDragStart"
				@drag-end="onDragEnd"
			>
				<template v-for="(card, index) in column.cards">
					<Draggable :key="card.cardId">
						<CardHost
							class="my-3 elevate-transition"
							:card-id="card.cardId"
							:height="card.height"
							@move-card-keyboard="onMoveCardKeyboard(index, card, $event)"
						/>
					</Draggable>
				</template>
			</Container>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Container, Draggable } from "vue-smooth-dnd";
import CardHost from "../card/CardHost.vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import { BoardColumn, BoardSkeletonCard } from "../types/Board";
import {
	CardMove,
	CardMoveByKeyboard,
	DragAndDropKeys,
	cardDropPlaceholderOptions,
} from "../types/DragAndDrop";
import { BoardCard } from "../types/Card";

export default defineComponent({
	name: "BoardColumn",
	components: { CardHost, Container, Draggable, BoardColumnHeader },
	props: {
		column: {
			type: Object as PropType<BoardColumn>,
			required: true,
		},
		index: { type: Number, required: true },
	},
	emits: [
		"update:card-position",
		"update:card-position:keyboard",
		"update:title",
	],
	setup(props, { emit }) {
		const colWidth = ref<number>(400);
		const draggedCardId = ref<BoardCard["cardId"] | undefined>(undefined);

		const onMoveCard = (dropResult: CardMove): void => {
			const { removedIndex, addedIndex } = dropResult;
			if (removedIndex === null && addedIndex === null) return;
			emit("update:card-position", dropResult);
		};

		const getChildPayload = (index: number): BoardSkeletonCard => {
			return props.column.cards[index];
		};

		const onMoveCardKeyboard = (
			cardIndex: number,
			card: BoardSkeletonCard,
			keyString: DragAndDropKeys
		) => {
			const cardMoveByKeyboard: CardMoveByKeyboard = {
				card: card,
				cardIndex,
				columnIndex: props.index,
				targetColumnIndex: props.index,
				targetColumnPosition: -1,
			};

			if (
				new Array<DragAndDropKeys>("ArrowUp", "ArrowDown").includes(keyString)
			) {
				cardMoveByKeyboard.targetColumnPosition =
					keyString === "ArrowUp" ? cardIndex - 1 : cardIndex + 1;
			}
			if (
				new Array<DragAndDropKeys>("ArrowLeft", "ArrowRight").includes(
					keyString
				)
			) {
				cardMoveByKeyboard.targetColumnIndex =
					keyString === "ArrowLeft" ? props.index - 1 : props.index + 1;
				cardMoveByKeyboard.targetColumnPosition = 0;
			}

			emit("update:card-position:keyboard", cardMoveByKeyboard);
		};

		const onUpdateTitle = (newTitle: string) => {
			emit("update:title", newTitle);
		};

		const onDragStart = (event: { payload: BoardCard }) => {
			console.log("drag start", event.payload.cardId);
			draggedCardId.value = event.payload.cardId;
		};

		const onDragEnd = () => {
			draggedCardId.value = undefined;
		};

		return {
			colWidth,
			cardDropPlaceholderOptions,
			onMoveCard,
			getChildPayload,
			onMoveCardKeyboard,
			onUpdateTitle,
			onDragStart,
			onDragEnd,
			draggedCardId,
		};
	},
});
</script>

<style>
.elevate-transition {
	transition: box-shadow 150ms all;
}
</style>
