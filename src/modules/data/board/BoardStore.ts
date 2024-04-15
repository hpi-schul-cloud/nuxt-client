import { Board } from "@/types/board/Board";
import { ref } from "vue";
import { defineStore } from "pinia";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import * as BoardActions from "./boardActions/baseActions";
// import { useBoardSocketApi } from "@data-board";
import { useBoardRestApi } from "./boardActions/restApiActions";
import { useSocketApi } from "./boardActions/socketActions";

export const useBoardStore = defineStore("boardStore", () => {
	const board = ref<Board | undefined>(undefined);
	const isLoading = ref<boolean>(false);

	const restApi = useBoardRestApi();
	const socketApi = useSocketApi();

	const FEATURE_SOCKET_ENABLED = true;

	const socketOrRest = FEATURE_SOCKET_ENABLED ? socketApi : restApi;

	const dispatch = async (
		action: PermittedStoreActions<typeof BoardActions>
	) => {
		handle(
			action,
			on(BoardActions.fetchBoard, restApi.fetchBoard),
			on(BoardActions.createCardRequest, socketOrRest.createCardRequest),
			on(BoardActions.createCardSuccess, socketOrRest.createCardSuccess),
			on(BoardActions.createColumnRequest, socketOrRest.createColumnRequest),
			on(BoardActions.createColumnSuccess, socketOrRest.createColumnSuccess),
			on(BoardActions.deleteCardRequest, socketOrRest.deleteCardRequest),
			on(BoardActions.deleteCardSuccess, socketOrRest.deleteCardSuccess),
			on(BoardActions.deleteColumnRequest, socketOrRest.deleteColumnRequest),
			on(BoardActions.deleteColumnSuccess, socketOrRest.deleteColumnSuccess),
			on(BoardActions.moveCardRequest, restApi.moveCardRequest),
			// on(BoardActions.moveCardSuccess, restApi.moveCardSuccess),
			on(BoardActions.moveColumnRequest, restApi.moveColumnRequest),
			// on(BoardActions.moveColumnSuccess, moveColumnSuccess),
			on(
				BoardActions.updateColumnTitleRequest,
				socketOrRest.updateColumnTitleRequest
			),
			on(
				BoardActions.updateColumnTitleSuccess,
				socketOrRest.updateColumnTitleSuccess
			),
			on(
				BoardActions.updateBoardTitleRequest,
				socketOrRest.updateBoardTitleRequest
			),
			on(
				BoardActions.updateBoardTitleSuccess,
				socketOrRest.updateBoardTitleSuccess
			),
			on(
				BoardActions.updateBoardVisibilityRequest,
				socketOrRest.updateBoardVisibilityRequest
			),
			on(
				BoardActions.updateBoardVisibilitySuccess,
				socketOrRest.updateBoardVisibilitySuccess
			)
			// on(BoardActions.reloadBoard, reloadBoard)
		);
	};

	return {
		board,
		isLoading,
		dispatch,
		fetchBoard: restApi.fetchBoard,
	};
});
