import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardColumnApiFactory,
	BoardElementApiFactory,
	BoardLayout,
	BoardResponse,
	CardResponse,
	ColumnResponse,
	ContentElementType,
	CourseRoomsApiFactory,
	CreateCardBodyParamsRequiredEmptyElementsEnum,
	CreateContentElementBodyParams,
	DrawingElementContentBody,
	DrawingElementResponse,
	ExternalToolContentBody,
	ExternalToolElementContentBody,
	ExternalToolElementResponse,
	FileElementContentBody,
	FileElementResponse,
	H5pContentBody,
	H5pElementContentBody,
	H5pElementResponse,
	LinkContentBody,
	LinkElementContentBody,
	LinkElementResponse,
	RichTextElementContentBody,
	RichTextElementResponse,
	RoomApiFactory,
	SubmissionContainerElementContentBody,
	SubmissionContainerElementResponse,
	VideoConferenceElementContentBody,
	VideoConferenceElementResponse,
} from "@/serverApi/v3";
import { BoardContextType } from "@/types/board/BoardContext";
import { AnyContentElement } from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { AxiosPromise, AxiosResponse } from "axios";

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
		const isRichTextElement = (
			element: AnyContentElement
		): element is RichTextElementResponse => {
			return element.type === ContentElementType.RichText;
		};

		if (isRichTextElement(element)) {
			const body: RichTextElementContentBody = {
				content: element.content,
				type: ContentElementType.RichText,
			};
			return body;
		}

		const isFileElement = (
			element: AnyContentElement
		): element is FileElementResponse => {
			return element.type === ContentElementType.File;
		};

		if (isFileElement(element)) {
			const body: FileElementContentBody = {
				content: element.content,
				type: ContentElementType.File,
			};
			return body;
		}

		const isSubmissionContainerElement = (
			element: AnyContentElement
		): element is SubmissionContainerElementResponse => {
			return element.type === ContentElementType.SubmissionContainer;
		};

		if (isSubmissionContainerElement(element)) {
			const body: SubmissionContainerElementContentBody = {
				content: element.content,
				type: ContentElementType.SubmissionContainer,
			};
			return body;
		}

		const isLinkElement = (
			element: AnyContentElement
		): element is LinkElementResponse => {
			return element.type === ContentElementType.Link;
		};

		if (isLinkElement(element)) {
			const body: LinkElementContentBody = {
				// LinkElementContent is not type equal with LinkContentBody
				content: element.content as LinkContentBody,
				type: ContentElementType.Link,
			};
			return body;
		}

		const isExternalToolElement = (
			element: AnyContentElement
		): element is ExternalToolElementResponse => {
			return element.type === ContentElementType.ExternalTool;
		};

		if (isExternalToolElement(element)) {
			const body: ExternalToolElementContentBody = {
				// ExternalToolElementContent is not type equal with ExternalToolContentBody
				content: element.content as ExternalToolContentBody,
				type: ContentElementType.ExternalTool,
			};
			return body;
		}

		const isDrawingElement = (
			element: AnyContentElement
		): element is DrawingElementResponse => {
			return element.type === ContentElementType.Drawing;
		};

		if (isDrawingElement(element)) {
			const body: DrawingElementContentBody = {
				content: element.content,
				type: ContentElementType.Drawing,
			};
			return body;
		}

		const isVideoConferenceElement = (
			element: AnyContentElement
		): element is VideoConferenceElementResponse => {
			return element.type === ContentElementType.VideoConference;
		};

		if (isVideoConferenceElement(element)) {
			const body: VideoConferenceElementContentBody = {
				content: element.content,
				type: ContentElementType.VideoConference,
			};
			return body;
		}

		const isH5pElement = (
			element: AnyContentElement
		): element is H5pElementResponse => {
			return element.type === ContentElementType.H5p;
		};

		if (isH5pElement(element)) {
			const body: H5pElementContentBody = {
				// H5pElementContent is not type equal with H5pContentBody
				content: element.content as H5pContentBody,
				type: ContentElementType.H5p,
			};

			return body;
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

	const updateBoardLayoutCall = async (
		boardId: string,
		layout: BoardLayout
	): Promise<AxiosResponse<void>> => {
		return boardApi.boardControllerUpdateLayout(boardId, { layout });
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
		updateBoardLayoutCall,
	};
};
