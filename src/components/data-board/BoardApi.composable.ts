import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	BoardElementApiFactory,
	BoardResponse,
	CardResponse,
	ColumnResponse,
	ContentElementType,
	CreateCardBodyParamsRequiredEmptyElementsEnum,
	CreateContentElementBodyParams,
	ExternalToolElementContent,
	FileElementContent,
	LinkElementContent,
	RichTextElementContent,
	RoomsApiFactory,
	SubmissionContainerElementContent,
} from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { AxiosPromise } from "axios";

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

	const updateCardHeightCall = async (id: string, height: number) => {
		return cardsApi.cardControllerUpdateCardHeight(id, {
			height,
		});
	};

	const updateCardTitle = async (id: string, title: string) => {
		return cardsApi.cardControllerUpdateCardTitle(id, {
			title,
		});
	};

	const updateColumnTitleCall = async (id: string, title: string) => {
		return boardColumnApi.columnControllerUpdateColumnTitle(id, {
			title,
		});
	};

	const updateElementCall = async (element: AnyContentElement) => {
		const data = generateDataProp(element);
		return elementApi.elementControllerUpdateElement(element.id, {
			data,
		});
	};

	const generateDataProp = (element: AnyContentElement) => {
		if (element.type === ContentElementType.RichText) {
			return {
				content: element.content as RichTextElementContent,
				type: element.type,
			};
		}

		if (element.type === ContentElementType.File) {
			return {
				content: element.content as FileElementContent,
				type: ContentElementType.File,
			};
		}

		if (element.type === ContentElementType.SubmissionContainer) {
			return {
				content: element.content as SubmissionContainerElementContent,
				type: ContentElementType.SubmissionContainer,
			};
		}

		if (element.type === ContentElementType.ExternalTool) {
			return {
				content: element.content as ExternalToolElementContent,
				type: ContentElementType.ExternalTool,
			};
		}

		if (element.type === ContentElementType.Link) {
			return {
				content: element.content as LinkElementContent,
				type: ContentElementType.Link,
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

	const deleteCardCall = async (cardId: string) => {
		return cardsApi.cardControllerDeleteCard(cardId);
	};

	const deleteElementCall = async (elementId: string) => {
		return elementApi.elementControllerDeleteElement(elementId);
	};

	const deleteColumnCall = async (columnId: string) => {
		return boardColumnApi.columnControllerDeleteColumn(columnId);
	};

	const createCardCall = async (columnId: string): Promise<CardResponse> => {
		const response = await boardColumnApi.columnControllerCreateCard(columnId, {
			requiredEmptyElements: [
				CreateCardBodyParamsRequiredEmptyElementsEnum.RichText,
			],
		});
		return response.data;
	};

	const moveCardCall = async (
		cardId: string,
		toColumnId: string,
		toPosition: number
	): Promise<void> => {
		await cardsApi.cardControllerMoveCard(cardId, {
			toColumnId,
			toPosition,
		});
	};

	const moveColumnCall = async (
		columnId: string,
		toBoardId: string,
		toPosition: number
	): Promise<void> => {
		await boardColumnApi.columnControllerMoveColumn(columnId, {
			toBoardId,
			toPosition,
		});
	};

	const moveElementCall = async (
		elementId: string,
		toCardId: string,
		toPosition: number
	) => {
		return elementApi.elementControllerMoveElement(elementId, {
			toCardId,
			toPosition,
		});
	};

	type ContextInfo = { id: string; name: string };

	const getContextInfo = async (
		boardId: string
	): Promise<ContextInfo | undefined> => {
		const contextResponse =
			await boardApi.boardControllerGetBoardContext(boardId);
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
