import { BoardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";
import { Board } from "./types/Board";

export const useBoardState = (id: string) => {
	const fetchBoard = async (id: string): Promise<void> => {
		await new Promise((r) => {
			setTimeout(r, 1000);
		});

		const boardsApi = BoardsApiFactory(undefined, "/v3", $axios);
		board.value = {
			...(await boardsApi.boardControllerGetBoardSkeleton(id)).data,
			id,
		};
	};

	const isLoading = ref<boolean>(false);

	const board = ref<Board | undefined>(undefined);

	onMounted(() => fetchBoard(id));

	return {
		fetchBoard,
		board,
		isLoading,
	};
};
