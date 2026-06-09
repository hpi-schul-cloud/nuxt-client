import { useBoardStore } from "./Board.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";

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

	const previousCardRoute = computed((): RouteLocationRaw | undefined => {
		if (!board.value || currentCardIndex.value <= 0) {
			return undefined;
		}

		const prevCardId = allCardIds.value[currentCardIndex.value - 1];
		return { name: "boards-card-detail", params: { boardId: board.value.id, cardId: prevCardId } };
	});

	const nextCardRoute = computed((): RouteLocationRaw | undefined => {
		if (!board.value || currentCardIndex.value === -1 || currentCardIndex.value >= allCardIds.value.length - 1) {
			return undefined;
		}

		const nextCardId = allCardIds.value[currentCardIndex.value + 1];
		return { name: "boards-card-detail", params: { boardId: board.value.id, cardId: nextCardId } };
	});

	return {
		previousCardRoute,
		nextCardRoute,
	};
};
