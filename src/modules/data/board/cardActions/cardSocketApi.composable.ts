import { chunk } from "lodash";
import * as CardActions from "./cardActions";
import { useSocketConnection } from "../socket/socket";
import { useBoardStore } from "../Board.store";
import { useCardStore } from "../Card.store";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import {
	CreateElementRequestPayload,
	DeleteCardRequestPayload,
	DeleteElementRequestPayload,
	FetchCardRequestPayload,
	MoveElementRequestPayload,
	UpdateCardHeightRequestPayload,
	UpdateCardTitleRequestPayload,
	UpdateElementRequestPayload,
} from "./cardActionPayload.types";
import { useDebounceFn } from "@vueuse/core";
import { useBoardAriaNotification } from "../ariaNotification/ariaLiveNotificationHandler";
import { storeToRefs } from "pinia";

export const useCardSocketApi = () => {
	const cardStore = useCardStore();

	const WAIT_AFTER_LAST_CALL_IN_MS = 30;
	const MAX_WAIT_BEFORE_FIRST_CALL_IN_MS = 200;
	let cardIdsToFetch: string[] = [];

	const {
		notifyUpdateCardTitleSuccess,
		notifyCreateElementSuccess,
		notifyDeleteElementSuccess,
		notifyMoveElementSuccess,
		notifyUpdateElementSuccess,
	} = useBoardAriaNotification();

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
			on(CardActions.createElementFailure, ({ cardId }) => reloadBoard(cardId)),
			on(CardActions.deleteElementFailure, ({ cardId }) => reloadBoard(cardId)),
			on(CardActions.moveElementFailure, () => reloadBoard()),
			on(CardActions.updateElementFailure, () => reloadBoard()),
			on(CardActions.fetchCardFailure, ({ cardIds }) =>
				reloadBoard(cardIds[0])
			),
			on(CardActions.updateCardTitleFailure, ({ cardId }) =>
				reloadBoard(cardId)
			),
			on(CardActions.deleteCardFailure, ({ cardId }) => reloadBoard(cardId)),
		];

		const ariaLiveNotification = [
			on(CardActions.updateCardTitleSuccess, notifyUpdateCardTitleSuccess),
			on(CardActions.createElementSuccess, notifyCreateElementSuccess),
			on(CardActions.deleteElementSuccess, notifyDeleteElementSuccess),
			on(CardActions.moveElementSuccess, notifyMoveElementSuccess),
			on(CardActions.updateElementSuccess, notifyUpdateElementSuccess),
		];

		handle(
			action,
			...successActions,
			...failureActions,
			...ariaLiveNotification,
			on(CardActions.disconnectSocket, disconnectSocketRequest)
		);
	};

	const { emitOnSocket, disconnectSocket } = useSocketConnection(dispatch);

	const disconnectSocketRequest = () => {
		disconnectSocket();
	};

	const fetchCardRequest = async (payload: FetchCardRequestPayload) => {
		cardIdsToFetch = cardIdsToFetch.concat(payload.cardIds);
		_debouncedFetchCardEmit();
	};

	const _debouncedFetchCardEmit = useDebounceFn(
		() => {
			const batches = chunk(cardIdsToFetch, 50);
			batches.forEach((cardIds) =>
				emitOnSocket("fetch-card-request", { cardIds })
			);
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

	const reloadBoard = (cardId = "") => {
		const boardStore = useBoardStore();
		const { board } = storeToRefs(boardStore);
		if (cardId) {
			const location = boardStore.getCardLocation(cardId);
			const { columnIndex, cardIndex } = location ?? {};
			if (
				board?.value &&
				columnIndex !== undefined &&
				cardIndex !== undefined &&
				columnIndex > -1 &&
				cardIndex > -1
			) {
				// remove card so that reloading data results in rerender
				board.value.columns[columnIndex].cards.splice(cardIndex, 1);
			}
		}
		boardStore.reloadBoard();
	};

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
