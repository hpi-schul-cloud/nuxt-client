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
	isOwnAction: boolean;
};
export type CreateCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: CreateCardRequestPayload;
};

export type CreateColumnRequestPayload = {
	boardId: string;
};
export type CreateColumnSuccessPayload = {
	newColumn: ColumnResponse;
	isOwnAction: boolean;
};
export type CreateColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: CreateColumnRequestPayload;
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
	isOwnAction: boolean;
};
export type DeleteColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: DeleteColumnRequestPayload;
};

export type MoveCardRequestPayload = {
	cardId: string;
	oldIndex: number;
	newIndex: number;
	fromColumnId: string;
	fromColumnIndex: number;
	toColumnId?: string;
	toColumnIndex?: number;
	forceNextTick?: boolean;
};
export type MoveCardSuccessPayload = {
	cardId: string;
	oldIndex: number;
	newIndex: number;
	fromColumnId: string;
	fromColumnIndex: number;
	toColumnId: string;
	toColumnIndex: number;
	forceNextTick?: boolean;
	isOwnAction: boolean;
};
export type MoveCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: MoveCardRequestPayload;
};

export type MoveColumnRequestPayload = {
	columnMove: ColumnMove;
	targetBoardId?: string;
	byKeyboard: boolean;
};
export type MoveColumnSuccessPayload = {
	columnMove: ColumnMove;
	byKeyboard: boolean;
	isOwnAction: boolean;
};
export type MoveColumnFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: MoveColumnRequestPayload;
};

export type UpdateColumnTitleRequestPayload = {
	columnId: string;
	newTitle: string;
};
export type UpdateColumnTitleSuccessPayload = {
	columnId: string;
	newTitle: string;
	isOwnAction: boolean;
};
export type UpdateColumnTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: UpdateColumnTitleRequestPayload;
};

export type DeleteBoardRequestPayload = {
	id: string;
};
export type DeleteBoardSuccessPayload = {
	id: string;
	isOwnAction: boolean;
};
export type DeleteBoardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: DeleteBoardRequestPayload;
};

export type ReloadBoardPayload = {
	id: string;
};
export type ReloadBoardSuccessPayload = {
	id: string;
	isOwnAction: boolean;
};

export type UpdateBoardTitleRequestPayload = {
	boardId: string;
	newTitle: string;
};
export type UpdateBoardTitleSuccessPayload = {
	boardId: string;
	newTitle: string;
	isOwnAction: boolean;
};
export type UpdateBoardTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: UpdateBoardTitleRequestPayload;
};

export type UpdateBoardVisibilityRequestPayload = {
	boardId: string;
	isVisible: boolean;
};
export type UpdateBoardVisibilitySuccessPayload = {
	boardId: string;
	isVisible: boolean;
	isOwnAction: boolean;
};
export type UpdateBoardVisibilityFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
	requestPayload: UpdateBoardVisibilityRequestPayload;
};

export type DisconnectSocketRequestPayload = Record<string, never>;

export type NotifyErrorPayload = {
	errorType: ErrorType;
	boardObjectType?: BoardObjectType;
};
