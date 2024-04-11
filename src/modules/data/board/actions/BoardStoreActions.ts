import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { CardResponse, ColumnResponse } from "@/serverApi/v3";
import { createAction, props } from "@/types/board/ActionFactory";
import { CardMove, ColumnMove } from "@/types/board/DragAndDrop";

const getColumnIndex = createAction(
	"get-column-index",
	props<{ columnId: string }>()
);

const getColumnId = createAction(
	"get-column-id",
	props<{ columnIndex: number }>()
);

const createCardRequest = createAction(
	"create-card",
	props<{ columnId: string }>()
);

const createCardSuccess = createAction(
	"create-card-success",
	props<{ newCard: CardResponse; columnId: string }>()
);

const createColumn = createAction("create-column", props());
const createColumnSuccess = createAction(
	"create-column-success",
	props<{ newColumn: ColumnResponse }>()
);

const deleteCard = createAction("delete-card", props<{ cardId: string }>());

const deleteColumn = createAction(
	"delete-column",
	props<{ columnId: string }>()
);

const fetchBoard = createAction("fetch-board", props<{ id: string }>());

const moveCard = createAction("move-card", props<CardMove>());

const moveColumn = createAction(
	"move-column",
	props<{ columnMove: ColumnMove; byKeyboard: boolean }>()
);

const updateColumnTitle = createAction(
	"update-column-title",
	props<{ columnId: string; newTitle: string }>()
);

const updateBoardTitle = createAction(
	"update-board-title",
	props<{ newTitle: string }>()
);

const updateBoardVisibility = createAction(
	"update-board-visibility",
	props<{ newVisibility: boolean }>()
);

const notifyWithTemplateAndReload = createAction(
	"notify-with-template-and-reload",
	props<{ errorType: ErrorType; boardObjectType?: BoardObjectType }>()
);

const reloadBoard = createAction("reload-board", props());

export {
	getColumnIndex,
	getColumnId,
	createCardRequest,
	createCardSuccess,
	createColumn,
	createColumnSuccess,
	deleteCard,
	deleteColumn,
	fetchBoard,
	moveCard,
	moveColumn,
	updateColumnTitle,
	updateBoardTitle,
	updateBoardVisibility,
	notifyWithTemplateAndReload,
	reloadBoard,
};
