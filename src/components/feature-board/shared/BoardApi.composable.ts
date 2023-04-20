import { $axios } from "@/utils/api";
import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	ColumnResponse,
} from "@/serverApi/v3";

export const useBoardApi = () => {
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const boardColumnApi = BoardColumnApiFactory(undefined, "/v3", $axios);
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);

	const createColumn = async (boardId: string): Promise<ColumnResponse> => {
		const response = await boardApi.boardControllerCreateColumn(boardId);
		return response.data;
	};

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

	const deleteColumnCall = async (columnId: string) => {
		await boardColumnApi.columnControllerDeleteColumn(columnId);
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
		createColumn,
		createElement,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		updateCardTitle,
		updateColumnTitleCall,
	};
};
