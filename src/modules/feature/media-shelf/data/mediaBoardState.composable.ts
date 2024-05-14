import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import {
	MediaAvailableLineResponse,
	MediaBoardResponse,
	MediaExternalToolElementResponse,
	MediaLineResponse,
} from "@/serverApi/v3";
import { ref, Ref } from "vue";
import { useMediaBoardApi } from "./mediaBoardApi.composable";
import { ElementCreate, ElementMove, LineMove } from "./types";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";

const useMediaBoardState = () => {
	const api = useMediaBoardApi();
	const { handleAnyError, notifyWithTemplate } = useErrorHandler();

	const mediaBoard: Ref<MediaBoardResponse | undefined> = ref();
	const availableMedia: Ref<MediaAvailableLineResponse | undefined> = ref();
	const isLoading: Ref<boolean> = ref<boolean>(false);

	// Utils
	const getLineIndex = (lineId: string): number => {
		if (mediaBoard.value === undefined) {
			return -1;
		}

		const lineIndex: number = mediaBoard.value.lines.findIndex(
			(line) => line.id === lineId
		);

		return lineIndex;
	};

	const getLineIndexOfElement = (elementId: string): number => {
		if (mediaBoard.value === undefined) {
			return -1;
		}

		const lineIndex: number = mediaBoard.value.lines.findIndex((line) => {
			const element: MediaExternalToolElementResponse | undefined =
				line.elements.find((element) => element.id === elementId);

			return element !== undefined;
		});

		return lineIndex;
	};

	// Media Board
	const fetchMediaBoardForUser = async (): Promise<void> => {
		isLoading.value = true;

		try {
			mediaBoard.value = await api.getMediaBoardForUser();
		} catch (error) {
			handleAnyError(error, notifyWithTemplate("notLoaded", "board"));
		}

		isLoading.value = false;
	};

	const fetchAvailableMedia = async (): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		isLoading.value = true;

		try {
			const availableList: MediaAvailableLineResponse =
				await api.getAvailableMedia(mediaBoard.value.id);

			availableMedia.value = availableList;
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notLoaded", "board"));
		}

		isLoading.value = false;
	};

	// Media Line
	const createLine = async (): Promise<MediaLineResponse | undefined> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const newLine: MediaLineResponse = await api.createLine(
				mediaBoard.value.id
			);

			mediaBoard.value.lines.push(newLine);

			return newLine;
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notCreated", "boardRow")
			);
		}
	};

	const deleteLine = async (lineId: string) => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const lineIndex: number = getLineIndex(lineId);

			if (lineIndex < 0) {
				return;
			}

			mediaBoard.value.lines.splice(lineIndex, 1);

			await api.deleteLine(lineId);

			await fetchAvailableMedia();
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notDeleted", "boardRow")
			);
		}
	};

	const moveLine = async (lineMove: LineMove) => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const { lineId, newLineIndex, oldLineIndex } = lineMove;

			// Same position
			if (newLineIndex === oldLineIndex) {
				return;
			}

			// Check bounds
			if (
				newLineIndex < 0 ||
				newLineIndex > mediaBoard.value.lines.length - 1
			) {
				return;
			}

			const line: MediaLineResponse = mediaBoard.value.lines.splice(
				oldLineIndex,
				1
			)[0];

			mediaBoard.value.lines.splice(newLineIndex, 0, line);

			await api.moveLine(lineId, mediaBoard.value.id, newLineIndex);
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notUpdated", "boardRow")
			);
		}
	};

	const updateLineTitle = async (lineId: string, newTitle: string) => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const lineIndex: number = getLineIndex(lineId);

			if (lineIndex < 0) {
				return;
			}

			mediaBoard.value.lines[lineIndex].title = newTitle;

			await api.updateLineTitle(lineId, newTitle);
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notUpdated", "boardRow")
			);
		}
	};

	const updateLineBackgroundColor = async (lineId: string, color: string) => {
		if (mediaBoard.value === undefined || availableMedia.value === undefined) {
			return;
		}

		try {
			const lineIndex: number = getLineIndex(lineId);

			if (lineIndex < 0) {
				return;
			}

			mediaBoard.value.lines[lineIndex].backgroundColor = color;

			await api.updateLineColor(lineId, color);
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notUpdated", "boardRow")
			);
		}
	};

	// Media Element
	const createElement = async (
		createOptions: ElementCreate
	): Promise<MediaExternalToolElementResponse | undefined> => {
		if (mediaBoard.value === undefined || availableMedia.value === undefined) {
			return;
		}

		try {
			let { toLineId } = createOptions;
			const { oldElementIndex, newElementIndex, schoolExternalToolId } =
				createOptions;

			if (toLineId === undefined) {
				const newLine: MediaLineResponse | undefined = await createLine();
				if (!newLine) {
					throw new Error("New line could not be created");
				}

				toLineId = newLine.id;
			}

			availableMedia.value?.elements.splice(oldElementIndex, 1);

			const newElement: MediaExternalToolElementResponse =
				await api.createElement(
					toLineId,
					newElementIndex,
					schoolExternalToolId
				);

			const lineIndex: number = getLineIndex(toLineId);

			mediaBoard.value.lines[lineIndex].elements.splice(
				newElementIndex,
				0,
				newElement
			);

			return newElement;
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notCreated", "boardElement")
			);
		}
	};

	const deleteElement = async (elementId: string) => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const lineIndex: number = getLineIndexOfElement(elementId);

			// Element or line not found
			if (lineIndex < 0) {
				return;
			}

			const elementIndex: number = mediaBoard.value.lines[
				lineIndex
			].elements.findIndex((element) => element.id === elementId);

			mediaBoard.value.lines[lineIndex].elements.splice(elementIndex, 1);

			await api.deleteElement(elementId);

			await fetchAvailableMedia();
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notCreated", "boardElement")
			);
		}
	};

	const moveElement = async (elementMove: ElementMove): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			let { toLineId } = elementMove;
			const { elementId, oldElementIndex, newElementIndex, fromLineId } =
				elementMove;

			// Same position
			if (fromLineId === toLineId && oldElementIndex === newElementIndex) {
				return;
			}

			if (toLineId === undefined) {
				const newLine: MediaLineResponse | undefined = await createLine();
				if (!newLine) {
					throw new Error("New line could not be created");
				}

				toLineId = newLine.id;
			}

			const fromLineIndex: number = getLineIndex(fromLineId);
			const toLineIndex: number = getLineIndex(toLineId);

			// Check bounds
			if (
				fromLineIndex < 0 ||
				toLineIndex < 0 ||
				newElementIndex < 0 ||
				newElementIndex > mediaBoard.value.lines[toLineIndex].elements.length
			) {
				return;
			}

			await api.moveElement(elementId, toLineId, newElementIndex);

			const element: MediaExternalToolElementResponse = mediaBoard.value.lines[
				fromLineIndex
			].elements.splice(oldElementIndex, 1)[0];

			mediaBoard.value.lines[toLineIndex].elements.splice(
				newElementIndex,
				0,
				element
			);
		} catch (error) {
			handleAnyError(
				error,
				notifyWithTemplateAndReload("notUpdated", "boardElement")
			);
		}
	};

	const notifyWithTemplateAndReload = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			notifyWithTemplate(errorType, boardObjectType)();
			fetchMediaBoardForUser();
		};
	};

	return {
		mediaBoard,
		availableMedia,
		getLineIndex,
		getLineIndexOfElement,
		fetchMediaBoardForUser,
		fetchAvailableMedia,
		createLine,
		deleteLine,
		moveLine,
		updateLineTitle,
		updateLineBackgroundColor,
		createElement,
		deleteElement,
		moveElement,
		isLoading,
	};
};

export const useSharedMediaBoardState =
	createTestableSharedComposable(useMediaBoardState);
