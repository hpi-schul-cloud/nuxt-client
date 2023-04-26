import { BoardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedEditMode } from "../shared/EditMode.composable";
import { Board, BoardSkeletonCard } from "../types/Board";
import { CardMove, ColumnMove } from "../types/DragAndDrop";

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

	const createColumn = async () => {
		if (board.value === undefined) return;

		const newColumn = await createColumnCall(board.value.id);
		setEditModeId(newColumn.id);
		await fetchBoard(board.value.id);

		return newColumn;
	};

	const createColumnWithCard = async (movingCardId: string) => {
		if (board.value === undefined) return;

		const newColumn = await createColumn();

		if (newColumn) {
			const moveCardPayload: CardMove = {
				addedIndex: 0,
				removedIndex: null,
				columnId: newColumn.id,
				payload: { cardId: movingCardId, height: 100 },
			};
			moveCard(moveCardPayload);
		}
	};

	const deleteColumn = async (id: string) => {
		if (board.value === undefined) return;

		const columnIndex = getColumnIndex(id);
		if (columnIndex) {
			await deleteColumnCall(id);
			board.value.columns.splice(columnIndex, 1);
		}
	};

	const extractCard = (cardId: string): BoardSkeletonCard | undefined => {
		if (board.value === undefined) return;

		const column = board.value.columns.find(
			(column) => column.cards.find((c) => c.cardId === cardId) !== undefined
		);
		if (column) {
			const cardIndex = column?.cards.findIndex(
				(card) => card.cardId === cardId
			);
			if (cardIndex !== -1) {
				const extractedCards = column.cards.splice(cardIndex, 1);
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

	const moveCard = async (cardPayload: CardMove): Promise<void> => {
		if (board.value === undefined) return;

		const { addedIndex, columnId, columnIndex, payload } = cardPayload;
		const targetColumnId = columnIndex ? getColumnId(columnIndex) : columnId;
		if (addedIndex !== null && targetColumnId) {
			const card = extractCard(payload.cardId);
			if (card) {
				addCard(card, targetColumnId, addedIndex);
			}
			await moveCardCall(payload.cardId, targetColumnId, addedIndex);
		}
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
		const columnIndex = getColumnIndex(columnId);
		if (columnIndex) {
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
		if (targetColumnIndex) {
			board.value.columns[targetColumnIndex].cards.splice(toPosition, 0, card);
		}
	};

	const getColumnId = (columnIndex: number): string | undefined => {
		if (board.value === undefined) return;

		return board.value.columns[columnIndex].id;
	};

	const getColumnIndex = (columnId: string): number | undefined => {
		const columnIndex = board.value?.columns.findIndex(
			(c) => c.id === columnId
		);
		return columnIndex;
	};

	onMounted(() => fetchBoard(id));

	return {
		board,
		isLoading,
		createCard,
		createColumn,
		createColumnWithCard,
		deleteColumn,
		extractCard,
		fetchBoard,
		getColumnId,
		moveCard,
		moveColumn,
		updateColumnTitle,
	};
};
