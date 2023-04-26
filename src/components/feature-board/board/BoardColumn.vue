<template>
	<div
		:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
		class="column-drag-handle white px-4"
	>
		<BoardColumnHeader
			:columnId="column.id"
			:title="column.title"
			:titlePlaceholder="titlePlaceholder"
			@update:title="onUpdateTitle"
			@delete:column="onColumnDelete"
		></BoardColumnHeader>
		<Container
			group-name="cards"
			drag-class="elevation-12"
			drop-class="elevation-0"
			:drop-placeholder="cardDropPlaceholderOptions"
			:get-child-payload="getChildPayload"
			non-drag-area-selector=".drag-disabled"
			@drop="onMoveCard"
		>
			<template v-for="(card, index) in column.cards">
				<Draggable :key="card.cardId">
					<CardHost
						class="my-3"
						:card-id="card.cardId"
						:height="card.height"
						@move-card-keyboard="onMoveCardKeyboard(index, card, $event)"
						@delete:card="onDeleteCard"
					/>
				</Draggable>
			</template>
		</Container>
		<BoardAddCardButton @add-card="onCreateCard"></BoardAddCardButton>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from "vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { useDebounceFn } from "@vueuse/core";
import VueI18n from "vue-i18n";
import CardHost from "../card/CardHost.vue";
import { BoardColumn, BoardSkeletonCard } from "../types/Board";
import {
	cardDropPlaceholderOptions,
	CardMove,
	CardMoveByKeyboard,
	DragAndDropKeys,
} from "../types/DragAndDrop";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import BoardAddCardButton from "./BoardAddCardButton.vue";

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
		"update:card-position",
		"update:card-position:keyboard",
		"update:column-title",
	],
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const colWidth = ref<number>(400);

		const onMoveCard = (dropResult: CardMove): void => {
			const { removedIndex, addedIndex } = dropResult;
			if (removedIndex === null && addedIndex === null) return;
			emit("update:card-position", {
				...dropResult,
				targetColumnId: props.column.id,
			});
		};

		const onColumnDelete = (columnId: string): void => {
			emit("delete:column", columnId);
		};

		const onDeleteCard = (cardId: string): void => {
			emit("delete:card", cardId);
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

		const onUpdateTitle = useDebounceFn((newTitle: string) => {
			emit("update:column-title", newTitle);
		}, 1000);

		const titlePlaceholder = computed(
			() => `${i18n?.t("components.boardColumn").toString()} ${props.index + 1}`
		);

		const onCreateCard = () => emit("create:card", props.column.id);

		return {
			colWidth,
			cardDropPlaceholderOptions,
			onColumnDelete,
			onMoveCard,
			onDeleteCard,
			getChildPayload,
			onMoveCardKeyboard,
			onUpdateTitle,
			titlePlaceholder,
			onCreateCard,
		};
	},
});
</script>

<style>
.elevate-transition {
	transition: box-shadow 150ms all;
}
</style>
