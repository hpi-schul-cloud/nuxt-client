import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import {
	MediaBoardResponse,
	MediaExternalToolElementResponse,
	MediaLineResponse,
} from "@/serverApi/v3";
import { createSharedComposable } from "@vueuse/core";
import { onMounted, ref, Ref } from "vue";
import { useMediaBoardApi } from "./mediaBoardApi.composable";
import {
	ElementCreate,
	ElementMove,
	IMediaBoardElement,
	LineMove,
} from "./types";

const useMediaBoardState = () => {
	const api = useMediaBoardApi();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const mediaBoard: Ref<MediaBoardResponse | undefined> = ref();
	const availableMedia: Ref<IMediaBoardElement[]> = ref([]);
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
			handleError(error, {
				404: notifyWithTemplate("notLoaded", "mediaBoard"),
			});
		}

		isLoading.value = false;
	};

	const fetchAvailableMedia = async (): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		isLoading.value = true;

		try {
			availableMedia.value = await api.getAvailableMedia(mediaBoard.value.id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "mediaBoard"),
			});
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
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "mediaLine"),
			});
		}
	};

	const deleteLine = async (lineId: string) => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			await api.deleteLine(lineId);

			const lineIndex: number = getLineIndex(lineId);

			if (lineIndex < 0) {
				return;
			}

			mediaBoard.value.lines.splice(lineIndex, 1);

			await fetchAvailableMedia();
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "mediaLine"),
			});
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

			await api.moveLine(lineId, mediaBoard.value.id, newLineIndex);

			const line: MediaLineResponse = mediaBoard.value.lines.splice(
				oldLineIndex,
				1
			)[0];

			mediaBoard.value.lines.splice(newLineIndex, 0, line);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "mediaLine"),
			});
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

			await api.updateLineTile(lineId, newTitle);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "mediaLine"),
			});
		}
	};

	// Media Element
	const createElement = async (
		createOptions: ElementCreate
	): Promise<MediaExternalToolElementResponse | undefined> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			let lineId: string | undefined = createOptions.toLineId;
			if (lineId === undefined) {
				const newLine: MediaLineResponse | undefined = await createLine();
				if (!newLine) {
					throw new Error("New line could not be created");
				}

				lineId = newLine.id;
			}

			const newElement: MediaExternalToolElementResponse =
				await api.createElement(lineId, createOptions.newElementIndex);

			const lineIndex: number = getLineIndex(lineId);

			mediaBoard.value.lines[lineIndex].elements.push(newElement);

			return newElement;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "mediaElement"),
			});
		}
	};

	const deleteElement = async (elementId: string) => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			await api.deleteElement(elementId);

			const lineIndex: number = getLineIndexOfElement(elementId);

			if (lineIndex < 0) {
				return;
			}

			const elementIndex: number = mediaBoard.value.lines[
				lineIndex
			].elements.findIndex((element) => element.id === elementId);

			if (elementIndex < 0) {
				return;
			}

			mediaBoard.value.lines[lineIndex].elements.splice(elementIndex, 1);

			await fetchAvailableMedia();
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "mediaElement"),
			});
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
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "mediaElement"),
			});
		}
	};

	const notifyWithTemplateAndReload = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			if (mediaBoard.value === undefined) {
				return;
			}

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
		};
	};

	const reloadBoard = async () => {
		if (mediaBoard.value === undefined) {
			return;
		}

		await fetchMediaBoardForUser();
	};

	onMounted(async () => {
		await fetchMediaBoardForUser();
		await fetchAvailableMedia();
	});

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
		createElement,
		deleteElement,
		moveElement,
	};
};

export const useSharedMediaBoardState =
	createSharedComposable(useMediaBoardState);
