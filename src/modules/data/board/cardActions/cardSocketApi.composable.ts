import * as CardActions from "./cardActions";
import { useSocketConnection } from "@data-board";
import { useCardStore } from "../Card.store";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	DeleteCardRequestPayload,
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
} from "./cardActionPayload";
import { DisconnectSocketRequestPayload } from "../boardActions/boardActionPayload";

type ErrorActions = ReturnType<typeof CardActions.updateCardTitleFailure>;

export const useCardSocketApi = () => {
	const cardStore = useCardStore();

	const { notifySocketError } = useErrorHandler();

	const dispatch = async (
		action: PermittedStoreActions<typeof CardActions>
	) => {
		handle(
			action,
			on(CardActions.disconnectSocket, disconnectSocketRequest),

			// success actions
			on(CardActions.updateCardTitleSuccess, cardStore.updateCardTitleSuccess),
			on(
				CardActions.updateCardHeightSuccess,
				cardStore.updateCardHeightSuccess
			),
			// on(CardActions.deleteCardSuccess, cardStore.deleteCardSuccess),

			// failure actions
			on(CardActions.updateCardTitleFailure, onFailure),
			on(CardActions.updateCardHeightFailure, onFailure)
		);
	};

	const { emitOnSocket, disconnectSocket } = useSocketConnection(dispatch);

	const disconnectSocketRequest = (payload: DisconnectSocketRequestPayload) => {
		// TODO: Kebab-Case
		console.log("disconnectSocketRequest", payload);
		disconnectSocket();
	};

	const deleteCardRequest = async (payload: DeleteCardRequestPayload) => {
		emitOnSocket("delete-card-request", payload);
	};

	const updateCardTitleRequest = (payload: UpdateCardTitleRequestPayload) => {
		emitOnSocket("update-card-title-request", payload);
	};

	const updateCardHeightRequest = (payload: UpdateCardHeightRequestPayload) => {
		emitOnSocket("update-card-height-request", payload);
	};

	const onFailure = (payload: ErrorActions["payload"]) => {
		const { errorType = "notUpdated", boardObjectType = "boardCard" } = payload;
		notifySocketError(errorType, boardObjectType);
	};

	return {
		dispatch,
		disconnectSocketRequest,
		deleteCardRequest,
		updateCardTitleRequest,
		updateCardHeightRequest,
	};
};
