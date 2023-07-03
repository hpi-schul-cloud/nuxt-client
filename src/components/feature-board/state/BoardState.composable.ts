import { BoardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { nextTick, onMounted, ref } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedFocusedId } from "../shared/BoardFocusHandler.composable";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { Board, BoardSkeletonCard } from "../types/Board";
import { CardMove, ColumnMove } from "../types/DragAndDrop";

export const useBoardState = (id: string) => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);
	const {
		createColumnCall,
		deleteCardCall,
		deleteColumnCall,
		moveCardCall,
		moveColumnCall,
		updateColumnTitleCall,
		createCardCall,
	} = useBoardApi();
	const { setEditModeId } = useSharedEditMode();
	const { isErrorCode, showFailure, generateErrorText } = useBoardNotifier();

	const createCard = async (columnId: string) => {
		if (board.value === undefined) return;

		const newCardId = await createCardCall(columnId);
		if (!newCardId) {
			const errorText = generateErrorText("create", "boardCard");
			await showErrorAndReload(errorText);
			return;
		}

		const { announceFocusReceived } = useSharedFocusedId();
		announceFocusReceived(newCardId);

		const columnIndex = board.value.columns.findIndex(
			(column) => column.id === columnId
		);
		board.value.columns[columnIndex].cards.push({
			cardId: newCardId,
			height: 120,
		});
		setEditModeId(newCardId);
	};

	const createColumn = async () => {
		if (board.value === undefined) return;

		const newColumn = await createColumnCall(board.value.id);
		if (!newColumn.id) {
			const errorText = generateErrorText("create", "boardColumn");
			await showErrorAndReload(errorText);
			return;
		}

		setEditModeId(newColumn.id);
		await fetchBoard(board.value.id);

		return newColumn;
	};

	const createColumnWithCard = async (movingCardId: string) => {
		if (board.value === undefined) return;

		const newColumn = await createColumn();
		if (!newColumn?.id) {
			const errorText = generateErrorText("create", "boardColumn");
			await showErrorAndReload(errorText);
			return;
		}
		const moveCardPayload: CardMove = {
			addedIndex: 0,
			removedIndex: null,
			columnId: newColumn.id,
			payload: { cardId: movingCardId, height: 100 },
		};
		await moveCard(moveCardPayload);
	};

	const deleteCard = async (id: string) => {
		if (board.value === undefined) return;
		const status = await deleteCardCall(id);

		if (isErrorCode(status)) {
			const errorText = generateErrorText("delete", "boardCard");
			await showErrorAndReload(errorText);
			return;
		}
		await extractCard(id);
	};

	const deleteColumn = async (id: string) => {
		if (board.value === undefined) return;

		const columnIndex = getColumnIndex(id);
		if (columnIndex < 0) {
			return;
		}
		const status = await deleteColumnCall(id);

		if (isErrorCode(status)) {
			const errorText = generateErrorText("delete", "boardColumn");
			await showErrorAndReload(errorText);
			return;
		}
		board.value.columns.splice(columnIndex, 1);
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
		const boardsApi = BoardApiFactory(undefined, "/v3", $axios);

		const response = await boardsApi.boardControllerGetBoardSkeleton(id);

		if (isErrorCode(response.status)) {
			const errorText = generateErrorText("read", "board");
			showFailure(errorText);
			return;
		}

		board.value = { ...response.data, id };
		isLoading.value = false;
	};

	const moveCard = async (cardPayload: CardMove): Promise<void> => {
		if (board.value === undefined) return;
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
			const status = await moveCardCall(
				payload.cardId,
				targetColumnId,
				addedIndex
			);
			if (isErrorCode(status)) {
				const errorText = generateErrorText("update");
				await showErrorAndReload(errorText);
				return;
			}
		}
	};

	const moveColumn = async (payload: ColumnMove) => {
		if (board.value === undefined) return;
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
		const status = await moveColumnCall(
			payload.payload,
			board.value.id,
			addedIndex
		);

		if (isErrorCode(status)) {
			const errorText = generateErrorText("update");
			await showErrorAndReload(errorText);
		}
	};

	const updateColumnTitle = async (columnId: string, newTitle: string) => {
		if (board.value === undefined) return;

		const status = await updateColumnTitleCall(columnId, newTitle);

		if (isErrorCode(status)) {
			const errorText = generateErrorText("update");
			await showErrorAndReload(errorText);
			return;
		}

		const columnIndex = getColumnIndex(columnId);
		if (columnIndex > -1) {
			board.value.columns[columnIndex].title = newTitle;
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

	const showErrorAndReload = async (errorText: string | undefined) => {
		if (board.value === undefined) return;

		showFailure(errorText);
		await fetchBoard(board?.value.id);
	};

	onMounted(() => fetchBoard(id));

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
		updateColumnTitle,
	};
};
