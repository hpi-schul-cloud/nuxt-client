import { BoardContextType } from "@/types/board/BoardContext";
import { AnyContentElement } from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import {
	BoardApiFactory,
	BoardCardApiFactory,
	BoardElementApiFactory,
	BoardResponse,
	ContentElementType,
	CourseRoomsApiFactory,
	CreateContentElementBodyParams,
	DrawingElementContentBody,
	DrawingElementResponse,
	ElementWithParentHierarchyResponse,
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
	VideoConferenceElementContentBody,
	VideoConferenceElementResponse,
} from "@api-server";
import { AxiosPromise } from "axios";

export const useBoardApi = () => {
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
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

	const updateElementCall = async (element: AnyContentElement) => {
		const data = generateDataProp(element);
		return elementApi.elementControllerUpdateElement(element.id, {
			data,
		});
	};

	const generateDataProp = (element: AnyContentElement) => {
		const isRichTextElement = (element: AnyContentElement): element is RichTextElementResponse =>
			element.type === ContentElementType.RICH_TEXT;

		if (isRichTextElement(element)) {
			const body: RichTextElementContentBody = {
				content: element.content,
				type: ContentElementType.RICH_TEXT,
			};
			return body;
		}

		const isFileElement = (element: AnyContentElement): element is FileElementResponse =>
			element.type === ContentElementType.FILE;

		if (isFileElement(element)) {
			const body: FileElementContentBody = {
				content: element.content,
				type: ContentElementType.FILE,
			};
			return body;
		}

		const isFileFolderElement = (element: AnyContentElement): element is FileElementResponse =>
			element.type === ContentElementType.FILE_FOLDER;

		if (isFileFolderElement(element)) {
			const body: FileElementContentBody = {
				content: element.content,
				type: ContentElementType.FILE_FOLDER,
			};
			return body;
		}

		const isLinkElement = (element: AnyContentElement): element is LinkElementResponse =>
			element.type === ContentElementType.LINK;

		if (isLinkElement(element)) {
			const body: LinkElementContentBody = {
				// LinkElementContent is not type equal with LinkContentBody
				content: element.content as LinkContentBody,
				type: ContentElementType.LINK,
			};
			return body;
		}

		const isExternalToolElement = (element: AnyContentElement): element is ExternalToolElementResponse =>
			element.type === ContentElementType.EXTERNAL_TOOL;

		if (isExternalToolElement(element)) {
			const body: ExternalToolElementContentBody = {
				// ExternalToolElementContent is not type equal with ExternalToolContentBody
				content: element.content as ExternalToolContentBody,
				type: ContentElementType.EXTERNAL_TOOL,
			};
			return body;
		}

		const isDrawingElement = (element: AnyContentElement): element is DrawingElementResponse =>
			element.type === ContentElementType.DRAWING;

		if (isDrawingElement(element)) {
			const body: DrawingElementContentBody = {
				content: element.content,
				type: ContentElementType.DRAWING,
			};
			return body;
		}

		const isVideoConferenceElement = (element: AnyContentElement): element is VideoConferenceElementResponse =>
			element.type === ContentElementType.VIDEO_CONFERENCE;

		if (isVideoConferenceElement(element)) {
			const body: VideoConferenceElementContentBody = {
				content: element.content,
				type: ContentElementType.VIDEO_CONFERENCE,
			};
			return body;
		}

		const isH5pElement = (element: AnyContentElement): element is H5pElementResponse =>
			element.type === ContentElementType.H5P;

		if (isH5pElement(element)) {
			const body: H5pElementContentBody = {
				// H5pElementContent is not type equal with H5pContentBody
				content: element.content as H5pContentBody,
				type: ContentElementType.H5P,
			};

			return body;
		}

		throw new Error("element.type mapping is undefined for updateElementCall");
	};

	const createElementCall = async (
		cardId: string,
		params: CreateContentElementBodyParams
	): AxiosPromise<AnyContentElement> => await cardsApi.cardControllerCreateElement(cardId, params);

	const fetchRoomName = async (type: BoardContextType, id: string): Promise<string | undefined> => {
		const name =
			type === BoardContextType.ROOM
				? (await roomApi.roomControllerGetRoomDetails(id)).data.name
				: (await courseRoomApi.courseRoomsControllerGetRoomBoard(id)).data.title;

		return name;
	};

	type ContextInfo = { id: string; type: BoardContextType; name: string };

	const getContextInfo = async (boardId: string): Promise<ContextInfo | undefined> => {
		const contextResponse = await boardApi.boardControllerGetBoardContext(boardId);
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

	const getElementWithParentHierarchyCall = async (
		elementId: string
	): AxiosPromise<ElementWithParentHierarchyResponse> =>
		await elementApi.elementControllerGetElementWithParentHierarchy(elementId);

	return {
		fetchBoardCall,
		createElementCall,
		updateElementCall,
		getContextInfo,
		getElementWithParentHierarchyCall,
	};
};
