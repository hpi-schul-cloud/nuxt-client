import { BoardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref, reactive } from "vue";
import { Board } from "./types/Board";
import { ColumnDndPayload, CardDndPayload } from "./types/DragAndDrop";

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
		board.value = dummyBoard;
	};

	const changeColumnPosition = (payload: ColumnDndPayload) => {
		const element = dummyBoard.columns[payload.removedIndex];
		dummyBoard.columns.splice(payload.removedIndex, 1);
		dummyBoard.columns.splice(payload.addedIndex, 0, element);
	};

	const changeCardPosition = (payload: CardDndPayload): void => {
		if (
			payload.targetColumnIndex === -1 ||
			(board.value?.columns.length &&
				payload.targetColumnIndex + 1 > board.value?.columns.length)
		) {
			return;
		}

		const element = dummyBoard.columns[payload.columnIndex].cards.filter(
			(card) => card.cardId === payload.cardId
		)[0];

		dummyBoard.columns[payload.columnIndex].cards.splice(
			payload.cardPosition,
			1
		);
		dummyBoard.columns[payload.targetColumnIndex].cards.splice(
			payload.targetColumnPosition,
			0,
			element
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
		changeCardPosition,
	};
};
