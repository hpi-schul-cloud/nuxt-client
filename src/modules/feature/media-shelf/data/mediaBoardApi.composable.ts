import {
	MediaBoardApiFactory,
	MediaBoardApiInterface,
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
	const mediaBoardApi: MediaBoardApiInterface = MediaBoardApiFactory(
		undefined,
		"/v3",
		$axios
	);
	const mediaLineApi: MediaLineApiInterface = MediaLineApiFactory(
		undefined,
		"/v3",
		$axios
	);
	const mediaElementApi: MediaElementApiInterface = MediaElementApiFactory(
		undefined,
		"/v3",
		$axios
	);

	const getMediaBoardForUser = async (): Promise<MediaBoardResponse> => {
		const response: AxiosResponse<MediaBoardResponse> =
			await mediaBoardApi.mediaBoardControllerGetMediaBoardForUser();

		return response.data;
	};

	const getAvailableMedia = async (
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		boardId: string
	): Promise<MediaLineResponse> => {
		/* TODO const response: AxiosResponse<MediaLineResponse> =
			await mediaBoardApi.mediaBoardControllerGetAvailableMedia(boardId);

		return response.data; */
		return {} as MediaLineResponse;
	};

	const createLine = async (boardId: string): Promise<MediaLineResponse> => {
		const response: AxiosResponse<MediaLineResponse> =
			await mediaBoardApi.mediaBoardControllerCreateLine(boardId);

		return response.data;
	};

	const moveLine = async (
		lineId: string,
		toBoardId: string,
		toPosition: number
	): Promise<void> => {
		await mediaLineApi.mediaLineControllerMoveLine(lineId, {
			toBoardId,
			toPosition,
		});
	};

	const updateLineTile = async (
		lineId: string,
		title: string
	): Promise<void> => {
		await mediaLineApi.mediaLineControllerUpdateLineTitle(lineId, { title });
	};

	const deleteLine = async (lineId: string): Promise<void> => {
		await mediaLineApi.mediaLineControllerDeleteLine(lineId);
	};

	const createElement = async (
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		lineId: string
	): Promise<MediaExternalToolElementResponse> => {
		// TODO await mediaLineApi.mediaElementControllerCreateElement(lineId);
		return {} as MediaExternalToolElementResponse;
	};

	const moveElement = async (
		elementId: string,
		toLineId: string,
		toPosition: number
	): Promise<void> => {
		await mediaElementApi.mediaElementControllerMoveElement(elementId, {
			toLineId,
			toPosition,
		});
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const deleteElement = async (elementId: string): Promise<void> => {
		// TODO await mediaElementApi.mediaElementControllerDeleteElement(elementId);
	};

	return {
		getMediaBoardForUser,
		getAvailableMedia,
		createLine,
		moveLine,
		updateLineTile,
		deleteLine,
		createElement,
		moveElement,
		deleteElement,
	};
};
