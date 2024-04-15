import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { useBoardStore } from "./../BoardStore";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import * as BoardActions from "./actions";
import { useBoardFocusHandler } from "../BoardFocusHandler.composable";

export const useBoardRestApi = () => {
	const { board, dispatch, setLoading, setBoard } = useBoardStore();

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
		if (board === undefined) return -1;

		const columnIndex = board?.columns.findIndex((c) => c.id === columnId);
		return columnIndex;
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (board === undefined) return;
		if (columnIndex === undefined) return;
		if (columnIndex < 0) return;
		if (columnIndex > board.columns.length - 1) return;
		if (board.columns[columnIndex] === undefined) return;

		return board.columns[columnIndex].id;
	};

	const createCardRequest = async (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		if (board === undefined) return;

		try {
			const newCard = await createCardCall(action.payload.columnId);

			dispatch(
				BoardActions.createCardSuccess({
					newCard,
					columnId: action.payload.columnId,
				})
			);
		} catch (error) {
			BoardActions.createCardFailure({
				errorMessage: "unable to create card",
			});
		}
	};

	const fetchBoard = async (
		action: ReturnType<typeof BoardActions.fetchBoard>
	): Promise<void> => {
		setLoading(true);
		try {
			const board = await fetchBoardCall(action.payload.id);
			setBoard(board);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notLoaded", "board"),
			});
		}
		setLoading(false);
	};

	const createColumnRequest = async () => {
		if (board === undefined) return;

		try {
			const newColumn = await createColumnCall(board.id);
			useBoardFocusHandler().setFocus(newColumn.id);
			setEditModeId(newColumn.id);

			dispatch(BoardActions.createColumnSuccess({ newColumn }));
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		if (board === undefined) return;
		const { cardId } = action.payload;

		try {
			await deleteCardCall(cardId);

			dispatch(BoardActions.deleteCardSuccess({ cardId }));
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		if (board === undefined) return;
		const { columnId } = action.payload;

		try {
			await deleteColumnCall(columnId);
			dispatch(BoardActions.deleteColumnSuccess({ columnId }));
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const moveCardRequest = async (
		action: ReturnType<typeof BoardActions.moveCardRequest>
	): Promise<void> => {
		if (board === undefined) return;

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
				if (newIndex > board.columns[fromColumnIndex].cards.length - 1) return; // last card - can't move down
			}

			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving columns by keyboard
			 */

			await moveCardCall(cardId, newColumnId, newIndex);

			dispatch({
				type: "move-card-success",
				payload: {
					newColumnIndex,
					oldIndex,
					newIndex,
					fromColumnIndex,
					forceNextTick,
				},
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		if (board === undefined) return;
		const { columnMove } = action.payload;

		try {
			const { addedIndex, columnId } = columnMove;

			await moveColumnCall(columnId, board.id, addedIndex);
			dispatch(BoardActions.moveColumnSuccess(action.payload));
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateColumnTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		if (board === undefined) return;
		const { columnId, newTitle } = action.payload;

		try {
			await updateColumnTitleCall(columnId, newTitle);
			const columnIndex = getColumnIndex(columnId);
			if (columnIndex > -1) {
				board.columns[columnIndex].title = newTitle;
			}
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateBoardTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		if (board === undefined) return;
		const { newTitle } = action.payload;

		try {
			await updateBoardTitleCall(board.id, newTitle);
			dispatch(BoardActions.updateBoardTitleSuccess({ newTitle }));
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardVisibilityRequest = async (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		if (board === undefined) return;
		const { newVisibility } = action.payload;

		try {
			await updateBoardVisibilityCall(board.id, newVisibility);
			dispatch(BoardActions.updateBoardVisibilitySuccess({ newVisibility }));
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const notifyWithTemplateAndReload = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			if (board === undefined) return;

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
			setEditModeId(undefined);
		};
	};

	const reloadBoard = async () => {
		if (board === undefined) return;

		await fetchBoard({
			type: "fetch-board-request",
			payload: { id: board.id },
		});
	};

	return {
		fetchBoard,
		createCardRequest,
		createColumnRequest,
		deleteCardRequest,
		deleteColumnRequest,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
		reloadBoard,
	};
};
