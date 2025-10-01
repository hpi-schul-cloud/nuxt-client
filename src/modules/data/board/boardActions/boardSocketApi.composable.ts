import { useBoardAriaNotification } from "../ariaNotification/ariaLiveNotificationHandler";
import { useBoardStore } from "../Board.store";
import * as CardActions from "../cardActions/cardActions";
import { useForceRender } from "../fixSamePositionDnD.composable";
import { useSocketConnection } from "../socket/socket";
import {
	CreateCardRequestPayload,
	CreateColumnRequestPayload,
	DeleteBoardRequestPayload,
	DeleteColumnRequestPayload,
	FetchBoardRequestPayload,
	MoveCardRequestPayload,
	MoveCardSuccessPayload,
	MoveColumnRequestPayload,
	UpdateBoardLayoutRequestPayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateColumnTitleRequestPayload,
} from "./boardActionPayload.types";
import * as BoardActions from "./boardActions";
import { CreateCardBodyParamsRequiredEmptyElementsEnum } from "@/serverApi/v3";
import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { handle, on, PermittedStoreActions } from "@/types/board/ActionFactory";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { useI18n } from "vue-i18n";

export const useBoardSocketApi = () => {
	const boardStore = useBoardStore();
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
		notifyUpdateBoardLayoutSuccess,
	} = useBoardAriaNotification();
	const { t } = useI18n();

	const dispatch = (action: PermittedStoreActions<typeof BoardActions & typeof CardActions>) => {
		const successActions = [
			on(BoardActions.createCardSuccess, boardStore.createCardSuccess),
			on(BoardActions.createColumnSuccess, boardStore.createColumnSuccess),
			on(CardActions.deleteCardSuccess, boardStore.deleteCardSuccess),
			on(BoardActions.deleteColumnSuccess, boardStore.deleteColumnSuccess),
			on(BoardActions.deleteBoardSuccess, boardStore.deleteBoardSuccess),
			on(BoardActions.moveCardSuccess, boardStore.moveCardSuccess),
			on(BoardActions.moveColumnSuccess, boardStore.moveColumnSuccess),
			on(BoardActions.fetchBoardSuccess, boardStore.fetchBoardSuccess),
			on(BoardActions.updateColumnTitleSuccess, boardStore.updateColumnTitleSuccess),
			on(BoardActions.updateBoardTitleSuccess, boardStore.updateBoardTitleSuccess),
			on(BoardActions.updateBoardVisibilitySuccess, boardStore.updateBoardVisibilitySuccess),
			on(BoardActions.updateBoardLayoutSuccess, boardStore.updateBoardLayoutSuccess),
		];

		const failureActions = [
			on(BoardActions.fetchBoardFailure, fetchBoardFailure),
			on(BoardActions.createCardFailure, reloadBoard),
			on(BoardActions.createColumnFailure, reloadBoard),
			on(CardActions.deleteCardFailure, reloadBoard),
			on(BoardActions.deleteColumnFailure, reloadBoard),
			on(BoardActions.moveCardFailure, reloadBoard),
			on(BoardActions.moveColumnFailure, reloadBoard),
			on(BoardActions.updateColumnTitleFailure, reloadBoard),
			on(BoardActions.updateBoardTitleFailure, reloadBoard),
			on(BoardActions.updateBoardVisibilityFailure, reloadBoard),
			on(BoardActions.updateBoardLayoutFailure, reloadBoard),
		];

		const ariaLiveNotifications = [
			on(BoardActions.createCardSuccess, notifyCreateCardSuccess),
			on(CardActions.deleteCardSuccess, notifyDeleteCardSuccess),
			on(BoardActions.createColumnSuccess, notifyCreateColumnSuccess),
			on(BoardActions.deleteColumnSuccess, notifyDeleteColumnSuccess),
			on(BoardActions.moveCardSuccess, notifyMoveCardSuccess),
			on(BoardActions.moveColumnSuccess, notifyMoveColumnSuccess),
			on(BoardActions.updateBoardTitleSuccess, notifyUpdateBoardTitleSuccess),
			on(BoardActions.updateBoardVisibilitySuccess, notifyUpdateBoardVisibilitySuccess),
			on(BoardActions.updateColumnTitleSuccess, notifyUpdateColumnTitleSuccess),
			on(BoardActions.updateBoardLayoutSuccess, notifyUpdateBoardLayoutSuccess),
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

	const { emitOnSocket, emitWithAck, disconnectSocket } = useSocketConnection(dispatch);

	const createCardRequest = (payload: CreateCardRequestPayload) => {
		emitOnSocket("create-card-request", {
			...payload,
			requiredEmptyElements: [CreateCardBodyParamsRequiredEmptyElementsEnum.RichText],
		});
	};

	const fetchBoardRequest = (payload: FetchBoardRequestPayload, loading = true) => {
		boardStore.setLoading(loading);
		emitOnSocket("fetch-board-request", payload);
	};

	const disconnectSocketRequest = () => {
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
		} catch {
			resetBoard();
		}
	};

	const moveColumnRequest = (payload: MoveColumnRequestPayload) => {
		const { addedIndex, removedIndex } = payload.columnMove;
		if (addedIndex === removedIndex) return;
		emitOnSocket("move-column-request", payload);
	};

	const updateColumnTitleRequest = (payload: UpdateColumnTitleRequestPayload) => {
		emitOnSocket("update-column-title-request", payload);
	};

	const updateBoardTitleRequest = (payload: UpdateBoardTitleRequestPayload) => {
		emitOnSocket("update-board-title-request", payload);
	};

	const updateBoardVisibilityRequest = (payload: UpdateBoardVisibilityRequestPayload) => {
		emitOnSocket("update-board-visibility-request", payload);
	};

	const updateBoardLayoutRequest = (payload: UpdateBoardLayoutRequestPayload) => {
		emitOnSocket("update-board-layout-request", payload);
	};

	const setRenderKeyAfterMoveCard = (payload: MoveCardSuccessPayload) => {
		const { generateRenderKey } = useForceRender(payload.fromColumnId);
		generateRenderKey();
	};

	const fetchBoardFailure = () => {
		applicationErrorModule.setError(createApplicationError(HttpStatusCode.NotFound, t("components.board.error.404")));
	};

	const reloadBoard = () => {
		const boardId = boardStore.board?.id;
		if (boardId) {
			resetBoard();
			fetchBoardRequest({ boardId }, false);
		}
	};

	const resetBoard = () => {
		if (boardStore.board) {
			boardStore.fetchBoardSuccess({
				...boardStore.board,
				id: "temp",
				columns: [],
			});
		}
	};

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
		updateBoardLayoutRequest,
	};
};
