import * as BoardActions from "./actions";
import { boardActions, useBoardSocketApi } from "@data-board";
import { useBoardStore } from "../BoardStore";

export const useSocketApi = () => {
	const boardStore = useBoardStore();

	const { emitOnSocket, disconnectSocket } = useBoardSocketApi(
		boardStore.dispatch
	);

	const createCardRequest = (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		emitOnSocket("create-card-request", action.payload);
	};

	const disconnectSocketRequest = (
		action: ReturnType<typeof BoardActions.disconnectSocket>
	) => {
		console.log("disconnectSocketRequest", action.payload);
		disconnectSocket();
	};

	const createColumnRequest = (
		action: ReturnType<typeof BoardActions.createColumnRequest>
	) => {
		emitOnSocket("create-column-request", action.payload);
	};

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		await emitOnSocket("delete-card-request", action.payload);
	};

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		boardStore.dispatch(BoardActions.deleteColumnSuccess(action.payload));
		emitOnSocket("delete-column-request", action.payload);
	};

	const moveCardRequest = async (
		action: ReturnType<typeof BoardActions.moveCardRequest>
	) => {
		boardStore.dispatch(BoardActions.moveCardSuccess(action.payload));
		emitOnSocket("move-card-request", action.payload);
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		boardStore.dispatch(BoardActions.moveColumnSuccess(action.payload));
		emitOnSocket("move-column-request", action.payload);
	};

	const updateColumnTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		await emitOnSocket("update-column-title-request", action.payload);
		boardStore.dispatch(BoardActions.updateColumnTitleSuccess(action.payload));
	};

	const updateBoardTitleRequest = (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		boardStore.dispatch(BoardActions.updateBoardTitleSuccess(action.payload));
		emitOnSocket("update-board-title-request", action.payload);
	};

	const updateBoardVisibilityRequest = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		boardStore.dispatch(
			BoardActions.updateBoardVisibilitySuccess(action.payload)
		);
		emitOnSocket("update-board-visibility-request", action.payload);
	};

	const reloadBoard = (action: ReturnType<typeof BoardActions.reloadBoard>) => {
		emitOnSocket("reload-board-request", action.payload);
	};

	const reloadBoardSuccess = (
		action: ReturnType<typeof BoardActions.reloadBoardSuccess>
	) => {
		boardStore.dispatch(boardActions.fetchBoard(action.payload));
	};

	return {
		createCardRequest,
		createColumnRequest,
		disconnectSocketRequest,
		deleteCardRequest,
		deleteColumnRequest,
		moveCardRequest,
		moveColumnRequest,
		reloadBoard,
		reloadBoardSuccess,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
	};
};
