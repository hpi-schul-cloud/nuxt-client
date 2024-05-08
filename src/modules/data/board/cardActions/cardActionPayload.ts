import {
	CardResponse,
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";

import {
	BoardObjectType,
	ErrorType,
} from "@/components/error-handling/ErrorHandler.composable";

export type FetchCardRequestPayload = {
	id: string;
};

export type FetchCardSuccessPayload = {
	card: CardResponse;
};

export type UpdateCardTitleRequestPayload = {
	cardId: string;
	newTitle: string;
};
export type UpdateCardTitleSuccessPayload = {
	cardId: string;
	newTitle: string;
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
};
export type UpdateCardHeightFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type AddElementRequestPayload = {
	cardId: string;
	type: ContentElementType;
	atFirstPosition?: boolean;
};

export type AddElementSuccessPayload = {
	cardId: string;
	params: CreateContentElementBodyParams;
};

export type DeleteElementRequestPayload = {
	cardId: string;
	elementId: string;
};

export type DeleteElementSuccessPayload = {
	cardId: string;
	elementId: string;
};

export type DeleteCardRequestPayload = {
	cardId: string;
};
export type DeleteCardSuccessPayload = {
	cardId: string;
};
export type DeleteCardFailurePayload = {
	errorType: ErrorType;
	boardObjectType: BoardObjectType;
};

export type DisconnectSocketRequestPayload = Record<string, never>;
