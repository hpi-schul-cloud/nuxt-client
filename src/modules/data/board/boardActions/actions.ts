import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse, ColumnResponse } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createAction, props } from "@/types/board/ActionFactory";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";

const createCardRequest = createAction(
	"create-card-request",
	props<{ columnId: string }>()
);
const createCardSuccess = createAction(
	"create-card-success",
	props<{ newCard: CardResponse; columnId: string }>()
);
const createCardFailure = createAction(
	"create-card-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const createColumnRequest = createAction("create-column-request", props());
const createColumnSuccess = createAction(
	"create-column-success",
	props<{ newColumn: ColumnResponse }>()
);
const createColumnFailure = createAction(
	"create-column-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const deleteCardRequest = createAction(
	"delete-card-request",
	props<{ cardId: string }>()
);
const deleteCardSuccess = createAction(
	"delete-card-success",
	props<{ cardId: string }>()
);
const deleteCardFailure = createAction(
	"delete-card-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const deleteColumnRequest = createAction(
	"delete-column-request",
	props<{ columnId: string }>()
);
const deleteColumnSuccess = createAction(
	"delete-column-success",
	props<{ columnId: string }>()
);
const deleteColumnFailure = createAction(
	"delete-column-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const fetchBoard = createAction("fetch-board-request", props<{ id: string }>());

const moveCardRequest = createAction("move-card-request", props<CardMove>());
const moveCardSuccess = createAction("move-card-success", props<CardMove>());
const moveCardFailure = createAction(
	"move-card-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const moveColumnRequest = createAction(
	"move-column-request",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);
const moveColumnSuccess = createAction(
	"move-column-success",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);
const moveColumnFailure = createAction(
	"move-column-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const updateColumnTitleRequest = createAction(
	"update-column-title-request",
	props<{ columnId: string; newTitle: string }>()
);
const updateColumnTitleSuccess = createAction(
	"update-column-title-success",
	props<{ columnId: string; newTitle: string }>()
);
const updateColumnTitleFailure = createAction(
	"update-column-title-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const updateBoardTitleRequest = createAction(
	"update-board-title-request",
	props<{ newTitle: string }>()
);
const updateBoardTitleSuccess = createAction(
	"update-board-title-success",
	props<{ newTitle: string }>()
);
const updateBoardTitleFailure = createAction(
	"update-board-title-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const updateBoardVisibilityRequest = createAction(
	"update-board-visibility-request",
	props<{ newVisibility: boolean }>()
);
const updateBoardVisibilitySuccess = createAction(
	"update-board-visibility-success",
	props<{ newVisibility: boolean }>()
);
const updateBoardVisibilityFailure = createAction(
	"update-board-visibility-failure",
	props<{ errorMessage: string; errorData: object }>()
);

const notifyWithTemplateAndReload = createAction(
	"notify-with-template-and-reload",
	props<{
		error: Error;
		errorType: ErrorType;
		httpStatus: HttpStatusCode;
		boardObjectType?: BoardObjectType;
	}>()
);

const notifyWithTemplate = createAction(
	"notify-with-template",
	props<{
		error: Error;
		errorType: ErrorType;
		httpStatus: HttpStatusCode;
		boardObjectType?: BoardObjectType;
	}>()
);

const reloadBoard = createAction("reload-board-request", props());

const deleteBoardRequest = createAction(
	"delete-board-request",
	props<{ id: string }>()
);
const deleteBoardSuccess = createAction(
	"delete-board-success",
	props<{ id: string }>()
);
const deleteBoardFailure = createAction(
	"delete-board-failure",
	props<{ errorMessage: string; errorData: object }>()
);

export {
	createCardRequest,
	createCardSuccess,
	createCardFailure,
	createColumnRequest,
	createColumnSuccess,
	createColumnFailure,
	deleteBoardRequest,
	deleteBoardSuccess,
	deleteBoardFailure,
	deleteCardRequest,
	deleteCardSuccess,
	deleteCardFailure,
	deleteColumnRequest,
	deleteColumnSuccess,
	deleteColumnFailure,
	fetchBoard,
	moveCardRequest,
	moveCardSuccess,
	moveCardFailure,
	moveColumnRequest,
	moveColumnSuccess,
	moveColumnFailure,
	updateBoardTitleRequest,
	updateBoardTitleSuccess,
	updateBoardTitleFailure,
	updateColumnTitleRequest,
	updateColumnTitleSuccess,
	updateColumnTitleFailure,
	updateBoardVisibilityRequest,
	updateBoardVisibilitySuccess,
	updateBoardVisibilityFailure,
	notifyWithTemplate,
	notifyWithTemplateAndReload,
	reloadBoard,
};
