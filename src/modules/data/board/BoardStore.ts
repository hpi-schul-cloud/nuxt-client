import { Board } from "@/types/board/Board";
import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import * as BoardActions from "./boardActions/actions";
import { useBoardRestApi } from "./boardActions/restApi";
import { useSocketApi } from "./boardActions/socketApi";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

export const useBoardStore = defineStore("boardStore", () => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);

	const FEATURE_SOCKET_ENABLED = true;

	const restApi = useBoardRestApi();

	const socketOrRest = FEATURE_SOCKET_ENABLED ? useSocketApi() : restApi;

	const { setEditModeId } = useSharedEditMode();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const dispatch = async (
		action: PermittedStoreActions<typeof BoardActions>
	) => {
		handle(
			action,
			on(BoardActions.fetchBoard, restApi.fetchBoard),
			on(BoardActions.createCardRequest, socketOrRest.createCardRequest),
			on(BoardActions.createCardSuccess, createCard),
			on(BoardActions.createCardFailure, createCardFailure),
			on(BoardActions.createColumnRequest, socketOrRest.createColumnRequest),
			on(BoardActions.createColumnSuccess, createColumn),
			on(BoardActions.deleteCardRequest, socketOrRest.deleteCardRequest),
			on(BoardActions.deleteCardSuccess, deleteCard),

			on(BoardActions.deleteColumnRequest, socketOrRest.deleteColumnRequest),
			on(BoardActions.deleteColumnSuccess, deleteColumn),
			on(BoardActions.moveCardRequest, socketOrRest.moveCardRequest),
			on(BoardActions.moveCardSuccess, moveCard),
			on(BoardActions.moveColumnRequest, socketOrRest.moveColumnRequest),
			on(BoardActions.moveColumnSuccess, moveColumn),
			on(
				BoardActions.updateColumnTitleRequest,
				socketOrRest.updateColumnTitleRequest
			),
			on(BoardActions.updateColumnTitleSuccess, updateColumnTitle),
			on(
				BoardActions.updateBoardTitleRequest,
				socketOrRest.updateBoardTitleRequest
			),
			on(BoardActions.updateBoardTitleSuccess, updateBoardTitle),
			on(
				BoardActions.updateBoardVisibilityRequest,
				socketOrRest.updateBoardVisibilityRequest
			),
			on(BoardActions.updateBoardVisibilitySuccess, updateBoardVisibility),
			on(BoardActions.notifyWithTemplate, notifyWithTemplateRequest),
			on(BoardActions.notifyWithTemplateAndReload, notifyWithTemplateAndReload)
		);
	};

	const getColumnIndex = (columnId: string | undefined): number => {
		if (columnId === undefined) return -1;
		if (board.value === undefined) return -1;

		const columnIndex = board.value.columns.findIndex((c) => c.id === columnId);
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

	const setBoard = (newBoard: Board) => {
		board.value = newBoard;
	};

	const setLoading = (loading: boolean) => {
		isLoading.value = loading;
	};

	const createColumn = (
		action: ReturnType<typeof BoardActions.createColumnSuccess>
	) => {
		if (!board.value) return;
		board.value.columns.push(action.payload.newColumn);
	};

	const createCard = (
		action: ReturnType<typeof BoardActions.createCardSuccess>
	) => {
		if (!board.value) return;

		const { newCard } = action.payload;
		const { setFocus } = useBoardFocusHandler();
		setFocus(newCard.id);

		const columnIndex = board.value.columns.findIndex(
			(column) => column.id === action.payload.columnId
		);
		board.value.columns[columnIndex].cards.push({
			cardId: newCard.id,
			height: 120,
		});
		setEditModeId(newCard.id);
	};

	const createCardFailure = (
		action: ReturnType<typeof BoardActions.createCardFailure>
	) => {
		console.log("createCardFailure", action);
		handleError(404, {
			404: notifyWithTemplate("notLoaded", "board"),
		});
	};

	const deleteCard = (
		action: ReturnType<typeof BoardActions.deleteCardSuccess>
	) => {
		if (!board.value) return;
		const cardId = action.payload.cardId;
		const columnIndex = board.value.columns.findIndex(
			(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
		);
		if (columnIndex !== -1) {
			const cardIndex = board.value.columns[columnIndex].cards.findIndex(
				(c) => c.cardId === cardId
			);
			board.value.columns[columnIndex].cards.splice(cardIndex, 1);
		}
	};

	const deleteColumn = (
		action: ReturnType<typeof BoardActions.deleteColumnSuccess>
	) => {
		if (!board.value) return;
		const columnId = action.payload.columnId;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex < 0) {
			return;
		}
		board.value.columns.splice(columnIndex, 1);
	};

	const updateBoardTitle = (
		action: ReturnType<typeof BoardActions.updateBoardTitleSuccess>
	) => {
		if (!board.value) return;

		board.value.title = action.payload.newTitle;
	};

	const updateColumnTitle = (
		action: ReturnType<typeof BoardActions.updateColumnTitleSuccess>
	) => {
		if (!board.value) return;
		const { columnId, newTitle } = action.payload;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex > -1) {
			board.value.columns[columnIndex].title = newTitle;
		}
	};

	const updateBoardVisibility = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilitySuccess>
	) => {
		if (!board.value) return;

		board.value.isVisible = action.payload.newVisibility;
	};

	const moveColumn = async (
		action: ReturnType<typeof BoardActions.moveColumnSuccess>
	) => {
		if (!board.value) return;
		const { columnMove, byKeyboard } = action.payload;
		const { addedIndex, removedIndex } = columnMove;
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
	};

	// TODO: refactor or create a new function for moving cards with creating column
	const moveCard = async (
		action: ReturnType<typeof BoardActions.moveCardSuccess>
	) => {
		if (!board.value) return;

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
			const newColumn = await restApi.createColumnRequest();
			if (newColumn) {
				newColumnId = newColumn?.id;
				newColumnIndex = getColumnIndex(newColumnId);
			}
		}

		if (cardId === undefined || newColumnIndex === undefined) return; // ensure values are set

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
		if (forceNextTick === true) {
			await nextTick();
		}

		board.value.columns[newColumnIndex].cards.splice(newIndex, 0, item);
	};

	// TODO: consider how should be error messages via socket
	const notifyWithTemplateAndReload = (
		action: ReturnType<typeof BoardActions.notifyWithTemplateAndReload>
	) => {
		if (board.value === undefined) return;

		dispatch(BoardActions.notifyWithTemplate(action.payload));
		dispatch(BoardActions.reloadBoard({}));
		setEditModeId(undefined);
	};

	const notifyWithTemplateRequest = (
		action: ReturnType<typeof BoardActions.notifyWithTemplate>
	) => {
		if (board.value === undefined) return;

		const { errorType, httpStatus, boardObjectType, error } = action.payload;

		handleError(error, {
			[httpStatus]: notifyWithTemplate(errorType, boardObjectType),
		});
	};

	return {
		board,
		isLoading,
		dispatch,
		setBoard,
		setLoading,
	};
});
