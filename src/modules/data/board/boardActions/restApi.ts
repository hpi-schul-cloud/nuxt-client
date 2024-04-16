import { useBoardStore } from "./../BoardStore";
import { useBoardApi } from "../BoardApi.composable";
import { useSharedEditMode } from "../EditMode.composable";
import * as BoardActions from "./actions";
import { useBoardFocusHandler } from "../BoardFocusHandler.composable";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

export const useBoardRestApi = () => {
	const boardStore = useBoardStore();

	const { fetchBoardCall } = useBoardApi();

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

	const createCardRequest = async (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		if (boardStore.board === undefined) return;

		try {
			const newCard = await createCardCall(action.payload.columnId);

			boardStore.dispatch(
				BoardActions.createCardSuccess({
					newCard,
					columnId: action.payload.columnId,
				})
			);
		} catch (error) {
			boardStore.dispatch(
				BoardActions.createCardFailure({
					errorMessage: "unable to create card", // TODO: decide and internationalize the error message
					errorData: { columnId: action.payload.columnId },
				})
			);
		}
	};

	const fetchBoard = async (
		action: ReturnType<typeof BoardActions.fetchBoard>
	): Promise<void> => {
		boardStore.setLoading(true);
		try {
			const board = await fetchBoardCall(action.payload.id);
			boardStore.setBoard(board);
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplate({
					error: error as Error,
					errorType: "notLoaded",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "board",
				})
			);
		}
		boardStore.setLoading(false);
	};

	const createColumnRequest = async () => {
		if (boardStore.board === undefined) return;

		try {
			const newColumn = await createColumnCall(boardStore.board?.id);
			useBoardFocusHandler().setFocus(newColumn.id);
			setEditModeId(newColumn.id);

			boardStore.dispatch(BoardActions.createColumnSuccess({ newColumn }));
			return newColumn;
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notCreated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		}
	};

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { cardId } = action.payload;

		try {
			await deleteCardCall(cardId);

			boardStore.dispatch(BoardActions.deleteCardSuccess({ cardId }));
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notDeleted",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardCard",
				})
			);
		}
	};

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { columnId } = action.payload;

		try {
			await deleteColumnCall(columnId);
			boardStore.dispatch(BoardActions.deleteColumnSuccess({ columnId }));
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notDeleted",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		}
	};

	// TODO: investigate if move card with creating new column should be separated
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

			await moveCardCall(cardId, newColumnId, newIndex);

			boardStore.dispatch(
				BoardActions.moveCardRequest({
					cardId,
					newIndex,
					oldIndex,
					toColumnId,
					fromColumnId,
					columnDelta,
					forceNextTick,
				})
			);
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardCard",
				})
			);
		}
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { columnMove } = action.payload;

		try {
			const { addedIndex, columnId } = columnMove;

			await moveColumnCall(columnId, boardStore.board.id, addedIndex);
			boardStore.dispatch(BoardActions.moveColumnSuccess(action.payload));
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		}
	};

	const updateColumnTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { columnId, newTitle } = action.payload;

		try {
			const columnIndex = getColumnIndex(columnId);
			await updateColumnTitleCall(columnId, newTitle);
			if (columnIndex > -1) {
				boardStore.board.columns[columnIndex].title = newTitle;
			}
			boardStore.dispatch(
				BoardActions.updateColumnTitleSuccess(action.payload)
			);
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "boardColumn",
				})
			);
		}
	};

	const updateBoardTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { newTitle } = action.payload;

		try {
			await updateBoardTitleCall(boardStore.board.id, newTitle);
			boardStore.dispatch(BoardActions.updateBoardTitleSuccess({ newTitle }));
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "board",
				})
			);
		}
	};

	const updateBoardVisibilityRequest = async (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		if (boardStore.board === undefined) return;
		const { newVisibility } = action.payload;

		try {
			await updateBoardVisibilityCall(boardStore.board.id, newVisibility);
			boardStore.dispatch(
				BoardActions.updateBoardVisibilitySuccess({ newVisibility })
			);
		} catch (error) {
			boardStore.dispatch(
				BoardActions.notifyWithTemplateAndReload({
					error: error as Error,
					errorType: "notUpdated",
					httpStatus: HttpStatusCode.NotFound,
					boardObjectType: "board",
				})
			);
		}
	};

	const reloadBoard = async () => {
		if (boardStore.board === undefined) return;

		await fetchBoard({
			type: "fetch-board-request",
			payload: { id: boardStore.board.id },
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
