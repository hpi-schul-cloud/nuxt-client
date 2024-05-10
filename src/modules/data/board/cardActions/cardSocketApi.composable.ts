import * as CardActions from "./cardActions";
import { useSocketConnection } from "@data-board";
import { useCardStore } from "../Card.store";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	DeleteCardRequestPayload,
	FetchCardRequestPayload,
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
} from "./cardActionPayload";
import { DisconnectSocketRequestPayload } from "../boardActions/boardActionPayload";
import { useDebounceFn } from "@vueuse/core";

type ErrorActions = ReturnType<typeof CardActions.updateCardTitleFailure>;

export const useCardSocketApi = () => {
	const cardStore = useCardStore();

	const WAIT_AFTER_LAST_CALL_IN_MS = 5;
	const MAX_WAIT_BEFORE_FIRST_CALL_IN_MS = 200;
	let cardIdsToFetch: string[] = [];

	const { notifySocketError } = useErrorHandler();

	const dispatch = async (
		action: PermittedStoreActions<typeof CardActions>
	) => {
		handle(
			action,
			on(CardActions.disconnectSocket, disconnectSocketRequest),

			// success actions
			on(CardActions.fetchCardSuccess, cardStore.fetchCardSuccess),
			on(CardActions.updateCardTitleSuccess, cardStore.updateCardTitleSuccess),
			on(
				CardActions.updateCardHeightSuccess,
				cardStore.updateCardHeightSuccess
			),

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

	const fetchCardRequest = async (payload: FetchCardRequestPayload) => {
		cardIdsToFetch = cardIdsToFetch.concat(payload.cardIds);
		_debouncedFetchCardsEmit();
	};

	const _debouncedFetchCardsEmit = useDebounceFn(
		() => {
			emitOnSocket("fetch-card-request", { cardIds: cardIdsToFetch });
			cardIdsToFetch = [];
		},
		WAIT_AFTER_LAST_CALL_IN_MS,
		{ maxWait: MAX_WAIT_BEFORE_FIRST_CALL_IN_MS }
	);

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
		fetchCardRequest,
		updateCardTitleRequest,
		updateCardHeightRequest,
	};
};
