import * as BoardActions from "./actions";
import { useBoardSocketApi } from "@data-board";
import { useBoardStore } from "../BoardStore";
import {
	CreateCardRequestPayload,
	CreateColumnRequestPayload,
	DeleteCardRequestPayload,
	DeleteColumnRequestPayload,
	DisconnectSocketRequestPayload,
	MoveCardRequestPayload,
	MoveColumnRequestPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateColumnTitleRequestPayload,
} from "@/modules/data/board/boardActions/boardActionPayload";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

type ErrorActions =
	| ReturnType<typeof BoardActions.createCardFailure>
	| ReturnType<typeof BoardActions.createColumnFailure>
	| ReturnType<typeof BoardActions.deleteBoardFailure>
	| ReturnType<typeof BoardActions.deleteCardFailure>
	| ReturnType<typeof BoardActions.deleteColumnFailure>
	| ReturnType<typeof BoardActions.moveCardFailure>
	| ReturnType<typeof BoardActions.moveColumnFailure>
	| ReturnType<typeof BoardActions.updateColumnTitleFailure>
	| ReturnType<typeof BoardActions.updateBoardTitleFailure>
	| ReturnType<typeof BoardActions.updateBoardVisibilityFailure>;

export const useSocketApi = () => {
	const boardStore = useBoardStore();
	const { notifySocketError } = useErrorHandler();

	const dispatch = async (
		action: PermittedStoreActions<typeof BoardActions>
	) => {
		handle(
			action,
			on(BoardActions.disconnectSocket, disconnectSocketRequest),

			// success actions
			on(BoardActions.createCardSuccess, boardStore.createCardSuccess),
			on(BoardActions.createColumnSuccess, boardStore.createColumnSuccess),
			on(BoardActions.deleteCardSuccess, boardStore.deleteCardSuccess),
			on(BoardActions.deleteColumnSuccess, boardStore.deleteColumnSuccess),
			on(BoardActions.moveCardSuccess, boardStore.moveCardSuccess),
			on(BoardActions.moveColumnSuccess, boardStore.moveColumnSuccess),
			on(
				BoardActions.updateColumnTitleSuccess,
				boardStore.updateColumnTitleSuccess
			),
			on(
				BoardActions.updateBoardTitleSuccess,
				boardStore.updateBoardTitleSuccess
			),
			on(
				BoardActions.updateBoardVisibilitySuccess,
				boardStore.updateBoardVisibilitySuccess
			),

			// failure actions
			on(BoardActions.createCardFailure, onFailure),
			on(BoardActions.createColumnFailure, onFailure),
			on(BoardActions.deleteCardFailure, onFailure),
			on(BoardActions.deleteColumnFailure, onFailure),
			on(BoardActions.moveCardFailure, onFailure),
			on(BoardActions.moveColumnFailure, onFailure),
			on(BoardActions.updateColumnTitleFailure, onFailure),
			on(BoardActions.updateBoardTitleFailure, onFailure),
			on(BoardActions.updateBoardVisibilityFailure, onFailure)
		);
	};

	const { emitOnSocket, disconnectSocket } = useBoardSocketApi(dispatch);

	const createCardRequest = async (payload: CreateCardRequestPayload) => {
		emitOnSocket("create-card-request", payload);
	};

	const disconnectSocketRequest = (payload: DisconnectSocketRequestPayload) => {
		// TODO: Kebab-Case
		console.log("disconnectSocketRequest", payload);
		disconnectSocket();
	};

	const createColumnRequest = (payload: CreateColumnRequestPayload) => {
		emitOnSocket("create-column-request", payload);
	};

	const deleteCardRequest = async (payload: DeleteCardRequestPayload) => {
		await emitOnSocket("delete-card-request", payload);
	};

	const deleteColumnRequest = async (payload: DeleteColumnRequestPayload) => {
		dispatch(BoardActions.deleteColumnSuccess(payload));
		emitOnSocket("delete-column-request", payload);
	};

	const moveCardRequest = async (payload: MoveCardRequestPayload) => {
		dispatch(BoardActions.moveCardSuccess(payload));
		emitOnSocket("move-card-request", payload);
	};

	const moveColumnRequest = async (payload: MoveColumnRequestPayload) => {
		dispatch(BoardActions.moveColumnSuccess(payload));
		emitOnSocket("move-column-request", payload);
	};

	const updateColumnTitleRequest = async (
		payload: UpdateColumnTitleRequestPayload
	) => {
		await emitOnSocket("update-column-title-request", payload);
		dispatch(BoardActions.updateColumnTitleSuccess(payload));
	};

	const updateBoardTitleRequest = (payload: UpdateBoardTitleRequestPayload) => {
		dispatch(BoardActions.updateBoardTitleSuccess(payload));
		emitOnSocket("update-board-title-request", payload);
	};

	const updateBoardVisibilityRequest = (
		payload: UpdateBoardVisibilityRequestPayload
	) => {
		dispatch(BoardActions.updateBoardVisibilitySuccess(payload));
		emitOnSocket("update-board-visibility-request", payload);
	};

	const onFailure = (payload: ErrorActions["payload"]) => {
		const { errorType = "notUpdated", boardObjectType = "board" } = payload;
		notifySocketError(errorType, boardObjectType);
	};

	return {
		dispatch,
		createCardRequest,
		createColumnRequest,
		disconnectSocketRequest,
		deleteCardRequest,
		deleteColumnRequest,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
	};
};
