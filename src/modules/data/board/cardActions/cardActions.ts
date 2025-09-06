import {
	CreateElementFailurePayload,
	CreateElementRequestPayload,
	CreateElementSuccessPayload,
	DeleteCardFailurePayload,
	DeleteCardRequestPayload,
	DeleteCardSuccessPayload,
	DeleteElementFailurePayload,
	DeleteElementRequestPayload,
	DeleteElementSuccessPayload,
	DisconnectSocketRequestPayload,
	FetchCardFailurePayload,
	FetchCardRequestPayload,
	FetchCardSuccessPayload,
	MoveElementRequestPayload,
	MoveElementSuccessPayload,
	MoveElementFailurePayload,
	UpdateCardHeightFailurePayload,
	UpdateCardHeightRequestPayload,
	UpdateCardHeightSuccessPayload,
	UpdateCardTitleFailurePayload,
	UpdateCardTitleRequestPayload,
	UpdateCardTitleSuccessPayload,
	UpdateElementRequestPayload,
	UpdateElementSuccessPayload,
	UpdateElementFailurePayload,
} from "./cardActionPayload.types";
import { createAction, props } from "@/types/board/ActionFactory";

export const disconnectSocket = createAction(
	"disconnect-socket",
	props<DisconnectSocketRequestPayload>()
);

export const createElementRequest = createAction(
	"create-element-request",
	props<CreateElementRequestPayload>()
);
export const createElementSuccess = createAction(
	"create-element-success",
	props<CreateElementSuccessPayload>()
);
export const createElementFailure = createAction(
	"create-element-failure",
	props<CreateElementFailurePayload>()
);

export const deleteElementRequest = createAction(
	"delete-element-request",
	props<DeleteElementRequestPayload>()
);
export const deleteElementSuccess = createAction(
	"delete-element-success",
	props<DeleteElementSuccessPayload>()
);
export const deleteElementFailure = createAction(
	"delete-element-failure",
	props<DeleteElementFailurePayload>()
);

export const moveElementRequest = createAction(
	"move-element-request",
	props<MoveElementRequestPayload>()
);
export const moveElementSuccess = createAction(
	"move-element-success",
	props<MoveElementSuccessPayload>()
);
export const moveElementFailure = createAction(
	"move-element-failure",
	props<MoveElementFailurePayload>()
);

export const updateElementRequest = createAction(
	"update-element-request",
	props<UpdateElementRequestPayload>()
);
export const updateElementSuccess = createAction(
	"update-element-success",
	props<UpdateElementSuccessPayload>()
);
export const updateElementFailure = createAction(
	"update-element-failure",
	props<UpdateElementFailurePayload>()
);

export const deleteCardRequest = createAction(
	"delete-card-request",
	props<DeleteCardRequestPayload>()
);
export const deleteCardSuccess = createAction(
	"delete-card-success",
	props<DeleteCardSuccessPayload>()
);
export const deleteCardFailure = createAction(
	"delete-card-failure",
	props<DeleteCardFailurePayload>()
);

export const fetchCardRequest = createAction(
	"fetch-card-request",
	props<FetchCardRequestPayload>()
);
export const fetchCardSuccess = createAction(
	"fetch-card-success",
	props<FetchCardSuccessPayload>()
);
export const fetchCardFailure = createAction(
	"fetch-card-failure",
	props<FetchCardFailurePayload>()
);

export const updateCardTitleRequest = createAction(
	"update-card-title-request",
	props<UpdateCardTitleRequestPayload>()
);
export const updateCardTitleSuccess = createAction(
	"update-card-title-success",
	props<UpdateCardTitleSuccessPayload>()
);
export const updateCardTitleFailure = createAction(
	"update-card-title-failure",
	props<UpdateCardTitleFailurePayload>()
);

export const updateCardHeightRequest = createAction(
	"update-card-height-request",
	props<UpdateCardHeightRequestPayload>()
);
export const updateCardHeightSuccess = createAction(
	"update-card-height-success",
	props<UpdateCardHeightSuccessPayload>()
);
export const updateCardHeightFailure = createAction(
	"update-card-height-failure",
	props<UpdateCardHeightFailurePayload>()
);
