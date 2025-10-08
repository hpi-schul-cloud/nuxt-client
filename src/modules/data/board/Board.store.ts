import {
	CreateCardRequestPayload,
	CreateCardSuccessPayload,
	CreateColumnRequestPayload,
	CreateColumnSuccessPayload,
	DeleteBoardRequestPayload,
	DeleteBoardSuccessPayload,
	DeleteColumnRequestPayload,
	DeleteColumnSuccessPayload,
	FetchBoardRequestPayload,
	FetchBoardSuccessPayload,
	MoveCardRequestPayload,
	MoveCardSuccessPayload,
	MoveColumnRequestPayload,
	MoveColumnSuccessPayload,
	UpdateBoardLayoutRequestPayload,
	UpdateBoardLayoutSuccessPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardTitleSuccessPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateBoardVisibilitySuccessPayload,
	UpdateColumnTitleRequestPayload,
	UpdateColumnTitleSuccessPayload,
	UpdateReaderCanEditRequestPayload,
	UpdateReaderCanEditSuccessPayload,
} from "./boardActions/boardActionPayload.types";
import { useBoardRestApi } from "./boardActions/boardRestApi.composable";
import { useBoardSocketApi } from "./boardActions/boardSocketApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useCardStore } from "./Card.store";
import { DeleteCardSuccessPayload } from "./cardActions/cardActionPayload.types";
import { ColumnResponse } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { Board } from "@/types/board/Board";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useSharedEditMode } from "@util-board";
import { defineStore } from "pinia";
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export const useBoardStore = defineStore("boardStore", () => {
	const cardStore = useCardStore();
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);
	const { setFocus, forceFocus } = useBoardFocusHandler();
	const roomId = ref<string | undefined>(undefined);

	const restApi = useBoardRestApi();
	const isSocketEnabled = useEnvConfig().value.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useBoardSocketApi() : restApi;

	const { t } = useI18n();

	const { setEditModeId } = useSharedEditMode();
	const router = useRouter();

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

	const createCardRequest = (payload: CreateCardRequestPayload) => socketOrRest.createCardRequest(payload);

	const createCardSuccess = (payload: CreateCardSuccessPayload) => {
		if (!board.value) return;

		const { newCard } = payload;

		cardStore.createCardSuccess(payload);

		const columnIndex = board.value.columns.findIndex((column) => column.id === payload.columnId);
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

		const { focusedId } = useBoardFocusHandler(cardId);
		if (focusedId?.value === cardId) {
			const previousId = getPreviousCardId(cardId);
			if (!previousId) return;
			forceFocus(previousId);
		}

		if (columnIndex !== -1) {
			const cardIndex = board.value.columns[columnIndex].cards.findIndex((c) => c.cardId === cardId);
			board.value.columns[columnIndex].cards.splice(cardIndex, 1);
		}
	};

	const deleteColumnRequest = async (payload: DeleteColumnRequestPayload) => {
		await socketOrRest.deleteColumnRequest(payload);
	};

	const deleteColumnSuccess = (payload: DeleteColumnSuccessPayload) => {
		if (!board.value) return;
		const columnId = payload.columnId;

		const { focusedId } = useBoardFocusHandler(columnId);
		if (focusedId?.value === columnId) {
			const previousId = getPreviousColumnId(columnId);
			if (!previousId) return;
			forceFocus(previousId);
		}

		const columnIndex = getColumnIndex(columnId);
		if (columnIndex !== -1) {
			board.value.columns.splice(columnIndex, 1);
		}
	};

	const updateBoardTitleRequest = async (payload: UpdateBoardTitleRequestPayload) => {
		await socketOrRest.updateBoardTitleRequest(payload);
	};

	const updateBoardTitleSuccess = (payload: UpdateBoardTitleSuccessPayload) => {
		if (!board.value) return;

		board.value.title = payload.newTitle;
	};

	const updateColumnTitleRequest = async (payload: UpdateColumnTitleRequestPayload) => {
		await socketOrRest.updateColumnTitleRequest(payload);
	};

	const updateColumnTitleSuccess = (payload: UpdateColumnTitleSuccessPayload) => {
		if (!board.value) return;
		const { columnId, newTitle } = payload;
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex !== -1) {
			board.value.columns[columnIndex].title = newTitle;
		}
	};

	const updateBoardVisibilityRequest = async (payload: UpdateBoardVisibilityRequestPayload) => {
		await socketOrRest.updateBoardVisibilityRequest(payload);
	};

	const updateBoardVisibilitySuccess = (payload: UpdateBoardVisibilitySuccessPayload) => {
		if (!board.value) return;

		board.value.isVisible = payload.isVisible;
	};

	const updateReaderCanEditRequest = async (payload: UpdateReaderCanEditRequestPayload) => {
		await socketOrRest.updateReaderCanEditRequest(payload);
	};

	const updateReaderCanEditSuccess = (payload: UpdateReaderCanEditSuccessPayload) => {
		if (!board.value) return;

		const { isOwnAction, readersCanEdit } = payload;

		board.value.readersCanEdit = readersCanEdit;
		if (!isOwnAction) socketOrRest.fetchBoardRequest({ boardId: board.value.id });
	};

	const updateBoardLayoutRequest = async (payload: UpdateBoardLayoutRequestPayload): Promise<void> => {
		await socketOrRest.updateBoardLayoutRequest(payload);
	};

	const updateBoardLayoutSuccess = (payload: UpdateBoardLayoutSuccessPayload): void => {
		if (!board.value) return;

		board.value.layout = payload.layout;
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
		if (cardLocation?.columnId === undefined) return;

		const { columnIndex: fromColumnIndex, columnId: fromColumnId, cardIndex: oldIndex } = cardLocation;

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

		const { cardId, newIndex, oldIndex, forceNextTick, fromColumnIndex, toColumnIndex, toColumnId } = payload;

		let toColumn: ColumnResponse | undefined = board.value.columns[toColumnIndex];
		if (toColumn === undefined) {
			toColumn = board.value.columns.find((column) => column.id === toColumnId);
			if (toColumn === undefined) {
				return;
			}
		}

		const doesCardExist = board.value.columns[fromColumnIndex].cards.some((card) => card.cardId === cardId);
		if (!doesCardExist) {
			return;
		}

		const item = board.value.columns[fromColumnIndex].cards.splice(oldIndex, 1)[0];

		/**
		 * refreshes the board to force rerendering in tracked v-for
		 * to maintain focus when moving columns by keyboard
		 */
		if (forceNextTick === true) {
			await nextTick();
		}

		toColumn.cards.splice(newIndex, 0, item);
	};

	const disconnectSocketRequest = () => {
		socketOrRest.disconnectSocketRequest();
	};

	const fetchBoardRequest = async (payload: FetchBoardRequestPayload) => {
		await socketOrRest.fetchBoardRequest(payload);
	};

	const fetchBoardSuccess = (payload: FetchBoardSuccessPayload) => {
		setBoard(payload);
	};

	const deleteBoardRequest = async (payload: DeleteBoardRequestPayload, paramRoomId: string | undefined) => {
		if (paramRoomId) roomId.value = paramRoomId;
		await socketOrRest.deleteBoardRequest(payload);
	};

	const deleteBoardSuccess = (payload: DeleteBoardSuccessPayload) => {
		if (payload.isOwnAction === true) {
			router.replace({
				name: "room-details",
				params: { id: roomId.value },
			});
			return;
		}
		useAppStore().handleApplicationError(HttpStatusCode.NotFound, "components.board.error.404");
	};

	const reloadBoard = async () => {
		if (!board.value) return;

		await socketOrRest.fetchBoardRequest({ boardId: board.value.id });
	};

	const getPreviousCardId = (cardId: string): string | undefined => {
		if (!board.value) return;

		const cardLocation = getCardLocation(cardId);
		if (!cardLocation) return undefined;
		const { columnIndex, columnId, cardIndex } = cardLocation;

		return cardIndex <= 0 ? columnId : board.value.columns[columnIndex].cards[cardIndex - 1].cardId;
	};

	const getPreviousColumnId = (columnId: string): string | undefined => {
		if (!board.value) return;
		const columnIndex = getColumnIndex(columnId);

		return columnIndex <= 0 ? board.value.id : board.value.columns[columnIndex - 1].id;
	};

	const getFeatures = computed(() => {
		if (!board.value) return [];

		return board.value.features;
	});

	return {
		board,
		isLoading,
		getCardLocation,
		getColumnIndex,
		getColumnId,
		getFeatures,
		getLastColumnIndex,
		setBoard,
		setLoading,
		createCardRequest,
		createCardSuccess,
		createColumnRequest,
		createColumnSuccess,
		deleteBoardRequest,
		deleteBoardSuccess,
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
		updateBoardLayoutRequest,
		updateBoardLayoutSuccess,
		updateReaderCanEditSuccess,
		updateReaderCanEditRequest,
		fetchBoardRequest,
		fetchBoardSuccess,
		reloadBoard,
	};
});
