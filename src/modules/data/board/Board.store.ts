import { Board } from "@/types/board/Board";
import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { useBoardRestApi } from "./boardActions/boardRestApi.composable";
import { useBoardSocketApi } from "./boardActions/boardSocketApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedEditMode } from "./EditMode.composable";
import { envConfigModule } from "@/store";
import {
	CreateCardRequestPayload,
	CreateCardSuccessPayload,
	CreateColumnRequestPayload,
	CreateColumnSuccessPayload,
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
	const { setFocus } = useBoardFocusHandler();

	const restApi = useBoardRestApi();
	const isSocketEnabled =
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useBoardSocketApi() : restApi;

	const { setEditModeId } = useSharedEditMode();

	const getLastColumnIndex = () => board.value!.columns.length - 1;

	const getColumnIndex = (columnId: string | undefined): number => {
		if (columnId === undefined) return -1;
		if (board.value === undefined) return -1;

		const columnIndex = board.value.columns.findIndex((c) => c.id === columnId);
		return columnIndex;
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (board.value === undefined) return; // shouldn't happen because board presence is checked by callers
		if (columnIndex === undefined) return; // shouldn't happen because columnIndex is always set by type definition
		if (columnIndex < 0) return;
		if (columnIndex > board.value.columns.length - 1) return;

		if (board.value.columns[columnIndex] === undefined) return;

		return board.value.columns[columnIndex].id;
	};

	const getCardLocation = (cardId: string) => {
		if (!board.value) return;

		const columnIndex = board.value.columns.findIndex(
			(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
		);
		if (columnIndex === -1) return undefined;

		const column = board.value.columns[columnIndex];
		const columnId = column.id;
		const cardIndex = column.cards.findIndex((c) => c.cardId === cardId);
		return { columnIndex, columnId, cardIndex };
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

		const columnIndex = board.value.columns.findIndex(
			(column) => column.id === payload.columnId
		);
		board.value.columns[columnIndex].cards.push({
			cardId: newCard.id,
			height: 120,
		});
		if (payload.isOwnAction === true) {
			setFocus(newCard.id);
			setEditModeId(newCard.id);
		}
	};

	const createColumnRequest = async (payload: CreateColumnRequestPayload) => {
		socketOrRest.createColumnRequest(payload);
	};

	const createColumnSuccess = (payload: CreateColumnSuccessPayload) => {
		if (!board.value) return;

		const { newColumn, isOwnAction } = payload;

		board.value.columns.push(newColumn);

		if (isOwnAction === true) {
			setFocus(newColumn.id);
			setEditModeId(newColumn.id);
		}
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
		if (columnIndex !== -1) {
			board.value.columns.splice(columnIndex, 1);
		}
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
		if (columnIndex !== -1) {
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

	const moveCardToNewColumn = async (cardId: string) => {
		const cardLocation = getCardLocation(cardId);
		if (cardLocation === undefined) return;

		const {
			columnIndex: fromColumnIndex,
			columnId: fromColumnId,
			cardIndex: oldIndex,
		} = cardLocation;

		await socketOrRest.moveCardRequest({
			cardId,
			fromColumnId,
			fromColumnIndex,
			oldIndex,
			newIndex: 0,
		});
	};

	const moveCardRequest = async (payload: MoveCardRequestPayload) => {
		await socketOrRest.moveCardRequest(payload);
	};

	const moveCardSuccess = async (payload: MoveCardSuccessPayload) => {
		if (!board.value) return;

		const {
			newIndex,
			oldIndex,
			forceNextTick,
			fromColumnIndex,
			toColumnIndex,
		} = payload;

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

		const toColumn = board.value.columns[toColumnIndex];
		toColumn.cards.splice(newIndex, 0, item);
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
		getCardLocation,
		getColumnIndex,
		getColumnId,
		getLastColumnIndex,
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
		moveCardToNewColumn,
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
