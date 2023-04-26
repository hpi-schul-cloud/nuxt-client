import { BoardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { Board, BoardSkeletonCard } from "../types/Board";
import { CardMove, CardMoveByKeyboard, ColumnMove } from "../types/DragAndDrop";

const {
	createColumnCall,
	deleteColumnCall,
	moveCardCall,
	moveColumnCall,
	updateColumnTitleCall,
	createCardCall,
} = useBoardApi();

export const useBoardState = (id: string) => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);
	const { setEditModeId } = useSharedEditMode();

	const createCard = async (columnId: string) => {
		if (board.value === undefined) return;

		const newCardId = await createCardCall(columnId);
		if (newCardId) {
			const columnIndex = board.value.columns.findIndex(
				(column) => column.id === columnId
			);
			board.value.columns[columnIndex].cards.push({
				cardId: newCardId,
				height: 120,
			});
			setEditModeId(newCardId);
		}
	};

	const createColumn = async (cardId?: string) => {
		if (board.value === undefined) return;

		const newColumn = await createColumnCall(board.value.id);
		setEditModeId(newColumn.id);

		// WIP: add move card...
		await fetchBoard(board.value.id);
	};

	const deleteColumn = async (id: string) => {
		if (board.value === undefined) return;

		await deleteColumnCall(id);
		await fetchBoard(board.value.id);
	};

	const extractCard = (cardId: string): BoardSkeletonCard | undefined => {
		if (board.value === undefined) return;

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

	const fetchBoard = async (id: string): Promise<void> => {
		isLoading.value = true;
		const boardsApi = BoardApiFactory(undefined, "/v3", $axios);
		board.value = {
			...(await boardsApi.boardControllerGetBoardSkeleton(id)).data,
			id,
		};
		isLoading.value = false;
	};

	let removedIndex: number | undefined;
	let addedIndex: number | undefined;
	let targetColumnId: string | undefined;

	const moveCard = async (cardPayload: CardMove): Promise<void> => {
		if (board.value === undefined) return;

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
			const card = extractCard(cardPayload.payload.cardId);
			if (card) {
				addCard(card, targetColumnId, addedIndex);
			}
			await moveCardCall(
				cardPayload.payload.cardId,
				targetColumnId,
				addedIndex
			);
			removedIndex = undefined;
			addedIndex = undefined;
		}
	};

	const moveCardByKeyboard = (cardPayload: CardMoveByKeyboard): void => {
		if (board.value === undefined) return;

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

	const moveColumn = async (payload: ColumnMove) => {
		if (board.value === undefined) return;

		const element = board.value.columns[payload.removedIndex];
		board.value.columns.splice(payload.removedIndex, 1);
		board.value.columns.splice(payload.addedIndex, 0, element);
		await moveColumnCall(payload.payload, board.value.id, payload.addedIndex);
	};

	const updateColumnTitle = (columnId: string, newTitle: string) => {
		if (board.value === undefined) return;

		updateColumnTitleCall(columnId, newTitle);
		const columnIndex = board.value.columns.findIndex(
			(column) => column.id === columnId
		);
		board.value.columns[columnIndex].title = newTitle;
	};

	const addCard = (
		card: BoardSkeletonCard,
		columnId: string,
		toPosition: number
	) => {
		if (board.value === undefined) return;

		const targetColumnIndex = board.value?.columns.findIndex(
			(c) => c.id === columnId
		);
		board.value.columns[targetColumnIndex].cards.splice(toPosition, 0, card);
	};

	onMounted(() => fetchBoard(id));

	return {
		board,
		isLoading,
		createCard,
		createColumn,
		extractCard,
		deleteColumn,
		fetchBoard,
		moveCard,
		moveCardByKeyboard,
		moveColumn,
		updateColumnTitle,
	};
};
