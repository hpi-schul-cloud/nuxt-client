import {
	DeleteCardFailurePayload,
	DeleteCardRequestPayload,
	DeleteCardSuccessPayload,
	DisconnectSocketRequestPayload,
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

export const updateCardTitleRequest = createAction(
	"update-card-title-request",
	props<UpdateCardTitleRequestPayload>()
);
export const updateCardTitleSuccess = createAction(
	"update-card-title-success",
	props<UpdateCardTitleSuccessPayload>()
);
export const updateCardTitleFailure = createAction(
	"update-cardrd-title-failure",
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
	"update-cardrd-height-failure",
	props<UpdateCardHeightFailurePayload>()
);
