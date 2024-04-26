import {
	createCardFailurePayload,
	createCardRequestPayload,
	createCardSuccessPayload,
	createColumnFailurePayload,
	createColumnSucccessPayload,
	deleteBoardFailurePayload,
	deleteBoardRequestPayload,
	deleteBoardSuccessPayload,
	deleteCardFailurePayload,
	deleteCardRequestPayload,
	deleteCardSuccessPayload,
	deleteColumnFailurePayload,
	deleteColumnRequestPayload,
	deleteColumnSuccessPayload,
	disconnectSocketRequestPayload,
	moveCardFailurePayload,
	moveColumnFailurePayload,
	moveColumnRequestPayload,
	moveColumnSuccessPayload,
	notifyErrorPayload,
	reloadBoardPayload,
	reloadBoardSuccessPayload,
	updateBoardTitleFailurePayload,
	updateBoardTitleRequestPayload,
	updateBoardTitleSuccessPayload,
	updateBoardVisibilityFailurePayload,
	updateBoardVisibilityRequestPayload,
	updateBoardVisibilitySuccessPayload,
	updateColumnTitleFailurePayload,
	updateColumnTitleRequestPayload,
	updateColumnTitleSuccessPayload,
} from "./boardActionPayload";
import { createAction, props } from "@/types/board/ActionFactory";
import { CardMove } from "@/types/board/DragAndDrop";

export const disconnectSocket = createAction(
	"disconnect-socket",
	props<disconnectSocketRequestPayload>()
);

export const createCardRequest = createAction(
	"create-card-request",
	props<createCardRequestPayload>()
);
export const createCardSuccess = createAction(
	"create-card-success",
	props<createCardSuccessPayload>()
);
export const createCardFailure = createAction(
	"create-card-failure",
	props<createCardFailurePayload>()
);

export const createColumnRequest = createAction(
	"create-column-request",
	props()
);
export const createColumnSuccess = createAction(
	"create-column-success",
	props<createColumnSucccessPayload>()
);
export const createColumnFailure = createAction(
	"create-column-failure",
	props<createColumnFailurePayload>()
);

export const deleteBoardRequest = createAction(
	"delete-board-request",
	props<deleteBoardRequestPayload>()
);
export const deleteBoardSuccess = createAction(
	"delete-board-success",
	props<deleteBoardSuccessPayload>()
);
export const deleteBoardFailure = createAction(
	"delete-board-failure",
	props<deleteBoardFailurePayload>()
);

export const deleteCardRequest = createAction(
	"delete-card-request",
	props<deleteCardRequestPayload>()
);
export const deleteCardSuccess = createAction(
	"delete-card-success",
	props<deleteCardSuccessPayload>()
);
export const deleteCardFailure = createAction(
	"delete-card-failure",
	props<deleteCardFailurePayload>()
);

export const deleteColumnRequest = createAction(
	"delete-column-request",
	props<deleteColumnRequestPayload>()
);
export const deleteColumnSuccess = createAction(
	"delete-column-success",
	props<deleteColumnSuccessPayload>()
);
export const deleteColumnFailure = createAction(
	"delete-column-failure",
	props<deleteColumnFailurePayload>()
);

export const moveCardRequest = createAction(
	"move-card-request",
	props<CardMove>()
);
export const moveCardSuccess = createAction(
	"move-card-success",
	props<CardMove>()
);
export const moveCardFailure = createAction(
	"move-card-failure",
	props<moveCardFailurePayload>()
);

export const moveColumnRequest = createAction(
	"move-column-request",
	props<moveColumnRequestPayload>()
);
export const moveColumnSuccess = createAction(
	"move-column-success",
	props<moveColumnSuccessPayload>()
);
export const moveColumnFailure = createAction(
	"move-column-failure",
	props<moveColumnFailurePayload>()
);

export const reloadBoard = createAction(
	"reload-board-request",
	props<reloadBoardPayload>()
);

export const reloadBoardSuccess = createAction(
	"reload-board-success",
	props<reloadBoardSuccessPayload>()
);

// WIP: reloadBoardFailure?

export const updateBoardTitleRequest = createAction(
	"update-board-title-request",
	props<updateBoardTitleRequestPayload>()
);

export const updateBoardTitleSuccess = createAction(
	"update-board-title-success",
	props<updateBoardTitleSuccessPayload>()
);
export const updateBoardTitleFailure = createAction(
	"update-board-title-failure",
	props<updateBoardTitleFailurePayload>()
);

export const updateBoardVisibilityRequest = createAction(
	"update-board-visibility-request",
	props<updateBoardVisibilityRequestPayload>()
);

export const updateBoardVisibilitySuccess = createAction(
	"update-board-visibility-success",
	props<updateBoardVisibilitySuccessPayload>()
);

export const updateBoardVisibilityFailure = createAction(
	"update-board-visibility-failure",
	props<updateBoardVisibilityFailurePayload>()
);

export const updateColumnTitleRequest = createAction(
	"update-column-title-request",
	props<updateColumnTitleRequestPayload>()
);
export const updateColumnTitleSuccess = createAction(
	"update-column-title-success",
	props<updateColumnTitleSuccessPayload>()
);
export const updateColumnTitleFailure = createAction(
	"update-column-title-failure",
	props<updateColumnTitleFailurePayload>()
);

export const notifyError = createAction(
	"notify-error",
	props<notifyErrorPayload>()
);
