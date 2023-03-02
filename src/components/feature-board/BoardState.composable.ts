import { BoardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref, reactive } from "vue";
import { Board } from "./types/Board";
import { ColumnMove, CardMove, CardMoveByKeyboard } from "./types/DragAndDrop";

export const useBoardState = (id: string) => {
	const dummyBoard = reactive({
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
			},
			{
				id: "0123456789abcdef00000020",
				title: "second column",
				cards: [
					{ cardId: "0123456789abcdef00000003", height: 175 },
					{ cardId: "0123456789abcdef00000005", height: 175 },
				],
			},
			{
				id: "0123456789abcdef00000030",
				title: "empty for now",
				cards: [],
			},
		],
		timestamps: {
			lastUpdatedAt:
				"Thu Feb 23 2023 11:56:51 GMT+0100 (Central European Standard Time)",
			createdAt:
				"Thu Feb 23 2023 11:56:51 GMT+0100 (Central European Standard Time)",
		},
	});
	const fetchBoard = async (id: string): Promise<void> => {
		// await new Promise((r) => {
		// 	setTimeout(r, 1000);
		// });
		// const boardsApi = BoardsApiFactory(undefined, "/v3", $axios);
		// board.value = {
		// 	...(await boardsApi.boardControllerGetBoardSkeleton(id)).data,
		// 	id,
		// };
		// board.value = dummyBoard;
	};

	const changeColumnPosition = (payload: ColumnMove) => {
		const element = dummyBoard.columns[payload.removedIndex];
		dummyBoard.columns.splice(payload.removedIndex, 1);
		dummyBoard.columns.splice(payload.addedIndex, 0, element);
	};

	const changePosition = (columnIndex: number, cardPayload: CardMove): void => {
		if (cardPayload.removedIndex !== null) {
			dummyBoard.columns[columnIndex].cards.splice(cardPayload.removedIndex, 1);
		}

		if (cardPayload.addedIndex !== null) {
			const card = cardPayload.payload;

			dummyBoard.columns[columnIndex].cards.splice(
				cardPayload.addedIndex,
				0,
				card
			);
		}
	};

	const changePositionByKeyboard = (cardPayload: CardMoveByKeyboard): void => {
		if (
			cardPayload.targetColumnIndex < 0 ||
			cardPayload.targetColumnIndex >= dummyBoard.columns.length
		) {
			return;
		}

		dummyBoard.columns[cardPayload.columnIndex].cards.splice(
			cardPayload.cardIndex,
			1
		);
		dummyBoard.columns[cardPayload.targetColumnIndex].cards.splice(
			cardPayload.targetColumnPosition,
			0,
			cardPayload.card
		);
	};

	const isLoading = ref<boolean>(false);

	const board = ref<Board | undefined>(undefined);

	onMounted(() => fetchBoard(id));

	return {
		fetchBoard,
		board: dummyBoard,
		isLoading,
		changeColumnPosition,
		changePosition,
		changePositionByKeyboard,
	};
};
