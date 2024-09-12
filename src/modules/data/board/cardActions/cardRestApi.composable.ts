import {
	ApiErrorHandlerFactory,
	BoardObjectType,
	ErrorType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { delay } from "@/utils/helpers";
import { useBoardStore } from "@data-board";
import { useBoardApi } from "../BoardApi.composable";
import { useCardStore } from "../Card.store";
import { useSharedCardRequestPool } from "../CardRequestPool.composable";
import { useSharedEditMode } from "../EditMode.composable";
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

export const useCardRestApi = () => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { handleError, notifyWithTemplate } = useErrorHandler();

	const {
		createElementCall,
		fetchPreferredTools,
		deleteElementCall,
		deleteCardCall,
		updateElementCall,
		moveElementCall,
		updateCardTitle,
		updateCardHeightCall,
	} = useBoardApi();

	const { setEditModeId } = useSharedEditMode();

	const createElementRequest = async (payload: CreateElementRequestPayload) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			const params = {
				type: payload.type,
				toPosition: payload.toPosition,
			};
			const newElement = await createElementCall(payload.cardId, params);
			cardStore.createElementSuccess({
				...payload,
				newElement: newElement.data,
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const getPreferredTools = async () => {
		try {
			const preferredTools = await fetchPreferredTools();

			return preferredTools;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardElement"),
			});
		}
	};

	const deleteElementRequest = async (payload: DeleteElementRequestPayload) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await deleteElementCall(payload.elementId);
			cardStore.deleteElementSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardElement"),
			});
		}
	};

	const moveElementRequest = async (payload: MoveElementRequestPayload) => {
		const card = cardStore.getCard(payload.toCardId);
		if (card === undefined) return;

		try {
			await moveElementCall(
				payload.elementId,
				payload.toCardId,
				payload.toPosition
			);
			cardStore.moveElementSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notMoved", "boardElement"),
			});
		}
	};

	const updateElementRequest = async (payload: UpdateElementRequestPayload) => {
		try {
			const success = await updateElementCall(payload.element);
			cardStore.updateElementSuccess({
				elementId: success.data.id,
				data: {
					type: success.data.type,
					content: success.data.content,
				},
				isOwnAction: true,
			});
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notUpdated", "boardElement"),
			});
		}
	};

	const deleteCardRequest = async (payload: DeleteCardRequestPayload) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await deleteCardCall(payload.cardId);
			boardStore.deleteCardSuccess({ ...payload, isOwnAction: true });
			cardStore.deleteCardSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notDeleted", "boardCard"),
			});
		}
	};

	const fetchCardRequest = async (
		payload: FetchCardRequestPayload
	): Promise<void> => {
		await delay(100);
		try {
			const promises = payload.cardIds.map(fetchCardFromApi);
			const cards = await Promise.all(promises);
			cardStore.fetchCardSuccess({ cards, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
			});
		}
	};

	const updateCardTitleRequest = async (
		payload: UpdateCardTitleRequestPayload
	): Promise<void> => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await updateCardTitle(payload.cardId, payload.newTitle);
			cardStore.updateCardTitleSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const updateCardHeightRequest = async (
		payload: UpdateCardHeightRequestPayload
	) => {
		const card = cardStore.getCard(payload.cardId);
		if (card === undefined) return;

		try {
			await updateCardHeightCall(payload.cardId, payload.newHeight);
			cardStore.updateCardHeightSuccess({ ...payload, isOwnAction: true });
		} catch (error) {
			handleError(error, {});
		}
	};

	const notifyWithTemplateAndReload: ApiErrorHandlerFactory = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			notifyWithTemplate(errorType, boardObjectType)();
			boardStore.reloadBoard();
			setEditModeId(undefined);
		};
	};

	// this unused function is added to make sure that the same name is used in both socketApi and restApi
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const disconnectSocketRequest = (): void => {};

	return {
		createElementRequest,
		getPreferredTools,
		deleteElementRequest,
		moveElementRequest,
		updateElementRequest,
		deleteCardRequest,
		fetchCardRequest,
		updateCardTitleRequest,
		updateCardHeightRequest,
		disconnectSocketRequest,
	};
};
