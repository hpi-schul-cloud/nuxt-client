import { BoardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { nextTick, onMounted, ref } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { Board, BoardSkeletonCard } from "../types/Board";
import { CardMove, ColumnMove } from "../types/DragAndDrop";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

const {
	createColumnCall,
	deleteCardCall,
	deleteColumnCall,
	moveCardCall,
	moveColumnCall,
	updateColumnTitleCall,
	createCardCall,
} = useBoardApi();

const { showFailure } = useBoardNotifier();

export const useBoardState = (id: string) => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);
	const { setEditModeId } = useSharedEditMode();

	const createCard = async (columnId: string) => {
		if (board.value === undefined) return;

		const newCardId = await createCardCall(columnId);
		if (!newCardId) {
			await showErrorAndReload();
			return;
		}

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
		if (!newColumn?.id) {
			await showErrorAndReload();
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
			await showErrorAndReload();
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
		const response = await deleteCardCall(id);

		if (isErrorCode(response?.status)) {
			await showErrorAndReload();
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
		const response = await deleteColumnCall(id);

		if (isErrorCode(response?.status)) {
			await showErrorAndReload();
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
			const cardIndex = column?.cards.findIndex(
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

		const response = (await boardsApi.boardControllerGetBoardSkeleton(id)).data;

		if (!response?.id) {
			await showErrorAndReload();
			return;
		}

		board.value = { ...response, id };
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
			const response = await moveCardCall(
				payload.cardId,
				targetColumnId,
				addedIndex
			);
			if (isErrorCode(response?.status)) {
				await showErrorAndReload();
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
		const response = await moveColumnCall(
			payload.payload,
			board.value.id,
			addedIndex
		);

		if (isErrorCode(response?.status)) {
			await showErrorAndReload();
		}
	};

	const updateColumnTitle = async (columnId: string, newTitle: string) => {
		if (board.value === undefined) return;

		const response = await updateColumnTitleCall(columnId, newTitle);

		if (isErrorCode(response?.status)) {
			await showErrorAndReload();
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

	const isErrorCode = (statusCode: HttpStatusCode) => {
		if (statusCode >= 300) return true;
		return false;
	};

	const showErrorAndReload = async () => {
		if (board.value === undefined) return;

		showFailure();
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
