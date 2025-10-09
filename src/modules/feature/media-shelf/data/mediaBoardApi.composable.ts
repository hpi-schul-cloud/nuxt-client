import {
	BoardLayout,
	MediaAvailableLineResponse,
	MediaBoardApiFactory,
	MediaBoardApiInterface,
	MediaBoardColors,
	MediaBoardResponse,
	MediaElementApiFactory,
	MediaElementApiInterface,
	MediaExternalToolElementResponse,
	MediaLineApiFactory,
	MediaLineApiInterface,
	MediaLineResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useMediaBoardApi = () => {
	const mediaBoardApi: MediaBoardApiInterface = MediaBoardApiFactory(undefined, "/v3", $axios);
	const mediaLineApi: MediaLineApiInterface = MediaLineApiFactory(undefined, "/v3", $axios);
	const mediaElementApi: MediaElementApiInterface = MediaElementApiFactory(undefined, "/v3", $axios);

	const getMediaBoardForUser = async (): Promise<MediaBoardResponse> => {
		const response: AxiosResponse<MediaBoardResponse> = await mediaBoardApi.mediaBoardControllerGetMediaBoardForUser();

		return response.data;
	};

	const updateBoardLayout = async (boardId: string, layout: BoardLayout): Promise<void> => {
		await mediaBoardApi.mediaBoardControllerSetMediaBoardLayout(boardId, {
			layout,
		});
	};

	const getAvailableMedia = async (boardId: string): Promise<MediaAvailableLineResponse> => {
		const response: AxiosResponse<MediaAvailableLineResponse> =
			await mediaBoardApi.mediaBoardControllerGetMediaAvailableLine(boardId);

		return response.data;
	};

	const createLine = async (boardId: string): Promise<MediaLineResponse> => {
		const response: AxiosResponse<MediaLineResponse> = await mediaBoardApi.mediaBoardControllerCreateLine(boardId);

		return response.data;
	};

	const moveLine = async (lineId: string, toBoardId: string, toPosition: number): Promise<void> => {
		await mediaLineApi.mediaLineControllerMoveLine(lineId, {
			toBoardId,
			toPosition,
		});
	};

	const updateLineTitle = async (lineId: string, title: string): Promise<void> => {
		await mediaLineApi.mediaLineControllerUpdateLineTitle(lineId, { title });
	};

	const updateLineColor = async (lineId: string, backgroundColor: MediaBoardColors): Promise<void> => {
		await mediaLineApi.mediaLineControllerUpdateBackgroundColor(lineId, {
			backgroundColor,
		});
	};

	const updateAvailableLineColor = async (boardId: string, backgroundColor: MediaBoardColors): Promise<void> => {
		await mediaBoardApi.mediaBoardControllerUpdateMediaAvailableLineColor(boardId, {
			backgroundColor,
		});
	};

	const updateLineCollapsed = async (lineId: string, value: boolean): Promise<void> => {
		await mediaLineApi.mediaLineControllerCollapseMediaLine(lineId, {
			collapsed: value,
		});
	};

	const updateAvailableLineCollapsed = async (boardId: string, value: boolean): Promise<void> => {
		await mediaBoardApi.mediaBoardControllerCollapseMediaAvailableLine(boardId, {
			collapsed: value,
		});
	};

	const deleteLine = async (lineId: string): Promise<void> => {
		await mediaLineApi.mediaLineControllerDeleteLine(lineId);
	};

	const createElement = async (
		lineId: string,
		position: number,
		schoolExternalToolId: string
	): Promise<MediaExternalToolElementResponse> => {
		const response: AxiosResponse<MediaExternalToolElementResponse> =
			await mediaElementApi.mediaElementControllerCreateElement({
				lineId,
				position,
				schoolExternalToolId,
			});

		return response.data;
	};

	const moveElement = async (elementId: string, toLineId: string, toPosition: number): Promise<void> => {
		await mediaElementApi.mediaElementControllerMoveElement(elementId, {
			toLineId,
			toPosition,
		});
	};

	const deleteElement = async (elementId: string): Promise<void> => {
		await mediaElementApi.mediaElementControllerDeleteElement(elementId);
	};

	return {
		getMediaBoardForUser,
		updateBoardLayout,
		getAvailableMedia,
		createLine,
		moveLine,
		updateLineTitle,
		updateLineColor,
		updateLineCollapsed,
		updateAvailableLineColor,
		updateAvailableLineCollapsed,
		deleteLine,
		createElement,
		moveElement,
		deleteElement,
	};
};
