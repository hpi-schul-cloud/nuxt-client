import * as BoardActions from "./boardActions";
import * as CardActions from "../cardActions/cardActions";
import { useSocketConnection, useForceRender } from "@data-board";
import { useBoardStore } from "../Board.store";
import {
	CreateCardRequestPayload,
	CreateColumnRequestPayload,
	DeleteBoardRequestPayload,
	DeleteColumnRequestPayload,
	DisconnectSocketRequestPayload,
	FetchBoardRequestPayload,
	MoveCardRequestPayload,
	MoveCardSuccessPayload,
	MoveColumnRequestPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateColumnTitleRequestPayload,
} from "./boardActionPayload";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useBoardAriaNotification } from "../ariaNotification/ariaLiveNotificationHandler";
import { CreateCardBodyParamsRequiredEmptyElementsEnum } from "@/serverApi/v3";
import { applicationErrorModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useI18n } from "vue-i18n";

export const useBoardSocketApi = () => {
	const boardStore = useBoardStore();
	const { notifySocketError } = useErrorHandler();
	const {
		notifyCreateCardSuccess,
		notifyCreateColumnSuccess,
		notifyDeleteCardSuccess,
		notifyDeleteColumnSuccess,
		notifyMoveCardSuccess,
		notifyMoveColumnSuccess,
		notifyUpdateBoardTitleSuccess,
		notifyUpdateBoardVisibilitySuccess,
		notifyUpdateColumnTitleSuccess,
	} = useBoardAriaNotification();
	const { t } = useI18n();

	const dispatch = async (
		action: PermittedStoreActions<typeof BoardActions & typeof CardActions>
	) => {
		const successActions = [
			on(BoardActions.createCardSuccess, boardStore.createCardSuccess),
			on(BoardActions.createColumnSuccess, boardStore.createColumnSuccess),
			on(CardActions.deleteCardSuccess, boardStore.deleteCardSuccess),
			on(BoardActions.deleteColumnSuccess, boardStore.deleteColumnSuccess),
			on(BoardActions.deleteBoardSuccess, boardStore.deleteBoardSuccess),
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
		];

		const failureActions = [
			on(BoardActions.createCardFailure, createCardFailure),
			on(BoardActions.createColumnFailure, createColumnFailure),
			on(CardActions.deleteCardFailure, deleteCardFailure),
			on(BoardActions.deleteColumnFailure, deleteColumnFailure),
			on(BoardActions.fetchBoardFailure, fetchBoardFailure),
			on(BoardActions.moveCardFailure, moveCardFailure),
			on(BoardActions.moveColumnFailure, moveColumnFailure),
			on(BoardActions.updateColumnTitleFailure, updateColumnTitleFailure),
			on(BoardActions.updateBoardTitleFailure, updateBoardTitleFailure),
			on(
				BoardActions.updateBoardVisibilityFailure,
				updateBoardVisibilityFailure
			),
		];

		const ariaLiveNotifications = [
			on(BoardActions.createCardSuccess, notifyCreateCardSuccess),
			on(CardActions.deleteCardSuccess, notifyDeleteCardSuccess),
			on(BoardActions.createColumnSuccess, notifyCreateColumnSuccess),
			on(BoardActions.deleteColumnSuccess, notifyDeleteColumnSuccess),
			on(BoardActions.moveCardSuccess, notifyMoveCardSuccess),
			on(BoardActions.moveColumnSuccess, notifyMoveColumnSuccess),
			on(BoardActions.updateBoardTitleSuccess, notifyUpdateBoardTitleSuccess),
			on(
				BoardActions.updateBoardVisibilitySuccess,
				notifyUpdateBoardVisibilitySuccess
			),
			on(BoardActions.updateColumnTitleSuccess, notifyUpdateColumnTitleSuccess),
		];

		handle(
			action,
			...successActions,
			...failureActions,
			...ariaLiveNotifications,
			on(BoardActions.disconnectSocket, disconnectSocketRequest),
			on(BoardActions.moveCardSuccess, setRenderKeyAfterMoveCard)
		);
	};

	const { emitOnSocket, emitWithAck, disconnectSocket } =
		useSocketConnection(dispatch);

	const createCardRequest = async (payload: CreateCardRequestPayload) => {
		emitOnSocket("create-card-request", {
			...payload,
			requiredEmptyElements: [
				CreateCardBodyParamsRequiredEmptyElementsEnum.RichText,
			],
		});
	};

	const fetchBoardRequest = async (
		payload: FetchBoardRequestPayload
	): Promise<void> => {
		boardStore.setLoading(true);
		emitOnSocket("fetch-board-request", payload);
	};

	const disconnectSocketRequest = (payload: DisconnectSocketRequestPayload) => {
		console.log("disconnectSocketRequest", payload);
		disconnectSocket();
	};

	const createColumnRequest = (payload: CreateColumnRequestPayload) => {
		emitOnSocket("create-column-request", payload);
	};

	const deleteBoardRequest = (payload: DeleteBoardRequestPayload) => {
		emitOnSocket("delete-board-request", payload);
	};

	const deleteColumnRequest = (payload: DeleteColumnRequestPayload) => {
		emitOnSocket("delete-column-request", payload);
	};

	const moveCardRequest = async (payload: MoveCardRequestPayload) => {
		const { newIndex, oldIndex, fromColumnId, toColumnId } = payload;
		if (newIndex === oldIndex && fromColumnId === toColumnId) return;

		try {
			if (toColumnId === undefined && boardStore.board) {
				const response = await emitWithAck("create-column-request", {
					boardId: boardStore.board.id,
				});
				payload.toColumnId = response.newColumn.id;
				payload.toColumnIndex = boardStore.getColumnIndex(payload.toColumnId);
			}
			emitOnSocket("move-card-request", payload);
		} catch (err) {
			moveCardFailure();
		}
	};

	const moveColumnRequest = (payload: MoveColumnRequestPayload) => {
		const { addedIndex, removedIndex } = payload.columnMove;
		if (addedIndex === removedIndex) return;
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

	const setRenderKeyAfterMoveCard = (payload: MoveCardSuccessPayload) => {
		const { generateRenderKey } = useForceRender(payload.fromColumnId);
		generateRenderKey();
	};

	const createCardFailure = () => notifySocketError("notCreated", "boardCard");
	const createColumnFailure = () =>
		notifySocketError("notCreated", "boardColumn");
	const deleteCardFailure = () => notifySocketError("notDeleted", "boardCard");
	const deleteColumnFailure = () =>
		notifySocketError("notDeleted", "boardColumn");
	const fetchBoardFailure = () => {
		applicationErrorModule.setError(
			createApplicationError(
				HttpStatusCode.NotFound,
				t("components.board.error.404")
			)
		);
	};
	const moveCardFailure = () => notifySocketError("notUpdated", "boardCard");
	const moveColumnFailure = () =>
		notifySocketError("notUpdated", "boardColumn");
	const updateColumnTitleFailure = () =>
		notifySocketError("notUpdated", "boardColumn");
	const updateBoardTitleFailure = () =>
		notifySocketError("notUpdated", "board");
	const updateBoardVisibilityFailure = () =>
		notifySocketError("notUpdated", "board");

	return {
		dispatch,
		createCardRequest,
		createColumnRequest,
		disconnectSocketRequest,
		deleteBoardRequest,
		deleteColumnRequest,
		fetchBoardRequest,
		moveCardRequest,
		moveColumnRequest,
		updateColumnTitleRequest,
		updateBoardTitleRequest,
		updateBoardVisibilityRequest,
	};
};
