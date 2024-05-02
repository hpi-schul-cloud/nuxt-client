import {
	CardResponse,
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";

export type FetchCardRequestPayload = {
	id: string;
};

export type FetchCardSuccessPayload = {
	card: CardResponse;
};

export type UpdateCardTitleRequestPayload = {
	id: string;
	title: string;
};

export type UpdateCardTitleSuccessPayload = {
	id: string;
	title: string;
};

export type DeleteCardRequestPayload = {
	id: string;
};

export type DeleteCardSuccessPayload = {
	id: string;
};

export type UpdateCardHeightRequestPayload = {
	id: string;
	height: number;
};

export type UpdateCardHeightSuccessPayload = {
	id: string;
	height: number;
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
