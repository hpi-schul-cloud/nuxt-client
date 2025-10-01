import {
	BoardLayout,
	BoardResponse,
	CardResponse,
	ColumnResponse,
	CreateCardBodyParamsRequiredEmptyElementsEnum,
} from "@/serverApi/v3";
import { ColumnMove } from "@/types/board/DragAndDrop";

export type CreateCardRequestPayload = {
	columnId: string;
	requiredEmptyElements?: CreateCardBodyParamsRequiredEmptyElementsEnum[];
};
export type CreateCardSuccessPayload = {
	newCard: CardResponse;
	columnId: string;
	isOwnAction: boolean;
};
export type CreateCardFailurePayload = CreateCardRequestPayload;

export type CreateColumnRequestPayload = {
	boardId: string;
};
export type CreateColumnSuccessPayload = {
	newColumn: ColumnResponse;
	isOwnAction: boolean;
};
export type CreateColumnFailurePayload = CreateColumnRequestPayload;

export type FetchBoardRequestPayload = {
	boardId: string;
};
export type FetchBoardSuccessPayload = BoardResponse;
export type FetchBoardFailurePayload = FetchBoardRequestPayload;

export type DeleteColumnRequestPayload = {
	columnId: string;
};
export type DeleteColumnSuccessPayload = {
	columnId: string;
	isOwnAction: boolean;
};
export type DeleteColumnFailurePayload = DeleteColumnRequestPayload;

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
export type MoveCardFailurePayload = MoveCardRequestPayload;

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
export type MoveColumnFailurePayload = MoveColumnRequestPayload;

export type UpdateColumnTitleRequestPayload = {
	columnId: string;
	newTitle: string;
};
export type UpdateColumnTitleSuccessPayload = {
	columnId: string;
	newTitle: string;
	isOwnAction: boolean;
};
export type UpdateColumnTitleFailurePayload = UpdateColumnTitleRequestPayload;

export type DeleteBoardRequestPayload = {
	boardId: string;
};
export type DeleteBoardSuccessPayload = {
	boardId: string;
	isOwnAction: boolean;
};
export type DeleteBoardFailurePayload = DeleteBoardRequestPayload;

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
export type UpdateBoardTitleFailurePayload = UpdateBoardTitleRequestPayload;

export type UpdateBoardVisibilityRequestPayload = {
	boardId: string;
	isVisible: boolean;
};
export type UpdateBoardVisibilitySuccessPayload = {
	boardId: string;
	isVisible: boolean;
	isOwnAction: boolean;
};
export type UpdateBoardVisibilityFailurePayload = UpdateBoardVisibilityRequestPayload;

export type DisconnectSocketRequestPayload = Record<string, never>;

export type UpdateBoardLayoutRequestPayload = {
	boardId: string;
	layout: BoardLayout;
};
export type UpdateBoardLayoutSuccessPayload = {
	boardId: string;
	layout: BoardLayout;
	isOwnAction: boolean;
};
export type UpdateBoardLayoutFailurePayload = UpdateBoardLayoutRequestPayload;
