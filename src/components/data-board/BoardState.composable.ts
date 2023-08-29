import { nextTick, onMounted, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { Board, BoardSkeletonCard } from "@/types/board/Board";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";
import { BoardObjectType, ErrorType } from "@util-board";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

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
			await fetchBoard(board.value.id);
			setEditModeId(newColumn.id);
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const createColumnWithCard = async (movingCardId: string) => {
		if (board.value === undefined) return;

		const newColumn = await createColumn();
		if (newColumn?.id) {
			const moveCardPayload: CardMove = {
				addedIndex: 0,
				removedIndex: null,
				columnId: newColumn.id,
				payload: { cardId: movingCardId, height: 100 },
			};
			await moveCard(moveCardPayload);
		}
	};

	const deleteCard = async (id: string) => {
		if (board.value === undefined) return;

		try {
			await deleteCardCall(id);
			await extractCard(id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const deleteColumn = async (id: string) => {
		if (board.value === undefined) return;

		try {
			const columnIndex = getColumnIndex(id);
			if (columnIndex < 0) {
				return;
			}
			await deleteColumnCall(id);
			board.value.columns.splice(columnIndex, 1);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const extractCard = async (
		cardId: string
	): Promise<BoardSkeletonCard | undefined> => {
		if (board.value === undefined) return;

		const column = board.value.columns.find(
			(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
		);
		if (column) {
			const cardIndex = column.cards.findIndex(
				(card) => card.cardId === cardId
			);
			if (cardIndex > -1) {
				const extractedCards = column.cards.splice(cardIndex, 1);
				/**
				 * refreshes the board to force rerendering in tracked v-for
				 * to maintain focus when moving cards by keyboard
				 */
				await nextTick();
				return extractedCards[0];
			}
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

	const moveCard = async (cardPayload: CardMove): Promise<void> => {
		if (board.value === undefined) return;

		try {
			const { addedIndex, columnId, columnIndex, payload } = cardPayload;
			if (
				addedIndex === -1 ||
				(columnIndex !== undefined &&
					addedIndex &&
					addedIndex > board.value.columns[columnIndex].cards.length - 1)
			) {
				return;
			}
			if (
				columnIndex !== undefined &&
				(columnIndex < 0 || columnIndex > board.value.columns.length - 1)
			) {
				return;
			}

			const targetColumnId =
				columnIndex !== undefined ? getColumnId(columnIndex) : columnId;
			if (addedIndex !== null && targetColumnId) {
				const card = await extractCard(payload.cardId);
				if (card) {
					addCard(card, targetColumnId, addedIndex);
				}
				await moveCardCall(payload.cardId, targetColumnId, addedIndex);
			}
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumn = async (payload: ColumnMove) => {
		if (board.value === undefined) return;

		try {
			const { addedIndex, removedIndex } = payload;
			if (addedIndex < 0 || addedIndex > board.value.columns.length - 1) return;

			const element = board.value.columns[removedIndex];
			board.value.columns.splice(removedIndex, 1);
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */
			await nextTick();
			board.value.columns.splice(addedIndex, 0, element);
			await moveColumnCall(payload.payload, board.value.id, addedIndex);
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

	const addCard = (
		card: BoardSkeletonCard,
		columnId: string,
		toPosition: number
	) => {
		if (board.value === undefined) return;

		const targetColumnIndex = getColumnIndex(columnId);
		if (targetColumnIndex > -1) {
			board.value.columns[targetColumnIndex].cards.splice(toPosition, 0, card);
		}
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (board.value === undefined) return;

		return board.value.columns[columnIndex].id;
	};

	const getColumnIndex = (columnId: string): number => {
		if (board.value === undefined) return -1;

		const columnIndex = board.value?.columns.findIndex(
			(c) => c.id === columnId
		);
		return columnIndex;
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
		createColumnWithCard,
		deleteCard,
		deleteColumn,
		extractCard,
		fetchBoard,
		getColumnId,
		moveCard,
		moveColumn,
		notifyWithTemplateAndReload,
		reloadBoard,
		updateColumnTitle,
	};
};
