import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	BoardElementApiFactory,
	BoardResponse,
	CardResponse,
	ColumnResponse,
	ContentElementType,
	CourseRoomsApiFactory,
	CreateCardBodyParamsRequiredEmptyElementsEnum,
	CreateContentElementBodyParams,
	DrawingElementContent,
	ExternalToolElementContentBody,
	FileElementContentBody,
	LinkElementContentBody,
	RichTextElementContentBody,
	RoomApiFactory,
	SubmissionContainerElementContentBody,
	VideoConferenceElementContentBody,
} from "@/serverApi/v3";
import { BoardContextType } from "@/types/board/BoardContext";
import { AnyContentElement } from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { AxiosPromise } from "axios";

export const useBoardApi = () => {
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const boardColumnApi = BoardColumnApiFactory(undefined, "/v3", $axios);
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const elementApi = BoardElementApiFactory(undefined, "/v3", $axios);

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const courseRoomApi = CourseRoomsApiFactory(undefined, "/v3", $axios);

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

	const updateBoardTitleCall = async (id: string, title: string) => {
		if (title.length < 1) return;

		return boardApi.boardControllerUpdateBoardTitle(id, {
			title,
		});
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
				content: element.content,
				type: element.type,
			} as RichTextElementContentBody;
		}

		if (element.type === ContentElementType.File) {
			return {
				content: element.content,
				type: ContentElementType.File,
			} as FileElementContentBody;
		}

		if (element.type === ContentElementType.SubmissionContainer) {
			return {
				content: element.content,
				type: ContentElementType.SubmissionContainer,
			} as SubmissionContainerElementContentBody;
		}

		if (element.type === ContentElementType.Link) {
			return {
				content: element.content,
				type: ContentElementType.Link,
			} as LinkElementContentBody;
		}

		if (element.type === ContentElementType.ExternalTool) {
			return {
				content: element.content,
				type: ContentElementType.ExternalTool,
			} as ExternalToolElementContentBody;
		}

		if (element.type === ContentElementType.Drawing) {
			return {
				content: element.content as DrawingElementContent,
				type: ContentElementType.Drawing,
			};
		}

		if (element.type === ContentElementType.VideoConference) {
			return {
				content: element.content,
				type: ContentElementType.VideoConference,
			} as VideoConferenceElementContentBody;
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

	const fetchRoomName = async (
		type: BoardContextType,
		id: string
	): Promise<string | undefined> => {
		const name =
			type === BoardContextType.Room
				? (await roomApi.roomControllerGetRoomDetails(id)).data.name
				: (await courseRoomApi.courseRoomsControllerGetRoomBoard(id)).data
						.title;

		return name;
	};

	type ContextInfo = { id: string; type: BoardContextType; name: string };

	const getContextInfo = async (
		boardId: string
	): Promise<ContextInfo | undefined> => {
		const contextResponse =
			await boardApi.boardControllerGetBoardContext(boardId);
		if (contextResponse.status !== 200) {
			return undefined;
		}
		const context = contextResponse.data;

		const roomName = await fetchRoomName(context.type, context.id);

		if (roomName === undefined) {
			return undefined;
		}

		return {
			id: context.id,
			type: context.type,
			name: roomName,
		};
	};

	const updateBoardVisibilityCall = async (
		boardId: string,
		isVisible: boolean
	) => {
		return boardApi.boardControllerUpdateVisibility(boardId, { isVisible });
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
		updateBoardTitleCall,
		updateBoardVisibilityCall,
		updateCardHeightCall,
		updateCardTitle,
		updateColumnTitleCall,
		updateElementCall,
		createCardCall,
		getContextInfo,
	};
};
