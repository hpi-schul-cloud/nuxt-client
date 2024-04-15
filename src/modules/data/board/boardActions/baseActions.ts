import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse, ColumnResponse } from "@/serverApi/v3";
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
	props<{ errorMessage: string }>()
);

const createColumnRequest = createAction("create-column-request", props());
const createColumnSuccess = createAction(
	"create-column-success",
	props<{ newColumn: ColumnResponse }>()
);

const deleteCardRequest = createAction(
	"delete-card-request",
	props<{ cardId: string }>()
);
const deleteCardSuccess = createAction(
	"delete-card-success",
	props<{ cardId: string }>()
);

const deleteColumnRequest = createAction(
	"delete-column-request",
	props<{ columnId: string }>()
);
const deleteColumnSuccess = createAction(
	"delete-column-success",
	props<{ columnId: string }>()
);

const fetchBoard = createAction("fetch-board-request", props<{ id: string }>());

const moveCardRequest = createAction("move-card-request", props<CardMove>());
const moveCardSuccess = createAction("move-card-success", props<CardMove>());

const moveColumnRequest = createAction(
	"move-column-request",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);

const moveColumnSuccess = createAction(
	"move-column-success",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);

const updateColumnTitleRequest = createAction(
	"update-column-title-request",
	props<{ columnId: string; newTitle: string }>()
);

const updateColumnTitleSuccess = createAction(
	"update-column-title-success",
	props<{ columnId: string; newTitle: string }>()
);

const updateBoardTitleRequest = createAction(
	"update-board-title-request",
	props<{ newTitle: string }>()
);

const updateBoardTitleSuccess = createAction(
	"update-board-title-success",
	props<{ newTitle: string }>()
);

const updateBoardVisibilityRequest = createAction(
	"update-board-visibility-request",
	props<{ newVisibility: boolean }>()
);

const updateBoardVisibilitySuccess = createAction(
	"update-board-visibility-success",
	props<{ newVisibility: boolean }>()
);

const notifyWithTemplateAndReload = createAction(
	"notify-with-template-and-reload-request",
	props<{ errorType: ErrorType; boardObjectType?: BoardObjectType }>()
);

const reloadBoard = createAction("reload-board-request", props());

export {
	createCardRequest,
	createCardSuccess,
	createCardFailure,
	deleteCardRequest,
	deleteCardSuccess,
	createColumnRequest,
	createColumnSuccess,
	deleteColumnRequest,
	deleteColumnSuccess,
	fetchBoard,
	moveCardRequest,
	moveCardSuccess,
	moveColumnRequest,
	moveColumnSuccess,
	updateColumnTitleRequest,
	updateColumnTitleSuccess,
	updateBoardTitleRequest,
	updateBoardTitleSuccess,
	updateBoardVisibilityRequest,
	updateBoardVisibilitySuccess,
	notifyWithTemplateAndReload,
	reloadBoard,
};
