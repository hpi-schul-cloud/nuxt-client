import {
	DeleteCardFailurePayload,
	DeleteCardRequestPayload,
	DeleteCardSuccessPayload,
	DisconnectSocketRequestPayload,
	FetchCardFailurePayload,
	FetchCardRequestPayload,
	FetchCardSuccessPayload,
	UpdateCardHeightFailurePayload,
	UpdateCardHeightRequestPayload,
	UpdateCardHeightSuccessPayload,
	UpdateCardTitleFailurePayload,
	UpdateCardTitleRequestPayload,
	UpdateCardTitleSuccessPayload,
} from "./cardActionPayload";
import { createAction, props } from "@/types/board/ActionFactory";

export const disconnectSocket = createAction(
	"disconnect-socket",
	props<DisconnectSocketRequestPayload>()
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
