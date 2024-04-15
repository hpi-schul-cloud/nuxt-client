import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { useBoardStore } from "./../BoardStore";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import * as BoardActions from "./baseActions";
import { useBoardFocusHandler } from "../BoardFocusHandler.composable";
import { nextTick } from "vue";

export const useBoardRestApi = () => {
	const boardStore = useBoardStore();
	// const { board } = boardStore;

	const { fetchBoardCall } = useBoardApi();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const {
		createCardCall,
		createColumnCall,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		moveColumnCall,
		updateColumnTitleCall,
		updateBoardTitleCall,
		updateBoardVisibilityCall,
	} = useBoardApi();

	const { setEditModeId } = useSharedEditMode();

	const getColumnIndex = (columnId: string | undefined): number => {
		if (columnId === undefined) return -1;
		if (boardStore.board === undefined) return -1;

		const columnIndex = boardStore.board?.columns.findIndex(
			(c) => c.id === columnId
		);
		return columnIndex;
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (boardStore.board === undefined) return;
		if (columnIndex === undefined) return;
		if (columnIndex < 0) return;
		if (columnIndex > boardStore.board.columns.length - 1) return;
		if (boardStore.board.columns[columnIndex] === undefined) return;

		return boardStore.board.columns[columnIndex].id;
	};

	const createCardRequest = async (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		if (boardStore.board === undefined) return;

		try {
			const newCard = await createCardCall(action.payload.columnId);

			const { setFocus } = useBoardFocusHandler();
			setFocus(newCard.id);

			const columnIndex = boardStore.board.columns.findIndex(
				(column) => column.id === action.payload.columnId
			);
			boardStore.board.columns[columnIndex].cards.push({
				cardId: newCard.id,
				height: 120,
			});
			setEditModeId(newCard.id);
		} catch (error) {
			BoardActions.createCardFailure({
				errorMessage: "unable to create card",
			});
		}
	};

	const createCardSuccess = (
		action: ReturnType<typeof BoardActions.createCardSuccess>
	) => action.type;

	const fetchBoard = async (
		action: ReturnType<typeof BoardActions.fetchBoard>
	): Promise<void> => {
		boardStore.isLoading = true;
		try {
			boardStore.board = await fetchBoardCall(action.payload.id);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notLoaded", "board"),
			});
		}
		boardStore.isLoading = false;
	};

	const createColumnRequest = async () => {
		if (boardStore.board === undefined) return;

		try {
			const newColumn = await createColumnCall(boardStore.board.id);
			useBoardFocusHandler().setFocus(newColumn.id);
			setEditModeId(newColumn.id);
			boardStore.board.columns.push(newColumn);
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const createColumnSuccess = async (
		action: ReturnType<typeof BoardActions.createColumnSuccess>
	) => action.type;

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { cardId } = action.payload;

		try {
			const columnIndex = boardStore.board.columns.findIndex(
				(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
			);
			if (columnIndex !== -1) {
				const cardIndex = boardStore.board.columns[columnIndex].cards.findIndex(
					(c) => c.cardId === cardId
				);
				boardStore.board.columns[columnIndex].cards.splice(cardIndex, 1);
			}
			await deleteCardCall(cardId);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const deleteCardSuccess = (
		action: ReturnType<typeof BoardActions.deleteCardSuccess>
	) => action.type;

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { columnId } = action.payload;

		try {
			const columnIndex = getColumnIndex(columnId);
			if (columnIndex < 0) {
				return;
			}
			boardStore.board.columns.splice(columnIndex, 1);
			await deleteColumnCall(columnId);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const deleteColumnSuccess = (
		action: ReturnType<typeof BoardActions.deleteColumnSuccess>
	) => action.type;

	const moveCardRequest = async (
		action: ReturnType<typeof BoardActions.moveCardRequest>
	): Promise<void> => {
		if (boardStore.board === undefined) return;

		try {
			const {
				cardId,
				newIndex,
				oldIndex,
				toColumnId,
				fromColumnId,
				columnDelta,
				forceNextTick,
			} = action.payload;

			const fromColumnIndex = getColumnIndex(fromColumnId);
			let newColumnId: string | undefined = toColumnId;
			let newColumnIndex = getColumnIndex(toColumnId);

			if (columnDelta !== undefined) {
				newColumnIndex = fromColumnIndex + columnDelta;
				newColumnId = getColumnId(newColumnIndex);
			}
			if (newColumnId === undefined) {
				// need to create a new column
				const newColumn = await createColumnRequest();
				if (newColumn) {
					newColumnId = newColumn?.id;
					newColumnIndex = getColumnIndex(newColumnId);
				}
			}

			if (cardId === undefined || newColumnId === undefined) return; // ensure values are set

			if (fromColumnIndex === newColumnIndex) {
				if (newIndex === oldIndex && fromColumnIndex === newColumnIndex) return; // same position
				if (newIndex < 0) return; // first card - can't move up
				if (
					newIndex >
					boardStore.board.columns[fromColumnIndex].cards.length - 1
				)
					return; // last card - can't move down
			}

			const item = boardStore.board.columns[fromColumnIndex].cards.splice(
				oldIndex,
				1
			)[0];
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */
			if (forceNextTick === true) {
				await nextTick();
			}
			boardStore.board.columns[newColumnIndex].cards.splice(newIndex, 0, item);

			await moveCardCall(cardId, newColumnId, newIndex);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { columnMove, byKeyboard } = action.payload;

		try {
			const { addedIndex, removedIndex, columnId } = columnMove;
			if (addedIndex < 0 || addedIndex > boardStore.board.columns.length - 1)
				return;
			if (removedIndex === null || removedIndex === undefined) return;

			const item = boardStore.board.columns.splice(removedIndex, 1)[0];
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */
			if (byKeyboard === true) {
				await nextTick();
			}
			boardStore.board.columns.splice(addedIndex, 0, item);

			await moveColumnCall(columnId, boardStore.board.id, addedIndex);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateColumnTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { columnId, newTitle } = action.payload;

		try {
			await updateColumnTitleCall(columnId, newTitle);
			const columnIndex = getColumnIndex(columnId);
			if (columnIndex > -1) {
				boardStore.board.columns[columnIndex].title = newTitle;
			}
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateColumnTitleSuccess = (
		action: ReturnType<typeof BoardActions.updateColumnTitleSuccess>
	) => action.type;

	const updateBoardTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { newTitle } = action.payload;

		try {
			await updateBoardTitleCall(boardStore.board.id, newTitle);
			boardStore.board.title = newTitle;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardTitleSuccess = (
		action: ReturnType<typeof BoardActions.updateBoardTitleSuccess>
	) => action.type;

	const updateBoardVisibilityRequest = async (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { newVisibility } = action.payload;

		try {
			await updateBoardVisibilityCall(boardStore.board.id, newVisibility);
			boardStore.board.isVisible = newVisibility;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardVisibilitySuccess = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilitySuccess>
	) => action.type;

	const notifyWithTemplateAndReload = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			if (boardStore.board === undefined) return;

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
			setEditModeId(undefined);
		};
	};

	const reloadBoard = async () => {
		if (boardStore.board === undefined) return;

		await fetchBoard({
			type: "fetch-board",
			payload: { id: boardStore.board.id },
		});
	};

	return {
		fetchBoard,
		createCardRequest,
		createCardSuccess,
		createColumnRequest,
		createColumnSuccess,
		deleteCardRequest,
		deleteCardSuccess,
		deleteColumnRequest,
		deleteColumnSuccess,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateColumnTitleSuccess,
		updateBoardTitleRequest,
		updateBoardTitleSuccess,
		updateBoardVisibilityRequest,
		updateBoardVisibilitySuccess,
		reloadBoard,
		// notifyWithTemplateAndReload,
	};
};
