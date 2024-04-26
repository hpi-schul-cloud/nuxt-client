import { CardResponse, ColumnResponse } from "@/serverApi/v3";
import { ColumnMove } from "@/types/board/DragAndDrop";
import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";

export type createCardRequestPayload = {
	columnId: string;
};

export type createCardSuccessPayload = {
	newCard: CardResponse;
	columnId: string;
};

export type createColumnRequestPayload = {
	boardId: string;
};

export type fetchBoardPayload = {
	id: string;
};

export type createColumnSucccessPayload = {
	newColumn: ColumnResponse;
};

export type deleteCardRequestPayload = {
	cardId: string;
};

export type deleteCardSuccessPayload = {
	cardId: string;
};

export type deleteColumnRequestPayload = {
	columnId: string;
};

export type deleteColumnSuccessPayload = {
	columnId: string;
};

export type moveCardRequestPayload = {
	cardId: string;
	oldIndex: number;
	newIndex: number;
	fromColumnId: string;
	toColumnId?: string;
	columnDelta?: number;
	forceNextTick?: boolean;
};
export type moveCardSuccessPayload = {
	cardId: string;
	oldIndex: number;
	newIndex: number;
	fromColumnId: string;
	toColumnId?: string;
	columnDelta?: number;
	forceNextTick?: boolean;
};

export type moveColumnRequestPayload = {
	columnMove: ColumnMove;
	byKeyboard: boolean;
};

export type moveColumnSuccessPayload = {
	columnMove: ColumnMove;
	byKeyboard: boolean;
};

export type updateColumnTitleRequestPayload = {
	columnId: string;
	newTitle: string;
};

export type updateColumnTitleSuccessPayload = {
	columnId: string;
	newTitle: string;
};

export type updateBoardTitleSuccessPayload = {
	newTitle: string;
};

export type disconnectSocketRequestPayload = Record<string, never>;
export type createCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type createColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type deleteBoardRequestPayload = {
	id: string;
};
export type deleteBoardSuccessPayload = {
	id: string;
};
export type deleteBoardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type deleteCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type deleteColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type moveCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type moveColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type reloadBoardPayload = {
	id: string;
};
export type reloadBoardSuccessPayload = {
	id: string;
};
export type updateBoardTitleRequestPayload = {
	newTitle: string;
};
export type updateBoardTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type updateBoardVisibilityRequestPayload = {
	newVisibility: boolean;
};
export type updateBoardVisibilitySuccessPayload = {
	newVisibility: boolean;
};
export type updateBoardVisibilityFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type updateColumnTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type notifyErrorPayload = {
	errorType: ErrorType;
	boardObjectType?: BoardObjectType;
};
