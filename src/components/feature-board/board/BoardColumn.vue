<template>
	<div
		:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
		class="column-drag-handle"
	>
		<h4 class="text-truncate pr-4">{{ column.title }}</h4>
		<div class="d-flex flex-column flex-grow-1 mr-4">
			<Container
				group-name="col"
				@drop="onCardDrop"
				drag-class="elevation-12"
				drop-class="elevation-0"
				:drop-placeholder="drowpdownDropPlaceholderOptions"
				:get-child-payload="getChildPayload"
			>
				<template v-for="(card, index) in column.cards">
					<Draggable :key="card.cardId">
						<CardHost
							class="mb-6"
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
import { BoardColumn, BoardSkeletonCard } from "../types/Board";
import {
	CardMove,
	CardMoveByKeyboard,
	DragAndDropKeys,
	drowpdownDropPlaceholderOptions,
} from "../types/DragAndDrop";

export default defineComponent({
	name: "BoardColumn",
	components: { CardHost, Container, Draggable },
	props: {
		column: {
			type: Object as PropType<BoardColumn>,
			required: true,
		},
		index: { type: Number, required: true },
	},
	emits: ["card-position-change", "position-change-keyboard"],
	setup(props, { emit }) {
		const colWidth = ref<number>(400);

		const onCardDrop = (dropResult: CardMove): void => {
			const { removedIndex, addedIndex } = dropResult;
			if (removedIndex === null && addedIndex === null) return;
			emit("card-position-change", dropResult);
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

			emit("position-change-keyboard", cardMoveByKeyboard);
		};

		return {
			colWidth,
			drowpdownDropPlaceholderOptions,
			onCardDrop,
			getChildPayload,
			onMoveCardKeyboard,
		};
	},
});
</script>
