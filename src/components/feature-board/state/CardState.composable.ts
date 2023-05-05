import { CreateContentElementBodyTypeEnum } from "@/serverApi/v3";
import { onMounted, reactive, toRef } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import { AnyContentElement } from "../types/ContentElement";

declare type CardState = {
	isLoading: boolean;
	card: BoardCard | undefined;
};

export const useCardState = (id: BoardCard["id"]) => {
	const cardState = reactive<CardState>({ isLoading: true, card: undefined });

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { createElement, deleteCardCall, updateCardTitle } = useBoardApi();

	const fetchCard = async (id: string): Promise<void> => {
		try {
			cardState.card = await fetchCardFromApi(id);
		} catch (error) {
			console.error(error);
		}
		cardState.isLoading = false;
	};

	const updateTitle = async (newTitle: string): Promise<void> => {
		if (cardState.card === undefined) {
			return;
		}
		await updateCardTitle(cardState.card.id, newTitle);
		cardState.card.title = newTitle;
	};

	const deleteCard = async () => {
		if (cardState.card === undefined) {
			return;
		}

		await deleteCardCall(cardState.card.id);
	};

	const updateCardHeight = (newHeight: number) => {
		if (cardState.card === undefined) {
			return;
		}
		if (cardState.card.height === newHeight) {
			return;
		}
		cardState.card.height = newHeight;
	};

	const addElement = async (type: CreateContentElementBodyTypeEnum) => {
		if (cardState.card === undefined) {
			return;
		}
		const result = await createElement(cardState.card.id, { type });

		cardState.card.elements.push(result as unknown as AnyContentElement);
	};

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		updateTitle,
		deleteCard,
		updateCardHeight,
		addElement,
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
	};
};
