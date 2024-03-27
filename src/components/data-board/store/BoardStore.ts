import { defineStore } from "pinia";
import { ref } from "vue";
import {
	PermittedStoreActions,
	handle,
	on,
	Action,
} from "./types/ActionFactory";
import * as BoardActions from "./types/Actions";
import { BoardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

const boardApi = BoardApiFactory(undefined, "/v3", $axios);

export const useBoardStore = defineStore("boardStore", () => {
	const board = ref<any>({
		id: "board1",
		columns: [
			{
				id: "column1",
				cards: [
					{ id: "card1", text: "" },
					{ id: "card2", text: "MyContent" },
					{ id: "card3", text: "" },
				],
			},
			{
				id: "column2",
				cards: [{ id: "card4", text: "" }],
			},
			{
				id: "column3",
				cards: [],
			},
			{
				id: "column4",
				cards: [],
			},
		],
	});

	function dispatch(action: PermittedStoreActions<typeof BoardActions>) {
		console.log("dispatch", action);
		handle(
			action,
			on(BoardActions.fetchBoardAction, fetchBoard),
			on(BoardActions.createCard, createCard)
		);
	}

	const fetchBoard = async (action: Action) => {
		console.log("fetchBoard", action);
		const response = await boardApi.boardControllerGetBoardSkeleton(
			action.payload
		);

		board.value = response.data;

		console.log("fetchBoard", board.value);
	};

	function createCard(action: Action) {
		console.log("createCard", action);
	}

	return {
		board,
		dispatch,
		fetchBoard,
	};
});
