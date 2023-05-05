import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	BoardElementApiFactory,
	ColumnResponse,
	CreateContentElementBody,
	CreateContentElementBodyTypeEnum,
	FileElementContent,
	TextElementContent,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useBoardApi = () => {
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const boardColumnApi = BoardColumnApiFactory(undefined, "/v3", $axios);
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);

	const createColumnCall = async (boardId: string): Promise<ColumnResponse> => {
		const response = await boardApi.boardControllerCreateColumn(boardId);
		return response.data;
	};

	const updateCardTitle = async (id: string, title: string) => {
		await cardsApi.cardControllerUpdateCardTitle(id, { title });
	};

	const updateColumnTitleCall = async (id: string, title: string) => {
		await boardColumnApi.columnControllerUpdateColumnTitle(id, { title });
	};

	const updateElementCall = async (
		elementId: string,
		content: TextElementContent | FileElementContent
	) => {
		await elementApi.elementControllerUpdateElement(elementId, { content });
	};

	const createElement = async (
		cardId: string,
		type: CreateContentElementBody
	) => {
		const result = await cardsApi.cardControllerCreateElement(cardId, type);

		return result.data;
	};

	const deleteCardCall = async (cardId: string) => {
		await cardsApi.cardControllerDeleteCard(cardId);
	};

	const deleteColumnCall = async (columnId: string) => {
		await boardColumnApi.columnControllerDeleteColumn(columnId);
	};

	const createCardCall = async (columnId: string) => {
		const createdCard = await boardColumnApi.columnControllerCreateCard(
			columnId
		);
		if (createdCard.data.id) {
			createElement(createdCard.data.id, {
				type: CreateContentElementBodyTypeEnum.Text,
			});
			return createdCard.data.id;
		}
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

	const moveColumnCall = async (
		columnId: string,
		toBoardId: string,
		toPosition: number
	) => {
		await boardColumnApi.columnControllerMoveColumn(columnId, {
			toBoardId,
			toPosition,
		});
	};

	return {
		createColumnCall,
		createElement,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		moveColumnCall,
		updateCardTitle,
		updateColumnTitleCall,
		updateElementCall,
		createCardCall,
	};
};
