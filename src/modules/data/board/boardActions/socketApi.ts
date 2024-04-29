import * as BoardActions from "./actions";
import { useBoardSocketApi } from "@data-board";
import { useBoardStore } from "../BoardStore";
import {
	CreateCardRequestPayload,
	CreateColumnRequestPayload,
	DeleteCardRequestPayload,
	DeleteColumnRequestPayload,
	DisconnectSocketRequestPayload,
	FetchBoardRequestPayload,
	MoveCardRequestPayload,
	MoveColumnRequestPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateColumnTitleRequestPayload,
} from "./boardActionPayload";
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
			on(BoardActions.fetchBoardSuccess, boardStore.fetchBoardSuccess),
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

	const { emitOnSocket, emitWithAck, disconnectSocket } =
		useBoardSocketApi(dispatch);

	const createCardRequest = async (payload: CreateCardRequestPayload) => {
		emitOnSocket("create-card-request", payload);
	};

	const fetchBoardRequest = async (
		payload: FetchBoardRequestPayload
	): Promise<void> => {
		boardStore.setLoading(true);
		emitOnSocket("fetch-board-request", payload);
	};

	const disconnectSocketRequest = (payload: DisconnectSocketRequestPayload) => {
		// TODO: Kebab-Case
		console.log("disconnectSocketRequest", payload);
		disconnectSocket();
	};

	const createColumnRequest = (payload: CreateColumnRequestPayload) => {
		emitOnSocket("create-column-request", payload);
	};

	const deleteCardRequest = (payload: DeleteCardRequestPayload) => {
		emitOnSocket("delete-card-request", payload);
	};

	const deleteColumnRequest = (payload: DeleteColumnRequestPayload) => {
		emitOnSocket("delete-column-request", payload);
	};

	const moveCardRequest = async (payload: MoveCardRequestPayload) => {
		try {
			if (payload.toColumnId === undefined && boardStore.board) {
				const response = await emitWithAck("create-column-request", {
					boardId: boardStore.board.id,
				});
				boardStore.createColumnSuccess(response);
				payload.toColumnId = response.newColumn.id;
			}
			emitOnSocket("move-card-request", payload);
		} catch (err) {
			onFailure({ errorType: "notUpdated", boardObjectType: "boardCard" });
		}
	};

	const moveColumnRequest = (payload: MoveColumnRequestPayload) => {
		emitOnSocket("move-column-request", payload);
	};

	const updateColumnTitleRequest = (
		payload: UpdateColumnTitleRequestPayload
	) => {
		emitOnSocket("update-column-title-request", payload);
	};

	const updateBoardTitleRequest = (payload: UpdateBoardTitleRequestPayload) => {
		emitOnSocket("update-board-title-request", payload);
	};

	const updateBoardVisibilityRequest = (
		payload: UpdateBoardVisibilityRequestPayload
	) => {
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
		fetchBoardRequest,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
	};
};
