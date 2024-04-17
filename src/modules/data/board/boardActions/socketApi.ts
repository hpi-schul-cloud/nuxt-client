import * as BoardActions from "./actions";
import { useBoardSocketApi } from "@data-board";
import { useBoardStore } from "../BoardStore";
import { notifierModule } from "@/store";
import { AlertPayload } from "@/store/types/alert-payload";

export const useSocketApi = () => {
	const boardStore = useBoardStore();

	const { emitOnSocket } = useBoardSocketApi(boardStore.dispatch);

	const createCardRequest = (
		action: ReturnType<typeof BoardActions.createCardRequest>
	) => {
		emitOnSocket("create-card-request", action.payload);
	};

	const createCardFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to create a card and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const createColumnRequest = (
		action: ReturnType<typeof BoardActions.createColumnRequest>
	) => {
		emitOnSocket("create-column-request", action.payload);
	};

	const createColumnFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to create a column and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const deleteCardRequest = async (
		action: ReturnType<typeof BoardActions.deleteCardRequest>
	) => {
		await emitOnSocket("delete-card-request", action.payload);
	};

	const deleteCardFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to delete a card and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const deleteColumnRequest = async (
		action: ReturnType<typeof BoardActions.deleteColumnRequest>
	) => {
		boardStore.dispatch(BoardActions.deleteColumnSuccess(action.payload));
		emitOnSocket("delete-column-request", action.payload);
	};

	const deleteColumnFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to delete a column and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const moveCardRequest = async (
		action: ReturnType<typeof BoardActions.moveCardRequest>
	) => {
		boardStore.dispatch(BoardActions.moveCardSuccess(action.payload));
		emitOnSocket("move-card-request", action.payload);
	};

	const moveCardFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to move a card and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const moveColumnRequest = async (
		action: ReturnType<typeof BoardActions.moveColumnRequest>
	) => {
		boardStore.dispatch(BoardActions.moveColumnSuccess(action.payload));
		emitOnSocket("move-column-request", action.payload);
	};

	const moveColumnFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to move a column and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const updateColumnTitleRequest = async (
		action: ReturnType<typeof BoardActions.updateColumnTitleRequest>
	) => {
		await emitOnSocket("update-column-title-request", action.payload);
		boardStore.dispatch(BoardActions.updateColumnTitleSuccess(action.payload));
	};

	const updateBoardTitleFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to update board title and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const updateBoardTitleRequest = (
		action: ReturnType<typeof BoardActions.updateBoardTitleRequest>
	) => {
		boardStore.dispatch(BoardActions.updateBoardTitleSuccess(action.payload));
		emitOnSocket("update-board-title-request", action.payload);
	};

	const updateColumnTitleFailure = () => {
		const failureNotification: AlertPayload = {
			text: "A user tried to update column title and an error occurred. Please reload the page to get updated board data.",
			status: "warning",
		};
		handleFailureAction(failureNotification);
	};

	const updateBoardVisibilityRequest = (
		action: ReturnType<typeof BoardActions.updateBoardVisibilityRequest>
	) => {
		boardStore.dispatch(
			BoardActions.updateBoardVisibilitySuccess(action.payload)
		);
		emitOnSocket("update-board-visibility-request", action.payload);
	};

	const reloadBoardRequest = (
		action: ReturnType<typeof BoardActions.reloadBoard>
	) => {
		emitOnSocket("reload-board-request", action.payload);
	};

	const reloadBoardSuccess = (
		action: ReturnType<typeof BoardActions.reloadBoardSuccess>
	) => {
		const { id } = action.payload;
		handleFailureAction({
			text: "Board reloaded successfully",
			status: "success",
		});
		boardStore.dispatch(BoardActions.fetchBoard({ id }));
	};

	const notifyWithTemplateRequest = (
		action: ReturnType<typeof BoardActions.notifyWithTemplate>
	) => {
		emitOnSocket("notify-with-template-request", action.payload);
	};

	const notifyWithTemplateSuccess = (
		action: ReturnType<typeof BoardActions.notifyWithTemplate>
	) => {
		boardStore.dispatch(BoardActions.notifyWithTemplate(action.payload));
	};

	const notifyWithTemplateAndReloadRequest = (
		action: ReturnType<typeof BoardActions.notifyWithTemplateAndReloadRequest>
	) => {
		emitOnSocket("notify-with-template-and-reload-request", action.payload);
	};

	const notifyWithTemplateAndReloadSuccess = (
		action: ReturnType<typeof BoardActions.notifyWithTemplateAndReload>
	) => {
		boardStore.dispatch(
			BoardActions.notifyWithTemplateAndReload(action.payload)
		);
	};

	return {
		createCardRequest,
		createCardFailure,
		createColumnRequest,
		createColumnFailure,
		deleteCardRequest,
		deleteCardFailure,
		deleteColumnRequest,
		deleteColumnFailure,
		moveCardRequest,
		moveCardFailure,
		moveColumnRequest,
		moveColumnFailure,
		notifyWithTemplateRequest,
		notifyWithTemplateSuccess,
		notifyWithTemplateAndReloadRequest,
		notifyWithTemplateAndReloadSuccess,
		reloadBoardRequest,
		reloadBoardSuccess,
		updateColumnTitleRequest,
		updateColumnTitleFailure,
		updateBoardTitleRequest,
		updateBoardTitleFailure,
		updateBoardVisibilityRequest,
	};
};
