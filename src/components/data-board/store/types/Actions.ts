import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { createAction, props } from "./ActionFactory";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";

export const getColumnIndex = createAction(
	"get-column-index",
	props<{ columnId: string }>()
);

export const getColumnId = createAction(
	"get-column-id",
	props<{ columnIndex: number }>()
);

export const createCard = createAction(
	"create-card",
	props<{ columnId: string }>()
);

export const createColumn = createAction(
	"create-column",
	props<{ boardId: string }>()
);

export const deleteCard = createAction(
	"delete-card",
	props<{ cardId: string }>()
);

export const deleteColumn = createAction(
	"delete-column",
	props<{ columnId: string }>()
);

export const fetchBoard = createAction("fetch-board", props<{ id: string }>());

export const moveCard = createAction("move-card", props<CardMove>());

export const moveColumn = createAction(
	"move-column",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);

export const updateColumnTitle = createAction(
	"update-column-title",
	props<{ columnId: string; newTitle: string }>()
);

export const updateBoardTitle = createAction(
	"update-board-title",
	props<{ newTitle: string }>()
);

export const updateBoardVisibility = createAction(
	"update-board-visibility",
	props<{ newVisibility: boolean }>()
);

export const notifyWithTemplateAndReload = createAction(
	"notify-with-template-and-reload",
	props<{ errorType: ErrorType; boardObjectType?: BoardObjectType }>()
);

export const reloadBoard = createAction("reload-board", props<object>());
