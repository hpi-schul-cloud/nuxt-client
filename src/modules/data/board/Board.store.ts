import { Board } from "@/types/board/Board";
import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { useBoardRestApi } from "./boardActions/boardRestApi.composable";
import { useBoardSocketApi } from "./boardActions/boardSocketApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { CardMove } from "@/types/board/DragAndDrop";
import { ColumnResponse } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import {
	CreateCardRequestPayload,
	CreateCardSuccessPayload,
	CreateColumnRequestPayload,
	CreateColumnSucccessPayload,
	DeleteColumnRequestPayload,
	DeleteColumnSuccessPayload,
	DisconnectSocketRequestPayload,
	FetchBoardRequestPayload,
	FetchBoardSuccessPayload,
	MoveCardRequestPayload,
	MoveCardSuccessPayload,
	MoveColumnRequestPayload,
	MoveColumnSuccessPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardTitleSuccessPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateBoardVisibilitySuccessPayload,
	UpdateColumnTitleRequestPayload,
	UpdateColumnTitleSuccessPayload,
} from "./boardActions/boardActionPayload";
import { DeleteCardSuccessPayload } from "./cardActions/cardActionPayload";

export const useBoardStore = defineStore("boardStore", () => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);

	const restApi = useBoardRestApi();
	const isSocketEnabled =
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useBoardSocketApi() : restApi;

	const { setEditModeId } = useSharedEditMode();

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

	const setBoard = (newBoard: Board | undefined) => {
		board.value = newBoard;
	};

	const setLoading = (loading: boolean) => {
		isLoading.value = loading;
	};

	const createCardRequest = (payload: CreateCardRequestPayload) => {
		socketOrRest.createCardRequest(payload);
	};

	const createCardSuccess = (payload: CreateCardSuccessPayload) => {
		if (!board.value) return;

		const { newCard } = payload;
		const { setFocus } = useBoardFocusHandler();
		setFocus(newCard.id);

		const columnIndex = board.value.columns.findIndex(
			(column) => column.id === payload.columnId
		);
		board.value.columns[columnIndex].cards.push({
			cardId: newCard.id,
			height: 120,
		});
		setEditModeId(newCard.id);
	};

	const createColumnRequest = async (payload: CreateColumnRequestPayload) => {
		socketOrRest.createColumnRequest(payload);
	};

	const createColumnSuccess = (payload: CreateColumnSucccessPayload) => {
		if (!board.value) return;
		board.value.columns.push(payload.newColumn);
	};

	const deleteCardSuccess = (payload: DeleteCardSuccessPayload) => {
		if (!board.value) return;
		const cardId = payload.cardId;
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

	const deleteColumnRequest = async (payload: DeleteColumnRequestPayload) => {
		await socketOrRest.deleteColumnRequest(payload);
	};

	const deleteColumnSuccess = (payload: DeleteColumnSuccessPayload) => {
		if (!board.value) return;
		const columnId = payload.columnId;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex < 0) {
			return;
		}
		board.value.columns.splice(columnIndex, 1);
	};

	const updateBoardTitleRequest = async (
		payload: UpdateBoardTitleRequestPayload
	) => {
		await socketOrRest.updateBoardTitleRequest(payload);
	};

	const updateBoardTitleSuccess = (payload: UpdateBoardTitleSuccessPayload) => {
		if (!board.value) return;

		board.value.title = payload.newTitle;
	};

	const updateColumnTitleRequest = async (
		payload: UpdateColumnTitleRequestPayload
	) => {
		await socketOrRest.updateColumnTitleRequest(payload);
	};

	const updateColumnTitleSuccess = (
		payload: UpdateColumnTitleSuccessPayload
	) => {
		if (!board.value) return;
		const { columnId, newTitle } = payload;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex > -1) {
			board.value.columns[columnIndex].title = newTitle;
		}
	};

	const updateBoardVisibilityRequest = async (
		payload: UpdateBoardVisibilityRequestPayload
	) => {
		await socketOrRest.updateBoardVisibilityRequest(payload);
	};

	const updateBoardVisibilitySuccess = (
		payload: UpdateBoardVisibilitySuccessPayload
	) => {
		if (!board.value) return;

		board.value.isVisible = payload.isVisible;
	};

	const moveColumnRequest = async (payload: MoveColumnRequestPayload) => {
		await socketOrRest.moveColumnRequest({
			targetBoardId: board.value?.id,
			...payload,
		});
	};

	const moveColumnSuccess = async (payload: MoveColumnSuccessPayload) => {
		if (!board.value) return;
		const { columnMove, byKeyboard } = payload;
		const { addedIndex, removedIndex } = columnMove;
		if (addedIndex < 0 || addedIndex > board.value.columns.length - 1) return;
		if (removedIndex === null || removedIndex === undefined) return;

		const column = board.value.columns.splice(removedIndex, 1)[0];
		/**
		 * refreshes the board to force rerendering in tracked v-for
		 * to maintain focus when moving columns by keyboard
		 */
		if (byKeyboard === true) {
			await nextTick();
		}
		board.value.columns.splice(addedIndex, 0, column);
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
		const { cardId, newIndex, oldIndex } = payload;
		if (cardId === undefined || targetColumnIndex === undefined) return false; // ensure values are set

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

	const moveCardRequest = async (payload: MoveCardRequestPayload) => {
		await socketOrRest.moveCardRequest(payload);
	};

	// TODO: refactor or create a new function for moving cards with creating column
	const moveCardSuccess = async (payload: MoveCardSuccessPayload) => {
		if (!board.value) return;

		const {
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

		const targetColumnIndex = toColumnIndex ?? board.value.columns.length - 1;

		if (
			!isMoveValid(
				payload,
				board.value.columns,
				targetColumnIndex,
				fromColumnIndex
			)
		) {
			return;
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

		board.value.columns[targetColumnIndex].cards =
			board.value.columns[targetColumnIndex].cards ?? [];
		board.value.columns[targetColumnIndex].cards.splice(newIndex, 0, item);
	};

	const disconnectSocketRequest = (payload: DisconnectSocketRequestPayload) => {
		socketOrRest.disconnectSocketRequest(payload);
	};

	const fetchBoardRequest = async (payload: FetchBoardRequestPayload) => {
		await socketOrRest.fetchBoardRequest(payload);
	};

	const fetchBoardSuccess = (payload: FetchBoardSuccessPayload) => {
		setBoard(payload);
	};

	const reloadBoard = async () => {
		if (!board.value) return;

		await socketOrRest.fetchBoardRequest({ boardId: board.value.id });
	};

	return {
		board,
		isLoading,
		setBoard,
		setLoading,
		createCardRequest,
		createCardSuccess,
		createColumnRequest,
		createColumnSuccess,
		deleteCardSuccess,
		deleteColumnRequest,
		deleteColumnSuccess,
		disconnectSocketRequest,
		moveCardRequest,
		moveCardSuccess,
		moveColumnRequest,
		moveColumnSuccess,
		updateColumnTitleRequest,
		updateColumnTitleSuccess,
		updateBoardTitleRequest,
		updateBoardTitleSuccess,
		updateBoardVisibilityRequest,
		updateBoardVisibilitySuccess,
		fetchBoardRequest,
		fetchBoardSuccess,
		reloadBoard,
	};
});
