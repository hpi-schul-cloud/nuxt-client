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
				drag-class="card-ghost"
				drop-class="card-ghost-drop"
				:drop-placeholder="dropPlaceholderOptions"
				:get-child-payload="getChildPayload"
			>
				<template v-for="card in column.cards">
					<Draggable :key="card.cardId">
						<CardHost
							:id="card.cardId"
							:height="card.height"
							@move-card-keyboard="moveByKeyboard(card, $event)"
						/>
					</Draggable>
				</template>
			</Container>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import CardHost from "./CardHost.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { BoardColumn, BoardSkeletonCard } from "./types/Board";
import { CardMovePayload, dropPlaceholderOptions } from "./types/DragAndDrop";

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
	setup(props, ctx) {
		const colWidth = ref<number>(400);

		const onCardDrop = (dropResult: CardMovePayload): void => {
			const { removedIndex, addedIndex } = dropResult;
			if (removedIndex === null && addedIndex === null) return;

			ctx.emit("card-position-change", dropResult);
		};

		const getChildPayload = (index: number): BoardSkeletonCard => {
			return props.column.cards[index];
		};

		const findCardPosition = (cardId: string): number => {
			return props.column.cards.findIndex((card) => card.cardId === cardId);
		};

		const cardHostRefs = ref<{ id: string }[]>();

		const moveByKeyboard = (card: BoardSkeletonCard, keyString: string) => {
			const cardIndex = findCardPosition(card.cardId);
			const dndObject = {
				cardId: card.cardId,
				cardPosition: cardIndex,
				columnIndex: props.index,
				targetColumnIndex: -1,
				targetColumnPosition: -1,
			};

			if (["ArrowUp", "ArrowDown"].includes(keyString)) {
				dndObject.targetColumnIndex = props.index;
				dndObject.targetColumnPosition =
					keyString === "ArrowUp" ? cardIndex - 1 : cardIndex + 1;
			}
			if (["ArrowLeft", "ArrowRight"].includes(keyString)) {
				dndObject.targetColumnIndex =
					keyString === "ArrowLeft" ? props.index - 1 : props.index + 1;
				dndObject.targetColumnPosition = 0;
			}

			ctx.emit("position-change-keyboard", dndObject);
			const selectedCard = cardHostRefs.value?.find(
				(c) => c.id === card.cardId
			);
			console.log(selectedCard);
		};

		return {
			colWidth,
			dropPlaceholderOptions,
			onCardDrop,
			getChildPayload,
			moveByKeyboard,
			cardHostRefs,
		};
	},
});
</script>

<style scoped>
.card-ghost {
	transition: transform 0.18s ease;
	transform: rotateZ(2deg);
}

.card-ghost-drop {
	transition: transform 0.18s ease-in-out;
	transform: rotateZ(0deg);
}
</style>
