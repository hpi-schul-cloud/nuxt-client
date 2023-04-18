import { BoardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { Board, BoardSkeletonCard } from "../types/Board";
import { CardMove, CardMoveByKeyboard, ColumnMove } from "../types/DragAndDrop";

const { createColumn, deleteColumnCall, moveCardCall, updateColumnTitleCall } =
	useBoardApi();

export const useBoardState = (id: string) => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);

	const fetchBoard = async (id: string): Promise<void> => {
		isLoading.value = true;
		const boardsApi = BoardApiFactory(undefined, "/v3", $axios);
		board.value = {
			...(await boardsApi.boardControllerGetBoardSkeleton(id)).data,
			id,
		};
		isLoading.value = false;
	};

	const moveColumn = (payload: ColumnMove) => {
		if (board.value === undefined) {
			return;
		}
		const element = board.value.columns[payload.removedIndex];
		board.value.columns.splice(payload.removedIndex, 1);
		board.value.columns.splice(payload.addedIndex, 0, element);
	};

	let removedIndex: number | undefined;
	let addedIndex: number | undefined;
	let targetColumnId: string | undefined;

	const moveCard = async (cardPayload: CardMove): Promise<void> => {
		if (board.value === undefined) {
			return;
		}

		if (cardPayload.removedIndex !== null) {
			removedIndex = cardPayload.removedIndex;
		}

		if (cardPayload.addedIndex !== null) {
			addedIndex = cardPayload.addedIndex;
			targetColumnId = cardPayload.targetColumnId;
		}

		if (
			removedIndex !== undefined &&
			addedIndex !== undefined &&
			targetColumnId !== undefined
		) {
			await moveCardCall(
				cardPayload.payload.cardId,
				targetColumnId,
				addedIndex
			);

			const card = removeCard(cardPayload.payload.cardId);
			if (card) {
				addCard(card, targetColumnId, addedIndex);
			}
			removedIndex = undefined;
			addedIndex = undefined;
		}
	};

	const addCard = (
		card: BoardSkeletonCard,
		columnId: string,
		toPosition: number
	) => {
		if (board.value === undefined) {
			return;
		}

		const targetColumnIndex = board.value?.columns.findIndex(
			(c) => c.id === columnId
		);
		board.value.columns[targetColumnIndex].cards.splice(toPosition, 0, card);
	};

	const removeCard = (cardId: string): BoardSkeletonCard | undefined => {
		if (board.value === undefined) {
			return;
		}
		const columnIndex = board.value.columns.findIndex(
			(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
		);
		const column = board.value.columns.find(
			(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
		);
		if (column) {
			const cardIndex = column?.cards.findIndex(
				(card) => card.cardId === cardId
			);
			if (cardIndex !== -1) {
				const extractedCards = board.value.columns[columnIndex].cards.splice(
					cardIndex,
					1
				);
				return extractedCards[0];
			}
		}
	};

	const moveCardByKeyboard = (cardPayload: CardMoveByKeyboard): void => {
		if (board.value === undefined) {
			return;
		}
		if (
			cardPayload.targetColumnIndex < 0 ||
			cardPayload.targetColumnIndex >= board.value.columns.length
		) {
			return;
		}

		board.value.columns[cardPayload.columnIndex].cards.splice(
			cardPayload.cardIndex,
			1
		);
		board.value.columns[cardPayload.targetColumnIndex].cards.splice(
			cardPayload.targetColumnPosition,
			0,
			cardPayload.card
		);
	};

	const updateColumnTitle = (columnId: string, newTitle: string) => {
		updateColumnTitleCall(columnId, newTitle);
	};

	const addNewColumn = async (cardId?: string) => {
		console.log("cardId", cardId);
		if (board.value === undefined) {
			return;
		}
		await createColumn(board.value.id);
		// WIP: add move card...
		await fetchBoard(board.value.id);
	};

	const deleteColumn = async (id: string) => {
		if (board.value === undefined) {
			return;
		}

		await deleteColumnCall(id);
		await fetchBoard(board.value.id);
	};

	const boardActions = {
		deleteColumn,
	};

	onMounted(() => fetchBoard(id));

	return {
		boardActions,
		fetchBoard,
		board,
		isLoading,
		moveColumn,
		moveCard,
		moveCardByKeyboard,
		updateColumnTitle,
		removeCard,
		addNewColumn,
	};
};
