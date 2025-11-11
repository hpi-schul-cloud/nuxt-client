import {
	CreateCardFailurePayload,
	CreateCardRequestPayload,
	CreateCardSuccessPayload,
	CreateColumnFailurePayload,
	CreateColumnSuccessPayload,
	DeleteBoardFailurePayload,
	DeleteBoardRequestPayload,
	DeleteBoardSuccessPayload,
	DeleteColumnFailurePayload,
	DeleteColumnRequestPayload,
	DeleteColumnSuccessPayload,
	DisconnectSocketRequestPayload,
	FetchBoardFailurePayload,
	FetchBoardRequestPayload,
	FetchBoardSuccessPayload,
	MoveCardFailurePayload,
	MoveCardRequestPayload,
	MoveCardSuccessPayload,
	MoveColumnFailurePayload,
	MoveColumnRequestPayload,
	MoveColumnSuccessPayload,
	ReloadBoardPayload,
	ReloadBoardSuccessPayload,
	UpdateBoardLayoutFailurePayload,
	UpdateBoardLayoutRequestPayload,
	UpdateBoardLayoutSuccessPayload,
	UpdateBoardTitleFailurePayload,
	UpdateBoardTitleRequestPayload,
	UpdateBoardTitleSuccessPayload,
	UpdateBoardVisibilityFailurePayload,
	UpdateBoardVisibilityRequestPayload,
	UpdateBoardVisibilitySuccessPayload,
	UpdateColumnTitleFailurePayload,
	UpdateColumnTitleRequestPayload,
	UpdateColumnTitleSuccessPayload,
	UpdateReaderCanEditFailurePayload,
	UpdateReaderCanEditRequestPayload,
	UpdateReaderCanEditSuccessPayload,
} from "./boardActionPayload.types";
import { createAction, props } from "@/types/board/ActionFactory";

export const disconnectSocket = createAction("disconnect-socket", props<DisconnectSocketRequestPayload>());

export const createCardRequest = createAction("create-card-request", props<CreateCardRequestPayload>());
export const createCardSuccess = createAction("create-card-success", props<CreateCardSuccessPayload>());
export const createCardFailure = createAction("create-card-failure", props<CreateCardFailurePayload>());

export const createColumnRequest = createAction("create-column-request", props());
export const createColumnSuccess = createAction("create-column-success", props<CreateColumnSuccessPayload>());
export const createColumnFailure = createAction("create-column-failure", props<CreateColumnFailurePayload>());

export const deleteBoardRequest = createAction("delete-board-request", props<DeleteBoardRequestPayload>());
export const deleteBoardSuccess = createAction("delete-board-success", props<DeleteBoardSuccessPayload>());
export const deleteBoardFailure = createAction("delete-board-failure", props<DeleteBoardFailurePayload>());

export const deleteColumnRequest = createAction("delete-column-request", props<DeleteColumnRequestPayload>());
export const deleteColumnSuccess = createAction("delete-column-success", props<DeleteColumnSuccessPayload>());
export const deleteColumnFailure = createAction("delete-column-failure", props<DeleteColumnFailurePayload>());

export const moveCardRequest = createAction("move-card-request", props<MoveCardRequestPayload>());
export const moveCardSuccess = createAction("move-card-success", props<MoveCardSuccessPayload>());
export const moveCardFailure = createAction("move-card-failure", props<MoveCardFailurePayload>());

export const moveColumnRequest = createAction("move-column-request", props<MoveColumnRequestPayload>());
export const moveColumnSuccess = createAction("move-column-success", props<MoveColumnSuccessPayload>());
export const moveColumnFailure = createAction("move-column-failure", props<MoveColumnFailurePayload>());

export const fetchBoardRequest = createAction("fetch-board-request", props<FetchBoardRequestPayload>());
export const fetchBoardSuccess = createAction("fetch-board-success", props<FetchBoardSuccessPayload>());
export const fetchBoardFailure = createAction("fetch-board-failure", props<FetchBoardFailurePayload>());

export const reloadBoard = createAction("reload-board-request", props<ReloadBoardPayload>());

export const reloadBoardSuccess = createAction("reload-board-success", props<ReloadBoardSuccessPayload>());

// WIP: reloadBoardFailure?

export const updateBoardTitleRequest = createAction(
	"update-board-title-request",
	props<UpdateBoardTitleRequestPayload>()
);
export const updateBoardTitleSuccess = createAction(
	"update-board-title-success",
	props<UpdateBoardTitleSuccessPayload>()
);
export const updateBoardTitleFailure = createAction(
	"update-board-title-failure",
	props<UpdateBoardTitleFailurePayload>()
);

export const updateBoardVisibilityRequest = createAction(
	"update-board-visibility-request",
	props<UpdateBoardVisibilityRequestPayload>()
);

export const updateBoardVisibilitySuccess = createAction(
	"update-board-visibility-success",
	props<UpdateBoardVisibilitySuccessPayload>()
);

export const updateBoardVisibilityFailure = createAction(
	"update-board-visibility-failure",
	props<UpdateBoardVisibilityFailurePayload>()
);

export const updateColumnTitleRequest = createAction(
	"update-column-title-request",
	props<UpdateColumnTitleRequestPayload>()
);
export const updateColumnTitleSuccess = createAction(
	"update-column-title-success",
	props<UpdateColumnTitleSuccessPayload>()
);
export const updateColumnTitleFailure = createAction(
	"update-column-title-failure",
	props<UpdateColumnTitleFailurePayload>()
);

export const updateBoardLayoutRequest = createAction(
	"update-board-layout-request",
	props<UpdateBoardLayoutRequestPayload>()
);

export const updateBoardLayoutSuccess = createAction(
	"update-board-layout-success",
	props<UpdateBoardLayoutSuccessPayload>()
);

export const updateBoardLayoutFailure = createAction(
	"update-board-layout-failure",
	props<UpdateBoardLayoutFailurePayload>()
);

export const updateReaderCanEditRequest = createAction(
	"update-readers-can-edit-request",
	props<UpdateReaderCanEditRequestPayload>()
);

export const updateReaderCanEditSuccess = createAction(
	"update-readers-can-edit-success",
	props<UpdateReaderCanEditSuccessPayload>()
);

export const updateReaderCanEditFailure = createAction(
	"update-readers-can-edit-failure",
	props<UpdateReaderCanEditFailurePayload>()
);
