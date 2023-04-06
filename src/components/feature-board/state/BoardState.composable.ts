import { BoardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";
import { Board } from "../types/Board";
import { CardMove, CardMoveByKeyboard, ColumnMove } from "../types/DragAndDrop";

const DUMMY_BOARD: Board = {
	id: "0000d213816abba584714caa",
	title: "a mocked testboard, please do not use",
	columns: [
		{
			id: "0123456789abcdef00000010",
			title: "first column",
			cards: [
				{ cardId: "0123456789abcdef00000001", height: 100 },
				{ cardId: "0123456789abcdef00000002", height: 175 },
				{ cardId: "0123456789abcdef00000004", height: 175 },
			],
			timestamps: {
				createdAt: new Date().toString(),
				lastUpdatedAt: new Date().toString(),
			},
		},
		{
			id: "0123456789abcdef00000020",
			title: "second column",
			cards: [
				{ cardId: "0123456789abcdef00000003", height: 175 },
				{ cardId: "0123456789abcdef00000005", height: 175 },
			],
			timestamps: {
				createdAt: new Date().toString(),
				lastUpdatedAt: new Date().toString(),
			},
		},
		{
			id: "0123456789abcdef00000030",
			title: "empty for now",
			cards: [],
			timestamps: {
				createdAt: new Date().toString(),
				lastUpdatedAt: new Date().toString(),
			},
		},
	],
	timestamps: {
		lastUpdatedAt:
			"Thu Feb 23 2023 11:56:51 GMT+0100 (Central European Standard Time)",
		createdAt:
			"Thu Feb 23 2023 11:56:51 GMT+0100 (Central European Standard Time)",
	},
};

export const useBoardState = (id: string) => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);

	const fetchBoard = async (id: string): Promise<void> => {
		isLoading.value = true;
		await new Promise((r) => {
			setTimeout(r, 1000);
		});
		const boardsApi = BoardsApiFactory(undefined, "/v3", $axios);
		// board.value = {
		// 	...(await boardsApi.boardControllerGetBoardSkeleton(id)).data,
		// 	id,
		// };
		board.value = DUMMY_BOARD;
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

	const moveCard = (sourceColumnIndex: number, cardPayload: CardMove): void => {
		if (board.value === undefined) {
			return;
		}
		if (cardPayload.removedIndex !== null) {
			board.value.columns[sourceColumnIndex].cards.splice(
				cardPayload.removedIndex,
				1
			);
		}

		if (cardPayload.addedIndex !== null) {
			const card = cardPayload.payload;

			board.value.columns[sourceColumnIndex].cards.splice(
				cardPayload.addedIndex,
				0,
				card
			);
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
		console.log("update column title: ", columnId, newTitle);
	};

	const addNewColumn = (title: string, card?: string) => {
		console.log(title, card);
	};

	onMounted(() => fetchBoard(id));

	return {
		fetchBoard,
		board,
		isLoading,
		moveColumn,
		moveCard,
		moveCardByKeyboard,
		updateColumnTitle,
		addNewColumn,
	};
};
