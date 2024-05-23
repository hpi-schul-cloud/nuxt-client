import { CardResponse, ContentElementType } from "@/serverApi/v3";

import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";
import { AnyContentElement } from "@/types/board/ContentElement";

export type FetchCardRequestPayload = {
	cardIds: string[];
};
export type FetchCardSuccessPayload = {
	cards: CardResponse[];
	isOwnAction: boolean;
};
export type FetchCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type UpdateCardTitleRequestPayload = {
	cardId: string;
	newTitle: string;
};
export type UpdateCardTitleSuccessPayload = {
	cardId: string;
	newTitle: string;
	isOwnAction: boolean;
};
export type UpdateCardTitleFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type UpdateCardHeightRequestPayload = {
	cardId: string;
	newHeight: number;
};
export type UpdateCardHeightSuccessPayload = {
	cardId: string;
	newHeight: number;
	isOwnAction: boolean;
};
export type UpdateCardHeightFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type CreateElementRequestPayload = {
	cardId: string;
	type: ContentElementType;
	toPosition?: number;
};
export type CreateElementSuccessPayload = {
	cardId: string;
	type: ContentElementType;
	toPosition?: number;
	newElement: AnyContentElement;
	isOwnAction: boolean;
};
export type CreateElementFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type DeleteElementRequestPayload = {
	cardId: string;
	elementId: string;
};
export type DeleteElementSuccessPayload = {
	cardId: string;
	elementId: string;
	isOwnAction: boolean;
};
export type DeleteElementFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type DeleteCardRequestPayload = {
	cardId: string;
};
export type DeleteCardSuccessPayload = {
	cardId: string;
	isOwnAction: boolean;
};
export type DeleteCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type MoveElementRequestPayload = {
	elementId: string;
	toCardId: string;
	toPosition: number;
};
export type MoveElementSuccessPayload = {
	elementId: string;
	toCardId: string;
	toPosition: number;
	isOwnAction: boolean;
};
export type MoveElementFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type UpdateElementRequestPayload = {
	element: AnyContentElement;
};
export type UpdateElementSuccessPayload = {
	elementId: string;
	data: {
		type: ContentElementType;
		content: AnyContentElement["content"];
	};
	isOwnAction: boolean;
};
export type UpdateElementFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type DisconnectSocketRequestPayload = Record<string, never>;
