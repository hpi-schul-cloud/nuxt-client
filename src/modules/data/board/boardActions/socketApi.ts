import * as BoardActions from "./actions";
import { useBoardSocketApi } from "@data-board";
import { useBoardStore } from "../BoardStore";

export const useSocketApi = () => {
	const boardStore = useBoardStore();

	const { emitOnSocket } = useBoardSocketApi(boardStore.dispatch);

	const createCardRequest = (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		emitOnSocket("create-card-request", action.payload);
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

	const updateColumnTitleRequest = (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		emitOnSocket("update-column-title-request", action.payload);
	};

	const updateBoardTitleRequest = (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		emitOnSocket("update-board-title-request", action.payload);
	};

	const updateBoardVisibilityRequest = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		emitOnSocket("update-board-visibility-request", action.payload);
	};

	return {
		createCardRequest,
		createColumnRequest,
		deleteCardRequest,
		deleteColumnRequest,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
	};
};
