import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	BoardElementApiFactory,
	ColumnResponse,
	ContentElementType,
	CreateContentElementBody,
	FileElementContent,
	RichTextElementContent,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AnyContentElement } from "../types/ContentElement";

export const useBoardApi = () => {
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const boardColumnApi = BoardColumnApiFactory(undefined, "/v3", $axios);
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);

	const createColumnCall = async (boardId: string): Promise<ColumnResponse> => {
		const response = await boardApi.boardControllerCreateColumn(boardId);
		return response.data;
	};

	const updateCardHeightCall = async (id: string, height: number) => {
		await cardsApi.cardControllerUpdateCardHeight(id, { height });
	};

	const updateCardTitle = async (id: string, title: string) => {
		return await cardsApi.cardControllerUpdateCardTitle(id, { title });
	};

	const updateColumnTitleCall = async (id: string, title: string) => {
		return await boardColumnApi.columnControllerUpdateColumnTitle(id, {
			title,
		});
	};

	const updateElementCall = async (element: AnyContentElement) => {
		const data = generateDataProp(element);
		return await elementApi.elementControllerUpdateElement(element.id, {
			data,
		});
	};

	const generateDataProp = (element: AnyContentElement) => {
		if (element.type === ContentElementType.RichText) {
			return {
				content: element.content as RichTextElementContent,
				type: ContentElementType.RichText,
			};
		}

		if (element.type === ContentElementType.File) {
			return {
				content: element.content as FileElementContent,
				type: ContentElementType.File,
			};
		}

		throw new Error("element.type mapping is undefined for updateElementCall");
	};

	const createElement = async (
		cardId: string,
		params: CreateContentElementBody
	) => {
		const result = await cardsApi.cardControllerCreateElement(cardId, params);

		return result.data;
	};

	const deleteCardCall = async (cardId: string) => {
		return await cardsApi.cardControllerDeleteCard(cardId);
	};

	const deleteColumnCall = async (columnId: string) => {
		return await boardColumnApi.columnControllerDeleteColumn(columnId);
	};

	const createCardCall = async (columnId: string) => {
		const createdCard = await boardColumnApi.columnControllerCreateCard(
			columnId
		);
		if (createdCard.data.id) {
			await createElement(createdCard.data.id, {
				type: ContentElementType.RichText,
			});
			return createdCard.data.id;
		}
	};

	const moveCardCall = async (
		cardId: string,
		toColumnId: string,
		toPosition: number
	) => {
		return await cardsApi.cardControllerMoveCard(cardId, {
			toColumnId,
			toPosition,
		});
	};

	const moveColumnCall = async (
		columnId: string,
		toBoardId: string,
		toPosition: number
	) => {
		return await boardColumnApi.columnControllerMoveColumn(columnId, {
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
		updateCardHeightCall,
		updateCardTitle,
		updateColumnTitleCall,
		updateElementCall,
		createCardCall,
	};
};
