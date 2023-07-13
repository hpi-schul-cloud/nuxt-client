import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	BoardElementApiFactory,
	ColumnResponse,
	ContentElementType,
	CreateContentElementBodyParams,
	FileElementContent,
	RichTextElementContent,
	CreateCardBodyParamsRequiredEmptyElementsEnum,
	RoomsApiFactory,
	BoardResponse,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { AnyContentElement } from "../types/ContentElement";
import { AxiosPromise } from "axios";
import { createApplicationError } from "@/utils/create-application-error.factory";

export const useBoardApi = () => {
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const boardColumnApi = BoardColumnApiFactory(undefined, "/v3", $axios);
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);

	const roomApi = RoomsApiFactory(undefined, "/v3", $axios);

	const fetchBoardCall = async (id: string): Promise<BoardResponse> => {
		try {
			const response = await boardApi.boardControllerGetBoardSkeleton(id);
			return response.data;
		} catch (error) {
			const responseError = mapAxiosErrorToResponseError(error);

			throw createApplicationError(responseError.code);
		}
	};

	const createColumnCall = async (boardId: string): Promise<ColumnResponse> => {
		const response = await boardApi.boardControllerCreateColumn(boardId);
		return response.data;
	};

	const updateCardHeightCall = async (
		id: string,
		height: number
	): Promise<number> => {
		const response = await cardsApi.cardControllerUpdateCardHeight(id, {
			height,
		});

		return response.status;
	};

	const updateCardTitle = async (
		id: string,
		title: string
	): Promise<number> => {
		const response = await cardsApi.cardControllerUpdateCardTitle(id, {
			title,
		});
		return response.status;
	};

	const updateColumnTitleCall = async (
		id: string,
		title: string
	): Promise<number> => {
		const response = await boardColumnApi.columnControllerUpdateColumnTitle(
			id,
			{
				title,
			}
		);
		return response.status;
	};

	const updateElementCall = async (
		element: AnyContentElement
	): Promise<number> => {
		const data = generateDataProp(element);
		const response = await elementApi.elementControllerUpdateElement(
			element.id,
			{
				data,
			}
		);
		return response.status;
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

	const createElementCall = async (
		cardId: string,
		params: CreateContentElementBodyParams
	): AxiosPromise<AnyContentElement> => {
		return await cardsApi.cardControllerCreateElement(cardId, params);
	};

	const deleteCardCall = async (cardId: string): Promise<number> => {
		const response = await cardsApi.cardControllerDeleteCard(cardId);
		return response.status;
	};

	const deleteElementCall = async (elementId: string): Promise<number> => {
		const response = await elementApi.elementControllerDeleteElement(elementId);
		return response.status;
	};

	const deleteColumnCall = async (columnId: string): Promise<number> => {
		const response = await boardColumnApi.columnControllerDeleteColumn(
			columnId
		);
		return response.status;
	};

	const createCardCall = async (
		columnId: string
	): Promise<string | undefined> => {
		const createdCard = await boardColumnApi.columnControllerCreateCard(
			columnId,
			{
				requiredEmptyElements: [
					CreateCardBodyParamsRequiredEmptyElementsEnum.RichText,
				],
			}
		);
		if (createdCard.data.id) {
			return createdCard.data.id;
		}
	};

	const moveCardCall = async (
		cardId: string,
		toColumnId: string,
		toPosition: number
	): Promise<number> => {
		const response = await cardsApi.cardControllerMoveCard(cardId, {
			toColumnId,
			toPosition,
		});
		return response.status;
	};

	const moveColumnCall = async (
		columnId: string,
		toBoardId: string,
		toPosition: number
	): Promise<number> => {
		const response = await boardColumnApi.columnControllerMoveColumn(columnId, {
			toBoardId,
			toPosition,
		});
		return response.status;
	};

	const moveElementCall = async (
		elementId: string,
		toCardId: string,
		toPosition: number
	) => {
		await elementApi.elementControllerMoveElement(elementId, {
			toCardId,
			toPosition,
		});
	};

	type ContextInfo = { id: string; name: string };

	const getContextInfo = async (
		boardId: string
	): Promise<ContextInfo | undefined> => {
		const contextResponse = await boardApi.boardControllerGetBoardContext(
			boardId
		);
		if (contextResponse.status !== 200) {
			return undefined;
		}
		const context = contextResponse.data;
		const roomResponse = await roomApi.roomsControllerGetRoomBoard(context.id);

		if (roomResponse.status !== 200) {
			return undefined;
		}
		return {
			id: roomResponse.data.roomId,
			name: roomResponse.data.title,
		};
	};

	return {
		fetchBoardCall,
		createColumnCall,
		createElementCall,
		deleteElementCall,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		moveColumnCall,
		moveElementCall,
		updateCardHeightCall,
		updateCardTitle,
		updateColumnTitleCall,
		updateElementCall,
		createCardCall,
		getContextInfo,
	};
};
