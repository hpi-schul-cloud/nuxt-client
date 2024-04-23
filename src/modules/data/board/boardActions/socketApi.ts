import { ErrorType } from "@/components/error-handling/ErrorHandler.composable";
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

	const createCardFailure = (
		action: ReturnType<typeof BoardActions.createCardFailure>
	) => {
		console.log("createCardFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardCard",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const createColumnRequest = (
		action: ReturnType<typeof BoardActions.createColumnRequest>
	) => {
		emitOnSocket("create-column-request", action.payload);
	};

	const createColumnFailure = (
		action: ReturnType<typeof BoardActions.createColumnFailure>
	) => {
		console.log("createColumnFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardColumn",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		await emitOnSocket("delete-card-request", action.payload);
	};

	const deleteCardFailure = (
		action: ReturnType<typeof BoardActions.deleteCardFailure>
	) => {
		console.log("deleteCardFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardCard",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		boardStore.dispatch(BoardActions.deleteColumnSuccess(action.payload));
		emitOnSocket("delete-column-request", action.payload);
	};

	const deleteColumnFailure = (
		action: ReturnType<typeof BoardActions.deleteColumnFailure>
	) => {
		console.log("deleteColumnFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardColumn",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const moveCardRequest = async (
		action: ReturnType<typeof BoardActions.moveCardRequest>
	) => {
		boardStore.dispatch(BoardActions.moveCardSuccess(action.payload));
		emitOnSocket("move-card-request", action.payload);
	};

	const moveCardFailure = (
		action: ReturnType<typeof BoardActions.moveCardFailure>
	) => {
		console.log("moveCardFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardCard",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		boardStore.dispatch(BoardActions.moveColumnSuccess(action.payload));
		emitOnSocket("move-column-request", action.payload);
	};

	const moveColumnFailure = (
		action: ReturnType<typeof BoardActions.moveColumnFailure>
	) => {
		console.log("moveColumnFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardColumn",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const updateColumnTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		await emitOnSocket("update-column-title-request", action.payload);
		boardStore.dispatch(BoardActions.updateColumnTitleSuccess(action.payload));
	};

	const updateBoardTitleFailure = (
		action: ReturnType<typeof BoardActions.updateBoardTitleFailure>
	) => {
		console.log("updateBoardTitleFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "board",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const updateBoardTitleRequest = (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		boardStore.dispatch(BoardActions.updateBoardTitleSuccess(action.payload));
		emitOnSocket("update-board-title-request", action.payload);
	};

	const updateColumnTitleFailure = (
		action: ReturnType<typeof BoardActions.updateColumnTitleFailure>
	) => {
		console.log("updateColumnTitleFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "boardColumn",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
	};

	const updateBoardVisibilityRequest = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		boardStore.dispatch(
			BoardActions.updateBoardVisibilitySuccess(action.payload)
		);
		emitOnSocket("update-board-visibility-request", action.payload);
	};

	const updateBoardVisibilityFailure = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityFailure>
	) => {
		console.log("updateBoardVisibilityFailure", action.payload);

		const failureActionPayload = {
			errorType: "notUpdatedViaSocket" as ErrorType,
			BoardObjectType: "board",
		};
		boardStore.dispatch(BoardActions.notifyError(failureActionPayload));
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
		createCardFailure,
		createColumnRequest,
		createColumnFailure,
		disconnectSocketRequest,
		deleteCardRequest,
		deleteCardFailure,
		deleteColumnRequest,
		deleteColumnFailure,
		moveCardRequest,
		moveCardFailure,
		moveColumnRequest,
		moveColumnFailure,
		reloadBoard,
		reloadBoardSuccess,
		updateColumnTitleRequest,
		updateColumnTitleFailure,
		updateBoardTitleRequest,
		updateBoardTitleFailure,
		updateBoardVisibilityRequest,
		updateBoardVisibilityFailure,
	};
};
