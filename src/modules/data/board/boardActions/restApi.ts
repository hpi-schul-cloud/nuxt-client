import { useBoardStore } from "./../BoardStore";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import * as BoardActions from "./actions";
import { useBoardFocusHandler } from "../BoardFocusHandler.composable";
import { CardMove } from "@/types/board/DragAndDrop";
import { ColumnResponse } from "@/serverApi/v3";
import {
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import {
	createCardRequestPayload,
	deleteCardRequestPayload,
	deleteColumnRequestPayload,
	fetchBoardPayload,
	moveCardRequestPayload,
	moveColumnRequestPayload,
	updateBoardTitleRequestPayload,
	updateBoardVisibilityRequestPayload,
	updateColumnTitleRequestPayload,
} from "./boardActionPayload";

export const useBoardRestApi = () => {
	const boardStore = useBoardStore();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const {
		createCardCall,
		createColumnCall,
		deleteCardCall,
		deleteColumnCall,
		fetchBoardCall,
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

		if (columnIndex === undefined) return -1;
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

	const createCardRequest = async (payload: createCardRequestPayload) => {
		if (boardStore.board === undefined) return;

		try {
			const newCard = await createCardCall(payload.columnId);

			boardStore.createCardSuccess({
				newCard,
				columnId: payload.columnId,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardCard"),
			});
		}
	};

	const fetchBoard = async (payload: fetchBoardPayload): Promise<void> => {
		boardStore.setLoading(true);
		try {
			const board = await fetchBoardCall(payload.id);
			boardStore.setBoard(board);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notLoaded", "board"),
			});
		}
		boardStore.setLoading(false);
	};

	const createColumnRequest = async () => {
		if (boardStore.board === undefined) return;

		try {
			const newColumn = await createColumnCall(boardStore.board?.id);
			useBoardFocusHandler().setFocus(newColumn.id);
			setEditModeId(newColumn.id);

			boardStore.createColumnSuccess({ newColumn });
			return newColumn;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardColumn"),
			});
		}
	};

	const deleteCardRequest = async (payload: deleteCardRequestPayload) => {
		if (boardStore.board === undefined) return;
		const { cardId } = payload;

		try {
			await deleteCardCall(cardId);

			boardStore.deleteCardSuccess({ cardId });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const deleteColumnRequest = async (payload: deleteColumnRequestPayload) => {
		if (boardStore.board === undefined) return;
		const { columnId } = payload;

		try {
			await deleteColumnCall(columnId);
			boardStore.deleteColumnSuccess({ columnId });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardColumn"),
			});
		}
	};

	const getColumnIndices = (
		fromColumnId: string | undefined,
		toColumnId: string | undefined,
		columnDelta: number | undefined
	) => {
		const fromColumnIndex = getColumnIndex(fromColumnId);

		const newColumnId: string | undefined =
			columnDelta === undefined
				? toColumnId
				: getColumnId(fromColumnIndex + columnDelta);

		return { fromColumnIndex, toColumnIndex: getColumnIndex(newColumnId) };
	};

	const isMoveValid = (
		payload: CardMove,
		columns: Array<ColumnResponse>,
		targetColumnIndex: number,
		fromColumnIndex: number
	) => {
		const { newIndex, oldIndex } = payload;

		const movedInsideColumn = fromColumnIndex === targetColumnIndex;
		if (movedInsideColumn) {
			if (
				(newIndex === oldIndex && fromColumnIndex === targetColumnIndex) || // same position
				newIndex < 0 || // first card - can't move up
				newIndex > columns[fromColumnIndex].cards.length - 1 // last card - can't move down
			)
				return false;
		}

		return true;
	};

	const moveCardRequest = async (
		payload: moveCardRequestPayload
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
			} = payload;

			const { fromColumnIndex, toColumnIndex } = getColumnIndices(
				fromColumnId,
				toColumnId,
				columnDelta
			);

			let targetColumnIndex = toColumnIndex;
			let targetColumnId = toColumnId;

			if (targetColumnIndex === -1) {
				// need to create a new column
				const newColumn = await createColumnRequest();
				if (newColumn) {
					targetColumnId = newColumn.id;
					targetColumnIndex = getColumnIndex(targetColumnId);
				}
			}

			if (targetColumnId === undefined) return; // shouldn't happen because its either existing or newly created

			if (
				!isMoveValid(
					payload,
					boardStore.board.columns,
					targetColumnIndex,
					fromColumnIndex
				)
			) {
				return;
			}

			await moveCardCall(cardId, targetColumnId, newIndex);

			boardStore.moveCardSuccess({
				cardId,
				newIndex,
				oldIndex,
				toColumnId: targetColumnId,
				fromColumnId,
				columnDelta,
				forceNextTick,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const moveColumnRequest = async (payload: moveColumnRequestPayload) => {
		if (boardStore.board === undefined) return;
		const { columnMove } = payload;

		try {
			const { addedIndex, columnId } = columnMove;
			await moveColumnCall(columnId, boardStore.board.id, addedIndex);

			boardStore.moveColumnSuccess(payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateColumnTitleRequest = async (
		payload: updateColumnTitleRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { columnId, newTitle } = payload;

		try {
			await updateColumnTitleCall(columnId, newTitle);

			boardStore.updateColumnTitleSuccess(payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "boardColumn"),
			});
		}
	};

	const updateBoardTitleRequest = async (
		payload: updateBoardTitleRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { newTitle } = payload;

		try {
			await updateBoardTitleCall(boardStore.board.id, newTitle);

			boardStore.updateBoardTitleSuccess({ newTitle });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated", "board"),
			});
		}
	};

	const updateBoardVisibilityRequest = async (
		payload: updateBoardVisibilityRequestPayload
	) => {
		if (boardStore.board === undefined) return;
		const { newVisibility } = payload;

		try {
			await updateBoardVisibilityCall(boardStore.board.id, newVisibility);
			boardStore.updateBoardVisibilitySuccess({ newVisibility });
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
			if (boardStore.board === undefined) return;

			notifyWithTemplate(errorType, boardObjectType)();
			reloadBoard();
			setEditModeId(undefined);
		};
	};

	const reloadBoard = async () => {
		if (boardStore.board === undefined) return;

		await fetchBoard({ id: boardStore.board.id });
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	const reloadBoardSuccess = (
		action: ReturnType<typeof BoardActions.reloadBoardSuccess>
	) => {
		return action;
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const disconnectSocketRequest = (): void => {};

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
		reloadBoardSuccess,
		disconnectSocketRequest,
	};
};
