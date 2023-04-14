import { $axios } from "@/utils/api";
import { BoardCardApiFactory, BoardColumnApiFactory } from "@/serverApi/v3";

export const useBoardApi = () => {
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const boardColumnApi = BoardColumnApiFactory(undefined, "/v3", $axios);

	const updateCardTitle = async (id: string, title: string) => {
		await cardsApi.cardControllerUpdateCardTitle(id, { title });
	};

	const updateColumnTitleCall = async (id: string, title: string) => {
		await boardColumnApi.columnControllerUpdateColumnTitle(id, { title });
	};

	const createElement = async (cardId: string) => {
		await cardsApi.cardControllerCreateElement(cardId);
	};

	const deleteCardCall = async (cardId: string) => {
		await cardsApi.cardControllerDeleteCard(cardId);
	};

	const moveCardCall = async (
		cardId: string,
		toColumnId: string,
		toPosition: number
	) => {
		await cardsApi.cardControllerMoveCard(cardId, {
			toColumnId,
			toPosition,
		});
	};

	return {
		createElement,
		deleteCardCall,
		moveCardCall,
		updateCardTitle,
		updateColumnTitleCall,
	};
};
