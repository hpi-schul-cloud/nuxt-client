import { useBoardStore } from "./Board.store";
import { storeToRefs } from "pinia";
import { computed, isRef, Ref } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";

export const useBoardCardNavigation = (boardId: Ref<string> | string) => {
	const { board } = storeToRefs(useBoardStore());
	const route = useRoute();

	const resolvedBoardId = computed(() => (isRef(boardId) ? boardId.value : boardId));

	const allCardIds = computed(() => (board.value?.columns ?? []).flatMap((col) => col.cards.map((c) => c.cardId)));

	const currentCardId = computed(() => (route.params.cardId ? (route.params.cardId as string) : undefined));

	const currentCardIndex = computed(() => (currentCardId.value ? allCardIds.value.indexOf(currentCardId.value) : -1));

	const previousCardRoute = computed((): RouteLocationRaw | undefined => {
		if (currentCardIndex.value <= 0) return undefined;
		const prevCardId = allCardIds.value[currentCardIndex.value - 1];
		return { name: "boards-card-detail", params: { boardId: resolvedBoardId.value, cardId: prevCardId } };
	});

	const nextCardRoute = computed((): RouteLocationRaw | undefined => {
		if (currentCardIndex.value === -1 || currentCardIndex.value >= allCardIds.value.length - 1) return undefined;
		const nextCardId = allCardIds.value[currentCardIndex.value + 1];
		return { name: "boards-card-detail", params: { boardId: resolvedBoardId.value, cardId: nextCardId } };
	});

	return {
		previousCardRoute,
		nextCardRoute,
	};
};
