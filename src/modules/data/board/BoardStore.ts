import { Board } from "@/types/board/Board";
import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { useBoardRestApi } from "./boardActions/restApi";
import { useSocketApi } from "./boardActions/socketApi";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { CardMove } from "@/types/board/DragAndDrop";
import { ColumnResponse } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import {
	createCardRequestPayload,
	createCardSuccessPayload,
	createColumnRequestPayload,
	createColumnSucccessPayload,
	deleteCardRequestPayload,
	deleteCardSuccessPayload,
	deleteColumnRequestPayload,
	deleteColumnSuccessPayload,
	disconnectSocketRequestPayload,
	fetchBoardPayload,
	moveCardRequestPayload,
	moveCardSuccessPayload,
	moveColumnRequestPayload,
	moveColumnSuccessPayload,
	updateBoardTitleRequestPayload,
	updateBoardTitleSuccessPayload,
	updateBoardVisibilityRequestPayload,
	updateBoardVisibilitySuccessPayload,
	updateColumnTitleRequestPayload,
	updateColumnTitleSuccessPayload,
} from "./boardActions/boardActionPayload";

export const useBoardStore = defineStore("boardStore", () => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);

	const restApi = useBoardRestApi();
	const isSocketEnabled = envConfigModule.getFeatureSocketEnabled;

	const socketOrRest = isSocketEnabled ? useSocketApi() : restApi;

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

	const createCardRequest = (payload: createCardRequestPayload) => {
		socketOrRest.createCardRequest(payload);
	};

	const createCardSuccess = (payload: createCardSuccessPayload) => {
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

	const createColumnRequest = async (payload: createColumnRequestPayload) => {
		socketOrRest.createColumnRequest(payload);
	};

	const createColumnSuccess = (payload: createColumnSucccessPayload) => {
		if (!board.value) return;
		board.value.columns.push(payload.newColumn);
	};

	const deleteCardRequest = async (payload: deleteCardRequestPayload) => {
		await socketOrRest.deleteCardRequest(payload);
	};

	const deleteCardSuccess = (payload: deleteCardSuccessPayload) => {
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

	const deleteColumnRequest = async (payload: deleteColumnRequestPayload) => {
		await socketOrRest.deleteColumnRequest(payload);
	};

	const deleteColumnSuccess = (payload: deleteColumnSuccessPayload) => {
		if (!board.value) return;
		const columnId = payload.columnId;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex < 0) {
			return;
		}
		board.value.columns.splice(columnIndex, 1);
	};

	const updateBoardTitleRequest = async (
		payload: updateBoardTitleRequestPayload
	) => {
		await socketOrRest.updateBoardTitleRequest(payload);
	};

	const updateBoardTitleSuccess = (payload: updateBoardTitleSuccessPayload) => {
		if (!board.value) return;

		board.value.title = payload.newTitle;
	};

	const updateColumnTitleRequest = async (
		payload: updateColumnTitleRequestPayload
	) => {
		await socketOrRest.deleteColumnRequest(payload);
	};

	const updateColumnTitleSuccess = (
		payload: updateColumnTitleSuccessPayload
	) => {
		if (!board.value) return;
		const { columnId, newTitle } = payload;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex > -1) {
			board.value.columns[columnIndex].title = newTitle;
		}
	};

	const updateBoardVisibilitySuccess = (
		payload: updateBoardVisibilitySuccessPayload
	) => {
		if (!board.value) return;

		board.value.isVisible = payload.newVisibility;
	};

	const moveColumnRequest = async (payload: moveColumnRequestPayload) => {
		await socketOrRest.moveColumnRequest(payload);
	};

	const moveColumnSuccess = async (payload: moveColumnSuccessPayload) => {
		if (!board.value) return;
		const { columnMove, byKeyboard } = payload;
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

	const moveCardRequest = async (payload: moveCardRequestPayload) => {
		await socketOrRest.moveCardRequest(payload);
	};
	const updateBoardVisibilityRequest = async (
		payload: updateBoardVisibilityRequestPayload
	) => {
		await socketOrRest.updateBoardVisibilityRequest(payload);
	};

	// TODO: refactor or create a new function for moving cards with creating column
	const moveCardSuccess = async (payload: moveCardSuccessPayload) => {
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

		const targetColumnIndex = toColumnIndex;

		// TODO: solve column creation on the backend
		// if (toColumnIndex === -1) {
		// 	// need to create a new column
		// 	const newColumn = await createColumnRequest();
		// 	if (newColumn) {
		// 		targetColumnIndex = getColumnIndex(newColumn?.id);
		// 	}
		// }

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

		board.value.columns[targetColumnIndex].cards.splice(newIndex, 0, item);
	};

	const disconnectSocketRequest = async (
		payload: disconnectSocketRequestPayload
	) => {
		await socketOrRest.disconnectSocketRequest(payload);
	};

	const fetchBoard = async (payload: fetchBoardPayload) => {
		await restApi.fetchBoard(payload);
	};

	const reloadBoard = async () => {
		await restApi.reloadBoard();
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
		deleteCardRequest,
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
		fetchBoard,
		reloadBoard,
	};
});
