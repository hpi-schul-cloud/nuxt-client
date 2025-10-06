import { useMediaBoardApi } from "./mediaBoardApi.composable";
import { ElementCreate, ElementMove, LineMove } from "./types";
import { BoardObjectType, ErrorType, useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	BoardLayout,
	DeletedElementResponse,
	MediaAvailableLineResponse,
	MediaBoardColors,
	MediaBoardResponse,
	MediaExternalToolElementResponse,
	MediaLineResponse,
} from "@/serverApi/v3";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { Ref, ref } from "vue";

const useMediaBoardState = () => {
	const api = useMediaBoardApi();
	const { handleAnyError, notifyWithTemplate } = useErrorHandler();

	const mediaBoard: Ref<MediaBoardResponse | undefined> = ref();
	const availableMediaLine: Ref<MediaAvailableLineResponse | undefined> = ref();
	const isLoading: Ref<boolean> = ref<boolean>(false);
	const isBoardOperationLoading: Ref<boolean> = ref<boolean>(false);

	// Utils
	const getLineIndex = (lineId: string): number => {
		if (mediaBoard.value === undefined) {
			return -1;
		}

		const lineIndex: number = mediaBoard.value.lines.findIndex((line) => line.id === lineId);

		return lineIndex;
	};

	const getLineIndexOfElement = (elementId: string): number => {
		if (mediaBoard.value === undefined) {
			return -1;
		}

		const lineIndex: number = mediaBoard.value.lines.findIndex((line) => {
			const element: MediaExternalToolElementResponse | DeletedElementResponse | undefined = line.elements.find(
				(element) => element.id === elementId
			);

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

	const updateMediaBoardLayout = async (layout: BoardLayout): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			mediaBoard.value.layout = layout;

			await api.updateBoardLayout(mediaBoard.value.id, layout);
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		}
	};

	const fetchAvailableMedia = async (): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		isLoading.value = true;

		try {
			const availableList: MediaAvailableLineResponse = await api.getAvailableMedia(mediaBoard.value.id);

			availableMediaLine.value = availableList;
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
			isBoardOperationLoading.value = true;
			const newLine: MediaLineResponse = await api.createLine(mediaBoard.value.id);

			mediaBoard.value.lines.push(newLine);

			return newLine;
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notCreated", "boardRow"));
		} finally {
			isBoardOperationLoading.value = false;
		}
	};

	const deleteLine = async (lineId: string): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			isBoardOperationLoading.value = true;

			const lineIndex: number = getLineIndex(lineId);

			if (lineIndex < 0) {
				return;
			}

			const temp = Array.from(mediaBoard.value.lines);
			temp.splice(lineIndex, 1);
			mediaBoard.value.lines = temp;

			await api.deleteLine(lineId);

			await fetchAvailableMedia();
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notDeleted", "boardRow"));
		} finally {
			isBoardOperationLoading.value = false;
		}
	};

	const moveLine = async (lineMove: LineMove): Promise<void> => {
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
			if (newLineIndex < 0 || newLineIndex > mediaBoard.value.lines.length - 1) {
				return;
			}

			isBoardOperationLoading.value = true;

			const temp = Array.from(mediaBoard.value.lines);
			const line: MediaLineResponse = temp.splice(oldLineIndex, 1)[0];

			temp.splice(newLineIndex, 0, line);
			mediaBoard.value.lines = temp;

			await api.moveLine(lineId, mediaBoard.value.id, newLineIndex);
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		} finally {
			isBoardOperationLoading.value = false;
		}
	};

	const updateLineTitle = async (lineId: string, newTitle: string): Promise<void> => {
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
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		}
	};

	const updateLineBackgroundColor = async (lineId: string, color: MediaBoardColors): Promise<void> => {
		if (mediaBoard.value === undefined) {
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
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		}
	};

	const updateAvailableLineBackgroundColor = async (color: MediaBoardColors): Promise<void> => {
		if (mediaBoard.value === undefined || availableMediaLine.value === undefined) {
			return;
		}

		try {
			availableMediaLine.value.backgroundColor = color;

			await api.updateAvailableLineColor(mediaBoard.value.id, color);
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		}
	};

	const updateLineCollapsed = async (lineId: string, value: boolean): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const lineIndex: number = getLineIndex(lineId);

			if (lineIndex < 0) {
				return;
			}

			mediaBoard.value.lines[lineIndex].collapsed = value;

			await api.updateLineCollapsed(lineId, value);
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		}
	};

	const updateAvailableLineCollapsed = async (value: boolean): Promise<void> => {
		if (mediaBoard.value === undefined || availableMediaLine.value === undefined) {
			return;
		}

		try {
			availableMediaLine.value.collapsed = value;

			await api.updateAvailableLineCollapsed(mediaBoard.value.id, value);
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardRow"));
		}
	};

	// Media Element
	const createElement = async (createOptions: ElementCreate): Promise<MediaExternalToolElementResponse | undefined> => {
		if (mediaBoard.value === undefined || availableMediaLine.value === undefined) {
			return;
		}

		try {
			let { toLineId } = createOptions;
			const { oldElementIndex, newElementIndex, schoolExternalToolId } = createOptions;

			if (toLineId === undefined) {
				const newLine: MediaLineResponse | undefined = await createLine();
				if (!newLine) {
					throw new Error("New line could not be created");
				}

				toLineId = newLine.id;
			}

			isBoardOperationLoading.value = true;

			if (availableMediaLine.value) {
				const temp = Array.from(availableMediaLine.value.elements);
				temp.splice(oldElementIndex, 1);
				availableMediaLine.value.elements = temp;
			}
			const newElement: MediaExternalToolElementResponse = await api.createElement(
				toLineId,
				newElementIndex,
				schoolExternalToolId
			);

			const lineIndex: number = getLineIndex(toLineId);

			const temp = Array.from(mediaBoard.value.lines[lineIndex].elements);
			temp.splice(newElementIndex, 0, newElement);
			mediaBoard.value.lines[lineIndex].elements = temp;

			return newElement;
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notCreated", "boardElement"));
		} finally {
			isBoardOperationLoading.value = false;
		}
	};

	const deleteElement = async (elementId: string): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			isBoardOperationLoading.value = true;
			const lineIndex: number = getLineIndexOfElement(elementId);

			// Element or line not found
			if (lineIndex < 0) {
				return;
			}

			const elementIndex: number = mediaBoard.value.lines[lineIndex].elements.findIndex(
				(element) => element.id === elementId
			);

			const temp = Array.from(mediaBoard.value.lines[lineIndex].elements);
			temp.splice(elementIndex, 1);
			mediaBoard.value.lines[lineIndex].elements = temp;

			await api.deleteElement(elementId);

			await fetchAvailableMedia();
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notCreated", "boardElement"));
		} finally {
			isBoardOperationLoading.value = false;
		}
	};

	const moveElement = async (elementMove: ElementMove): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			let { toLineId } = elementMove;
			const { elementId, oldElementIndex, newElementIndex, fromLineId } = elementMove;

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

			isBoardOperationLoading.value = true;
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

			const tempFromLine = Array.from(mediaBoard.value.lines[fromLineIndex].elements);
			const element: MediaExternalToolElementResponse | DeletedElementResponse = tempFromLine.splice(
				oldElementIndex,
				1
			)[0];
			mediaBoard.value.lines[fromLineIndex].elements = tempFromLine;

			const tempToLine = Array.from(mediaBoard.value.lines[toLineIndex].elements);
			tempToLine.splice(newElementIndex, 0, element);
			mediaBoard.value.lines[toLineIndex].elements = tempToLine;
		} catch (error) {
			handleAnyError(error, notifyWithTemplateAndReload("notUpdated", "boardElement"));
		} finally {
			isBoardOperationLoading.value = false;
		}
	};

	const notifyWithTemplateAndReload = (errorType: ErrorType, boardObjectType?: BoardObjectType) => () => {
		notifyWithTemplate(errorType, boardObjectType)();
		fetchMediaBoardForUser();
	};

	return {
		mediaBoard,
		availableMediaLine,
		updateMediaBoardLayout,
		getLineIndex,
		getLineIndexOfElement,
		fetchMediaBoardForUser,
		fetchAvailableMedia,
		createLine,
		deleteLine,
		moveLine,
		updateLineTitle,
		updateLineBackgroundColor,
		updateLineCollapsed,
		updateAvailableLineBackgroundColor,
		updateAvailableLineCollapsed,
		createElement,
		deleteElement,
		moveElement,
		isLoading,
		isBoardOperationLoading,
	};
};

export const useSharedMediaBoardState = createTestableSharedComposable(useMediaBoardState);
