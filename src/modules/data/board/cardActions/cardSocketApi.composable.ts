import * as CardActions from "./cardActions";
import { useSocketConnection } from "@data-board";
import { useCardStore } from "../Card.store";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	CreateElementRequestPayload,
	DeleteCardRequestPayload,
	DeleteElementRequestPayload,
	FetchCardRequestPayload,
	MoveElementRequestPayload,
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
	UpdateElementRequestPayload,
} from "./cardActionPayload";
import { DisconnectSocketRequestPayload } from "../boardActions/boardActionPayload";
import { useDebounceFn } from "@vueuse/core";

export const useCardSocketApi = () => {
	const cardStore = useCardStore();

	const WAIT_AFTER_LAST_CALL_IN_MS = 5;
	const MAX_WAIT_BEFORE_FIRST_CALL_IN_MS = 200;
	let cardIdsToFetch: string[] = [];

	const { notifySocketError } = useErrorHandler();

	const dispatch = async (
		action: PermittedStoreActions<typeof CardActions>
	) => {
		const successActions = [
			on(CardActions.createElementSuccess, cardStore.createElementSuccess),
			on(CardActions.deleteElementSuccess, cardStore.deleteElementSuccess),
			on(CardActions.moveElementSuccess, cardStore.moveElementSuccess),
			on(CardActions.updateElementSuccess, cardStore.updateElementSuccess),
			on(CardActions.deleteCardSuccess, cardStore.deleteCardSuccess),
			on(CardActions.fetchCardSuccess, cardStore.fetchCardSuccess),
			on(CardActions.updateCardTitleSuccess, cardStore.updateCardTitleSuccess),
			on(
				CardActions.updateCardHeightSuccess,
				cardStore.updateCardHeightSuccess
			),
		];

		const failureActions = [
			on(CardActions.createElementFailure, createElementFailure),
			on(CardActions.deleteElementFailure, deleteElementFailure),
			on(CardActions.moveElementFailure, moveElementFailure),
			on(CardActions.updateElementFailure, updateElementFailure),
			on(CardActions.deleteCardFailure, deleteCardFailure),
			on(CardActions.fetchCardFailure, fetchCardFailure),
			on(CardActions.updateCardTitleFailure, updateCardTitleFailure),
			on(CardActions.updateCardHeightFailure, updateCardHeightFailure),
		];

		handle(
			action,
			...successActions,
			...failureActions,
			on(CardActions.disconnectSocket, disconnectSocketRequest)
		);
	};

	const { emitOnSocket, disconnectSocket } = useSocketConnection(dispatch);

	const disconnectSocketRequest = (payload: DisconnectSocketRequestPayload) => {
		console.log("disconnectSocketRequest", payload);
		disconnectSocket();
	};

	const fetchCardRequest = async (payload: FetchCardRequestPayload) => {
		cardIdsToFetch = cardIdsToFetch.concat(payload.cardIds);
		_debouncedFetchCardEmit();
	};

	const _debouncedFetchCardEmit = useDebounceFn(
		() => {
			emitOnSocket("fetch-card-request", { cardIds: cardIdsToFetch });
			cardIdsToFetch = [];
		},
		WAIT_AFTER_LAST_CALL_IN_MS,
		{ maxWait: MAX_WAIT_BEFORE_FIRST_CALL_IN_MS }
	);

	const createElementRequest = async (payload: CreateElementRequestPayload) => {
		emitOnSocket("create-element-request", payload);
	};

	const deleteElementRequest = async (payload: DeleteElementRequestPayload) => {
		emitOnSocket("delete-element-request", payload);
	};

	const moveElementRequest = async (payload: MoveElementRequestPayload) => {
		emitOnSocket("move-element-request", payload);
	};

	const updateElementRequest = async ({
		element,
	}: UpdateElementRequestPayload) => {
		emitOnSocket("update-element-request", {
			elementId: element.id,
			data: {
				type: element.type,
				content: element.content,
			},
		});
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

	const createElementFailure = () =>
		notifySocketError("notCreated", "boardElement");

	const deleteElementFailure = () =>
		notifySocketError("notDeleted", "boardElement");

	const moveElementFailure = () =>
		notifySocketError("notUpdated", "boardElement");

	const updateElementFailure = () =>
		notifySocketError("notUpdated", "boardElement");

	const deleteCardFailure = () => notifySocketError("notDeleted", "boardCard");

	const fetchCardFailure = () => notifySocketError("notLoaded", "boardCard");

	const updateCardTitleFailure = () =>
		notifySocketError("notUpdated", "boardCard");

	const updateCardHeightFailure = () =>
		notifySocketError("notUpdated", "boardCard");

	return {
		dispatch,
		disconnectSocketRequest,
		createElementRequest,
		deleteElementRequest,
		moveElementRequest,
		updateElementRequest,
		deleteCardRequest,
		fetchCardRequest,
		updateCardTitleRequest,
		updateCardHeightRequest,
	};
};
