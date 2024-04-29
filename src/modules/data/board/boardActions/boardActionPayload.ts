import { BoardResponse, CardResponse, ColumnResponse } from "@/serverApi/v3";
import { ColumnMove } from "@/types/board/DragAndDrop";
import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";

export type CreateCardRequestPayload = {
	columnId: string;
};

export type CreateCardSuccessPayload = {
	newCard: CardResponse;
	columnId: string;
};

export type CreateColumnRequestPayload = {
	boardId: string;
};

export type FetchBoardRequestPayload = {
	boardId: string;
};

export type FetchBoardSuccessPayload = BoardResponse;

export type CreateColumnSucccessPayload = {
	newColumn: ColumnResponse;
};

export type DeleteCardRequestPayload = {
	cardId: string;
};

export type DeleteCardSuccessPayload = {
	cardId: string;
};

export type DeleteColumnRequestPayload = {
	columnId: string;
};

export type DeleteColumnSuccessPayload = {
	columnId: string;
};

export type MoveCardRequestPayload = {
	cardId: string;
	oldIndex: number;
	newIndex: number;
	fromColumnId: string;
	toColumnId?: string;
	columnDelta?: number;
	forceNextTick?: boolean;
};
export type MoveCardSuccessPayload = {
	cardId: string;
	oldIndex: number;
	newIndex: number;
	fromColumnId: string;
	toColumnId?: string;
	columnDelta?: number;
	forceNextTick?: boolean;
};

export type MoveColumnRequestPayload = {
	columnMove: ColumnMove;
	targetBoardId?: string;
	byKeyboard: boolean;
};

export type MoveColumnSuccessPayload = {
	columnMove: ColumnMove;
	byKeyboard: boolean;
};

export type UpdateColumnTitleRequestPayload = {
	columnId: string;
	newTitle: string;
};

export type UpdateColumnTitleSuccessPayload = {
	columnId: string;
	newTitle: string;
};

export type UpdateBoardTitleSuccessPayload = {
	newTitle: string;
};

export type DisconnectSocketRequestPayload = Record<string, never>;
export type CreateCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type CreateColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type DeleteBoardRequestPayload = {
	id: string;
};
export type DeleteBoardSuccessPayload = {
	id: string;
};
export type DeleteBoardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type DeleteCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type DeleteColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type MoveCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type MoveColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type ReloadBoardPayload = {
	id: string;
};
export type ReloadBoardSuccessPayload = {
	id: string;
};
export type UpdateBoardTitleRequestPayload = {
	newTitle: string;
};
export type UpdateBoardTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type UpdateBoardVisibilityRequestPayload = {
	newVisibility: boolean;
};
export type UpdateBoardVisibilitySuccessPayload = {
	newVisibility: boolean;
};
export type UpdateBoardVisibilityFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type UpdateColumnTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};
export type NotifyErrorPayload = {
	errorType: ErrorType;
	boardObjectType?: BoardObjectType;
};
