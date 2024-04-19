import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse, ColumnResponse } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createAction, props } from "@/types/board/ActionFactory";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";

const fetchBoard = createAction("fetch-board-request", props<{ id: string }>());

// request actions
const createCardRequest = createAction(
	"create-card-request",
	props<{ columnId: string }>()
);
const createColumnRequest = createAction("create-column-request", props());
const deleteBoardRequest = createAction(
	"delete-board-request",
	props<{ id: string }>()
);
const deleteCardRequest = createAction(
	"delete-card-request",
	props<{ cardId: string }>()
);
const deleteColumnRequest = createAction(
	"delete-column-request",
	props<{ columnId: string }>()
);
const moveCardRequest = createAction("move-card-request", props<CardMove>());
const moveColumnRequest = createAction(
	"move-column-request",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);
const updateColumnTitleRequest = createAction(
	"update-column-title-request",
	props<{ columnId: string; newTitle: string }>()
);
const updateBoardTitleRequest = createAction(
	"update-board-title-request",
	props<{ newTitle: string }>()
);
const updateBoardVisibilityRequest = createAction(
	"update-board-visibility-request",
	props<{ newVisibility: boolean }>()
);
const reloadBoard = createAction(
	"reload-board-request",
	props<{ id: string }>()
);

// success actions

const createCardSuccess = createAction(
	"create-card-success",
	props<{ newCard: CardResponse; columnId: string }>()
);
const createColumnSuccess = createAction(
	"create-column-success",
	props<{ newColumn: ColumnResponse }>()
);

const deleteCardSuccess = createAction(
	"delete-card-success",
	props<{ cardId: string }>()
);
const deleteColumnSuccess = createAction(
	"delete-column-success",
	props<{ columnId: string }>()
);
const moveCardSuccess = createAction("move-card-success", props<CardMove>());
const moveColumnSuccess = createAction(
	"move-column-success",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);
const updateBoardTitleSuccess = createAction(
	"update-board-title-success",
	props<{ newTitle: string }>()
);
const updateColumnTitleSuccess = createAction(
	"update-column-title-success",
	props<{ columnId: string; newTitle: string }>()
);
const updateBoardVisibilitySuccess = createAction(
	"update-board-visibility-success",
	props<{ newVisibility: boolean }>()
);
const deleteBoardSuccess = createAction(
	"delete-board-success",
	props<{ id: string }>()
);
const reloadBoardSuccess = createAction(
	"reload-board-success",
	props<{ id: string }>()
);

// failure actions
const createCardFailure = createAction(
	"create-card-failure",
	props<{ error: Error }>()
);

const createColumnFailure = createAction(
	"create-column-failure",
	props<{ error: Error }>()
);

const deleteBoardFailure = createAction(
	"delete-board-failure",
	props<{ error: Error }>()
);

const deleteCardFailure = createAction(
	"delete-card-failure",
	props<{ error: Error }>()
);

const deleteColumnFailure = createAction(
	"delete-column-failure",
	props<{ error: Error }>()
);

const moveCardFailure = createAction(
	"move-card-failure",
	props<{ error: Error }>()
);

const moveColumnFailure = createAction(
	"move-column-failure",
	props<{ error: Error }>()
);

const updateBoardTitleFailure = createAction(
	"update-board-title-failure",
	props<{ error: Error }>()
);

const updateBoardVisibilityFailure = createAction(
	"update-board-visibility-failure",
	props<{ error: Error }>()
);

const updateColumnTitleFailure = createAction(
	"update-column-title-failure",
	props<{ error: Error }>()
);

// notify actions

const notifyWithTemplateAndReload = createAction(
	"notify-with-template-and-reload",
	props<{
		error: Error;
		errorType: ErrorType;
		httpStatus: HttpStatusCode;
		boardObjectType?: BoardObjectType;
	}>()
);

const notifyError = createAction(
	"notify-error",
	props<{
		errorType: ErrorType;
		boardObjectType?: BoardObjectType;
	}>()
);

export {
	fetchBoard,
	reloadBoard,
	// request actions
	createCardRequest,
	createColumnRequest,
	deleteBoardRequest,
	deleteCardRequest,
	deleteColumnRequest,
	moveCardRequest,
	moveColumnRequest,
	updateBoardTitleRequest,
	updateColumnTitleRequest,
	updateBoardVisibilityRequest,
	// success actions
	createCardSuccess,
	createColumnSuccess,
	deleteBoardSuccess,
	deleteCardSuccess,
	deleteColumnSuccess,
	moveCardSuccess,
	moveColumnSuccess,
	reloadBoardSuccess,
	updateBoardTitleSuccess,
	updateColumnTitleSuccess,
	updateBoardVisibilitySuccess,
	// failure actions
	createCardFailure,
	createColumnFailure,
	deleteBoardFailure,
	deleteCardFailure,
	deleteColumnFailure,
	moveCardFailure,
	moveColumnFailure,
	updateBoardTitleFailure,
	updateColumnTitleFailure,
	updateBoardVisibilityFailure,

	// notify actions
	notifyWithTemplateAndReload,
	notifyError,
};
