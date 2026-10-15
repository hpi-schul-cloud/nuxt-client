import { useBoardStore } from "./Board.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";

export const getCardDetailRoute = (boardId: string, cardId: string): RouteLocationRaw => ({
	name: "boards-card-detail",
	params: { boardId, cardId },
});

export const useBoardCardNavigation = () => {
	const { board } = storeToRefs(useBoardStore());
	const route = useRoute();

	const allCardIds = computed(() => {
		if (!board.value || !board.value.columns) {
			return [];
		}

		return board.value.columns.flatMap((column) => column.cards.map((card) => card.cardId));
	});

	const currentCardId = computed(() => {
		if (typeof route.params.cardId !== "string") {
			return undefined;
		}
		return route.params.cardId;
	});

	const currentCardIndex = computed(() => (currentCardId.value ? allCardIds.value.indexOf(currentCardId.value) : -1));
	const isCardFound = computed(() => currentCardIndex.value !== -1);
	const isFirstCard = computed(() => currentCardIndex.value <= 0);
	const isLastCard = computed(() => currentCardIndex.value >= allCardIds.value.length - 1);

	const previousCardRoute = computed((): RouteLocationRaw | undefined => {
		if (!board.value || !isCardFound.value || isFirstCard.value) {
			return undefined;
		}

		return getCardDetailRoute(board.value.id, allCardIds.value[currentCardIndex.value - 1]);
	});

	const nextCardRoute = computed((): RouteLocationRaw | undefined => {
		if (!board.value || !isCardFound.value || isLastCard.value) {
			return undefined;
		}

		return getCardDetailRoute(board.value.id, allCardIds.value[currentCardIndex.value + 1]);
	});

	return {
		previousCardRoute,
		nextCardRoute,
	};
};
