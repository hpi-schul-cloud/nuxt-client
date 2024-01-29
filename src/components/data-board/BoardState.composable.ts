import { nextTick, onMounted, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { Board } from "@/types/board/Board";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";

export const useBoardState = (id: string) => {
	const { handleError, notifyWithTemplate } = useErrorHandler();
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);
	const {
		fetchBoardCall,
		createColumnCall,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		moveColumnCall,
		updateColumnTitleCall,
		createCardCall,
	} = useBoardApi();
	const { setEditModeId } = useSharedEditMode();

	const getColumnIndex = (columnId: string | undefined): number => {
		if (columnId === undefined) return -1;
		if (board.value === undefined) return -1;

		const columnIndex = board.value?.columns.findIndex(
			(c) => c.id === columnId
		);
		return columnIndex;
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (board.value === undefined) return;
		if (columnIndex === undefined) return;
		if (columnIndex < 0) return;
		if (columnIndex > board.value.columns.length - 1) return;
		if (board.value.columns[columnIndex] === undefined) return;

		return board.value.columns[columnIndex].id;
	};

	const createCard = async (columnId: string) => {
		if (board.value === undefined) return;

		try {
			const newCard = await createCardCall(columnId);

			const { setFocus } = useBoardFocusHandler();
			setFocus(newCard.id);

			const columnIndex = board.value.columns.findIndex(
				(column) => column.id === columnId
			);
			board.value.columns[columnIndex].cards.push({
				cardId: newCard.id,
				height: 120,
			});
			setEditModeId(newCard.id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardCard"),
			});
		}
	};

	const createColumn = async () => {
		if (board.value === undefined) return;

		try {
			const newColumn = await createColumnCall(board.value.id);
			setEditModeId(newColumn.id);
			board.value.columns.push(newColumn);
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const deleteCard = async (id: string) => {
		if (board.value === undefined) return;

		try {
			await deleteCardCall(id);
			const columnIndex = board.value.columns.findIndex(
				(column) => column.cards.find((c) => c.cardId === id) !== undefined
			);
			if (columnIndex) {
				const cardIndex = board.value.columns[columnIndex].cards.findIndex(
					(c) => c.cardId === id
				);
				board.value.columns[columnIndex].cards.splice(cardIndex, 1);
			}
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const deleteColumn = async (columnId: string) => {
		if (board.value === undefined) return;

		try {
			const columnIndex = getColumnIndex(columnId);
			if (columnIndex < 0) {
				return;
			}
			board.value.columns.splice(columnIndex, 1);
			await deleteColumnCall(columnId);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const fetchBoard = async (id: string): Promise<void> => {
		isLoading.value = true;

		try {
			board.value = await fetchBoardCall(id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notLoaded", "board"),
			});
		}

		isLoading.value = false;
	};

	const moveCard = async (
		cardMove: CardMove,
		shouldForceNextTick = false
	): Promise<void> => {
		if (board.value === undefined) return;

		try {
			const {
				cardId,
				newIndex,
				oldIndex,
				toColumnId,
				fromColumnId,
				columnDelta,
			} = cardMove;

			const fromColumnIndex = getColumnIndex(fromColumnId);
			let newColumnId: string | undefined = toColumnId;
			let newColumnIndex = getColumnIndex(toColumnId);

			if (columnDelta !== undefined) {
				newColumnIndex = fromColumnIndex + columnDelta;
				newColumnId = getColumnId(newColumnIndex);
			}
			if (newColumnId === undefined) {
				// need to create a new column
				const newColumn = await createColumn();
				if (newColumn) {
					newColumnId = newColumn?.id;
					newColumnIndex = getColumnIndex(newColumnId);
				}
			}

			if (cardId === undefined || newColumnId === undefined) return; // ensure values are set

			if (fromColumnIndex === newColumnIndex) {
				if (newIndex === oldIndex && fromColumnIndex === newColumnIndex) return; // same position
				if (newIndex < 0) return; // first card - can't move up
				if (newIndex > board.value.columns[fromColumnIndex].cards.length - 1)
					return; // last card - can't move down
			}

			const item = board.value.columns[fromColumnIndex].cards.splice(
				oldIndex,
				1
			)[0];
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */
			if (shouldForceNextTick) {
				await nextTick();
			}
			board.value.columns[newColumnIndex].cards.splice(newIndex, 0, item);

			await moveCardCall(cardId, newColumnId, newIndex);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumn = async (columnMove: ColumnMove, byKeyboard = false) => {
		if (board.value === undefined) return;

		try {
			const { addedIndex, removedIndex, columnId } = columnMove;
			if (addedIndex < 0 || addedIndex > board.value.columns.length - 1) return;
			if (removedIndex === null || removedIndex === undefined) return;

			const item = board.value.columns.splice(removedIndex, 1)[0];
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */
			if (byKeyboard === true) {
				await nextTick();
			}
			board.value.columns.splice(addedIndex, 0, item);

			await moveColumnCall(columnId, board.value.id, addedIndex);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateColumnTitle = async (columnId: string, newTitle: string) => {
		if (board.value === undefined) return;

		try {
			await updateColumnTitleCall(columnId, newTitle);
			const columnIndex = getColumnIndex(columnId);
			if (columnIndex > -1) {
				board.value.columns[columnIndex].title = newTitle;
			}
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
			if (board.value === undefined) return;

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
			setEditModeId(undefined);
		};
	};

	const reloadBoard = async () => {
		if (board.value === undefined) return;

		await fetchBoard(board.value.id);
	};

	onMounted(() => {
		fetchBoard(id).then(() => ({
			// do nothing but celebrating sonarcloud
		}));
	});

	return {
		board,
		isLoading,
		createCard,
		createColumn,
		deleteCard,
		deleteColumn,
		fetchBoard,
		moveCard,
		moveColumn,
		notifyWithTemplateAndReload,
		reloadBoard,
		updateColumnTitle,
	};
};
