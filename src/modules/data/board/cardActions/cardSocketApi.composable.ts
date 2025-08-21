import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { PermittedStoreActions, handle, on } from "@/types/board/ActionFactory";
import {
	AnyContentElement,
	ContentElementType,
} from "@/types/board/ContentElement";
import { useDebounceFn } from "@vueuse/core";
import { chunk } from "lodash";
import { z } from "zod";
import { useBoardAriaNotification } from "../ariaNotification/ariaLiveNotificationHandler";
import { useCardStore } from "../Card.store";
import { useSocketConnection } from "../socket/socket";
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
import * as CardActions from "./cardActions";

export const useCardSocketApi = () => {
	const cardStore = useCardStore();

	const WAIT_AFTER_LAST_CALL_IN_MS = 30;
	const MAX_WAIT_BEFORE_FIRST_CALL_IN_MS = 200;
	let cardIdsToFetch: string[] = [];

	const { notifySocketError } = useErrorHandler();
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
			on(CardActions.createElementFailure, createElementFailure),
			on(CardActions.deleteElementFailure, deleteElementFailure),
			on(CardActions.moveElementFailure, moveElementFailure),
			on(CardActions.updateElementFailure, updateElementFailure),
			on(CardActions.deleteCardFailure, deleteCardFailure),
			on(CardActions.fetchCardFailure, fetchCardFailure),
			on(CardActions.updateCardTitleFailure, updateCardTitleFailure),
			on(CardActions.updateCardHeightFailure, updateCardHeightFailure),
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

	const { emitOnSocket, disconnectSocket, emitWithAck } =
		useSocketConnection(dispatch);

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

	const ExternalToolElementContentSchema = z.object({
		contextExternalToolId: z.string().nullable(),
	});

	const FileElementContentSchema = z.object({
		caption: z.string(),
		alternativeText: z.string(),
	});

	const FileFolderElementContentSchema = z.object({
		title: z.string(),
	});

	const H5pElementContentSchema = z.object({
		contentId: z.string().nullable(),
	});

	const LinkElementContentSchema = z.object({
		url: z.string(),
		title: z.string(),
		description: z.string().optional(),
	});

	const RichTextElementContentSchema = z.object({
		text: z.string(),
		inputFormat: z.string(),
	});

	const SubmissionContainerElementContentSchema = z.object({
		dueDate: z.string(),
	});

	const AnyContentElement = z.object({
		id: z.string(),
		type: z.enum(ContentElementType),
		timestamps: z.object({
			createdAt: z.string(),
			lastUpdatedAt: z.string(),
		}),
		content: z.union([
			ExternalToolElementContentSchema,
			FileElementContentSchema,
			FileFolderElementContentSchema,
			H5pElementContentSchema,
			LinkElementContentSchema,
			RichTextElementContentSchema,
			SubmissionContainerElementContentSchema,
		]),
	});

	const createElementRequest = async (
		payload: CreateElementRequestPayload
	): Promise<AnyContentElement | undefined> => {
		const response = (await emitWithAck(
			"create-element-request",
			payload
		)) as unknown;

		const anyContentElement = AnyContentElement.parse(response);

		return anyContentElement;
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
