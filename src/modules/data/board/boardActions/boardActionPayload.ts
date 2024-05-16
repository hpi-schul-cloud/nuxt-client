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
export type CreateCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type CreateColumnRequestPayload = {
	boardId: string;
};
export type CreateColumnSucccessPayload = {
	newColumn: ColumnResponse;
};
export type CreateColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type FetchBoardRequestPayload = {
	boardId: string;
};
export type FetchBoardSuccessPayload = BoardResponse;

export type DeleteColumnRequestPayload = {
	columnId: string;
};
export type DeleteColumnSuccessPayload = {
	columnId: string;
};
export type DeleteColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
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
export type MoveCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
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
export type MoveColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type UpdateColumnTitleRequestPayload = {
	columnId: string;
	newTitle: string;
};
export type UpdateColumnTitleSuccessPayload = {
	columnId: string;
	newTitle: string;
};
export type UpdateColumnTitleFailurePayload = {
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

export type ReloadBoardPayload = {
	id: string;
};
export type ReloadBoardSuccessPayload = {
	id: string;
};

export type UpdateBoardTitleRequestPayload = {
	boardId: string;
	newTitle: string;
};
export type UpdateBoardTitleSuccessPayload = {
	boardId: string;
	newTitle: string;
};
export type UpdateBoardTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type UpdateBoardVisibilityRequestPayload = {
	boardId: string;
	isVisible: boolean;
};
export type UpdateBoardVisibilitySuccessPayload = {
	boardId: string;
	isVisible: boolean;
};
export type UpdateBoardVisibilityFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type DisconnectSocketRequestPayload = Record<string, never>;

export type NotifyErrorPayload = {
	errorType: ErrorType;
	boardObjectType?: BoardObjectType;
};
