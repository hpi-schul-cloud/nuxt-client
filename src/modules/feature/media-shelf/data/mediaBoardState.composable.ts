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
import { ElementMove, LineMove } from "./types";

const useMediaBoardState = () => {
	const api = useMediaBoardApi();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const mediaBoard: Ref<MediaBoardResponse | undefined> = ref();
	const availableMedia: Ref<MediaLineResponse | undefined> = ref();
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
		lineId: string
	): Promise<MediaExternalToolElementResponse | undefined> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			const newElement: MediaExternalToolElementResponse =
				await api.createElement(lineId);

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
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "mediaElement"),
			});
		}
	};

	const moveElement = async (cardMove: ElementMove): Promise<void> => {
		if (mediaBoard.value === undefined) {
			return;
		}

		try {
			let { toLineId } = cardMove;
			const { elementId, oldElementIndex, newElementIndex, fromLineId } =
				cardMove;

			// Same position
			if (fromLineId === toLineId && oldElementIndex === newElementIndex) {
				return;
			}

			if (toLineId === undefined) {
				const newLine: MediaLineResponse | undefined = await createLine();
				if (!newLine) {
					throw new Error();
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
				newElementIndex >
					mediaBoard.value.lines[toLineIndex].elements.length - 1
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
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
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
	});

	/*const addLine = async (): Promise<IMediaBoardLine | null> => {
		if (mediaBoard.value === undefined) {
			return null;
		}

		const line: IMediaBoardLine = {
			id: getId(),
			title: "",
			elements: [],
			isPrimary: false,
		};

		mediaBoard.value.lines.push(line);

		return line;
	};

	// This is all the same as in the column board. Maybe an interface or base class would be good.
	const getLineIndex = (lineId: string | undefined): number => {
		if (lineId === undefined || mediaBoard.value === undefined) {
			return -1;
		}

		const columnIndex: number = mediaBoard.value?.lines.findIndex(
			(c: IMediaBoardLine): boolean => c.id === lineId
		);
		return columnIndex;
	};

	const updateLineTitle = (lineId: string, newTitle: string): void => {
		if (mediaBoard.value === undefined) {
			return;
		}

		// TODO: Call API with debounce
		const lineIndex: number = getLineIndex(lineId);
		if (lineIndex > -1) {
			mediaBoard.value.lines[lineIndex].title = newTitle;
		}
	};

	const moveLine = async (
		columnMove: ColumnMove,
		byKeyboard = false
	): Promise<void> => {
		const { addedIndex, removedIndex } = columnMove;
		if (addedIndex < 0 || addedIndex > mediaBoard.value.lines.length - 1) {
			return;
		}
		if (removedIndex === null || removedIndex === undefined) {
			return;
		}

		const item: IMediaBoardLine = mediaBoard.value.lines.splice(
			removedIndex,
			1
		)[0];

		if (byKeyboard) {
			await nextTick();
		}

		mediaBoard.value.lines.splice(addedIndex, 0, item);
	};

	const getLineId = (lineIndex: number): string | undefined => {
		if (
			mediaBoard.value === undefined ||
			lineIndex === undefined ||
			lineIndex < 0 ||
			lineIndex > mediaBoard.value.lines.length - 1
		) {
			return;
		}

		const line: IMediaBoardLine | undefined = mediaBoard.value.lines[lineIndex];

		if (line === undefined) {
			return;
		}

		return line.id;
	};

	const moveElement = async (cardMove: CardMove): Promise<void> => {
		const {
			cardId,
			newIndex,
			oldIndex,
			toColumnId,
			fromColumnId,
			columnDelta,
			forceNextTick,
		} = cardMove;

		const fromColumnIndex = getLineIndex(fromColumnId);
		let newColumnId: string | undefined = toColumnId;
		let newColumnIndex = getLineIndex(toColumnId);

		if (columnDelta !== undefined) {
			newColumnIndex = fromColumnIndex + columnDelta;
			newColumnId = getLineId(newColumnIndex);
		}
		if (newColumnId === undefined) {
			// need to create a new column
			const newColumn: IMediaBoardLine | null = await addLine();
			if (newColumn) {
				newColumnId = newColumn.id;
				newColumnIndex = getLineIndex(newColumnId);
			}
		}

		if (cardId === undefined || newColumnId === undefined) return; // ensure values are set

		if (fromColumnIndex === newColumnIndex) {
			if (newIndex === oldIndex && fromColumnIndex === newColumnIndex) return; // same position
			if (newIndex < 0) return; // first card - can't move up
			if (
				newIndex >
				mediaBoard.value.lines[fromColumnIndex].elements.length - 1
			)
				return; // last card - can't move down
		}

		const item = mediaBoard.value.lines[fromColumnIndex].elements.splice(
			oldIndex,
			1
		)[0];
		if (forceNextTick === true) {
			await nextTick();
		}
		mediaBoard.value.lines[newColumnIndex].elements.splice(newIndex, 0, item);
	};

	const deleteLine = async (lineId: string): Promise<void> => {
		if (mediaBoard.value === undefined) return;

		const primaryLine: IMediaBoardLine | null = getPrimaryLine();
		const lineIndex: number = getLineIndex(lineId);
		if (lineIndex < 0 || !primaryLine || lineId === primaryLine.id) {
			return;
		}

		const deletedLines: IMediaBoardLine[] = mediaBoard.value.lines.splice(
			lineIndex,
			1
		);

		primaryLine.elements.push(...deletedLines[0].elements);
	};*/

	return {
		mediaBoard,
		availableMedia,
		getLineIndex,
		getLineIndexOfElement,
		fetchMediaBoardForUser,
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
