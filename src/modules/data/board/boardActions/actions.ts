import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse, ColumnResponse } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createAction, props } from "@/types/board/ActionFactory";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";

export const fetchBoard = createAction(
	"fetch-board-request",
	props<{ id: string }>()
);

export const createCardRequest = createAction(
	"create-card-request",
	props<{ columnId: string }>()
);
export const createCardSuccess = createAction(
	"create-card-success",
	props<{ newCard: CardResponse; columnId: string }>()
);
export const createCardFailure = createAction(
	"create-card-failure",
	props<{ error: Error }>()
);

export const createColumnRequest = createAction(
	"create-column-request",
	props()
);
export const createColumnSuccess = createAction(
	"create-column-success",
	props<{ newColumn: ColumnResponse }>()
);
export const createColumnFailure = createAction(
	"create-column-failure",
	props<{ error: Error }>()
);

export const deleteBoardRequest = createAction(
	"delete-board-request",
	props<{ id: string }>()
);
export const deleteBoardSuccess = createAction(
	"delete-board-success",
	props<{ id: string }>()
);
export const deleteBoardFailure = createAction(
	"delete-board-failure",
	props<{ error: Error }>()
);

export const deleteCardRequest = createAction(
	"delete-card-request",
	props<{ cardId: string }>()
);
export const deleteCardFailure = createAction(
	"delete-card-failure",
	props<{ error: Error }>()
);
export const deleteCardSuccess = createAction(
	"delete-card-success",
	props<{ cardId: string }>()
);

export const deleteColumnRequest = createAction(
	"delete-column-request",
	props<{ columnId: string }>()
);
export const deleteColumnSuccess = createAction(
	"delete-column-success",
	props<{ columnId: string }>()
);
export const deleteColumnFailure = createAction(
	"delete-column-failure",
	props<{ error: Error }>()
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
	props<{ error: Error }>()
);

export const moveColumnRequest = createAction(
	"move-column-request",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);
export const moveColumnSuccess = createAction(
	"move-column-success",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);
export const moveColumnFailure = createAction(
	"move-column-failure",
	props<{ error: Error }>()
);

export const reloadBoard = createAction(
	"reload-board-request",
	props<{ id: string }>()
);
export const reloadBoardSuccess = createAction(
	"reload-board-success",
	props<{ id: string }>()
);
// WIP: reloadBoardFailure?

export const updateBoardTitleRequest = createAction(
	"update-board-title-request",
	props<{ newTitle: string }>()
);
export const updateBoardTitleSuccess = createAction(
	"update-board-title-success",
	props<{ newTitle: string }>()
);
export const updateBoardTitleFailure = createAction(
	"update-board-title-failure",
	props<{ error: Error }>()
);

export const updateBoardVisibilityRequest = createAction(
	"update-board-visibility-request",
	props<{ newVisibility: boolean }>()
);
export const updateBoardVisibilitySuccess = createAction(
	"update-board-visibility-success",
	props<{ newVisibility: boolean }>()
);
export const updateBoardVisibilityFailure = createAction(
	"update-board-visibility-failure",
	props<{ error: Error }>()
);

export const updateColumnTitleRequest = createAction(
	"update-column-title-request",
	props<{ columnId: string; newTitle: string }>()
);
export const updateColumnTitleSuccess = createAction(
	"update-column-title-success",
	props<{ columnId: string; newTitle: string }>()
);
export const updateColumnTitleFailure = createAction(
	"update-column-title-failure",
	props<{ error: Error }>()
);

export const notifyWithTemplateAndReload = createAction(
	"notify-with-template-and-reload",
	props<{
		error: Error;
		errorType: ErrorType;
		httpStatus: HttpStatusCode;
		boardObjectType?: BoardObjectType;
	}>()
);

export const notifyError = createAction(
	"notify-error",
	props<{
		errorType: ErrorType;
		boardObjectType?: BoardObjectType;
	}>()
);
