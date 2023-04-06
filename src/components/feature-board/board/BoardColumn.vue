<template>
	<div
		:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
		class="column-drag-handle white px-4"
	>
		<BoardColumnHeader
			:title="column.title"
			@update:title="onUpdateTitle"
		></BoardColumnHeader>
		<Container
			group-name="cards"
			drag-class="elevation-12"
			drop-class="elevation-0"
			:drag-begin-delay="200"
			:drop-placeholder="cardDropPlaceholderOptions"
			:get-child-payload="getChildPayload"
			@drop="onMoveCard"
		>
			<template v-for="(card, index) in column.cards">
				<Draggable :key="card.cardId">
					<CardHost
						class="my-3"
						:card-id="card.cardId"
						:height="card.height"
						@move-card-keyboard="onMoveCardKeyboard(index, card, $event)"
					/>
				</Draggable>
			</template>
		</Container>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Container, Draggable } from "vue-smooth-dnd";
import CardHost from "../card/CardHost.vue";
import { BoardColumn, BoardSkeletonCard } from "../types/Board";
import {
	cardDropPlaceholderOptions,
	CardMove,
	CardMoveByKeyboard,
	DragAndDropKeys,
} from "../types/DragAndDrop";
import BoardColumnHeader from "./BoardColumnHeader.vue";

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

		return {
			colWidth,
			cardDropPlaceholderOptions,
			onMoveCard,
			getChildPayload,
			onMoveCardKeyboard,
			onUpdateTitle,
		};
	},
});
</script>

<style>
.elevate-transition {
	transition: box-shadow 150ms all;
}
</style>
