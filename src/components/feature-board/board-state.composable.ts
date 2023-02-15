import { ref } from "vue";
import { Board } from "./types/Board";

export const useBoardState = () => {
	const fetchBoard = async (id: string): Promise<void> => {
		await new Promise((r) => {
			setTimeout(r, 1000);
		});

		board.value = MOCK_BOARD;
	};

	const isLoading = ref<boolean>(false);

	const board = ref<Board | undefined>(undefined);

	return {
		fetchBoard,
		board,
		isLoading,
	};
};

const MOCK_BOARD: Board = {
	columns: [
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
			title: "Col1",
			cards: [
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120004",
					height: 200,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120005",
					height: 250,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120006",
					height: 220,
				},
			],
		},
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120001",
			title: "Col2",
			cards: [
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120204",
					height: 300,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120305",
					height: 350,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120406",
					height: 320,
				},
			],
		},
	],
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120002",
	title: "MyFirstBoard!",
};
